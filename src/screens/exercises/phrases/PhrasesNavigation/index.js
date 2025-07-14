// PhrasesNavigation/index.js - VERSION OPTIMISÉE (plus de "1/2" redondant)

import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";

/**
 * ⏭️ PhrasesNavigation - Version Optimisée
 * - Plus d'indicateur "1/2" redondant 
 * - Utilise le NavigationButtons optimisé
 * - Interface cohérente avec VocabularyNavigation et GrammarNavigation
 * - Props simplifiées
 */
const PhrasesNavigation = ({ 
  onPrevious, 
  onNext, 
  disablePrevious = false, 
  disableNext = false,
  levelColor = "#5E60CE",
  isLast = false, // Nouveau prop simple pour "Terminer"
}) => {
  return (
    <NavigationButtons
      onNext={onNext}
      onPrevious={onPrevious}
      disablePrevious={disablePrevious}
      disableNext={disableNext}
      primaryColor={levelColor}
      isLast={isLast}
      buttonLabels={{
        next: "Suivant",
        previous: "Précédent", 
        finish: "Terminer"
      }}
      // 🧹 SUPPRIMÉ : currentIndex, totalCount, showSkip, variant, wrapper View
      // Plus de "1/2" redondant !
    />
  );
};

export default PhrasesNavigation;