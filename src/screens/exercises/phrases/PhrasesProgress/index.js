// PhrasesProgress/index.js - VERSION REFACTORISÉE avec ProgressCard (200 → 30 lignes)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";

/**
 * 📊 PhrasesProgress - Version Refactorisée avec ProgressCard générique
 * 200 lignes → 30 lignes (-85% de code)
 * Même qualité visuelle que VocabularyProgress refactorisé
 * Cohérent avec VocabularyProgress et ReadingProgress
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentPhrase - Phrase actuelle (1-based)
 * @param {number} totalPhrases - Nombre total de phrases
 * @param {number} completedCount - Nombre de phrases complétées
 * @param {string} levelColor - Couleur du niveau
 * @param {object} phrasesData - Données des phrases (pour expansion optionnelle)
 * @param {object} completedPhrases - Phrases complétées par catégorie
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
 */
const PhrasesProgress = ({
  progress = 0,
  currentPhrase = 1,
  totalPhrases = 0,
  completedCount = 0,
  levelColor = "#5E60CE",
  phrasesData = null,
  completedPhrases = {},
  expanded = false,
  onToggleExpand = () => {},
  onCategoryPress = () => {},
}) => {
  
  // Calculer les données des catégories pour l'expansion (optionnel)
  const calculateCategoryData = () => {
    if (!phrasesData?.categories || !phrasesData?.phrases) return [];
    
    return phrasesData.categories.map((category, index) => {
      const categoryPhrases = phrasesData.phrases.filter(p => p.categoryId === category.id);
      const completedInCategory = completedPhrases[index]?.length || 0;
      const totalInCategory = categoryPhrases.length;
      const categoryProgress = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0;
      
      return {
        title: category.name,
        completed: completedInCategory,
        total: totalInCategory,
        progress: categoryProgress,
      };
    });
  };

  const categoryData = calculateCategoryData();

  return (
    <ProgressCard
      title="Progression" // ← MÊME TITRE que Vocabulary (cohérence)
      progress={progress}
      completed={completedCount}
      total={totalPhrases}
      unit="phrases"
      levelColor={levelColor}
      expandable={categoryData.length > 0} // Expansion si catégories disponibles
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={categoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

export default PhrasesProgress;