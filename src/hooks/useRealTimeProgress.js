// src/hooks/useRealTimeProgress.js - LECTURE VRAIES DONNÉES
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook pour récupérer la progression en temps réel
 * Compatible avec TOUS tes systèmes de stockage existants
 */
const useRealTimeProgress = () => {
  const [levelProgress, setLevelProgress] = useState({}); // % par niveau
  const [exerciseProgress, setExerciseProgress] = useState({}); // % par exercice/niveau
  const [isLoading, setIsLoading] = useState(true);

  // =================== CALCULS PROGRESSION PAR EXERCICE ===================
  
  // VOCABULARY (classic seulement)
  const calculateVocabularyProgress = async (level) => {
    try {
      const storageKey = `vocabulary_${level}_classic`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedWords = data.completedWords || {};
      
      // Compter mots complétés (compatibilité ancien/nouveau format)
      let totalCompleted = 0;
      Object.values(completedWords).forEach(categoryWords => {
        if (Array.isArray(categoryWords)) {
          totalCompleted += categoryWords.length;
        }
      });
      
      // Estimation basée sur 50 mots par niveau (tu peux ajuster)
      const WORDS_PER_LEVEL = 50;
      const progression = Math.min((totalCompleted / WORDS_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // GRAMMAR
  const calculateGrammarProgress = async (level) => {
    try {
      const storageKey = `grammar_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedExercises = data.completedExercises || {};
      
      // Compter exercices complétés
      let totalCompleted = 0;
      Object.values(completedExercises).forEach(exerciseIndices => {
        if (Array.isArray(exerciseIndices)) {
          totalCompleted += exerciseIndices.length;
        }
      });
      
      // Estimation : 20 exercices par niveau
      const EXERCISES_PER_LEVEL = 20;
      const progression = Math.min((totalCompleted / EXERCISES_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // READING
  const calculateReadingProgress = async (level) => {
    try {
      const storageKey = `reading_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedQuestions = data.completedQuestions || {};
      
      // Compter questions complétées
      let totalCompleted = 0;
      Object.values(completedQuestions).forEach(questionIndices => {
        if (Array.isArray(questionIndices)) {
          totalCompleted += questionIndices.length;
        }
      });
      
      // Estimation : 15 questions par niveau
      const QUESTIONS_PER_LEVEL = 15;
      const progression = Math.min((totalCompleted / QUESTIONS_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // SPELLING
  const calculateSpellingProgress = async (level) => {
    try {
      const storageKey = `spelling_${level}_correction`; // Type par défaut
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedExercises = data.completedExercises || [];
      
      // Estimation : 25 exercices par niveau
      const EXERCISES_PER_LEVEL = 25;
      const progression = Math.min((completedExercises.length / EXERCISES_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // PHRASES
  const calculatePhrasesProgress = async (level) => {
    try {
      const storageKey = `phrases_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedPhrases = data.completedPhrases || {};
      
      // Compter phrases complétées
      let totalCompleted = 0;
      Object.values(completedPhrases).forEach(phraseIndices => {
        if (Array.isArray(phraseIndices)) {
          totalCompleted += phraseIndices.length;
        }
      });
      
      // Estimation : 30 phrases par niveau
      const PHRASES_PER_LEVEL = 30;
      const progression = Math.min((totalCompleted / PHRASES_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // CONVERSATIONS
  const calculateConversationsProgress = async (level) => {
    try {
      const storageKey = `conversation_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedScenarios = data.completedScenarios || {};
      
      // Compter scénarios complétés
      const completedCount = Object.values(completedScenarios).filter(scenario => 
        scenario && (scenario.completed || scenario.completedAt)
      ).length;
      
      // Estimation : 8 conversations par niveau
      const CONVERSATIONS_PER_LEVEL = 8;
      const progression = Math.min((completedCount / CONVERSATIONS_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // ERROR CORRECTION
  const calculateErrorCorrectionProgress = async (level) => {
    try {
      const storageKey = `error_correction_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedExercises = data.completedExercises || {};
      
      // Compter exercices complétés
      let totalCompleted = 0;
      Object.values(completedExercises).forEach(exerciseIndices => {
        if (Array.isArray(exerciseIndices)) {
          totalCompleted += exerciseIndices.length;
        }
      });
      
      // Estimation : 20 exercices par niveau
      const EXERCISES_PER_LEVEL = 20;
      const progression = Math.min((totalCompleted / EXERCISES_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // WORD GAMES
  const calculateWordGamesProgress = async (level) => {
    try {
      const storageKey = `word_games_completed_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      
      // Compter jeux complétés
      const completedCount = Object.values(data).filter(game => 
        game && game.completed
      ).length;
      
      // Estimation : 10 jeux par niveau
      const GAMES_PER_LEVEL = 10;
      const progression = Math.min((completedCount / GAMES_PER_LEVEL) * 100, 100);
      
      return Math.round(progression);
    } catch (error) {
      return 0;
    }
  };

  // ASSESSMENT
  const calculateAssessmentProgress = async (level) => {
    try {
      const storageKey = `assessment_results_${level}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      
      // Si l'évaluation est complétée, retourner 100%
      if (data.completedAt) {
        return 100;
      }
      
      return 0;
    } catch (error) {
      return 0;
    }
  };

  // =================== CALCUL PROGRESSION GLOBALE ===================
  const calculateProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const newLevelProgress = {};
      const newExerciseProgress = {};

      // Pour chaque niveau (1-6 + bonus)
      const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
      
      for (const level of levels) {
        let levelTotal = 0;
        let levelCompleted = 0;
        
        // Mapping des exercices et leurs fonctions de calcul
        const exerciseCalculators = {
          vocabulary: calculateVocabularyProgress,
          grammar: calculateGrammarProgress,
          reading: calculateReadingProgress,
          spelling: calculateSpellingProgress,
          phrases: calculatePhrasesProgress,
          conversations: calculateConversationsProgress,
          errorCorrection: calculateErrorCorrectionProgress,
          wordGames: calculateWordGamesProgress,
          assessment: calculateAssessmentProgress,
        };

        // Exercices disponibles selon le niveau
        const availableExercises = level === 'bonus' 
          ? ['reading', 'vocabulary', 'phrases'] // Seulement pour bonus
          : Object.keys(exerciseCalculators); // Tous pour niveaux normaux

        for (const exerciseType of availableExercises) {
          try {
            const calculator = exerciseCalculators[exerciseType];
            const exerciseProgress = await calculator(level);

            // Stocker progression exercice
            if (!newExerciseProgress[exerciseType]) {
              newExerciseProgress[exerciseType] = {};
            }
            newExerciseProgress[exerciseType][level] = exerciseProgress;

            // Ajouter au total du niveau (chaque exercice = 100%)
            levelTotal += 100;
            levelCompleted += exerciseProgress;
            
          } catch (error) {
            console.warn(`Erreur calcul ${exerciseType} niveau ${level}:`, error);
          }
        }

        // Calculer pourcentage niveau
        newLevelProgress[level] = levelTotal > 0 
          ? Math.round((levelCompleted / levelTotal) * 100)
          : 0;
      }

      setLevelProgress(newLevelProgress);
      setExerciseProgress(newExerciseProgress);
      
    } catch (error) {
      console.error('Erreur calcul progression:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // =================== GETTERS FACILES ===================
  
  // Progression d'un niveau (pour LevelSelection)
  const getLevelProgress = useCallback((level) => {
    return levelProgress[level] || 0;
  }, [levelProgress]);

  // Progression d'un exercice à un niveau (pour ExerciseSelection)
  const getExerciseProgress = useCallback((exerciseType, level) => {
    return exerciseProgress[exerciseType]?.[level] || 0;
  }, [exerciseProgress]);

  // Vérifier si un exercice a de la progression
  const hasProgress = useCallback((exerciseType, level) => {
    return getExerciseProgress(exerciseType, level) > 0;
  }, [getExerciseProgress]);

  // Vérifier si vocabulary classique a été commencé (pour vocabulary_fast)
  const hasVocabularyStarted = useCallback((level) => {
    return hasProgress('vocabulary', level);
  }, [hasProgress]);

  // =================== CHARGEMENT ET REFRESH ===================
  
  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  // Refresh manuel
  const refresh = useCallback(() => {
    calculateProgress();
  }, [calculateProgress]);

  // =================== DEBUG INFO ===================
  const getDebugInfo = useCallback(() => {
    return {
      levelProgress,
      exerciseProgress,
      isLoading,
      timestamp: new Date().toISOString(),
    };
  }, [levelProgress, exerciseProgress, isLoading]);

  return {
    // Données
    levelProgress,
    exerciseProgress,
    isLoading,

    // Getters faciles
    getLevelProgress,
    getExerciseProgress,
    hasProgress,
    hasVocabularyStarted, // Spécial pour vocabulary_fast

    // Actions
    refresh,
    getDebugInfo,
  };
};

export default useRealTimeProgress;