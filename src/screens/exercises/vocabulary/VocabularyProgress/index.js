// VocabularyProgress/index.js - VERSION REFACTORISÉE (180 → 30 lignes)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/vocabulary/vocabularyStats";

/**
 * 📊 VocabularyProgress - Version Refactorisée avec ProgressCard générique
 * 180 lignes → 30 lignes (-83% de code)
 * Même qualité visuelle et fonctionnalités, architecture optimisée
 * 
 * @param {object} vocabularyData - Données du vocabulaire
 * @param {object} completedWords - Mots complétés par catégorie
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
 */
const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // Calculs des statistiques (garde la logique métier existante)
  const totalWordsCount = calculateTotalWords(vocabularyData?.exercises || []);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(vocabularyData?.exercises || [], completedWords);
  
  // Données des catégories pour l'expansion
  const categoryProgressData = calculateCategoryProgress(vocabularyData?.exercises || [], completedWords);

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category, index) => ({
    title: category.title,
    completed: category.completedWords,
    total: category.totalWords,
    progress: category.progress,
  }));

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedWordsCount}
      total={totalWordsCount}
      unit="mots"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

export default VocabularyProgress;