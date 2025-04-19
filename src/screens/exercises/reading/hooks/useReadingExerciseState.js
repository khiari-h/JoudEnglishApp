// src/screens/exercises/reading/hooks/useReadingExerciseState.js
import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de lecture
 * 
 * @param {Array} exercises - Liste des exercices disponibles
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 */
const useReadingExerciseState = (exercises = [], level) => {
  // États pour gérer l'exercice
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [textExpanded, setTextExpanded] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [progress, setProgress] = useState(0);

  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Références pour le défilement
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);

  // Obtenir l'exercice actuel
  const currentExercise = allExercises[selectedExerciseIndex];

  // Initialiser avec les données appropriées
  useEffect(() => {
    if (exercises && exercises.length > 0) {
      setAllExercises(exercises);

      // Initialiser les questions complétées pour tous les exercices
      const initialCompletedQuestions = {};

      exercises.forEach((_, index) => {
        initialCompletedQuestions[index] = [];
      });

      // Initialiser uniquement si pas déjà défini
      if (Object.keys(completedQuestions).length === 0) {
        setCompletedQuestions(initialCompletedQuestions);
      }
    }
  }, [exercises]);

  // Réinitialiser l'état des questions lors du changement d'exercice
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

      // Défiler vers le haut
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }, [selectedExerciseIndex]);

  // Réinitialiser les tentatives lors du changement de question
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
  }, [selectedExerciseIndex]);

  // Animation lors du changement de question
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

  // Mettre à jour la progression lorsque les questions complétées changent
  useEffect(() => {
    if (currentExercise) {
      const newProgress = calculateProgress();
      setProgress(newProgress);
    }
  }, [completedQuestions, selectedExerciseIndex]);

  // Gérer le changement de texte
  const handleTextChange = (index) => {
    if (index !== selectedExerciseIndex) {
      setSelectedExerciseIndex(index);
    }
  };

  // Vérifier si la question actuelle est complétée
  const isCurrentQuestionCompleted = () => {
    return completedQuestions[selectedExerciseIndex]?.includes(
      currentQuestionIndex
    );
  };

  // Calculer la progression pour l'exercice actuel
  const calculateProgress = () => {
    if (!currentExercise) return 0;
    
    const completed = completedQuestions[selectedExerciseIndex]?.length || 0;
    const total = currentExercise.questions.length || 0;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  // Gérer la sélection d'une réponse
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  // Gérer la soumission de la réponse
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentExercise) return;

    // Incrémenter le compteur de tentatives
    setAttempts(attempts + 1);

    // Afficher le feedback
    setShowFeedback(true);
  };

  // Réessayer la question actuelle
  const retryExercise = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  // Gérer la navigation vers la question suivante
  const handleNextQuestion = () => {
    if (!currentExercise) return;

    // Marquer la question actuelle comme complétée si ce n'est pas déjà le cas
    if (!isCurrentQuestionCompleted()) {
      const updatedCompletedQuestions = { ...completedQuestions };
      if (!updatedCompletedQuestions[selectedExerciseIndex]) {
        updatedCompletedQuestions[selectedExerciseIndex] = [];
      }
      updatedCompletedQuestions[selectedExerciseIndex].push(
        currentQuestionIndex
      );
      setCompletedQuestions(updatedCompletedQuestions);
    }

    setShowFeedback(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Passer à la question suivante s'il y en a une
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
    } else {
      // Toutes les questions de cet exercice sont terminées
      const allCompleted = allExercises.every((exercise, index) => {
        return (
          (completedQuestions[index]?.length || 0) === exercise.questions.length
        );
      });

      if (allCompleted) {
        // Tous les exercices sont terminés
        alert("All reading exercises completed!");
        // Possibilité de naviguer en arrière ou de réinitialiser
      } else {
        // Suggérer de passer à l'exercice suivant
        let nextExerciseIndex =
          (selectedExerciseIndex + 1) % allExercises.length;

        // Trouver le prochain exercice non complété
        while (
          completedQuestions[nextExerciseIndex]?.length ===
            allExercises[nextExerciseIndex].questions.length &&
          nextExerciseIndex !== selectedExerciseIndex
        ) {
          nextExerciseIndex = (nextExerciseIndex + 1) % allExercises.length;
        }

        if (nextExerciseIndex === selectedExerciseIndex) {
          // Si on revient à l'exercice actuel, tout est terminé
          alert("All reading exercises completed!");
        } else {
          // Demander à l'utilisateur s'il veut passer à l'exercice suivant
          if (
            confirm(
              `You've completed this text! Move to ${allExercises[nextExerciseIndex].title}?`
            )
          ) {
            setSelectedExerciseIndex(nextExerciseIndex);
          } else {
            // Réinitialiser la progression pour cet exercice
            const updatedCompletedQuestions = { ...completedQuestions };
            updatedCompletedQuestions[selectedExerciseIndex] = [];
            setCompletedQuestions(updatedCompletedQuestions);

            // Réinitialiser à la première question
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setAttempts(0);
          }
        }
      }
    }
  };

  // Gérer la navigation vers la question précédente
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAttempts(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  };

  // Basculer l'expansion du texte
  const toggleTextExpansion = () => {
    setTextExpanded(!textExpanded);

    // Défiler vers le haut lors de l'expansion
    if (!textExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  // Gérer la pression sur un mot pour l'aide au vocabulaire
  const handleWordPress = (word) => {
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
  };

  // Fermer la popup de vocabulaire
  const closeVocabularyPopup = () => {
    setHighlightedWord(null);
  };

  return {
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    completedQuestions,
    showFeedback,
    textExpanded,
    highlightedWord,
    attempts,
    progress,
    fadeAnim,
    slideAnim,
    scrollViewRef,
    textsScrollViewRef,
    isCurrentQuestionCompleted,
    handleTextChange,
    handleSelectAnswer,
    handleSubmitAnswer,
    retryExercise,
    handleNextQuestion,
    handlePreviousQuestion,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    calculateProgress,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    setShowFeedback,
    setAttempts
  };
}

export default useReadingExerciseState;