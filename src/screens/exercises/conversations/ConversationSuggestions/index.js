import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './style';

/**
 * Composant qui affiche les suggestions de messages que l'utilisateur peut envoyer
 * 
 * @param {Array} suggestions - Liste des suggestions à afficher
 * @param {Function} onPressSuggestion - Fonction à appeler quand une suggestion est choisie
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationSuggestions = ({ suggestions, onPressSuggestion, levelColor }) => {
  // S'il n'y a pas de suggestions, ne rien afficher
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {suggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.suggestionBubble, { borderColor: levelColor }]}
          onPress={() => onPressSuggestion(suggestion)}
        >
          <Text style={[styles.suggestionText, { color: levelColor }]}>
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ConversationSuggestions;
