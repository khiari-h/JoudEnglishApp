// VocabularyHeader - Version épurée mobile-first
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

/**
 * 🎯 VocabularyHeader - Version Mobile-First Épurée
 * - Titres courts et clairs
 * - Cohérence avec ExerciseSelection
 * - Focus sur l'essentiel
 * - Pas de redondance
 */
const VocabularyHeader = ({ level, mode, onBackPress }) => {
  // 🎯 TITRES ÉPURÉS - Mobile-first
  const getTitle = () => {
    if (mode === 'fast') return 'Fast'; // Simple et clair ⚡
    return 'Vocabulaire'; // Par défaut pour classic
  };

  return (
    <ExerciseHeader
      title={getTitle()}
      level={level}
      exerciseType="vocabulary" // Même type, seul le mode change
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
VocabularyHeader.propTypes = {
  // 'mode' est manquant dans la validation
  mode: PropTypes.oneOf(['fast', 'classic']).isRequired,
  // 'onBackPress' est manquant dans la validation
  onBackPress: PropTypes.func.isRequired,
  // 'level' est manquant dans la validation
  level: PropTypes.string.isRequired,
};

export default VocabularyHeader;