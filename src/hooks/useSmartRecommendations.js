// src/hooks/useSmartRecommendations.js
import { useMemo } from 'react';
import { EXERCISE_TYPES } from '../utils/constants';

/**
 * Hook pour générer des recommandations intelligentes basées sur :
 * - Temps passé sur chaque type d'exercice
 * - Parcours pédagogique optimal
 * - Messages bienveillants style "coach"
 */
const useSmartRecommendations = (lastActivity, exerciseTimeStats = {}, currentLevel) => {

  // Parcours pédagogique optimal
  const LEARNING_PATH = {
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
  };

  // Messages coach bienveillant
  const RECOMMENDATION_MESSAGES = {
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
  };

  // Seuil de temps pour déclencher une recommandation (en minutes)
  const TIME_THRESHOLD = 15;

  // Calculer la recommandation intelligente
  const smartRecommendation = useMemo(() => {
    // Si pas d'activité récente, recommander vocabulary pour commencer
    if (!lastActivity) {
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
          icon: '🌟',
          title: 'Commençons !',
          message: 'Prêt à débuter ton apprentissage ? Commençons par enrichir ton vocabulaire !',
          button: 'Commencer le vocabulaire'
        }
      };
    }

    // Vérifier le temps passé sur le dernier type d'exercice
    const lastExerciseType = lastActivity.type;
    const timeSpent = exerciseTimeStats[lastExerciseType] || 0;

    // Si pas assez de temps passé, pas de recommandation
    if (timeSpent < TIME_THRESHOLD) {
      return null;
    }

    // Obtenir le prochain exercice dans le parcours
    const nextExerciseType = LEARNING_PATH[lastExerciseType];
    
    if (!nextExerciseType || !EXERCISE_TYPES[nextExerciseType]) {
      return null;
    }

    // Générer la clé du message
    const messageKey = `${lastExerciseType}->${nextExerciseType}`;
    const recommendationMessage = RECOMMENDATION_MESSAGES[messageKey];

    if (!recommendationMessage) {
      return null;
    }

    // Créer la recommandation complète
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

  }, [lastActivity, exerciseTimeStats, currentLevel]);

  // Fonction pour obtenir le temps passé sur un type d'exercice
  const getTimeSpent = (exerciseType) => {
    return exerciseTimeStats[exerciseType] || 0;
  };

  // Fonction pour vérifier si un exercice peut être recommandé
  const canRecommend = (exerciseType) => {
    return getTimeSpent(exerciseType) >= TIME_THRESHOLD;
  };

  // Fonction pour obtenir le prochain exercice recommandé
  const getNextRecommendedExercise = (currentExerciseType) => {
    return LEARNING_PATH[currentExerciseType] || null;
  };

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