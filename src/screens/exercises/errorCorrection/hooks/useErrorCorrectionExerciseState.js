// src/screens/exercises/errorCorrection/hooks/useErrorCorrectionExerciseState.js
import { useState, useCallback, useEffect, useMemo } from 'react';

const useErrorCorrectionExerciseState = (level, initialData = []) => {
  // États principaux de l'exercice
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [correctionMode, setCorrectionMode] = useState('full'); // 'full', 'identify', 'multiple_choice'
  
  // États liés à la résolution de l'exercice
  const [userCorrection, setUserCorrection] = useState('');
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Initialisation et filtrage des exercices
  useEffect(() => {
    if (initialData && initialData.categories && initialData.categories.length > 0) {
      // Sélectionner la première catégorie par défaut
      setSelectedCategory(initialData.categories[0].id);
    }
  }, [initialData]);

  // Filtrer les exercices par catégorie
  useEffect(() => {
    if (initialData && selectedCategory) {
      const filteredExercises = initialData.exercises.filter(
        exercise => exercise.categoryId === selectedCategory
      );
      setExercises(filteredExercises);
      resetExerciseState(filteredExercises.length);
    }
  }, [initialData, selectedCategory]);

  // Réinitialiser l'état de l'exercice
  const resetExerciseState = useCallback((exercisesCount) => {
    setCurrentExerciseIndex(0);
    setUserCorrection('');
    setSelectedErrorIndices([]);
    setSelectedChoiceIndex(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setScore(0);
    setShowHint(false);
  }, []);

  // Changer de catégorie
  const changeCategory = useCallback((categoryId) => {
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId);
      resetExerciseState();
    }
  }, [selectedCategory, resetExerciseState]);

  // Commencer un exercice avec un mode spécifique
  const startExercise = useCallback((mode = 'full') => {
    if (exercises.length === 0) return;

    setCorrectionMode(mode);
    resetExerciseState(exercises.length);

    // Mode spécifique initialisations
    switch(mode) {
      case 'full':
        setUserCorrection(exercises[0].text);
        break;
      case 'identify':
        setSelectedErrorIndices([]);
        break;
      case 'multiple_choice':
        setSelectedChoiceIndex(null);
        break;
    }
  }, [exercises, resetExerciseState]);

  // Vérifier la réponse de l'utilisateur
  const checkAnswer = useCallback(() => {
    if (showFeedback) return;

    const currentExercise = exercises[currentExerciseIndex];
    let answerCorrect = false;

    switch(correctionMode) {
      case 'full':
        answerCorrect = userCorrection.trim() === currentExercise.correctedText.trim();
        break;
      case 'identify':
        const errorPositions = currentExercise.errorPositions || [];
        answerCorrect = selectedErrorIndices.length === errorPositions.length &&
          selectedErrorIndices.every(index => errorPositions.includes(index));
        break;
      case 'multiple_choice':
        answerCorrect = selectedChoiceIndex === currentExercise.correctChoiceIndex;
        break;
    }

    setIsCorrect(answerCorrect);
    setShowFeedback(true);

    if (answerCorrect) {
      setScore(prev => prev + 1);
    }

    return answerCorrect;
  }, [
    showFeedback, 
    exercises, 
    currentExerciseIndex, 
    correctionMode, 
    userCorrection, 
    selectedErrorIndices, 
    selectedChoiceIndex
  ]);

  // Aller à l'exercice suivant
  const goToNextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setShowFeedback(false);
      setIsCorrect(false);

      // Réinitialiser pour le prochain exercice
      switch(correctionMode) {
        case 'full':
          setUserCorrection(exercises[currentExerciseIndex + 1].text);
          break;
        case 'identify':
          setSelectedErrorIndices([]);
          break;
        case 'multiple_choice':
          setSelectedChoiceIndex(null);
          break;
      }
    } else {
      // Fin des exercices
      setShowResults(true);
    }
  }, [currentExerciseIndex, exercises, correctionMode]);

  // Gestionnaires spécifiques
  const handleWordPress = useCallback((index) => {
    if (showFeedback || correctionMode !== 'identify') return;

    setSelectedErrorIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }, [showFeedback, correctionMode]);

  const handleChoiceSelect = useCallback((index) => {
    if (showFeedback) return;
    setSelectedChoiceIndex(index);
  }, [showFeedback]);

  // Calculer la progression
  const completionProgress = useMemo(() => {
    return exercises.length > 0 
      ? ((currentExerciseIndex + 1) / exercises.length) * 100 
      : 0;
  }, [currentExerciseIndex, exercises]);

  return {
    // États
    selectedCategory,
    currentExerciseIndex,
    exercises,
    correctionMode,
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    showFeedback,
    isCorrect,
    showResults,
    score,
    showHint,
    completionProgress,

    // Méthodes
    setUserCorrection,
    setSelectedCategory,
    changeCategory,
    startExercise,
    checkAnswer,
    goToNextExercise,
    handleWordPress,
    handleChoiceSelect,
    resetExerciseState,
    setShowHint,
    setShowResults,
  };
};

export default useErrorCorrectionExerciseState;