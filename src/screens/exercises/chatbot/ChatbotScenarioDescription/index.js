import React from 'react';
import { View, Text } from 'react-native';
import ChatbotHelpPanel from '../ChatbotHelpPanel';
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
const ChatbotScenarioDescription = ({ 
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
      
      <ChatbotHelpPanel
        helpText={helpText}
        isVisible={showHelp}
        onToggle={toggleHelp}
        levelColor={levelColor}
      />
    </View>
  );
};

export default ChatbotScenarioDescription;