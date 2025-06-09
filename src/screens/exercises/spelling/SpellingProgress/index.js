// SpellingProgress/index.js - VERSION REFACTORISÉE (utilise ProgressCard)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateStatsByType,
} from "../../../../utils/spelling/spellingStats";

/**
 * 📊 SpellingProgress - Version Refactorisée avec ProgressCard générique
 * Pattern identique à VocabularyProgress et ErrorCorrectionProgress
 * 
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onTypePress - Fonction appelée lors du clic sur type
 */
const SpellingProgress = ({
  exercises = [],
  completedExercises = [],
  levelColor,
  expanded = false,
  onToggleExpand,
  onTypePress,
}) => {
  
  // Calculs des statistiques (utilise les nouveaux utilitaires)
  const totalExercisesCount = calculateTotalExercises(exercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(exercises, completedExercises);
  
  // Données des types pour l'expansion
  const typeProgressData = calculateStatsByType(exercises, completedExercises);

  // Transformation pour le format ProgressCard
  const formattedTypeData = Object.keys(typeProgressData).map((type) => {
    const typeData = typeProgressData[type];
    const typeNames = {
      correction: 'Correction',
      spelling_rule: 'Règles',
      homophones: 'Homophones'
    };
    
    return {
      title: typeNames[type] || type,
      completed: typeData.completed,
      total: typeData.total,
      progress: typeData.progress,
    };
  }).filter(item => item.total > 0); // Afficher seulement les types avec des exercices

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedExercisesCount}
      total={totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable={formattedTypeData.length > 0}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedTypeData}
      onCategoryPress={onTypePress}
    />
  );
};

export default SpellingProgress;