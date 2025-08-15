// VocabularyNavigation/index.js - VERSION OPTIMISÉE (plus de "1/2" redondant)

import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import PropTypes from 'prop-types';

/**
 * 🎯 VocabularyNavigation - Version Ultra-Simplifiée
 * - Plus d'indicateur "1/2" redondant 
 * - Plus de wrapper inutile
 * - NavigationButtons gère tout maintenant
 */
const VocabularyNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious = true,
  isLast = false,
  levelColor,
}) => {
  return (
    <NavigationButtons
      onNext={onNext}
      onPrevious={onPrevious}
      disablePrevious={!canGoPrevious}
      disableNext={false}
      primaryColor={levelColor}
      isLast={isLast} // ← Nouveau prop simple
      buttonLabels={{
        next: "Suivant",
        previous: "Précédent", 
        finish: "Terminer"
      }}
      // 🧹 SUPPRIMÉ : currentIndex, totalCount, showSkip, variant, wrapper View
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
VocabularyNavigation.propTypes = {
  // 'onPrevious' est manquant dans la validation
  onPrevious: PropTypes.func.isRequired,
  // 'onNext' est manquant dans la validation
  onNext: PropTypes.func.isRequired,
  // 'canGoPrevious' est manquant dans la validation
  canGoPrevious: PropTypes.bool,
  // 'isLast' est manquant dans la validation
  isLast: PropTypes.bool,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default VocabularyNavigation;