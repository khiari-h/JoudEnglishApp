// src/screens/exercises/errorCorrection/hooks/useErrorCorrectionExerciseState.js
import { useState, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état des exercices de correction d'erreurs
 * Version nettoyée : suppression de completionProgress (comme Spelling)
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {Object} initialData - Données d'exercices (peut être null initialement)
 */
const useErrorCorrectionExerciseState = (level, initialData = []) => {
  // ========== ÉTATS PRINCIPAUX ==========
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [correctionMode, setCorrectionMode] = useState('full'); // 'full', 'identify', 'multiple_choice'

  // ========== ÉTATS DE RÉSOLUTION ==========
  const [userCorrection, setUserCorrection] = useState('');
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // ❌ SUPPRIMÉ : completionProgress (était basé sur position, pas completion)

  // ========== INITIALISATION ==========

  // Initialiser la première catégorie
  useEffect(() => {
    if (initialData?.categories && initialData.categories.length > 0) {
      const firstCategory = initialData.categories[0].id;
      setSelectedCategory(firstCategory);

    }
  }, [initialData]);

  // Filtrer les exercices par catégorie sélectionnée
  useEffect(() => {
    if (initialData && selectedCategory) {
      const filteredExercises = initialData.exercises?.filter(
        exercise => exercise.categoryId === selectedCategory
      ) || [];

      setExercises(filteredExercises);
      resetExerciseState();

    }
  }, [initialData, selectedCategory]);

  // ========== GESTION ÉTAT ==========

  // Réinitialiser l'état pour un nouvel exercice/session
  const resetExerciseState = useCallback(() => {
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

  // ========== NAVIGATION CATÉGORIES ==========

  // Changer de catégorie
  const changeCategory = useCallback((categoryId) => {
    if (categoryId !== selectedCategory) {

      setSelectedCategory(categoryId);
      // resetExerciseState sera appelé via useEffect
    }
  }, [selectedCategory]);

  // ========== MODES D'EXERCICE ==========

  // Commencer un exercice avec un mode spécifique
  const startExercise = useCallback((mode = 'full') => {
    if (exercises.length === 0) {

      return;
    }

    setCorrectionMode(mode);
    resetExerciseState();

    // Initialisation spécifique par mode
    const firstExercise = exercises[0];
    switch(mode) {
      case 'full':
        setUserCorrection(firstExercise.text || '');
        break;
      case 'identify':
        setSelectedErrorIndices([]);
        break;
      case 'multiple_choice':
        setSelectedChoiceIndex(null);
        break;
      default:

    }
  }, [exercises, resetExerciseState]);

  // ========== VÉRIFICATION RÉPONSES ==========

  // Vérifier la réponse selon le mode
  const checkAnswer = useCallback(() => {
    if (showFeedback || currentExerciseIndex >= exercises.length) {
      return false;
    }

    const currentExercise = exercises[currentExerciseIndex];
    if (!currentExercise) {

      return false;
    }

    let answerCorrect = false;

    switch(correctionMode) {
      case 'full':
        if (!userCorrection.trim()) {

          return false;
        }
        answerCorrect = userCorrection.trim().toLowerCase() === 
                       (currentExercise.correctedText || '').trim().toLowerCase();
        break;

      case 'identify':
        const errorPositions = currentExercise.errorPositions || [];
        answerCorrect = selectedErrorIndices.length === errorPositions.length &&
          selectedErrorIndices.every(index => errorPositions.includes(index));
        break;

      case 'multiple_choice':
        answerCorrect = selectedChoiceIndex === currentExercise.correctChoiceIndex;
        break;

      default:

        return false;
    }

    setIsCorrect(answerCorrect);
    setShowFeedback(true);

    if (answerCorrect) {
      setScore(prev => prev + 1);

    } else {

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

  // ========== NAVIGATION EXERCICES ==========

  // Aller à l'exercice suivant
  const goToNextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setShowFeedback(false);
      setIsCorrect(false);

      // Préparer le prochain exercice selon le mode
      const nextExercise = exercises[nextIndex];
      switch(correctionMode) {
        case 'full':
          setUserCorrection(nextExercise.text || '');
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

  // ========== GESTIONNAIRES SPÉCIFIQUES ==========

  // Gestion du clic sur un mot (mode identify)
  const handleWordPress = useCallback((wordIndex) => {
    if (showFeedback || correctionMode !== 'identify') {
      return;
    }

    setSelectedErrorIndices(prev => 
      prev.includes(wordIndex) 
        ? prev.filter(i => i !== wordIndex)
        : [...prev, wordIndex]
    );
  }, [showFeedback, correctionMode]);

  // Gestion du choix multiple
  const handleChoiceSelect = useCallback((choiceIndex) => {
    if (showFeedback) {
      return;
    }
    setSelectedChoiceIndex(choiceIndex);

  }, [showFeedback]);

  // ========== DONNÉES CALCULÉES ==========

  // Vérifier si les données sont valides
  const hasValidData = initialData?.categories && 
                      Array.isArray(initialData.categories) && 
                      initialData.categories.length > 0;

  // Catégorie actuelle
  const currentCategory = hasValidData 
    ? initialData.categories.find(cat => cat.id === selectedCategory)
    : null;

  // ========== RETOUR ==========
  return {
    // États principaux
    selectedCategory,
    currentExerciseIndex,
    exercises,
    correctionMode,

    // États de résolution
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    showFeedback,
    isCorrect,
    showResults,
    score,
    showHint,

    // ❌ SUPPRIMÉ : completionProgress

    // Méthodes de gestion
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

    // Données calculées
    hasValidData,
    currentCategory,
    totalExercises: exercises.length
  };
};

export default useErrorCorrectionExerciseState;
