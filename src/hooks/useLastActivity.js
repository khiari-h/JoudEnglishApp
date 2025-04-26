// src/hooks/useLastActivity.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook pour récupérer la dernière activité (exercice) de l'utilisateur
 * Agrège les informations de tous les types d'exercices
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
      key: 'grammar',
      title: 'Grammaire',
      icon: 'pencil-outline',
      positionKey: 'grammar_position_'
    },
    { 
      key: 'reading',
      title: 'Lecture',
      icon: 'document-text-outline',
      positionKey: 'reading_position_'
    },
    { 
      key: 'error_correction',
      title: 'Correction d\'erreurs',
      icon: 'checkmark-outline',
      positionKey: 'error_correction_position_'
    },
    { 
      key: 'chatbot',
      title: 'Chatbot',
      icon: 'chatbubbles-outline',
      positionKey: 'chatbot_position_'
    },
    { 
      key: 'phrases',
      title: 'Phrases & Expressions',
      icon: 'text-outline',
      positionKey: 'phrases_position_'
    },
    { 
      key: 'spelling',
      title: 'Orthographe',
      icon: 'create-outline',
      positionKey: 'spelling_correction_position_'
    }
  ];

  // Niveaux disponibles dans l'application
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

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
            
            // Récupérer aussi les métadonnées de progression
            let progress = 0;
            let metadata = {};

            // Différentes clés selon le type d'exercice
            if (exerciseType.key === 'vocabulary') {
              const completedKey = `vocabulary_completed_${level}`;
              const completedJson = await AsyncStorage.getItem(completedKey);
              if (completedJson) {
                const completed = JSON.parse(completedJson);
                metadata.category = position.categoryIndex;
                metadata.word = position.wordIndex;
                
                // Calculer la progression approximative
                const totalCategories = Object.keys(completed).length;
                const completedCategories = Object.values(completed)
                  .filter(arr => arr && arr.length > 0).length;
                progress = totalCategories > 0 ? (completedCategories / totalCategories) * 100 : 0;
              }
            } else if (exerciseType.key === 'grammar') {
              const completedKey = `grammar_completed_${level}`;
              const completedJson = await AsyncStorage.getItem(completedKey);
              if (completedJson) {
                const completed = JSON.parse(completedJson);
                metadata.rule = position.ruleIndex;
                metadata.exercise = position.exerciseIndex;
                
                // Calculer la progression approximative
                const totalRules = Object.keys(completed).length;
                const completedRules = Object.values(completed)
                  .filter(arr => arr && arr.length > 0).length;
                progress = totalRules > 0 ? (completedRules / totalRules) * 100 : 0;
              }
            }
            // Etc. pour chaque type d'exercice...

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
      return `Catégorie ${metadata.category + 1}, Mot ${metadata.word + 1}`;
    } else if (type === 'grammar' && metadata.rule !== undefined) {
      return `Règle ${metadata.rule + 1}, Exercice ${metadata.exercise + 1}`;
    } else if (type === 'reading' && metadata.exercise !== undefined) {
      return `Texte ${metadata.exercise + 1}, Question ${metadata.question + 1}`;
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