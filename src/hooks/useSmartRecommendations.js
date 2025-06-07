// hooks/useSmartRecommendations.js - VERSION ROBUSTE
/**
 * Hook pour générer des recommandations intelligentes
 * ✅ NOUVELLE VERSION : Ne retourne JAMAIS null, section toujours visible
 */

import { useMemo, useCallback } from 'react';
import { 
  RECOMMENDATION_CONFIG, 
  RECOMMENDATION_MESSAGES,
  EXERCISE_TYPES 
} from '../utils/timeConstants.js';

const useSmartRecommendations = (lastActivity, exerciseStats, currentLevel, exerciseTypes) => {
  
  // ✅ NOUVEAU : Fallback robuste pour exerciseTypes
  const safeExerciseTypes = exerciseTypes || {
    vocabulary: {
      title: 'Vocabulaire',
      description: 'Enrichissez votre vocabulaire',
      icon: '📚',
      color: '#3B82F6'
    },
    grammar: {
      title: 'Grammaire', 
      description: 'Maîtrisez les règles grammaticales',
      icon: '📝',
      color: '#10B981'
    }
  };
  
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
    const threshold = RECOMMENDATION_CONFIG?.THRESHOLD_MINUTES || 5;
    return timeSpent >= threshold;
  }, [getExerciseTimeInMinutes]);
  
  // ✅ NOUVEAU : Fonction pour créer un fallback emergency
  const createEmergencyFallback = useCallback(() => {
    return {
      id: 'emergency_vocabulary',
      title: 'Vocabulaire',
      description: 'Enrichissez votre vocabulaire, base de tout apprentissage',
      type: 'vocabulary',
      level: currentLevel || '1',
      icon: '📚',
      color: '#3B82F6',
      isRecommendation: true,
      recommendationData: {
        icon: '📚',
        title: 'Continuons à apprendre !',
        message: 'Le vocabulaire est essentiel pour maîtriser une langue. Continuez à enrichir vos connaissances !',
        button: 'Pratiquer le vocabulaire'
      }
    };
  }, [currentLevel]);
  
  // ✅ AMÉLIORÉ : Fonction pour créer une recommandation (avec fallback)
  const createRecommendation = useCallback((
    exerciseType, 
    messageKey = null, 
    timeSpent = null, 
    fromExercise = null
  ) => {
    // ✅ Utiliser safeExerciseTypes au lieu de crasher
    if (!safeExerciseTypes[exerciseType]) {
      console.warn(`Exercise type ${exerciseType} not found, using emergency fallback`);
      return createEmergencyFallback();
    }
    
    const exerciseInfo = safeExerciseTypes[exerciseType];
    let recommendationData;
    
    if (messageKey && RECOMMENDATION_MESSAGES && RECOMMENDATION_MESSAGES[messageKey]) {
      // Recommandation intelligente avec message personnalisé
      recommendationData = {
        ...RECOMMENDATION_MESSAGES[messageKey],
        timeSpent,
        fromExercise
      };
    } else {
      // Recommandation par défaut
      recommendationData = {
        icon: exerciseInfo.icon || '📚',
        title: `Pratiquons ${exerciseInfo.title?.toLowerCase() || 'l\'exercice'} !`,
        message: exerciseInfo.description || 'Continuez votre apprentissage avec cet exercice.',
        button: `Pratiquer ${exerciseInfo.title?.toLowerCase() || 'l\'exercice'}`
      };
    }
    
    return {
      id: messageKey ? `smart_${exerciseType}` : `default_${exerciseType}`,
      title: exerciseInfo.title,
      description: exerciseInfo.description,
      type: exerciseType,
      level: currentLevel || '1',
      icon: exerciseInfo.icon,
      color: exerciseInfo.color,
      isRecommendation: true,
      recommendationData
    };
  }, [safeExerciseTypes, currentLevel, createEmergencyFallback]);
  
  // ✅ NOUVEAU : Fonction pour créer une recommandation de progression (épurée)
  const createProgressRecommendation = useCallback((exerciseType, timeSpent, threshold) => {
    const exerciseInfo = safeExerciseTypes[exerciseType] || safeExerciseTypes.vocabulary;
    const remaining = Math.max(0, threshold - timeSpent);
    
    return {
      id: `progress_${exerciseType}`,
      title: exerciseInfo.title,
      description: exerciseInfo.description,
      type: exerciseType,
      level: currentLevel || '1',
      icon: exerciseInfo.icon,
      color: exerciseInfo.color,
      isRecommendation: true,
      isProgress: true, // ✅ Flag pour identifier les recommandations de progression
      recommendationData: {
        icon: '⏱️',
        title: 'Objectif en cours', // ✅ ÉPURÉ : Plus court
        message: '', // ✅ ÉPURÉ : Pas de message verbeux
        button: 'Continuer', // ✅ ÉPURÉ : Bouton simple
        timeSpent,
        remaining,
        progress: Math.round((timeSpent / threshold) * 100)
      }
    };
  }, [safeExerciseTypes, currentLevel]);
  
  // ✅ ROBUSTE : Calcul de la recommandation principale (JAMAIS null)
  const smartRecommendation = useMemo(() => {
    const threshold = RECOMMENDATION_CONFIG?.THRESHOLD_MINUTES || 5;
    
    // 1. Si pas d'activité récente → vocabulary pour débuter
    if (!lastActivity) {
      return createRecommendation('vocabulary', null, null, null) || createEmergencyFallback();
    }
    
    // 2. Vérifier le temps passé sur le dernier type d'exercice
    const lastExerciseType = lastActivity.type || 'vocabulary';
    const timeSpentInMinutes = getExerciseTimeInMinutes(lastExerciseType);
    
    // 3. ✅ NOUVEAU : Si pas assez de temps → recommandation de progression
    if (timeSpentInMinutes < threshold) {
      return createProgressRecommendation(lastExerciseType, timeSpentInMinutes, threshold);
    }
    
    // 4. Si assez de temps passé → recommandation intelligente
    const learningPath = RECOMMENDATION_CONFIG?.LEARNING_PATH || {};
    const nextExerciseType = learningPath[lastExerciseType];
    
    if (nextExerciseType && safeExerciseTypes[nextExerciseType]) {
      const messageKey = `${lastExerciseType}->${nextExerciseType}`;
      
      if (RECOMMENDATION_MESSAGES && RECOMMENDATION_MESSAGES[messageKey]) {
        const recommendation = createRecommendation(
          nextExerciseType,
          messageKey,
          timeSpentInMinutes,
          lastExerciseType
        );
        if (recommendation) return recommendation;
      }
    }
    
    // 5. ✅ FALLBACK ROBUSTE : Toujours retourner quelque chose
    return createRecommendation('vocabulary') || createEmergencyFallback();
    
  }, [
    lastActivity, 
    getExerciseTimeInMinutes, 
    createRecommendation,
    createProgressRecommendation,
    createEmergencyFallback
  ]);
  
  // Fonction pour obtenir toutes les recommandations possibles
  const getAllRecommendations = useCallback(() => {
    const recommendations = [];
    const learningPath = RECOMMENDATION_CONFIG?.LEARNING_PATH || {};
    
    // Pour chaque exercice qui peut être recommandé
    Object.entries(learningPath).forEach(([fromType, toType]) => {
      if (canRecommendNext(fromType) && safeExerciseTypes[toType]) {
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
  }, [canRecommendNext, getExerciseTimeInMinutes, createRecommendation]);
  
  // Fonction pour obtenir le prochain exercice recommandé
  const getNextExercise = useCallback((currentExerciseType) => {
    const learningPath = RECOMMENDATION_CONFIG?.LEARNING_PATH || {};
    return learningPath[currentExerciseType] || null;
  }, []);
  
  // Statistiques pour debug
  const getRecommendationStats = useCallback(() => {
    const stats = {};
    const threshold = RECOMMENDATION_CONFIG?.THRESHOLD_MINUTES || 5;
    
    Object.keys(EXERCISE_TYPES || {}).forEach(exerciseType => {
      const timeInMinutes = getExerciseTimeInMinutes(exerciseType);
      const canRecommend = canRecommendNext(exerciseType);
      const nextExercise = getNextExercise(exerciseType);
      
      stats[exerciseType] = {
        timeSpent: timeInMinutes,
        canRecommend,
        nextExercise,
        isAboveThreshold: timeInMinutes >= threshold
      };
    });
    
    return {
      stats,
      threshold,
      smartRecommendation: smartRecommendation?.id || 'none',
      isProgress: smartRecommendation?.isProgress || false
    };
  }, [getExerciseTimeInMinutes, canRecommendNext, getNextExercise, smartRecommendation]);
  
  return {
    // ✅ Recommandation principale (JAMAIS null)
    smartRecommendation,
    
    // Fonctions utilitaires
    canRecommendNext,
    getExerciseTimeInMinutes,
    getNextExercise,
    getAllRecommendations,
    
    // Configuration
    threshold: RECOMMENDATION_CONFIG?.THRESHOLD_MINUTES || 5,
    learningPath: RECOMMENDATION_CONFIG?.LEARNING_PATH || {},
    
    // Debug
    getRecommendationStats
  };
};

export default useSmartRecommendations;