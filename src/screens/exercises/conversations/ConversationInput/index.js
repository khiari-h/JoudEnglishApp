import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant pour la saisie de messages dans le Conversation
 * * @param {string} message - Texte actuellement dans l'input
 * @param {Function} onChangeMessage - Fonction appelée quand le texte change
 * @param {Function} onSendMessage - Fonction appelée quand le message est envoyé
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationInput = ({ message, onChangeMessage, onSendMessage, levelColor }) => {
  // Vérifier si le bouton d'envoi doit être activé
  const isButtonEnabled = message.trim() !== '';

  // Gérer l'envoi du message
  const handleSend = useCallback(() => {
    if (isButtonEnabled) {
      onSendMessage();
    }
  }, [isButtonEnabled, onSendMessage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={onChangeMessage}
        placeholder="Type your message..."
        placeholderTextColor="#9ca3af"
        multiline
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          isButtonEnabled
            ? { backgroundColor: levelColor }
            : styles.disabledButton
        ]}
        onPress={handleSend}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.sendButtonText}>↑</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationInput.propTypes = {
  // 'message' est manquant dans la validation
  message: PropTypes.string.isRequired,
  // 'onChangeMessage' est manquant dans la validation
  onChangeMessage: PropTypes.func.isRequired,
  // 'onSendMessage' est manquant dans la validation
  onSendMessage: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationInput;