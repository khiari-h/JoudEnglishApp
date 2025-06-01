// src/screens/exercises/errorCorrection/hooks/useErrorCorrectionProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de correction d'erreurs
 * Version simplifiée adoptant la structure de Phrases au lieu de la complexité précédente
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useErrorCorrectionProgress = (level) => {
  // ========== ÉTATS ==========
  
  // Structure simplifiée comme Phrases : { categoryId: [0, 2, 4] }
  const [completedExercises, setCompletedExercises] = useState({});
  const [lastPosition, setLastPosition] = useState({
    categoryId: null,
    exerciseIndex: 0
  });
  const [loaded, setLoaded] = useState(false);

  // ========== CLÉS ASYNCSTORAGE ==========
  const COMPLETED_EXERCISES_KEY = `error_correction_completed_${level}`;
  const LAST_POSITION_KEY = `error_correction_position_${level}`;

  // ========== CHARGEMENT INITIAL ==========
  
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        console.log(`📚 Chargement progression ErrorCorrection niveau ${level}...`);
        
        // Charger les exercices complétés
        const savedCompletedJson = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
        const savedCompleted = savedCompletedJson 
          ? JSON.parse(savedCompletedJson) 
          : {};
        
        // Charger la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { categoryId: null, exerciseIndex: 0 };
        
        setCompletedExercises(savedCompleted);
        setLastPosition(savedPosition);
        setLoaded(true);
        
        console.log("📊 Progression chargée:", { 
          completed: savedCompleted, 
          position: savedPosition 
        });
        
      } catch (error) {
        console.error('❌ Erreur chargement progression ErrorCorrection:', error);
        setCompletedExercises({});
        setLastPosition({ categoryId: null, exerciseIndex: 0 });
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY, level]);

  // ========== SAUVEGARDE POSITION ==========
  
  const saveLastPosition = useCallback(async (categoryId, exerciseIndex) => {
    try {
      const newPosition = {
        categoryId,
        exerciseIndex,
        timestamp: Date.now()
      };
      
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
      
      console.log(`💾 Position sauvegardée: catégorie ${categoryId}, exercice ${exerciseIndex}`);
      
    } catch (error) {
      console.error('❌ Erreur sauvegarde position:', error);
    }
  }, [LAST_POSITION_KEY]);

  // ========== MARQUER EXERCICE COMPLÉTÉ ==========
  
  const markExerciseAsCompleted = useCallback(async (categoryId, exerciseIndex, isCorrect, userAnswer, exerciseData = {}) => {
    try {
      const updatedCompleted = { ...completedExercises };
      
      // Initialiser la catégorie si nécessaire
      if (!updatedCompleted[categoryId]) {
        updatedCompleted[categoryId] = [];
      }
      
      // Ajouter l'exercice s'il n'est pas déjà complété
      if (!updatedCompleted[categoryId].includes(exerciseIndex)) {
        updatedCompleted[categoryId].push(exerciseIndex);
        
        setCompletedExercises(updatedCompleted);
        await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updatedCompleted));
        
        console.log(`✅ Exercice complété: catégorie ${categoryId}, exercice ${exerciseIndex}, correct: ${isCorrect}`);
      }
      
    } catch (error) {
      console.error('❌ Erreur marquage exercice complété:', error);
    }
  }, [completedExercises, COMPLETED_EXERCISES_KEY]);

  // ========== CALCULS DE PROGRESSION ==========
  
  // Progression pour une catégorie spécifique
  const getCategoryProgress = useCallback((categoryId, totalExercisesInCategory) => {
    if (!categoryId || totalExercisesInCategory <= 0) return 0;
    
    const completedInCategory = completedExercises[categoryId]?.length || 0;
    return Math.round((completedInCategory / totalExercisesInCategory) * 100);
  }, [completedExercises]);

  // Progression globale (toutes catégories)
  const calculateOverallProgress = useCallback((categoriesData) => {
    if (!categoriesData || !Array.isArray(categoriesData) || categoriesData.length === 0) {
      return 0;
    }

    let totalExercises = 0;
    let totalCompleted = 0;
    
    categoriesData.forEach(category => {
      const exercisesInCategory = category.exerciseCount || 0;
      const completedInCategory = completedExercises[category.id]?.length || 0;
      
      totalExercises += exercisesInCategory;
      totalCompleted += completedInCategory;
    });
    
    return totalExercises > 0 
      ? Math.round((totalCompleted / totalExercises) * 100)
      : 0;
  }, [completedExercises]);

  // ========== UTILITAIRES ==========
  
  // Vérifier si un exercice est complété
  const isExerciseCompleted = useCallback((categoryId, exerciseIndex) => {
    return completedExercises[categoryId]?.includes(exerciseIndex) || false;
  }, [completedExercises]);

  // Obtenir le nombre d'exercices complétés dans une catégorie
  const getCompletedCountInCategory = useCallback((categoryId) => {
    return completedExercises[categoryId]?.length || 0;
  }, [completedExercises]);

  // Obtenir le total des exercices complétés
  const getTotalCompletedCount = useCallback(() => {
    return Object.values(completedExercises)
      .reduce((total, categoryExercises) => total + categoryExercises.length, 0);
  }, [completedExercises]);

  // Réinitialiser la progression (pour tests/debug)
  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(COMPLETED_EXERCISES_KEY);
      await AsyncStorage.removeItem(LAST_POSITION_KEY);
      
      setCompletedExercises({});
      setLastPosition({ categoryId: null, exerciseIndex: 0 });
      
      console.log("🔄 Progression ErrorCorrection réinitialisée");
      
    } catch (error) {
      console.error('❌ Erreur reset progression:', error);
    }
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY]);

  // ========== LOGS DEBUG ==========
  
  useEffect(() => {
    if (loaded) {
      console.log("📊 DEBUG ErrorCorrection Progress:", {
        level,
        completedExercises,
        lastPosition,
        totalCompletedCount: getTotalCompletedCount()
      });
    }
  }, [loaded, level, completedExercises, lastPosition, getTotalCompletedCount]);

  // ========== RETOUR ==========
  return {
    // États
    completedExercises,
    lastPosition,
    loaded,
    
    // Actions principales
    saveLastPosition,
    markExerciseAsCompleted,
    
    // Calculs de progression
    getCategoryProgress,
    calculateOverallProgress,
    
    // Utilitaires
    isExerciseCompleted,
    getCompletedCountInCategory,
    getTotalCompletedCount,
    resetProgress
  };
};

export default useErrorCorrectionProgress;