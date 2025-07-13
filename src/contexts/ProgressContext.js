// src/contexts/ProgressContext.js - VERSION CORRIGÉE SANS BOUCLE

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

// Créer le contexte
export const ProgressContext = createContext();

// Données initiales simples
const createInitialProgress = () => ({
  // Progression par niveau (0-100%)
  levels: {
    '1': { completed: 0, total: 100 },
    '2': { completed: 0, total: 100 },
    '3': { completed: 0, total: 100 },
    '4': { completed: 0, total: 100 },
    '5': { completed: 0, total: 100 },
    '6': { completed: 0, total: 100 },
    'bonus': { completed: 0, total: 100 },
  },
  
  // Progression par exercice et niveau
  exercises: {
    vocabulary: {
      '1': { completed: 0, total: 100 },
      '2': { completed: 0, total: 100 },
      '3': { completed: 0, total: 100 },
      '4': { completed: 0, total: 100 },
      '5': { completed: 0, total: 100 },
      '6': { completed: 0, total: 100 },
      'bonus': { completed: 0, total: 100 },
    },
    phrases: {
      '1': { completed: 0, total: 100 },
      '2': { completed: 0, total: 100 },
      '3': { completed: 0, total: 100 },
      '4': { completed: 0, total: 100 },
      '5': { completed: 0, total: 100 },
      '6': { completed: 0, total: 100 },
      'bonus': { completed: 0, total: 100 },
    },
    grammar: {
      '1': { completed: 0, total: 100 },
      '2': { completed: 0, total: 100 },
      '3': { completed: 0, total: 100 },
      '4': { completed: 0, total: 100 },
      '5': { completed: 0, total: 100 },
      '6': { completed: 0, total: 100 },
    },
    // ... autres exercices peuvent être ajoutés au besoin
  },

  // Stats globales
  stats: {
    streak: 0,
    totalTimeSpent: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    exercisesCompleted: 0,
    lastLogin: null,
  },

  // Dernière activité
  lastActivity: {
    type: null,
    level: null,
    timestamp: null,
  },
});

// Fournisseur du contexte
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(createInitialProgress());
  const [isLoading, setIsLoading] = useState(true);
  
  // ✅ CORRECTION : Ref pour éviter la boucle de sauvegarde
  const saveTimeoutRef = useRef(null);
  const isInitialLoad = useRef(true);

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
        if (stored) {
          const parsed = JSON.parse(stored);
          setProgress(parsed);
        }
      } catch (error) {
        console.error('Erreur chargement progression:', error);
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false; // ✅ Marquer que le chargement initial est fini
      }
    };

    loadProgress();
  }, []); // ✅ CORRIGÉ : Aucune dépendance

  // ========== SAUVEGARDE AUTO CORRIGÉE ==========
  useEffect(() => {
    // ✅ CORRECTION : Ne pas sauvegarder pendant le chargement initial
    if (isLoading || isInitialLoad.current) {
      return;
    }

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      } catch (error) {
        console.error('Erreur sauvegarde progression:', error);
      }
    }, 500);

    // Cleanup timeout
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, isLoading]); // ✅ IMPORTANT : Inclure isLoading pour éviter sauvegarde pendant chargement

  // ========== MÉTHODES MÉMORISÉES ==========

  // ✅ CORRECTION : Mémoriser toutes les fonctions
  const updateExerciseProgress = useCallback((exerciseType, level, completed) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      // Vérifier que l'exercice existe
      if (!newProgress.exercises[exerciseType]) {
        newProgress.exercises[exerciseType] = {};
      }
      
      if (!newProgress.exercises[exerciseType][level]) {
        newProgress.exercises[exerciseType][level] = { completed: 0, total: 100 };
      }

      // Mettre à jour l'exercice
      newProgress.exercises[exerciseType][level].completed = Math.min(Math.max(0, completed), 100);

      // Recalculer progression du niveau (moyenne des exercices)
      const levelExercises = Object.keys(newProgress.exercises).map(type => 
        newProgress.exercises[type][level]?.completed || 0
      ).filter(val => val > 0);

      if (levelExercises.length > 0) {
        const averageProgress = levelExercises.reduce((sum, val) => sum + val, 0) / levelExercises.length;
        newProgress.levels[level].completed = Math.round(averageProgress);
      }

      // Mettre à jour dernière activité
      newProgress.lastActivity = {
        type: exerciseType,
        level,
        timestamp: new Date().toISOString(),
      };

      return newProgress;
    });
  }, []);

  const updateStats = useCallback((newStats) => {
    setProgress(prev => ({
      ...prev,
      stats: { ...prev.stats, ...newStats }
    }));
  }, []);

  const calculateGlobalProgress = useCallback(() => {
    const levels = Object.values(progress.levels);
    if (levels.length === 0) return 0;
    
    const total = levels.reduce((sum, level) => sum + level.completed, 0);
    return Math.round(total / levels.length);
  }, [progress.levels]);

  const calculateLevelProgress = useCallback((level) => {
    return progress.levels[level]?.completed || 0;
  }, [progress.levels]);

  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
      setProgress(createInitialProgress());
      return true;
    } catch (error) {
      console.error('Erreur reset progression:', error);
      return false;
    }
  }, []);

  // ========== 🚨 CORRECTION PRINCIPALE : VALEUR MÉMORISÉE ==========
  const contextValue = useMemo(() => ({
    progress,
    isLoading,
    updateExerciseProgress,
    updateStats,
    calculateGlobalProgress,
    calculateLevelProgress,
    resetProgress,
  }), [
    progress, 
    isLoading, 
    updateExerciseProgress, 
    updateStats, 
    calculateGlobalProgress, 
    calculateLevelProgress, 
    resetProgress
  ]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;