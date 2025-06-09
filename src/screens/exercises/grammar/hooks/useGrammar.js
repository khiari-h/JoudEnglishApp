// hooks/useGrammar.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Grammar Exercise
 * Remplace useGrammarExerciseState + useGrammarProgress + useGrammarDisplay
 * Simple, efficace, maintenable
 */
const useGrammar = (grammarData = [], level = "A1") => {
  
  // =================== CORE STATE ===================
  const [ruleIndex, setRuleIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completedExercises, setCompletedExercises] = useState({});
  const [loaded, setLoaded] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const currentRule = grammarData[ruleIndex] || { title: "", explanation: "", examples: [], exercises: [] };
  const currentExercise = currentRule.exercises?.[exerciseIndex] || null;
  const totalRules = grammarData.length;
  const totalExercises = currentRule.exercises?.length || 0;
  
  // =================== PERSISTENCE ===================
  const STORAGE_KEY = `grammar_${level}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedExercises: savedCompleted, lastPosition } = JSON.parse(saved);
          setCompletedExercises(savedCompleted || {});
          if (lastPosition) {
            setRuleIndex(lastPosition.ruleIndex || 0);
            setExerciseIndex(lastPosition.exerciseIndex || 0);
          }
        }
      } catch (error) {
        console.log('Error loading grammar data:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedExercises,
        lastPosition: {
          ruleIndex,
          exerciseIndex
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving grammar data:', error);
    }
  }, [completedExercises, ruleIndex, exerciseIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // =================== ANSWER CHECKING ===================
  const checkAnswer = useCallback((userAnswer, correctAnswer) => {
    // Clean answers
    let cleanUserAnswer = (userAnswer || "").toString().trim().toLowerCase();
    let cleanCorrectAnswer = (correctAnswer || "").toString().trim().toLowerCase();

    let correct = false;

    // Check for alternatives (separated by /)
    if (cleanCorrectAnswer.includes("/")) {
      const alternatives = cleanCorrectAnswer.split("/").map(alt => alt.trim().toLowerCase());
      correct = alternatives.some(alt => {
        // Exact match
        if (cleanUserAnswer === alt) return true;
        
        // Handle contractions
        if (alt.includes("'")) {
          const expandedAlt = alt
            .replace("'re", " are")
            .replace("'m", " am")
            .replace("'s", " is")
            .replace("n't", " not")
            .replace("'ve", " have")
            .replace("'ll", " will")
            .replace("'d", " would");
          if (cleanUserAnswer === expandedAlt) return true;
        }
        
        return false;
      });
    } else {
      // Basic comparison
      correct = cleanUserAnswer === cleanCorrectAnswer;
      
      // Try with contractions handling
      if (!correct && cleanCorrectAnswer.includes("'")) {
        const expandedCorrect = cleanCorrectAnswer
          .replace("'re", " are")
          .replace("'m", " am")
          .replace("'s", " is")
          .replace("n't", " not")
          .replace("'ve", " have")
          .replace("'ll", " will")
          .replace("'d", " would");
        correct = cleanUserAnswer === expandedCorrect;
      }
    }

    return correct;
  }, []);

  // =================== EXERCISE ACTIONS ===================
  const resetExerciseState = useCallback(() => {
    setSelectedOption(null);
    setInputText("");
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
  }, []);

  const changeRule = useCallback((newRuleIndex) => {
    setRuleIndex(newRuleIndex);
    setExerciseIndex(0);
    resetExerciseState();
  }, [resetExerciseState]);

  const submitAnswer = useCallback(() => {
    if (!currentExercise) return false;

    let userAnswer = "";
    let correctAnswer = "";

    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      userAnswer = selectedOption !== null ? currentExercise.options[selectedOption] : "";
      correctAnswer = typeof currentExercise.answer === "number"
        ? currentExercise.options[currentExercise.answer]
        : currentExercise.answer;
    } else {
      userAnswer = inputText.trim();
      correctAnswer = currentExercise.answer;
    }

    const correct = checkAnswer(userAnswer, correctAnswer);
    
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    setShowFeedback(true);

    // Mark as completed if correct
    if (correct) {
      setCompletedExercises(prev => {
        const ruleCompleted = prev[ruleIndex] || [];
        if (!ruleCompleted.includes(exerciseIndex)) {
          return {
            ...prev,
            [ruleIndex]: [...ruleCompleted, exerciseIndex]
          };
        }
        return prev;
      });
    }

    return correct;
  }, [currentExercise, selectedOption, inputText, ruleIndex, exerciseIndex, checkAnswer]);

  const nextExercise = useCallback(() => {
    const isLastExercise = exerciseIndex === totalExercises - 1;
    const isLastRule = ruleIndex === totalRules - 1;

    if (isLastExercise && isLastRule) {
      Alert.alert(
        "🎉 Félicitations !",
        "Vous avez terminé tous les exercices de grammaire !",
        [{ text: "Super !", style: "default" }]
      );
      return false;
    } else if (isLastExercise) {
      // Next rule
      changeRule(ruleIndex + 1);
    } else {
      // Next exercise
      setExerciseIndex(prev => prev + 1);
      resetExerciseState();
    }
    
    return true;
  }, [exerciseIndex, totalExercises, ruleIndex, totalRules, changeRule, resetExerciseState]);

  const previousExercise = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex(prev => prev - 1);
      resetExerciseState();
      return true;
    }
    return false;
  }, [exerciseIndex, resetExerciseState]);

  const retryExercise = useCallback(() => {
    resetExerciseState();
  }, [resetExerciseState]);

  // =================== COMPUTED PROGRESS ===================
  const getProgress = useCallback(() => {
    const completedInCurrentRule = completedExercises[ruleIndex]?.length || 0;
    const progressPercent = totalExercises > 0 ? (completedInCurrentRule / totalExercises) * 100 : 0;
    
    const totalExercisesAllRules = grammarData.reduce((sum, rule) => sum + (rule.exercises?.length || 0), 0);
    const totalCompletedExercises = Object.values(completedExercises).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const overallProgress = totalExercisesAllRules > 0 ? (totalCompletedExercises / totalExercisesAllRules) * 100 : 0;

    return {
      currentRule: progressPercent,
      overall: overallProgress,
      completedInCurrent: completedInCurrentRule,
      totalInCurrent: totalExercises,
      completedOverall: totalCompletedExercises,
      totalOverall: totalExercisesAllRules
    };
  }, [completedExercises, ruleIndex, totalExercises, grammarData]);

  // =================== VALIDATION ===================
  const canCheckAnswer = useCallback(() => {
    if (!currentExercise) return false;
    
    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      return selectedOption !== null;
    } else {
      return inputText.trim() !== "";
    }
  }, [currentExercise, selectedOption, inputText]);

  const isFirstExercise = exerciseIndex === 0;
  const isLastExercise = exerciseIndex === totalExercises - 1;
  const isExerciseCompleted = completedExercises[ruleIndex]?.includes(exerciseIndex) || false;

  return {
    // State
    ruleIndex,
    exerciseIndex,
    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,
    showFeedback,
    isCorrect,
    attempts,
    completedExercises,
    loaded,
    
    // Data
    currentRule,
    currentExercise,
    totalRules,
    totalExercises,
    
    // Actions
    changeRule,
    submitAnswer,
    nextExercise,
    previousExercise,
    retryExercise,
    resetExerciseState,
    
    // Computed
    canCheckAnswer: canCheckAnswer(),
    isFirstExercise,
    isLastExercise,
    isExerciseCompleted,
    progress: getProgress(),
  };
};

export default useGrammar;