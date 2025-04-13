import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état des exercices de grammaire
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {number} initialRuleIndex - Index initial de la règle
 * @param {number} initialExerciseIndex - Index initial de l'exercice
 */
const useGrammarExerciseState = (level, initialRuleIndex = 0, initialExerciseIndex = 0) => {
  // États pour la navigation et l'interaction
  const [ruleIndex, setRuleIndex] = useState(initialRuleIndex);
  const [exerciseIndex, setExerciseIndex] = useState(initialExerciseIndex);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // Flag pour suivre l'initialisation
  const isInitialized = useRef(false);
  
  // Initialiser l'état au premier rendu
  useEffect(() => {
    if (!isInitialized.current) {
      setRuleIndex(initialRuleIndex);
      setExerciseIndex(initialExerciseIndex);
      isInitialized.current = true;
    }
  }, [initialRuleIndex, initialExerciseIndex]);
  
  // Restaurer l'état à une position spécifique
  const restoreState = useCallback((newRuleIndex, newExerciseIndex) => {
    setRuleIndex(newRuleIndex);
    setExerciseIndex(newExerciseIndex);
    resetExerciseState();
  }, []);
  
  // Réinitialiser l'état de l'exercice courant
  const resetExerciseState = useCallback(() => {
    setSelectedOption(null);
    setInputText('');
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
  }, []);
  
  // Passer à l'exercice précédent
  const goToPreviousExercise = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex(prev => prev - 1);
      resetExerciseState();
      return true;
    }
    return false;
  }, [exerciseIndex, resetExerciseState]);
  
  // Passer à l'exercice suivant
  const goToNextExercise = useCallback(() => {
    setExerciseIndex(prev => prev + 1);
    resetExerciseState();
    return true;
  }, [resetExerciseState]);
  
  // Changer de règle grammaticale
  const changeRule = useCallback((newRuleIndex) => {
    setRuleIndex(newRuleIndex);
    setExerciseIndex(0);
    resetExerciseState();
  }, [resetExerciseState]);
  
  // Vérifier une réponse
  const checkAnswer = useCallback((answer, correctAnswer) => {
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    setShowFeedback(true);
    return correct;
  }, []);
  
  return {
    ruleIndex,
    exerciseIndex,
    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,
    showFeedback,
    setShowFeedback,
    isCorrect,
    attempts,
    resetExerciseState,
    restoreState,
    goToPreviousExercise,
    goToNextExercise,
    changeRule,
    checkAnswer
  };
};

export default useGrammarExerciseState;