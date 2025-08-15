// ================================================================
// PhrasesNavigation/index.js - VERSION OPTIMISÉE avec PropTypes
// ================================================================

import PropTypes from 'prop-types';
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";

/**
 * ⏭️ PhrasesNavigation - Version Optimisée avec PropTypes
 * - Plus d'indicateur "1/2" redondant 
 * - Utilise le NavigationButtons optimisé
 * - Interface cohérente avec VocabularyNavigation et GrammarNavigation
 * - Props simplifiées
 * 
 * @param {function} onPrevious - Fonction pour aller au précédent
 * @param {function} onNext - Fonction pour aller au suivant
 * @param {boolean} disablePrevious - Désactiver le bouton précédent
 * @param {boolean} disableNext - Désactiver le bouton suivant
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} isLast - Si c'est le dernier élément (affiche "Terminer")
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

// ✅ PropTypes pour PhrasesNavigation - Corrige toutes les erreurs
PhrasesNavigation.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
  levelColor: PropTypes.string,
  isLast: PropTypes.bool,
};

// ✅ Valeurs par défaut pour PhrasesNavigation
PhrasesNavigation.defaultProps = {
  disablePrevious: false,
  disableNext: false,
  levelColor: "#5E60CE",
  isLast: false,
};

export default PhrasesNavigation;