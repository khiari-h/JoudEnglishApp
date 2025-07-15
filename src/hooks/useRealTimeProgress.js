// src/hooks/useRealTimeProgress.js - CORRIGÉ - Juste les vraies données
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVocabularyData } from '../utils/vocabulary/vocabularyDataHelper';

const useRealTimeProgress = () => {
  const [levelProgress, setLevelProgress] = useState({});
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // =================== VOCABULAIRE - CORRECTION PRINCIPALE ===================
  
  const calculateVocabularyProgress = async (level) => {
    try {
      const storageKey = `vocabulary_${level}_classic`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedWords = data.completedWords || {};
      
      // ✅ FIX : Récupérer les VRAIES données comme useVocabulary.js
      const vocabularyData = getVocabularyData(level, 'classic');
      if (!vocabularyData?.exercises) return 0;
      
      // ✅ FIX : Calcul réel du total comme ligne 168 de useVocabulary.js
      const totalWords = vocabularyData.exercises.reduce((sum, cat) => 
        sum + (cat.words?.length || 0), 0
      );
      
      // Compter mots complétés
      let completedCount = 0;
      Object.values(completedWords).forEach(categoryWords => {
        if (Array.isArray(categoryWords)) {
          completedCount += categoryWords.length;
        }
      });
      
      // ✅ FIX : Calcul correct au lieu de constante bidon
      const percentage = totalWords > 0 ? (completedCount / totalWords) * 100 : 0;
      return Math.min(Math.round(percentage), 100);
      
    } catch (error) {
      return 0;
    }
  };

  // VOCABULARY FAST
  const calculateVocabularyFastProgress = async (level) => {
    try {
      const storageKey = `vocabulary_${level}_fast`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedWords = data.completedWords || {};
      
      // ✅ Même fix pour fast
      const vocabularyData = getVocabularyData(level, 'fast');
      if (!vocabularyData?.exercises) return 0;
      
      const totalWords = vocabularyData.exercises.reduce((sum, cat) => 
        sum + (cat.words?.length || 0), 0
      );
      
      let completedCount = 0;
      Object.values(completedWords).forEach(categoryWords => {
        if (Array.isArray(categoryWords)) {
          completedCount += categoryWords.length;
        }
      });
      
      const percentage = totalWords > 0 ? (completedCount / totalWords) * 100 : 0;
      return Math.min(Math.round(percentage), 100);
      
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
      
      let completedCount = 0;
      Object.values(completedExercises).forEach(exerciseIndices => {
        if (Array.isArray(exerciseIndices)) {
          completedCount += exerciseIndices.length;
        }
      });
      
      // Estimation réaliste (à ajuster selon vos vraies données)
      const EXERCISES_PER_LEVEL = 20;
      const percentage = (completedCount / EXERCISES_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      
      let completedCount = 0;
      Object.values(completedQuestions).forEach(questionIndices => {
        if (Array.isArray(questionIndices)) {
          completedCount += questionIndices.length;
        }
      });
      
      const QUESTIONS_PER_LEVEL = 15;
      const percentage = (completedCount / QUESTIONS_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
    } catch (error) {
      return 0;
    }
  };

  // SPELLING
  const calculateSpellingProgress = async (level) => {
    try {
      const storageKey = `spelling_${level}_correction`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (!savedData) return 0;
      
      const data = JSON.parse(savedData);
      const completedExercises = data.completedExercises || [];
      
      const EXERCISES_PER_LEVEL = 25;
      const percentage = (completedExercises.length / EXERCISES_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      
      let completedCount = 0;
      Object.values(completedPhrases).forEach(phraseIndices => {
        if (Array.isArray(phraseIndices)) {
          completedCount += phraseIndices.length;
        }
      });
      
      const PHRASES_PER_LEVEL = 30;
      const percentage = (completedCount / PHRASES_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      
      const completedCount = Object.values(completedScenarios).filter(scenario => 
        scenario && (scenario.completed || scenario.completedAt)
      ).length;
      
      const CONVERSATIONS_PER_LEVEL = 8;
      const percentage = (completedCount / CONVERSATIONS_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      
      let completedCount = 0;
      Object.values(completedExercises).forEach(exerciseIndices => {
        if (Array.isArray(exerciseIndices)) {
          completedCount += exerciseIndices.length;
        }
      });
      
      const EXERCISES_PER_LEVEL = 20;
      const percentage = (completedCount / EXERCISES_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      
      const completedCount = Object.values(data).filter(game => 
        game?.completed
      ).length;
      
      const GAMES_PER_LEVEL = 10;
      const percentage = (completedCount / GAMES_PER_LEVEL) * 100;
      return Math.min(Math.round(percentage), 100);
      
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
      return data.completedAt ? 100 : 0;
      
    } catch (error) {
      return 0;
    }
  };

  // =================== CALCUL GLOBAL ===================
  const calculateProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const newLevelProgress = {};
      const newExerciseProgress = {};

      const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
      
      for (const level of levels) {
        const exerciseCalculators = {
          vocabulary: calculateVocabularyProgress,
          vocabulary_fast: calculateVocabularyFastProgress,
          grammar: calculateGrammarProgress,
          reading: calculateReadingProgress,
          spelling: calculateSpellingProgress,
          phrases: calculatePhrasesProgress,
          conversations: calculateConversationsProgress,
          errorCorrection: calculateErrorCorrectionProgress,
          wordGames: calculateWordGamesProgress,
          assessment: calculateAssessmentProgress,
        };

        const availableExercises = level === 'bonus' 
          ? ['reading', 'vocabulary', 'phrases']
          : Object.keys(exerciseCalculators);

        let levelTotal = 0;
        let levelCompleted = 0;

        for (const exerciseType of availableExercises) {
          try {
            const calculator = exerciseCalculators[exerciseType];
            const progressForExercise = await calculator(level);

            if (!newExerciseProgress[exerciseType]) {
              newExerciseProgress[exerciseType] = {};
            }
            newExerciseProgress[exerciseType] = progressForExercise;

            levelTotal += 100;
            levelCompleted += progressForExercise;
            
          } catch (error) {
            console.warn(`Erreur calcul ${exerciseType} niveau ${level}:`, error);
          }
        }

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

  // =================== GETTERS ===================
  
  const getLevelProgress = useCallback((level) => {
    return levelProgress[level] || 0;
  }, [levelProgress]);

  const getExerciseProgress = useCallback((exerciseType, level) => {
    return exerciseProgress[exerciseType]?.[level] || 0;
  }, [exerciseProgress]);

  const hasProgress = useCallback((exerciseType, level) => {
    return getExerciseProgress(exerciseType, level) > 0;
  }, [getExerciseProgress]);

  const hasVocabularyStarted = useCallback((level) => {
    return hasProgress('vocabulary', level);
  }, [hasProgress]);

  const hasVocabularyFastStarted = useCallback((level) => {
    return hasProgress('vocabulary_fast', level);
  }, [hasProgress]);

  // =================== INIT ===================
  
  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  const refresh = useCallback(() => {
    calculateProgress();
  }, [calculateProgress]);

  return {
    levelProgress,
    exerciseProgress,
    isLoading,
    getLevelProgress,
    getExerciseProgress,
    hasProgress,
    hasVocabularyStarted,
    hasVocabularyFastStarted,
    refresh,
  };
};

export default useRealTimeProgress;