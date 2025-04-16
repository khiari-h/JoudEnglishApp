// src/components/screens/exercises/reading/hooks/useReadingExerciseState.js
import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de lecture
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {Array} initialExercises - Liste des exercices disponibles
 */
const useReadingExerciseState = (level, initialExercises = []) => {
  // États pour les exercices et la navigation
  const [allExercises, setAllExercises] = useState(initialExercises);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // États pour les réponses et le feedback
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // États pour l'interface utilisateur
  const [textExpanded, setTextExpanded] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(null);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Références pour le défilement
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);
  
  // Obtenir l'exercice courant
  const currentExercise = allExercises[selectedExerciseIndex];
  
  // Initialiser les états quand les exercices changent
  useEffect(() => {
    if (initialExercises && initialExercises.length > 0) {
      setAllExercises(initialExercises);
    }
  }, [initialExercises]);
  
  // Réinitialiser l'état quand l'exercice sélectionné change
  useEffect(() => {
    if (currentExercise) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTextExpanded(true);
      setAttempts(0);
      
      // Réinitialiser les animations
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      
      // Faire défiler vers le haut
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }, [selectedExerciseIndex, currentExercise]);
  
  // Réinitialiser les tentatives quand la question change
  useEffect(() => {
    setAttempts(0);
  }, [currentQuestionIndex]);
  
  // Faire défiler pour centrer l'exercice sélectionné
  useEffect(() => {
    if (textsScrollViewRef.current && allExercises.length > 0) {
      textsScrollViewRef.current.scrollTo({
        x: selectedExerciseIndex * 110, // Largeur approximative de chaque bouton
        animated: true,
      });
    }
  }, [selectedExerciseIndex, allExercises.length]);
  
  // Animation quand la question change
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    
    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    };
  }, [currentQuestionIndex, selectedExerciseIndex]);
  
  // Changer d'exercice sélectionné
  const handleExerciseChange = useCallback((index) => {
    if (index !== selectedExerciseIndex && index >= 0 && index < allExercises.length) {
      setSelectedExerciseIndex(index);
    }
  }, [selectedExerciseIndex, allExercises.length]);
  
  // Sélectionner une réponse
  const handleSelectAnswer = useCallback((answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  }, [showFeedback]);
  
  // Vérifier la réponse
  const checkAnswer = useCallback(() => {
    if (selectedAnswer === null || !currentExercise) return false;
    
    const currentQuestion = currentExercise.questions[currentQuestionIndex];
    const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;
    
    setAttempts(prev => prev + 1);
    setShowFeedback(true);
    setIsCorrect(isCorrectAnswer);
    
    return isCorrectAnswer;
  }, [currentExercise, currentQuestionIndex, selectedAnswer]);
  
  // Réessayer la question courante
  const retryQuestion = useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
  }, []);
  
  // Passer à la question suivante
  const goToNextQuestion = useCallback(() => {
    if (!currentExercise) return;
    
    setShowFeedback(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAttempts(0);
    }
  }, [currentExercise, currentQuestionIndex]);
  
  // Revenir à la question précédente
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAttempts(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [currentQuestionIndex]);
  
  // Basculer l'affichage du texte
  const toggleTextExpansion = useCallback(() => {
    setTextExpanded(prev => !prev);
    
    // Faire défiler vers le haut lors de l'expansion
    if (!textExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [textExpanded]);
  
  // Gérer les mots mis en évidence pour le vocabulaire
  const handleWordPress = useCallback((word) => {
    if (
      currentExercise &&
      currentExercise.vocabulary &&
      currentExercise.vocabulary[word]
    ) {
      setHighlightedWord({
        word,
        definition: currentExercise.vocabulary[word],
      });
    }
  }, [currentExercise]);
  
  // Fermer la popup de vocabulaire
  const closeVocabularyPopup = useCallback(() => {
    setHighlightedWord(null);
  }, []);
  
  // Obtenir la question courante
  const getCurrentQuestion = useMemo(() => {
    if (!currentExercise || !currentExercise.questions || currentExercise.questions.length === 0) {
      return null;
    }
    return currentExercise.questions[currentQuestionIndex];
  }, [currentExercise, currentQuestionIndex]);
  
  return {
    // États
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    isCorrect,
    attempts,
    textExpanded,
    highlightedWord,
    fadeAnim,
    slideAnim,
    scrollViewRef,
    textsScrollViewRef,
    
    // Méthodes
    handleExerciseChange,
    handleSelectAnswer,
    checkAnswer,
    retryQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    getCurrentQuestion,
    
    // Setter pour les tests et débogage
    setAllExercises,
  };
};

export default useReadingExerciseState;