// src/hooks/useSmartRecommendations.js - OPTIMISÉ
import { useMemo, useCallback } from 'react';
import { EXERCISE_TYPES } from '../utils/constants';

/**
 * Hook pour générer des recommandations intelligentes basées sur :
 * - Temps passé sur chaque type d'exercice (VRAIES DONNÉES maintenant !)
 * - Parcours pédagogique optimal
 * - Messages bienveillants style "coach"
 * 
 * OPTIMISÉ - Plus de console.log, calculs mémorisés pour éviter les boucles infinies
 */
const useSmartRecommendations = (lastActivity, exerciseTimeStats = {}, currentLevel) => {

  // Parcours pédagogique optimal - MÉMORISÉ
  const LEARNING_PATH = useMemo(() => ({
    vocabulary: 'phrases',
    phrases: 'grammar', 
    grammar: 'reading',
    reading: 'conversations',
    conversations: 'assessment',
    assessment: 'vocabulary', // Cycle vers niveau suivant
    // Exercices de renforcement
    spelling: 'vocabulary', // Retour au vocab
    errorCorrection: 'reading', // Retour à la lecture
    wordGames: 'vocabulary', // Retour au vocab
  }), []);

  // Messages coach bienveillant - MÉMORISÉS
  const RECOMMENDATION_MESSAGES = useMemo(() => ({
    'vocabulary->phrases': {
      icon: '🎉',
      title: 'Belle progression !',
      message: 'Tu as bien enrichi ton vocabulaire ! Que dirais-tu de mettre ces mots en pratique avec des expressions ?',
      button: 'Pratiquer les expressions'
    },

    'phrases->grammar': {
      icon: '💪', 
      title: 'Bien joué !',
      message: 'Tu progresses bien avec les expressions ! Pour être encore plus précis, on travaille la grammaire ?',
      button: 'Renforcer la grammaire'
    },

    'grammar->reading': {
      icon: '🎯',
      title: 'Tu avances bien !', 
      message: 'Tu progresses en grammaire ! Pour voir tout en action, que dirais-tu de lire des textes complets ?',
      button: 'Passer à la lecture'
    },

    'reading->conversations': {
      icon: '🗣️',
      title: 'Super entraînement !',
      message: 'Tu progresses bien en lecture ! Prêt à compléter avec de la pratique orale ?',
      button: 'Essayer les dialogues'
    },

    'conversations->assessment': {
      icon: '🏆',
      title: 'Excellent parcours !',
      message: 'Tu as bien travaillé les dialogues ! Que dirais-tu de tester tes progrès globaux ?',
      button: 'Faire le bilan'
    },

    'assessment->vocabulary': {
      icon: '🚀',
      title: 'Bravo pour ce niveau !',
      message: 'Tu as validé tes acquis ! Prêt à découvrir du nouveau vocabulaire ?',
      button: 'Nouveau vocabulaire'
    },

    // Messages de retour pour exercices de renforcement
    'spelling->vocabulary': {
      icon: '✨',
      title: 'Orthographe au top !',
      message: 'Tu écris mieux ! Que dirais-tu d\'apprendre de nouveaux mots ?',
      button: 'Enrichir le vocabulaire'
    },

    'errorCorrection->reading': {
      icon: '🔍',
      title: 'Précision améliorée !',
      message: 'Tu corriges bien les erreurs ! Prêt à lire des textes complets ?',
      button: 'Reprendre la lecture'
    },

    'wordGames->vocabulary': {
      icon: '🎮',
      title: 'Bien révisé !',
      message: 'Tu t\'es bien amusé ! Que dirais-tu d\'apprendre de nouveaux mots ?',
      button: 'Nouveau vocabulaire'
    }
  }), []);

  // Seuil de temps pour déclencher une recommandation (en minutes)
  const TIME_THRESHOLD = 3;

  // Fonction pour vérifier le temps vocabulary avec modes - MÉMORISÉE
  const getVocabularyTime = useCallback(() => {
    return exerciseTimeStats.vocabulary || 0;
  }, [exerciseTimeStats.vocabulary]);

  // Fonction pour vérifier le temps d'un exercice - MÉMORISÉE
  const getExerciseTime = useCallback((exerciseType) => {
    if (exerciseType === 'vocabulary') {
      return getVocabularyTime();
    }
    return exerciseTimeStats[exerciseType] || 0;
  }, [exerciseTimeStats, getVocabularyTime]);

  // Fonction pour recommandation vocabulary par défaut - MÉMORISÉE
  const getDefaultVocabularyRecommendation = useCallback(() => {
    return {
      id: 'default_vocabulary',
      title: EXERCISE_TYPES.vocabulary.title,
      description: EXERCISE_TYPES.vocabulary.description,
      type: 'vocabulary',
      level: currentLevel,
      icon: EXERCISE_TYPES.vocabulary.icon,
      color: EXERCISE_TYPES.vocabulary.color,
      isRecommendation: true,
      recommendationData: {
        icon: '📚',
        title: 'Commençons par la base !',
        message: 'Le vocabulaire est la fondation de toute langue. Prêt à enrichir tes connaissances ?',
        button: 'Apprendre du vocabulaire'
      }
    };
  }, [currentLevel]);

  // Fonction pour recommandation de démarrage - MÉMORISÉE
  const getStartVocabularyRecommendation = useCallback(() => {
    return {
      id: 'start_vocabulary',
      title: EXERCISE_TYPES.vocabulary.title,
      description: EXERCISE_TYPES.vocabulary.description,
      type: 'vocabulary',
      level: currentLevel,
      icon: EXERCISE_TYPES.vocabulary.icon,
      color: EXERCISE_TYPES.vocabulary.color,
      isRecommendation: true,
      recommendationData: {
        icon: '🚀',
        title: 'Commençons !',
        message: 'Prêt à débuter ton apprentissage ? Commençons par enrichir ton vocabulaire !',
        button: 'Commencer le vocabulaire'
      }
    };
  }, [currentLevel]);

  // Calculer la recommandation intelligente - OPTIMISÉE
  const smartRecommendation = useMemo(() => {
    // 1. Si pas d'activité récente → vocabulary pour débuter
    if (!lastActivity) {
      return getStartVocabularyRecommendation();
    }

    // 2. Vérifier le temps passé sur le dernier type d'exercice
    const lastExerciseType = lastActivity.type;
    const timeSpent = getExerciseTime(lastExerciseType);

    // 3. Si assez de temps passé → recommandation intelligente
    if (timeSpent >= TIME_THRESHOLD) {
      const nextExerciseType = LEARNING_PATH[lastExerciseType];

      if (nextExerciseType && EXERCISE_TYPES[nextExerciseType]) {
        const messageKey = `${lastExerciseType}->${nextExerciseType}`;
        const recommendationMessage = RECOMMENDATION_MESSAGES[messageKey];

        if (recommendationMessage) {
          return {
            id: `recommendation_${nextExerciseType}`,
            title: EXERCISE_TYPES[nextExerciseType].title,
            description: EXERCISE_TYPES[nextExerciseType].description,
            type: nextExerciseType,
            level: currentLevel,
            icon: EXERCISE_TYPES[nextExerciseType].icon,
            color: EXERCISE_TYPES[nextExerciseType].color,
            isRecommendation: true,
            recommendationData: {
              ...recommendationMessage,
              timeSpent: Math.round(timeSpent),
              fromExercise: lastExerciseType
            }
          };
        }
      }
    }

    // 4. FALLBACK : Toujours proposer vocabulary par défaut
    return getDefaultVocabularyRecommendation();

  }, [
    lastActivity, 
    getExerciseTime, 
    LEARNING_PATH, 
    RECOMMENDATION_MESSAGES, 
    currentLevel,
    getStartVocabularyRecommendation,
    getDefaultVocabularyRecommendation
  ]);

  // Fonction pour obtenir le temps passé sur un type d'exercice - MÉMORISÉE
  const getTimeSpent = useCallback((exerciseType) => {
    return exerciseTimeStats[exerciseType] || 0;
  }, [exerciseTimeStats]);

  // Fonction pour vérifier si un exercice peut être recommandé - MÉMORISÉE
  const canRecommend = useCallback((exerciseType) => {
    return getTimeSpent(exerciseType) >= TIME_THRESHOLD;
  }, [getTimeSpent]);

  // Fonction pour obtenir le prochain exercice recommandé - MÉMORISÉE
  const getNextRecommendedExercise = useCallback((currentExerciseType) => {
    return LEARNING_PATH[currentExerciseType] || null;
  }, [LEARNING_PATH]);

  return {
    smartRecommendation,
    getTimeSpent,
    canRecommend,
    getNextRecommendedExercise,
    timeThreshold: TIME_THRESHOLD,
    learningPath: LEARNING_PATH
  };
};

export default useSmartRecommendations;
