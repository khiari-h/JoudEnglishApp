// hooks/useGrammar.js - VERSION FINALE SANS BOUCLE INFINIE
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Grammar Exercise - VERSION FINALE CORRIGÉE
 * ✅ Suppression complète des boucles infinies
 * ✅ Sauvegarde simplifiée et optimisée
 * ✅ Performance maximale
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
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS ===================
  const saveDataTimeoutRef = useRef(null);
  const STORAGE_KEY = `grammar_${level}`;

  // =================== COMPUTED VALUES MEMOIZED ===================
  const currentRule = useMemo(() => {
    return grammarData[ruleIndex] || { title: "", explanation: "", examples: [], exercises: [] };
  }, [grammarData, ruleIndex]);

  const currentExercise = useMemo(() => {
    return currentRule.exercises?.[exerciseIndex] || null;
  }, [currentRule.exercises, exerciseIndex]);

  const totalRules = useMemo(() => grammarData.length, [grammarData.length]);
  const totalExercises = useMemo(() => currentRule.exercises?.length || 0, [currentRule.exercises?.length]);
  
  // =================== PERSISTENCE SIMPLIFIÉE ===================
  
  // Load data from storage (une seule fois)
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
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [STORAGE_KEY]); // ✅ CORRIGÉ : Seulement STORAGE_KEY

  // ✅ CORRECTION MAJEURE : Sauvegarde simplifiée sans boucle
  const saveDataToStorage = useCallback(async (dataToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
    }
  }, [STORAGE_KEY]);

  // ✅ CORRECTION : useEffect séparé pour sauvegarde avec debounce approprié
  useEffect(() => {
    if (!loaded) return; // Ne pas sauvegarder avant le chargement
    
    // Clear previous timeout
    if (saveDataTimeoutRef.current) {
      clearTimeout(saveDataTimeoutRef.current);
    }
    
    // Set new timeout for debounced save
    saveDataTimeoutRef.current = setTimeout(() => {
      const dataToSave = {
        completedExercises,
        lastPosition: {
          ruleIndex,
          exerciseIndex
        }
      };
      saveDataToStorage(dataToSave);
    }, 500); // Augmenté à 500ms pour plus de stabilité

    // Cleanup timeout
    return () => {
      if (saveDataTimeoutRef.current) {
        clearTimeout(saveDataTimeoutRef.current);
      }
    };
  }, [completedExercises, ruleIndex, exerciseIndex, loaded, saveDataToStorage]);

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

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPUTED PROGRESS MEMOIZED ===================
  const progress = useMemo(() => {
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

  // =================== VALIDATION MEMOIZED ===================
  const canCheckAnswer = useMemo(() => {
    if (!currentExercise) return false;
    
    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      return selectedOption !== null;
    } else {
      return inputText.trim() !== "";
    }
  }, [currentExercise, selectedOption, inputText]);

  const isFirstExercise = exerciseIndex === 0;
  const isLastExercise = exerciseIndex === totalExercises - 1;
  const isExerciseCompleted = useMemo(() => {
    return completedExercises[ruleIndex]?.includes(exerciseIndex) || false;
  }, [completedExercises, ruleIndex, exerciseIndex]);

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
    showDetailedProgress,
    
    // Data (memoized)
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
    toggleDetailedProgress,
    
    // Computed (memoized)
    canCheckAnswer,
    isFirstExercise,
    isLastExercise,
    isExerciseCompleted,
    progress,
  };
};

export default useGrammar;