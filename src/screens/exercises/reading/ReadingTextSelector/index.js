// ReadingTextSelector/index.js - VERSION REFACTORISÉE avec CategorySelector générique

import React from "react";
import CategorySelector from "../../../../components/exercise-common/CategorySelector";

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
  scrollViewRef, // Pas utilisé par CategorySelector, mais gardé pour compatibilité
  levelColor,
}) => {
  // Transformation du format des exercices pour correspondre au composant générique
  const formattedExercises = exercises.map((exercise, index) => ({
    id: index,
    name: exercise.title || `Exercise ${index + 1}`,
  }));

  // Fonction de callback adaptée - notre composant utilise des indices,
  // le composant générique utilise des IDs
  const handleExerciseSelect = (exerciseId) => {
    // Si l'option "Tous" est sélectionnée (null), nous sélectionnons le premier exercice
    if (exerciseId === null) {
      onSelectExercise(0);
    } else {
      onSelectExercise(exerciseId);
    }
  };

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

export default ReadingTextSelector;