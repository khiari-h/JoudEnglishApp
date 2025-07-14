import { View, Text } from 'react-native';
import ConversationHelpPanel from '../ConversationHelpPanel';
import styles from './style';

/**
 * Composant qui affiche la description du scénario actuel et le panel d'aide
 * 
 * @param {string} description - Description du scénario
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

export default ConversationScenarioDescription;
