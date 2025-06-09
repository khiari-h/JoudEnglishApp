// GrammarProgress/index.js - VERSION SIMPLIFIÉE (identique à VocabularyProgress)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateRuleProgress,
} from "../../../../utils/grammar/grammarStats";

/**
 * 📊 GrammarProgress - Version Simplifiée avec ProgressCard générique
 * API identique à VocabularyProgress et PhrasesProgress
 * Pattern uniforme sur tous les exercices
 * 
 * @param {object} grammarData - Données de grammaire
 * @param {object} completedExercises - Exercices complétés par règle
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onRulePress - Fonction appelée lors du clic sur règle
 */
const GrammarProgress = ({
  grammarData,
  completedExercises,
  levelColor,
  expanded = false,
  onToggleExpand,
  onRulePress,
}) => {
  
  // Calculs des statistiques (utilise des utilitaires externes comme Vocabulary)
  const totalExercisesCount = calculateTotalExercises(grammarData || []);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(grammarData || [], completedExercises);
  
  // Données des règles pour l'expansion
  const ruleProgressData = calculateRuleProgress(grammarData || [], completedExercises);

  // Transformation pour le format ProgressCard (identique à Vocabulary)
  const formattedRuleData = ruleProgressData.map((rule, index) => ({
    title: rule.title,
    completed: rule.completedExercises,
    total: rule.totalExercises,
    progress: rule.progress,
  }));

  return (
    <ProgressCard
      title="Grammar Progress"
      progress={totalProgress}
      completed={completedExercisesCount}
      total={totalExercisesCount}
      unit="exercises"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedRuleData}
      onCategoryPress={onRulePress}
    />
  );
};

export default GrammarProgress;