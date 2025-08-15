// PhrasesProgress/index.js - VERSION CORRIGÉE AVEC PHRASESTATS

import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalPhrases,
  calculateCompletedPhrasesCount,
  calculateTotalPhrasesProgress,
  calculateCategoryPhrasesProgress,
} from "../../../../utils/phrases/phrasesStats";

/**
 * 📊 PhrasesProgress - Version Corrigée avec phrasesStats
 * ✅ Utilise les vraies fonctions de calcul
 * ✅ Gère correctement la structure des données phrases
 * 
 * @param {number} progress - Pourcentage de progression (0-100) [IGNORÉ - recalculé]
 * @param {number} currentPhrase - Phrase actuelle (1-based) [IGNORÉ - recalculé]
 * @param {number} totalPhrases - Nombre total de phrases [IGNORÉ - recalculé]
 * @param {number} completedCount - Nombre de phrases complétées [IGNORÉ - recalculé]
 * @param {string} levelColor - Couleur du niveau
 * @param {object} phrasesData - Données des phrases
 * @param {object} completedPhrases - Phrases complétées par catégorie
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
 */
const PhrasesProgress = ({
  levelColor,
  phrasesData,
  completedPhrases,
  expanded,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // ✅ CORRECTION : Utilise les vraies fonctions de calcul
  const categories = phrasesData?.categories || [];
  const phrases = phrasesData?.phrases || [];
  
  const totalPhrasesCount = calculateTotalPhrases(categories, phrases);
  const completedPhrasesCount = calculateCompletedPhrasesCount(completedPhrases);
  const totalProgress = calculateTotalPhrasesProgress(categories, phrases, completedPhrases);
  const categoryProgressData = calculateCategoryPhrasesProgress(categories, phrases, completedPhrases);

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category) => ({
    title: category.title,
    completed: category.completedPhrases,
    total: category.totalPhrases,
    progress: category.progress,
  }));

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress} // ✅ Utilise le calcul correct
      completed={completedPhrasesCount} // ✅ Utilise le calcul correct
      total={totalPhrasesCount} // ✅ Utilise le calcul correct
      unit="phrases"
      levelColor={levelColor}
      expandable={categoryProgressData.length > 0}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

// ✅ Ajout des validations PropTypes
PhrasesProgress.propTypes = {
  levelColor: PropTypes.string,
  phrasesData: PropTypes.shape({
    categories: PropTypes.array,
    phrases: PropTypes.array,
  }),
  completedPhrases: PropTypes.object,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onCategoryPress: PropTypes.func,
};

// ✅ Ajout des valeurs par défaut pour la robustesse
PhrasesProgress.defaultProps = {
  levelColor: '#5E60CE',
  phrasesData: { categories: [], phrases: [] },
  completedPhrases: {},
  expanded: false,
  onToggleExpand: () => {},
  onCategoryPress: () => {},
};


export default PhrasesProgress;