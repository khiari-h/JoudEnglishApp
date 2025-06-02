// hooks/useSmartRecommendations.js
/**
 * Hook pour générer des recommandations intelligentes
 * Responsabilité unique : logique de recommandation
 */

import { useMemo, useCallback } from 'react';
import { 
  RECOMMENDATION_CONFIG, 
  RECOMMENDATION_MESSAGES,
  EXERCISE_TYPES 
} from '../utils/timeConstants.js';
import { secondsToMinutes } from '../utils/timeUtils.js';

const useSmartRecommendations = (lastActivity, exerciseStats, currentLevel, exerciseTypes) => {
  
  // Fonction pour obtenir le temps en minutes d'un exercice
  const getExerciseTimeInMinutes = useCallback((exerciseType) => {
    if (!exerciseStats || !exerciseStats[exerciseType]) {
      return 0;
    }
    
    // exerciseStats contient déjà les temps en minutes (via getFormattedStats)
    return exerciseStats[exerciseType];
  }, [exerciseStats]);
  
  // Fonction pour vérifier si un exercice peut être recommandé
  const canRecommendNext = useCallback((exerciseType) => {
    const timeSpent = getExerciseTimeInMinutes(exerciseType);
    return timeSpent >= RECOMMENDATION_CONFIG.THRESHOLD_MINUTES;
  }, [getExerciseTimeInMinutes]);
  
  // Fonction pour créer une recommandation
  const createRecommendation = useCallback((
    exerciseType, 
    messageKey = null, 
    timeSpent = null, 
    fromExercise = null
  ) => {
    if (!exerciseTypes || !exerciseTypes[exerciseType]) {
      return null;
    }
    
    const exerciseInfo = exerciseTypes[exerciseType];
    let recommendationData;
    
    if (messageKey && RECOMMENDATION_MESSAGES[messageKey]) {
      // Recommandation intelligente avec message personnalisé
      recommendationData = {
        ...RECOMMENDATION_MESSAGES[messageKey],
        timeSpent,
        fromExercise
      };
    } else {
      // Recommandation par défaut
      recommendationData = {
        icon: '📚',
        title: 'Commençons par la base !',
        message: 'Le vocabulaire est la fondation de toute langue. Prêt à enrichir tes connaissances ?',
        button: `Pratiquer ${exerciseInfo.title.toLowerCase()}`
      };
    }
    
    return {
      id: messageKey ? `smart_${exerciseType}` : `default_${exerciseType}`,
      title: exerciseInfo.title,
      description: exerciseInfo.description,
      type: exerciseType,
      level: currentLevel,
      icon: exerciseInfo.icon,
      color: exerciseInfo.color,
      isRecommendation: true,
      recommendationData
    };
  }, [exerciseTypes, currentLevel]);
  
  // Fonction pour créer une recommandation de démarrage
  const createStartRecommendation = useCallback(() => {
    return createRecommendation(
      EXERCISE_TYPES.VOCABULARY,
      null,
      null,
      null
    );
  }, [createRecommendation]);
  
  // Calcul de la recommandation principale
  const smartRecommendation = useMemo(() => {
    // 1. Si pas d'activité récente → vocabulary pour débuter
    if (!lastActivity) {
      return {
        ...createStartRecommendation(),
        id: 'start_vocabulary',
        recommendationData: {
          icon: '🚀',
          title: 'Commençons !',
          message: 'Prêt à débuter ton apprentissage ? Commençons par enrichir ton vocabulaire !',
          button: 'Commencer le vocabulaire'
        }
      };
    }
    
    // 2. Vérifier le temps passé sur le dernier type d'exercice
    const lastExerciseType = lastActivity.type;
    const timeSpentInMinutes = getExerciseTimeInMinutes(lastExerciseType);
    
    // 3. Si assez de temps passé → recommandation intelligente
    if (timeSpentInMinutes >= RECOMMENDATION_CONFIG.THRESHOLD_MINUTES) {
      const nextExerciseType = RECOMMENDATION_CONFIG.LEARNING_PATH[lastExerciseType];
      
      if (nextExerciseType && exerciseTypes && exerciseTypes[nextExerciseType]) {
        const messageKey = `${lastExerciseType}->${nextExerciseType}`;
        
        if (RECOMMENDATION_MESSAGES[messageKey]) {
          return createRecommendation(
            nextExerciseType,
            messageKey,
            timeSpentInMinutes,
            lastExerciseType
          );
        }
      }
    }
    
    // 4. FALLBACK : Recommandation par défaut (vocabulary)
    return createRecommendation(EXERCISE_TYPES.VOCABULARY);
    
  }, [
    lastActivity, 
    getExerciseTimeInMinutes, 
    createRecommendation,
    createStartRecommendation,
    exerciseTypes
  ]);
  
  // Fonction pour obtenir toutes les recommandations possibles
  const getAllRecommendations = useCallback(() => {
    const recommendations = [];
    
    // Pour chaque exercice qui peut être recommandé
    Object.entries(RECOMMENDATION_CONFIG.LEARNING_PATH).forEach(([fromType, toType]) => {
      if (canRecommendNext(fromType) && exerciseTypes && exerciseTypes[toType]) {
        const messageKey = `${fromType}->${toType}`;
        const timeSpent = getExerciseTimeInMinutes(fromType);
        
        const recommendation = createRecommendation(
          toType,
          messageKey,
          timeSpent,
          fromType
        );
        
        if (recommendation) {
          recommendations.push(recommendation);
        }
      }
    });
    
    return recommendations;
  }, [canRecommendNext, exerciseTypes, getExerciseTimeInMinutes, createRecommendation]);
  
  // Fonction pour obtenir le prochain exercice recommandé
  const getNextExercise = useCallback((currentExerciseType) => {
    return RECOMMENDATION_CONFIG.LEARNING_PATH[currentExerciseType] || null;
  }, []);
  
  // Statistiques pour debug
  const getRecommendationStats = useCallback(() => {
    const stats = {};
    
    Object.keys(EXERCISE_TYPES).forEach(exerciseType => {
      const timeInMinutes = getExerciseTimeInMinutes(exerciseType);
      const canRecommend = canRecommendNext(exerciseType);
      const nextExercise = getNextExercise(exerciseType);
      
      stats[exerciseType] = {
        timeSpent: timeInMinutes,
        canRecommend,
        nextExercise,
        isAboveThreshold: timeInMinutes >= RECOMMENDATION_CONFIG.THRESHOLD_MINUTES
      };
    });
    
    return {
      stats,
      threshold: RECOMMENDATION_CONFIG.THRESHOLD_MINUTES,
      smartRecommendation: smartRecommendation?.id || 'none'
    };
  }, [getExerciseTimeInMinutes, canRecommendNext, getNextExercise, smartRecommendation]);
  
  return {
    // Recommandation principale
    smartRecommendation,
    
    // Fonctions utilitaires
    canRecommendNext,
    getExerciseTimeInMinutes,
    getNextExercise,
    getAllRecommendations,
    
    // Configuration
    threshold: RECOMMENDATION_CONFIG.THRESHOLD_MINUTES,
    learningPath: RECOMMENDATION_CONFIG.LEARNING_PATH,
    
    // Debug
    getRecommendationStats
  };
};

export default useSmartRecommendations;