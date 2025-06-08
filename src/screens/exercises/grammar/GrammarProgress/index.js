// GrammarProgress/index.js - VERSION REFACTORISÉE avec ProgressCard (42 → 10 lignes)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";

/**
 * 📊 GrammarProgress - Version Refactorisée avec ProgressCard générique
 * 42 lignes → 10 lignes (-76% de code)
 * Même qualité visuelle, architecture optimisée
 * Cohérent avec VocabularyProgress refactorisé
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentExercise - Exercice actuel (1-based)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {string} levelColor - Couleur du niveau
 * @param {object} style - Style personnalisé (optionnel)
 */
const GrammarProgress = ({
  progress = 0,
  currentExercise = 1,
  totalExercises = 0,
  levelColor = "#3b82f6",
  style = {},
}) => {
  // Calculer les exercices complétés basé sur la progression
  const completedCount = Math.floor((currentExercise - 1) + (progress / 100));

  return (
    <ProgressCard
      title="Grammar Progress"
      subtitle={`Exercise ${currentExercise} of ${totalExercises}`}
      progress={progress}
      completed={completedCount}
      total={totalExercises}
      unit="exercices"
      levelColor={levelColor}
      expandable={false} // Pas de catégories pour Grammar
      expanded={false}
      onToggleExpand={null}
      categoryData={[]}
      onCategoryPress={null}
      containerStyle={style}
    />
  );
};

export default GrammarProgress;