// hooks/useReading.js - BOUCLES INFINIES CORRIGÉES ET CATCH BLOCKS CORRIGÉS

import { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useReading = (exercises = [], level = "A1") => {

  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [textExpanded, setTextExpanded] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // =================== REFS & ANIMATIONS ===================
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const currentExercise = exercises[selectedExerciseIndex] || { title: "", text: "", questions: [] };
  const currentQuestion = currentExercise.questions?.[currentQuestionIndex] || null;
  const totalExercises = exercises.length;
  const totalQuestions = currentExercise.questions?.length || 0;

  // =================== ASYNC STORAGE ===================
  const STORAGE_KEY = `reading_progress_${level}`;

  const loadProgress = useCallback(async () => {
    try {
      const storedProgress = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProgress) {
        setCompletedQuestions(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la progression de lecture:', error);
    } finally {
      setLoaded(true);
    }
  }, [STORAGE_KEY]);

  const saveProgress = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completedQuestions));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression de lecture:', error);
    }
  }, [completedQuestions, STORAGE_KEY]);

  // =================== EFFECTS ===================
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // ✅ AJOUTÉ : Reset quand niveau change
  useEffect(() => {
    console.log(`🔄 DEBUG useReading - Level changed to: ${level}`);
    console.log(`   - Resetting completedQuestions and positions for new level`);
    
    // Reset de l'état au changement de niveau
    setCompletedQuestions({});
    setSelectedExerciseIndex(0);
    setCurrentQuestionIndex(0);
    setLoaded(false);
    isInitialized.current = false;
  }, [level]);

  useEffect(() => {
    if (loaded) {
      saveProgress();
    }
  }, [completedQuestions, loaded, saveProgress]);

  // Réinitialiser le feedback et la réponse sélectionnée quand l'exercice ou la question change
  useEffect(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setAttempts(0); // Réinitialiser les tentatives pour la nouvelle question
    setTextExpanded(true); // Toujours démarrer avec le texte développé pour une nouvelle question

    if (currentQuestionIndex === 0 && selectedExerciseIndex === 0 && !isInitialized.current) {
      // Ne pas scroller au premier chargement initial
      isInitialized.current = true;
    } else {
      // Scroller vers le haut si on n'est pas au chargement initial
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      textsScrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [currentQuestionIndex, selectedExerciseIndex]);


  // =================== ACTIONS ===================

  const changeExercise = useCallback((index) => {
    if (index >= 0 && index < totalExercises) {
      setSelectedExerciseIndex(index);
      setCurrentQuestionIndex(0); // Toujours revenir à la première question
      
      // ✅ AJOUTÉ : Sauvegarder la position après changement d'exercice
      const dataToSave = {
        completedQuestions,
        lastPosition: {
          selectedExerciseIndex: index,
          currentQuestionIndex: 0
        }
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => console.warn('Erreur sauvegarde reading changeExercise:', error));
    }
  }, [totalExercises, completedQuestions, STORAGE_KEY]);

  const changeQuestion = useCallback((index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
      
      // ✅ AJOUTÉ : Sauvegarder la position après changement de question
      const dataToSave = {
        completedQuestions,
        lastPosition: {
          selectedExerciseIndex,
          currentQuestionIndex: index
        }
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => console.warn('Erreur sauvegarde reading changeQuestion:', error));
    }
  }, [totalQuestions, completedQuestions, selectedExerciseIndex, STORAGE_KEY]);

  const selectAnswer = useCallback((answer) => {
    if (!showFeedback) {
      setSelectedAnswer(answer);
    }
  }, [showFeedback]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || selectedAnswer === null) {
      Alert.alert("Sélection requise", "Veuillez sélectionner une réponse.");
      return;
    }

    const isCurrentAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(isCurrentAnswerCorrect);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (isCurrentAnswerCorrect) {
      setCompletedQuestions(prev => {
        const newCompleted = { ...prev };
        if (!newCompleted[selectedExerciseIndex]) {
          newCompleted[selectedExerciseIndex] = [];
        }
        if (!newCompleted[selectedExerciseIndex].includes(currentQuestionIndex)) {
          newCompleted[selectedExerciseIndex].push(currentQuestionIndex);
        }
        
        // ✅ AJOUTÉ : Sauvegarder immédiatement la progression
        const dataToSave = {
          completedQuestions: newCompleted,
          lastPosition: {
            selectedExerciseIndex,
            currentQuestionIndex
          }
        };
        
        // Sauvegarder en arrière-plan (non-bloquant)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
          .catch(error => console.warn('Erreur sauvegarde reading:', error));
        
        return newCompleted;
      });
    } else {
      // Optionnel: Réinitialiser selectedAnswer si incorrect pour permettre une nouvelle tentative
      // setSelectedAnswer(null);
    }
  }, [currentQuestion, selectedAnswer, selectedExerciseIndex, currentQuestionIndex, STORAGE_KEY]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      changeQuestion(currentQuestionIndex + 1);
      return;
    }
    
    // Si c'est la dernière question de l'exercice actuel, passer à l'exercice suivant
    if (selectedExerciseIndex < totalExercises - 1) {
      changeExercise(selectedExerciseIndex + 1);
      return;
    }
    
    // Optionnel: Gérer la fin de tous les exercices de lecture
    Alert.alert("Exercice terminé", "Vous avez terminé tous les exercices de lecture pour ce niveau !");
  }, [currentQuestionIndex, totalQuestions, changeQuestion, selectedExerciseIndex, totalExercises, changeExercise]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      changeQuestion(currentQuestionIndex - 1);
    } else if (selectedExerciseIndex > 0) {
      // Si c'est la première question de l'exercice actuel, passer à la dernière question de l'exercice précédent
      const prevExercise = exercises[selectedExerciseIndex - 1];
      if (prevExercise) {
        setSelectedExerciseIndex(selectedExerciseIndex - 1);
        setCurrentQuestionIndex(prevExercise.questions.length - 1);
      }
    }
  }, [currentQuestionIndex, changeQuestion, selectedExerciseIndex, exercises]);


  const retryQuestion = useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setAttempts(0);
  }, []);

  const toggleTextExpansion = useCallback(() => {
    setTextExpanded(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== PROGRESSION ===================
  const getProgress = useCallback(() => {
    const totalCompletedQuestions = Object.values(completedQuestions).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const totalQuestionsAllExercises = exercises.reduce((sum, ex) => sum + (ex.questions?.length || 0), 0);

    const completedInCurrentExercise = completedQuestions[selectedExerciseIndex]?.length || 0;
    const progressPercent = totalQuestions > 0 ? (completedInCurrentExercise / totalQuestions) * 100 : 0;

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
  // ✅ CORRECTION: Suppression de la variable isAnswerCorrectComputed car elle n'était pas utilisée.

  const isQuestionCompleted = completedQuestions[selectedExerciseIndex]?.includes(currentQuestionIndex) || false;

  return {
    selectedExerciseIndex,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    textExpanded,
    attempts,
    completedQuestions,
    loaded,
    showDetailedProgress,
    currentExercise,
    currentQuestion,
    totalExercises,
    totalQuestions,
    changeExercise,
    changeQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    retryQuestion,
    toggleTextExpansion,
    toggleDetailedProgress,
    isCorrect,
    isQuestionCompleted,
    progress: getProgress(),
    scrollViewRef,
    textsScrollViewRef,
    fadeAnim,
    slideAnim,
  };
};

export default useReading;