// src/screens/exercises/grammar/hooks/useGrammar.js - VERSION CORRIGÉE

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ✅ AJOUTÉ : Import de useLastActivity
import useLastActivity from '../../../../hooks/useLastActivity';

/**
 * 🎯 Hook unifié pour Grammar Exercise - VERSION FINALE CORRIGÉE
 * ✅ Suppression complète des boucles infinies
 * ✅ Sauvegarde simplifiée et optimisée
 * ✅ Performance maximale
 * ✅ AJOUTÉ : Traçage de l'activité avec useLastActivity
 */
const useGrammar = (grammarData = [], level = "A1") => {
  
  // ✅ AJOUTÉ : Hook pour tracer l'activité
  const { saveActivity } = useLastActivity();
  
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Grammar storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEY ===================
  const STORAGE_KEY = `grammar_${level}`;

  // =================== STATE ===================
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

  const saveDataTimeoutRef = useRef(null);

  // =================== COMPUTED VALUES ===================
  const rules = grammarData || []; // ✅ CORRIGÉ : grammarData est directement le tableau des règles
  const currentRule = rules[ruleIndex];
  const currentExercises = currentRule?.exercises || [];
  const currentExercise = currentExercises[exerciseIndex];
  const totalRules = rules.length;
  // ✅ Variables inutiles supprimées

  // =================== COMPUTED VALUES MEMOIZED ===================
  const currentRuleMemo = useMemo(() => {
    return grammarData[ruleIndex] || { title: "", explanation: "", examples: [], exercises: [] };
  }, [grammarData, ruleIndex]);

  // ✅ Variable currentExerciseMemo supprimée car inutilisée

  const totalRulesMemo = useMemo(() => grammarData.length, [grammarData.length]);
  const totalExercisesMemo = useMemo(() => currentRuleMemo.exercises?.length || 0, [currentRuleMemo.exercises?.length]);
  
  // =================== DATA LOADING ===================
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
        // ✅ Gestion d'erreur appropriée
        handleStorageError(error, 'loadData');
        // Fallback: utiliser les valeurs par défaut
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [STORAGE_KEY]); // ✅ CORRIGÉ : Seulement STORAGE_KEY

  // ✅ AJOUTÉ : Reset quand niveau change
  useEffect(() => {
    console.log(`🔄 DEBUG useGrammar - Level changed to: ${level}`);
    console.log(`   - Resetting completedExercises and positions for new level`);
    
    // Reset de l'état au changement de niveau
    setCompletedExercises({});
    setRuleIndex(0);
    setExerciseIndex(0);
    setLoaded(false);
  }, [level]);

  // ✅ CORRECTION MAJEURE : Sauvegarde simplifiée sans boucle
  const saveDataToStorage = useCallback(async (dataToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveDataToStorage');
      // Fallback: continuer sans sauvegarde
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
      // Suppression du return null (aucun return attendu)
    };
  }, [completedExercises, ruleIndex, exerciseIndex, loaded, saveDataToStorage]);

  // =================== ANSWER CHECKING ===================
  const checkAnswer = useCallback((userAnswer, correctAnswer) => {
    // Clean answers
    const cleanUserAnswer = (userAnswer || "").toString().trim().toLowerCase();
    const cleanCorrectAnswer = (correctAnswer || "").toString().trim().toLowerCase();

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
    
    // ✅ CORRIGÉ : Logique de vérification complète comme avant
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
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    // Mark as completed if correct
    if (correct) {
      // ✅ AJOUTÉ : Tracer l'activité grammaire
      saveActivity({
        type: 'grammar',
        level: level,
        title: `Grammaire - ${currentRule?.title || 'Règle'}`
      });
      
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
  }, [currentExercise, selectedOption, inputText, ruleIndex, exerciseIndex, checkAnswer, currentRule, level, saveActivity]);

  const nextExercise = useCallback(() => {
    const isLastExercise = exerciseIndex === totalExercisesMemo - 1;
    const isLastRule = ruleIndex === totalRulesMemo - 1;

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
  }, [exerciseIndex, totalExercisesMemo, ruleIndex, totalRulesMemo, changeRule, resetExerciseState]);

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
    const progressPercent = totalExercisesMemo > 0 ? (completedInCurrentRule / totalExercisesMemo) * 100 : 0;
    
    const totalExercisesAllRules = grammarData.reduce((sum, rule) => sum + (rule.exercises?.length || 0), 0);
    const totalCompletedExercises = Object.values(completedExercises).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const overallProgress = totalExercisesAllRules > 0 ? (totalCompletedExercises / totalExercisesAllRules) * 100 : 0;

    return {
      currentRule: progressPercent,
      overall: overallProgress,
      completedInCurrent: completedInCurrentRule,
      totalInCurrent: totalExercisesMemo,
      completedOverall: totalCompletedExercises,
      totalOverall: totalExercisesAllRules
    };
  }, [completedExercises, ruleIndex, totalExercisesMemo, grammarData]);

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
  const isLastExercise = exerciseIndex === totalExercisesMemo - 1;
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
    totalExercises: totalExercisesMemo, // ✅ CORRIGÉ : totalExercises n'était pas défini
    
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