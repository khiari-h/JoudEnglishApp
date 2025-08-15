import { View, Text } from 'react-native';
import ConversationHelpPanel from '../ConversationHelpPanel';
import styles from './style';
import PropTypes from 'prop-types';

/**
 * Composant qui affiche la description du scénario actuel et le panel d'aide
 * * @param {string} description - Description du scénario
 * @param {string} helpText - Texte d'aide pour l'étape actuelle
 * @param {boolean} showHelp - Indique si l'aide est visible
 * @param {Function} toggleHelp - Fonction pour afficher/masquer l'aide
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationScenarioDescription = ({ 
  description, 
  helpText, 
  showHelp, 
  toggleHelp, 
  levelColor 
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.descriptionText}>
          {description || "Practice your writing skills in this conversation."}
        </Text>
      </View>

      <ConversationHelpPanel
        helpText={helpText}
        isVisible={showHelp}
        onToggle={toggleHelp}
        levelColor={levelColor}
      />
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationScenarioDescription.propTypes = {
  // 'description' est manquant dans la validation
  description: PropTypes.string,
  // 'helpText' est manquant dans la validation
  helpText: PropTypes.string,
  // 'showHelp' est manquant dans la validation
  showHelp: PropTypes.bool.isRequired,
  // 'toggleHelp' est manquant dans la validation
  toggleHelp: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationScenarioDescription;