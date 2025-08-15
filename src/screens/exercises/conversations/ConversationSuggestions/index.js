import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant qui affiche les suggestions de messages que l'utilisateur peut envoyer
 * * @param {Array} suggestions - Liste des suggestions à afficher
 * @param {Function} onPressSuggestion - Fonction à appeler quand une suggestion est choisie
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationSuggestions = ({ suggestions, onPressSuggestion, levelColor }) => {
  // ✅ Déplacer le useCallback AVANT le return conditionnel
  const handleSuggestionPress = useCallback((suggestion) => () => onPressSuggestion(suggestion), [onPressSuggestion]);

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
      {suggestions.map((suggestion) => (
        <TouchableOpacity
          key={suggestion}
          style={[styles.suggestionBubble, { borderColor: levelColor }]}
          onPress={handleSuggestionPress(suggestion)}
        >
          <Text style={[styles.suggestionText, { color: levelColor }]}>
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationSuggestions.propTypes = {
  // 'suggestions' est manquant dans la validation
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  // 'onPressSuggestion' est manquant dans la validation
  onPressSuggestion: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationSuggestions;