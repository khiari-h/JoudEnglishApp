// VocabularyProgress/index.js - CORRIGÉ pour éliminer les 12 violations SonarQube

import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/vocabulary/vocabularyStats";

/**
 * 📊 VocabularyProgress - Version Corrigée pour gérer categories ET exercises
 * ✅ Gère mode classique (categories) ET mode fast (exercises)
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
  
  // ✅ CORRIGÉ : Détecte la vraie structure
  const getDataArray = () => {
    if (vocabularyData?.categories && Array.isArray(vocabularyData.categories)) {
      // Mode classique : { categories: [...] }
      return vocabularyData.categories;
    } else if (vocabularyData?.exercises && Array.isArray(vocabularyData.exercises)) {
      // Mode fast : { exercises: [...] }
      return vocabularyData.exercises;
    }
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ CORRIGÉ : Utilise la vraie structure détectée
  const totalWordsCount = calculateTotalWords(dataArray);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(dataArray, completedWords);
  
  // Données des catégories pour l'expansion
  const categoryProgressData = calculateCategoryProgress(dataArray, completedWords);

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category) => ({
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
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

// PropTypes pour VocabularyProgress - CORRIGÉ pour toutes les violations
VocabularyProgress.propTypes = {
  vocabularyData: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.object),
    exercises: PropTypes.arrayOf(PropTypes.object),
  }),
  completedWords: PropTypes.object,
  levelColor: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onCategoryPress: PropTypes.func,
};

export default VocabularyProgress;