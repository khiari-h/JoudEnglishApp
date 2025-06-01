import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Hook personnalisé pour gérer l'état des exercices de grammaire
 * Version améliorée avec vérification flexible des réponses
 *
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {number} initialRuleIndex - Index initial de la règle
 * @param {number} initialExerciseIndex - Index initial de l'exercice
 */
const useGrammarExerciseState = (
  level,
  initialRuleIndex = 0,
  initialExerciseIndex = 0
) => {
  // États pour la navigation et l'interaction
  const [ruleIndex, setRuleIndex] = useState(initialRuleIndex);
  const [exerciseIndex, setExerciseIndex] = useState(initialExerciseIndex);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState("");
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

  // Réinitialiser l'état de l'exercice courant
  const resetExerciseState = useCallback(() => {
    // Important: ordre des opérations
    // D'abord réinitialiser les entrées utilisateur
    setSelectedOption(null);
    setInputText("");

    // Ensuite réinitialiser les états de feedback
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
  }, []);

  // Restaurer l'état à une position spécifique
  const restoreState = useCallback(
    (newRuleIndex, newExerciseIndex) => {
      setRuleIndex(newRuleIndex);
      setExerciseIndex(newExerciseIndex);
      resetExerciseState();
    },
    [resetExerciseState]
  );

  // Passer à l'exercice précédent
  const goToPreviousExercise = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex((prev) => prev - 1);
      resetExerciseState();
      return true;
    }
    return false;
  }, [exerciseIndex, resetExerciseState]);

  // Passer à l'exercice suivant
  const goToNextExercise = useCallback(
    (targetIndex) => {
      if (targetIndex !== undefined) {
        setExerciseIndex(targetIndex);
      } else {
        setExerciseIndex((prev) => prev + 1);
      }
      resetExerciseState();
      return true;
    },
    [resetExerciseState]
  );

  // Changer de règle grammaticale
  const changeRule = useCallback(
    (newRuleIndex) => {
      setRuleIndex(newRuleIndex);
      setExerciseIndex(0);
      resetExerciseState();
    },
    [resetExerciseState]
  );

  // Vérifier une réponse avec plus de flexibilité
  const checkAnswer = useCallback((answer, correctAnswer) => {
    // Nettoyage des réponses
    let cleanUserAnswer = (answer || "").toString().trim().toLowerCase();
    let cleanCorrectAnswer = (correctAnswer || "")
      .toString()
      .trim()
      .toLowerCase();

    // Initialiser comme incorrect
    let correct = false;

    // Vérifier si correctAnswer contient des alternatives (séparées par /)
    if (cleanCorrectAnswer.includes("/")) {
      // Plusieurs réponses correctes possibles
      const alternatives = cleanCorrectAnswer
        .split("/")
        .map((alt) => alt.trim().toLowerCase());
      correct = alternatives.some((alt) => {
        // Vérification exacte
        if (cleanUserAnswer === alt) return true;

        // Vérification avec ou sans contractions
        if (alt.includes("'")) {
          // Conversion des contractions en formes complètes
          const expandedAlt = alt
            .replace("'re", " are")
            .replace("'m", " am")
            .replace("'s", " is")
            .replace("n't", " not")
            .replace("'ve", " have")
            .replace("'ll", " will")
            .replace("'d", " would");
          if (cleanUserAnswer === expandedAlt) return true;
        } else if (cleanUserAnswer.includes("'")) {
          // L'utilisateur a utilisé des contractions mais la réponse correcte n'en contient pas
          // Convertir la réponse de l'utilisateur pour comparer
          const expandedUserAnswer = cleanUserAnswer
            .replace("'re", " are")
            .replace("'m", " am")
            .replace("'s", " is")
            .replace("n't", " not")
            .replace("'ve", " have")
            .replace("'ll", " will")
            .replace("'d", " would");
          if (expandedUserAnswer === alt) return true;
        }

        // Vérifier aussi en ignorant la ponctuation et les espaces
        const strippedAlt = alt
          .replace(/[.,?!;:()'"]/g, "")
          .replace(/\s+/g, " ");
        const strippedUserAnswer = cleanUserAnswer
          .replace(/[.,?!;:()'"]/g, "")
          .replace(/\s+/g, " ");
        if (strippedAlt === strippedUserAnswer) return true;

        return false;
      });
    } else {
      // Comparaison de base
      correct = cleanUserAnswer === cleanCorrectAnswer;

      // Si ce n'est pas correct, essayer avec les formes contractées/développées
      if (!correct) {
        // De contracté à développé
        if (cleanCorrectAnswer.includes("'")) {
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

        // De développé à contracté
        if (
          !correct &&
          !cleanCorrectAnswer.includes("'") &&
          cleanUserAnswer.includes("'")
        ) {
          const expandedUserAnswer = cleanUserAnswer
            .replace("'re", " are")
            .replace("'m", " am")
            .replace("'s", " is")
            .replace("n't", " not")
            .replace("'ve", " have")
            .replace("'ll", " will")
            .replace("'d", " would");
          correct = expandedUserAnswer === cleanCorrectAnswer;
        }

        // Vérifier en ignorant la ponctuation et les espaces supplémentaires
        if (!correct) {
          const strippedCorrect = cleanCorrectAnswer
            .replace(/[.,?!;:()'"]/g, "")
            .replace(/\s+/g, " ");
          const strippedUserAnswer = cleanUserAnswer
            .replace(/[.,?!;:()'"]/g, "")
            .replace(/\s+/g, " ");
          correct = strippedCorrect === strippedUserAnswer;
        }
      }
    }

    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);
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
    setIsCorrect, // Exposer setIsCorrect pour une utilisation directe
    attempts,
    setAttempts, // Exposer setAttempts pour une utilisation directe
    resetExerciseState,
    restoreState,
    goToPreviousExercise,
    goToNextExercise,
    changeRule,
    checkAnswer,
  };
};

export default useGrammarExerciseState;

