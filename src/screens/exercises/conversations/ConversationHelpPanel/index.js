import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant qui affiche un panneau d'aide pour l'utilisateur
 * 
 * @param {string} helpText - Texte d'aide à afficher
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

export default ConversationHelpPanel;