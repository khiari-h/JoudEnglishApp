import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';

/**
 * Composant qui affiche un panneau d'aide pour l'utilisateur
 * * @param {string} helpText - Texte d'aide à afficher
 * @param {boolean} isVisible - Indique si le panneau est visible
 * @param {Function} onToggle - Fonction pour afficher/masquer le panneau
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationHelpPanel = ({ helpText, isVisible, onToggle, levelColor }) => {
  // Si le panneau n'est pas visible, afficher seulement le bouton
  if (!isVisible) {
    return (
      <TouchableOpacity 
        style={styles.helpButton} 
        onPress={onToggle}
      >
        <Text style={[styles.helpButtonText, { color: levelColor }]}>
          Show Help
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { borderColor: `${levelColor}30` }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Hint:</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onToggle}
        >
          <Text style={[styles.closeButtonText, { color: levelColor }]}>
            Hide
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.helpText}>
        {helpText || "No hint available for this step."}
      </Text>
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationHelpPanel.propTypes = {
  // 'helpText' est manquant dans la validation
  helpText: PropTypes.string,
  // 'isVisible' est manquant dans la validation
  isVisible: PropTypes.bool.isRequired,
  // 'onToggle' est manquant dans la validation
  onToggle: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationHelpPanel;