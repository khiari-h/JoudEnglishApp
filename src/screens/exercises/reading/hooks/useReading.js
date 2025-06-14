// hooks/useReading.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Reading Exercise
 * Remplace useReadingExerciseState + useReadingProgress + useReadingDisplay
 * Simple, efficace, maintenable
 */
const useReading = (exercises = [], level = "A1") => {
  
  // =================== CORE STATE ===================
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [textExpanded, setTextExpanded] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS & ANIMATIONS ===================
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // =================== COMPUTED VALUES ===================
  const currentExercise = exercises[selectedExerciseIndex] || { title: "", text: "", questions: [] };
  const currentQuestion = currentExercise.questions?.[currentQuestionIndex] || null;
  const totalExercises = exercises.length;
  const totalQuestions = currentExercise.questions?.length || 0;
  
  // =================== PERSISTENCE ===================
  const STORAGE_KEY = `reading_${level}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedQuestions: saved_completed, lastPosition } = JSON.parse(saved);
          setCompletedQuestions(saved_completed || {});
          if (lastPosition) {
            setSelectedExerciseIndex(lastPosition.exerciseIndex || 0);
            setCurrentQuestionIndex(lastPosition.questionIndex || 0);
          }
        }
      } catch (error) {
        console.log('Error loading reading data:', error);
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
        completedQuestions,
        lastPosition: {
          exerciseIndex: selectedExerciseIndex,
          questionIndex: currentQuestionIndex
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving reading data:', error);
    }
  }, [completedQuestions, selectedExerciseIndex, currentQuestionIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // =================== NAVIGATION ACTIONS ===================
  const changeExercise = useCallback((exerciseIndex) => {
    setSelectedExerciseIndex(exerciseIndex);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAttempts(0);
    setTextExpanded(true);
  }, []);

  const changeQuestion = useCallback((questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAttempts(0);
  }, []);

  const selectAnswer = useCallback((answerIndex) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  }, [showFeedback]);

  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    setAttempts(prev => prev + 1);
    setShowFeedback(true);

    // Mark question as completed if correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCompletedQuestions(prev => {
        const exerciseCompleted = prev[selectedExerciseIndex] || [];
        if (!exerciseCompleted.includes(currentQuestionIndex)) {
          return {
            ...prev,
            [selectedExerciseIndex]: [...exerciseCompleted, currentQuestionIndex]
          };
        }
        return prev;
      });
    }
  }, [selectedAnswer, currentQuestion, selectedExerciseIndex, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isLastExercise = selectedExerciseIndex === totalExercises - 1;

    setShowFeedback(false);
    
    if (isLastQuestion && isLastExercise) {
      Alert.alert(
        "🎉 Félicitations !",
        "Vous avez terminé tous les exercices de lecture !",
        [{ text: "Super !", style: "default" }]
      );
    } else if (isLastQuestion) {
      // Next exercise
      changeExercise(selectedExerciseIndex + 1);
    } else {
      // Next question
      changeQuestion(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, totalQuestions, selectedExerciseIndex, totalExercises, changeExercise, changeQuestion]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      changeQuestion(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, changeQuestion]);

  const retryQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, []);

  const toggleTextExpansion = useCallback(() => {
    setTextExpanded(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPUTED PROGRESS ===================
  const getProgress = useCallback(() => {
    const completedInCurrentExercise = completedQuestions[selectedExerciseIndex]?.length || 0;
    const progressPercent = totalQuestions > 0 ? (completedInCurrentExercise / totalQuestions) * 100 : 0;
    
    const totalQuestionsAllExercises = exercises.reduce((sum, ex) => sum + (ex.questions?.length || 0), 0);
    const totalCompletedQuestions = Object.values(completedQuestions).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const overallProgress = totalQuestionsAllExercises > 0 ? (totalCompletedQuestions / totalQuestionsAllExercises) * 100 : 0;

    return {
      currentExercise: progressPercent,
      overall: overallProgress,
      completedInCurrent: completedInCurrentExercise,
      totalInCurrent: totalQuestions,
      completedOverall: totalCompletedQuestions,
      totalOverall: totalQuestionsAllExercises
    };
  }, [completedQuestions, selectedExerciseIndex, totalQuestions, exercises]);

  // =================== VALIDATION ===================
  const isCorrect = currentQuestion && selectedAnswer !== null 
    ? selectedAnswer === currentQuestion.correctAnswer 
    : false;
  
  const isQuestionCompleted = completedQuestions[selectedExerciseIndex]?.includes(currentQuestionIndex) || false;

  return {
    // State
    selectedExerciseIndex,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    textExpanded,
    attempts,
    completedQuestions,
    loaded,
    showDetailedProgress,
    
    // Data
    currentExercise,
    currentQuestion,
    totalExercises,
    totalQuestions,
    
    // Actions
    changeExercise,
    changeQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    retryQuestion,
    toggleTextExpansion,
    toggleDetailedProgress,
    
    // Computed
    isCorrect,
    isQuestionCompleted,
    progress: getProgress(),
    
    // Refs
    scrollViewRef,
    textsScrollViewRef,
    fadeAnim,
    slideAnim,
  };
};

export default useReading;