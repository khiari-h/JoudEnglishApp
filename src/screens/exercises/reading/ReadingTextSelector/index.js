// ReadingTextSelector/index.js - VERSION REFACTORISÉE avec CategorySelector générique

import CategorySelector from "../../../../components/exercise-common/CategorySelector";
import { useCallback } from "react";
import PropTypes from 'prop-types';

/**
 * 🎨 ReadingTextSelector - Version Refactorisée avec CategorySelector générique
 * 80+ lignes → 25 lignes (-70% de code)
 * Adaptateur pour le sélecteur d'exercices de lecture
 * Réutilise le composant générique CategorySelector
 * Pattern identique à VocabularyCategorySelector
 */
const ReadingTextSelector = ({
  exercises = [],
  selectedIndex = 0,
  onSelectExercise,
  // scrollViewRef, // Pas utilisé par CategorySelector, mais gardé pour compatibilité
  levelColor,
}) => {
  // Transformation du format des exercices pour correspondre au composant générique
  const formattedExercises = exercises.map((exercise, index) => ({
    id: index,
    name: exercise.title || `Exercise ${index + 1}`,
  }));

  // Fonction de callback adaptée - notre composant utilise des indices,
  // le composant générique utilise des IDs
  const handleExerciseSelect = useCallback((exerciseId) => {
    // Si l'option "Tous" est sélectionnée (null), nous sélectionnons le premier exercice
    if (exerciseId === null) {
      onSelectExercise(0);
    } else {
      onSelectExercise(exerciseId);
    }
  }, [onSelectExercise]);

  return (
    <CategorySelector
      categories={formattedExercises}
      selectedCategory={selectedIndex === undefined ? 0 : selectedIndex}
      onSelectCategory={handleExerciseSelect}
      primaryColor={levelColor}
      // Props spécifiques à Reading
      label="Reading Exercises:" // Titre personnalisé
      showAllOption={false} // Pas besoin de "Tous" pour les exercices
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
ReadingTextSelector.propTypes = {
  // 'exercises' est manquant dans la validation
  exercises: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  // 'selectedIndex' est manquant dans la validation
  selectedIndex: PropTypes.number,
  // 'onSelectExercise' est manquant dans la validation
  onSelectExercise: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ReadingTextSelector;