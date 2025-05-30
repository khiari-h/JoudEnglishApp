// src/hooks/useLastActivity.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook pour récupérer la dernière activité (exercice) de l'utilisateur
 * Système niveaux 1-6+bonus uniquement
 */
const useLastActivity = () => {
  // États
  const [lastActivities, setLastActivities] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Types d'exercices disponibles dans l'application
  const exerciseTypes = [
    { 
      key: 'vocabulary',
      title: 'Vocabulaire',
      icon: 'book-outline',
      positionKey: 'vocabulary_position_'
    },
    { 
      key: 'phrases',
      title: 'Expressions',
      icon: 'text-outline',
      positionKey: 'phrases_position_'
    },
    { 
      key: 'grammar',
      title: 'Grammaire',
      icon: 'pencil-outline',
      positionKey: 'grammar_position_'
    },
    { 
      key: 'spelling',
      title: 'Orthographe',
      icon: 'create-outline',
      positionKey: 'spelling_position_'
    },
    { 
      key: 'reading',
      title: 'Lecture',
      icon: 'document-text-outline',
      positionKey: 'reading_position_'
    },
    { 
      key: 'errorCorrection',
      title: 'Correction d\'erreurs',
      icon: 'checkmark-outline',
      positionKey: 'error_correction_position_'
    },
    { 
      key: 'conversations',
      title: 'Conversations',
      icon: 'chatbubbles-outline',
      positionKey: 'conversations_position_'
    },
    { 
      key: 'wordGames',
      title: 'Jeux de mots',
      icon: 'game-controller-outline',
      positionKey: 'word_games_position_'
    },
    { 
      key: 'assessment',
      title: 'Évaluation',
      icon: 'trophy-outline',
      positionKey: 'assessment_position_'
    }
  ];

  // Niveaux du nouveau système
  const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];

  // Charger les métadonnées de progression pour un exercice
  const loadProgressMetadata = async (exerciseType, level, position) => {
    let progress = 0;
    let metadata = {};

    try {
      if (exerciseType.key === 'vocabulary') {
        const completedKey = `vocabulary_completed_${level}`;
        const completedJson = await AsyncStorage.getItem(completedKey);
        
        if (completedJson) {
          const completed = JSON.parse(completedJson);
          metadata.category = position.categoryIndex || 0;
          metadata.word = position.wordIndex || 0;
          
          // Calculer la progression approximative
          const totalCategories = Object.keys(completed).length;
          const completedCategories = Object.values(completed)
            .filter(arr => arr && arr.length > 0).length;
          progress = totalCategories > 0 ? (completedCategories / totalCategories) * 100 : 0;
        }
      } 
      else if (exerciseType.key === 'grammar') {
        const completedKey = `grammar_completed_${level}`;
        const completedJson = await AsyncStorage.getItem(completedKey);
        
        if (completedJson) {
          const completed = JSON.parse(completedJson);
          metadata.rule = position.ruleIndex || 0;
          metadata.exercise = position.exerciseIndex || 0;
          
          const totalRules = Object.keys(completed).length;
          const completedRules = Object.values(completed)
            .filter(arr => arr && arr.length > 0).length;
          progress = totalRules > 0 ? (completedRules / totalRules) * 100 : 0;
        }
      }
      else if (exerciseType.key === 'reading') {
        metadata.exercise = position.exerciseIndex || 0;
        metadata.question = position.questionIndex || 0;
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'phrases') {
        metadata.category = position.categoryIndex || 0;
        metadata.phrase = position.phraseIndex || 0;
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'conversations') {
        metadata.scenario = position.scenarioIndex || 0;
        metadata.step = position.stepIndex || 0;
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'spelling') {
        metadata.exercise = position.exerciseIndex || 0;
        metadata.type = position.exerciseType || 'correction';
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'errorCorrection') {
        metadata.category = position.categoryIndex || 0;
        metadata.exercise = position.exerciseIndex || 0;
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'wordGames') {
        metadata.game = position.gameIndex || 0;
        progress = position.progress || 0;
      }
      else if (exerciseType.key === 'assessment') {
        metadata.section = position.sectionIndex || 0;
        progress = position.progress || 0;
      }
    } catch (error) {
      console.error(`Erreur lors du chargement des métadonnées pour ${exerciseType.key}:`, error);
    }

    return { progress, metadata };
  };

  // Charger les dernières activités
  const loadLastActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const activitiesByLevel = {};

      // Pour chaque niveau
      for (const level of levels) {
        activitiesByLevel[level] = [];

        // Pour chaque type d'exercice
        for (const exerciseType of exerciseTypes) {
          // Construire la clé de position
          const positionKey = exerciseType.positionKey + level;
          
          // Récupérer la position sauvegardée
          const positionJson = await AsyncStorage.getItem(positionKey);
          
          if (positionJson) {
            // Convertir en objet
            const position = JSON.parse(positionJson);
            
            // Charger les métadonnées de progression
            const { progress, metadata } = await loadProgressMetadata(exerciseType, level, position);

            // Créer un objet d'activité avec des informations riches
            const activity = {
              type: exerciseType.key,
              level,
              position,
              title: exerciseType.title,
              icon: exerciseType.icon,
              progress,
              metadata,
              // Ajouter un timestamp si disponible, sinon utiliser maintenant
              timestamp: position.timestamp || Date.now(),
              // Formater l'heure relative (sera mis à jour lors de l'affichage)
              timeElapsed: "Récemment"
            };

            activitiesByLevel[level].push(activity);
          }
        }

        // Trier les activités par timestamp (plus récent en premier)
        activitiesByLevel[level].sort((a, b) => b.timestamp - a.timestamp);
      }

      setLastActivities(activitiesByLevel);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des dernières activités:', error);
      setIsLoading(false);
    }
  }, []);

  // Charger les activités au montage
  useEffect(() => {
    loadLastActivities();
  }, [loadLastActivities]);

  // Formater une chaîne de temps relative
  const getTimeElapsed = useCallback((timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return "Il y a quelques instants";
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }, []);

  // Obtenir la dernière activité pour un niveau spécifique
  const getLastActivityForLevel = useCallback((level) => {
    if (!lastActivities[level] || lastActivities[level].length === 0) {
      return null;
    }
    
    // L'activité la plus récente est déjà la première du tableau (trié)
    const activity = lastActivities[level][0];
    
    // Mettre à jour le temps écoulé
    return {
      ...activity,
      timeElapsed: getTimeElapsed(activity.timestamp)
    };
  }, [lastActivities, getTimeElapsed]);

  // Obtenir la dernière activité, tous niveaux confondus
  const getLastActivity = useCallback(() => {
    // Trouver l'activité la plus récente parmi tous les niveaux
    let mostRecentActivity = null;
    let mostRecentTimestamp = 0;
    
    Object.values(lastActivities).forEach(activitiesForLevel => {
      if (activitiesForLevel.length > 0) {
        const activity = activitiesForLevel[0]; // Déjà trié, le premier est le plus récent
        
        if (activity.timestamp > mostRecentTimestamp) {
          mostRecentActivity = activity;
          mostRecentTimestamp = activity.timestamp;
        }
      }
    });
    
    if (!mostRecentActivity) return null;
    
    // Mettre à jour le temps écoulé
    return {
      ...mostRecentActivity,
      timeElapsed: getTimeElapsed(mostRecentActivity.timestamp)
    };
  }, [lastActivities, getTimeElapsed]);

  // Formatter le texte de la progression pour l'affichage
  const formatProgressSubtitle = useCallback((activity) => {
    const { type, level, metadata } = activity;
    
    if (type === 'vocabulary' && metadata.category !== undefined) {
      return `Catégorie ${metadata.category + 1}, Mot ${metadata.word + 1} • Niveau ${level}`;
    } else if (type === 'grammar' && metadata.rule !== undefined) {
      return `Règle ${metadata.rule + 1}, Exercice ${metadata.exercise + 1} • Niveau ${level}`;
    } else if (type === 'reading' && metadata.exercise !== undefined) {
      return `Texte ${metadata.exercise + 1}, Question ${metadata.question + 1} • Niveau ${level}`;
    } else if (type === 'phrases' && metadata.category !== undefined) {
      return `Catégorie ${metadata.category + 1}, Expression ${metadata.phrase + 1} • Niveau ${level}`;
    } else if (type === 'conversations' && metadata.scenario !== undefined) {
      return `Scénario ${metadata.scenario + 1}, Étape ${metadata.step + 1} • Niveau ${level}`;
    } else if (type === 'spelling' && metadata.exercise !== undefined) {
      return `Exercice ${metadata.exercise + 1} (${metadata.type}) • Niveau ${level}`;
    } else if (type === 'errorCorrection' && metadata.category !== undefined) {
      return `Catégorie ${metadata.category + 1}, Exercice ${metadata.exercise + 1} • Niveau ${level}`;
    } else if (type === 'wordGames' && metadata.game !== undefined) {
      return `Jeu ${metadata.game + 1} • Niveau ${level}`;
    } else if (type === 'assessment' && metadata.section !== undefined) {
      return `Section ${metadata.section + 1} • Niveau ${level}`;
    }
    
    // Format par défaut
    return `Niveau ${level}`;
  }, []);

  return {
    lastActivities,
    isLoading,
    loadLastActivities,
    getLastActivity,
    getLastActivityForLevel,
    formatProgressSubtitle
  };
};

export default useLastActivity;