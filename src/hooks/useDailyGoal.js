// src/hooks/useDailyGoal.js
import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXERCISE_TYPES } from '../utils/constants';

const DAILY_GOAL_KEY = 'daily_goal_data';

/**
 * Hook pour gérer les objectifs quotidiens intelligents avec progression vers évaluation
 */
const useDailyGoal = (currentLevel, progress) => {
  const [dailyGoalData, setDailyGoalData] = useState({
    // Cycle actuel d'entraînement
    currentCycle: {
      startDate: null,
      currentDay: 0,
      exercisesCompleted: [],
      evaluationOffered: false,
      evaluationDeclined: 0, // Nombre de fois déclinée
      evaluationCompleted: false
    },
    // Historique
    completedCycles: [],
    // Objectif du jour
    todayGoal: null,
    todayCompleted: false
  });

  // Charger les données au démarrage
  useEffect(() => {
    loadDailyGoalData();
  }, []);

  // Sauvegarder quand les données changent
  useEffect(() => {
    saveDailyGoalData();
  }, [dailyGoalData]);

  const loadDailyGoalData = async () => {
    try {
      const stored = await AsyncStorage.getItem(DAILY_GOAL_KEY);
      if (stored) {
        setDailyGoalData(JSON.parse(stored));
      } else {
        // Initialiser un nouveau cycle
        initializeNewCycle();
      }
    } catch (error) {
      console.error('Erreur chargement daily goal:', error);
    }
  };

  const saveDailyGoalData = async () => {
    try {
      await AsyncStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(dailyGoalData));
    } catch (error) {
      console.error('Erreur sauvegarde daily goal:', error);
    }
  };

  // Initialiser un nouveau cycle d'entraînement
  const initializeNewCycle = () => {
    const today = new Date().toDateString();
    setDailyGoalData(prev => ({
      ...prev,
      currentCycle: {
        startDate: today,
        currentDay: 1,
        exercisesCompleted: [],
        evaluationOffered: false,
        evaluationDeclined: 0,
        evaluationCompleted: false
      },
      todayGoal: generateTodayGoal(1),
      todayCompleted: false
    }));
  };

  // Générer l'objectif du jour selon la progression
  const generateTodayGoal = (day) => {
    const exerciseTypes = Object.keys(EXERCISE_TYPES);
    const baseExercises = ['vocabulary', 'phrases', 'grammar', 'reading', 'conversations'];
    
    // Exercice selon le jour dans le cycle
    const exerciseIndex = (day - 1) % baseExercises.length;
    const exerciseType = baseExercises[exerciseIndex];
    
    const exerciseInfo = EXERCISE_TYPES[exerciseType];
    
    return {
      type: exerciseType,
      title: exerciseInfo.title,
      description: exerciseInfo.description,
      icon: exerciseInfo.icon,
      color: exerciseInfo.color,
      target: 'complete', // Objectif : compléter un exercice de ce type
      message: getDailyMessage(exerciseType, day)
    };
  };

  // Messages motivants selon l'exercice et le jour
  const getDailyMessage = (exerciseType, day) => {
    const messages = {
      vocabulary: "Enrichis ton arsenal de mots !",
      phrases: "Mets tes nouveaux mots en action !",
      grammar: "Affine ta précision !",
      reading: "Vois tout en contexte !",
      conversations: "Pratique en situation réelle !",
      spelling: "Perfectionne ton orthographe !",
      errorCorrection: "Chasse les erreurs !",
      wordGames: "Révise en t'amusant !"
    };
    
    return messages[exerciseType] || `Progresse dans ${exerciseType} !`;
  };

  // Calculer l'état actuel du cycle
  const cycleStatus = useMemo(() => {
    if (!dailyGoalData.currentCycle.startDate) return 'not_started';
    
    const startDate = new Date(dailyGoalData.currentCycle.startDate);
    const today = new Date();
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Phase 1: Premier check (J+15)
    if (daysElapsed >= 15 && !dailyGoalData.currentCycle.evaluationOffered) {
      return 'ready_for_first_eval';
    }
    
    // Phase 2: Deuxième chance (J+29)  
    if (daysElapsed >= 29 && dailyGoalData.currentCycle.evaluationDeclined === 1) {
      return 'ready_for_second_eval';
    }
    
    // Phase 3: Mode libre (J+30+ et décliné 2 fois)
    if (daysElapsed >= 30 && dailyGoalData.currentCycle.evaluationDeclined >= 2) {
      return 'free_mode';
    }
    
    // Évaluation terminée
    if (dailyGoalData.currentCycle.evaluationCompleted) {
      return 'evaluation_completed';
    }
    
    return 'training';
  }, [dailyGoalData]);

  // Gérer la réponse à l'offre d'évaluation
  const handleEvaluationResponse = (accepted) => {
    setDailyGoalData(prev => ({
      ...prev,
      currentCycle: {
        ...prev.currentCycle,
        evaluationOffered: true,
        evaluationDeclined: accepted ? prev.currentCycle.evaluationDeclined : prev.currentCycle.evaluationDeclined + 1
      }
    }));
    
    return accepted;
  };

  // Marquer l'évaluation comme terminée
  const completeEvaluation = () => {
    setDailyGoalData(prev => ({
      ...prev,
      currentCycle: {
        ...prev.currentCycle,
        evaluationCompleted: true
      }
    }));
    
    // Démarrer un nouveau cycle après un délai
    setTimeout(() => {
      initializeNewCycle();
    }, 1000);
  };

  // Marquer l'objectif du jour comme terminé
  const completeTodayGoal = (exerciseType) => {
    const today = new Date().toDateString();
    
    setDailyGoalData(prev => ({
      ...prev,
      currentCycle: {
        ...prev.currentCycle,
        exercisesCompleted: [...prev.currentCycle.exercisesCompleted, {
          type: exerciseType,
          date: today,
          day: prev.currentCycle.currentDay
        }],
        currentDay: prev.currentCycle.currentDay + 1
      },
      todayCompleted: true,
      todayGoal: generateTodayGoal(prev.currentCycle.currentDay + 1)
    }));
  };

  // Vérifier si l'objectif du jour est terminé
  const checkTodayCompletion = () => {
    const today = new Date().toDateString();
    const todayExercise = dailyGoalData.currentCycle.exercisesCompleted.find(
      ex => ex.date === today
    );
    
    setDailyGoalData(prev => ({
      ...prev,
      todayCompleted: !!todayExercise
    }));
  };

  // Obtenir le message selon l'état actuel
  const getStatusMessage = () => {
    switch (cycleStatus) {
      case 'ready_for_first_eval':
        return {
          type: 'evaluation_offer',
          title: 'Prêt pour l\'évaluation ?',
          message: 'Ça fait 15 jours ! Tu te sens prêt pour l\'évaluation ?',
          buttons: ['Oui, je me lance !', 'Encore un peu d\'entraînement']
        };
        
      case 'ready_for_second_eval':
        return {
          type: 'evaluation_offer',
          title: 'Deuxième chance !',
          message: '2 semaines de plus ! Tu veux tenter maintenant ?',
          buttons: ['Oui, allons-y !', 'Pas encore prêt']
        };
        
      case 'free_mode':
        return {
          type: 'free_mode',
          title: 'À ton rythme',
          message: 'Fais l\'évaluation quand tu te sens prêt ! 💪',
          buttons: ['Évaluation disponible']
        };
        
      case 'evaluation_completed':
        return {
          type: 'completed',
          title: '🏆 BRAVO !',
          message: 'Objectif atteint ! Prêt pour le niveau suivant ?',
          buttons: ['Continuer']
        };
        
      default:
        return null;
    }
  };

  return {
    dailyGoalData,
    cycleStatus,
    todayGoal: dailyGoalData.todayGoal,
    todayCompleted: dailyGoalData.todayCompleted,
    statusMessage: getStatusMessage(),
    completeTodayGoal,
    handleEvaluationResponse,
    completeEvaluation,
    checkTodayCompletion,
    initializeNewCycle
  };
};

export default useDailyGoal;