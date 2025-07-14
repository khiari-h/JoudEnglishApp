// VocabularyNavigation/index.js - VERSION OPTIMISÉE (plus de "1/2" redondant)

import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";

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

export default VocabularyNavigation;