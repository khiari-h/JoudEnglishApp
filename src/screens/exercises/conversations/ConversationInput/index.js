

import styles from './style';

/**
 * Composant pour la saisie de messages dans le Conversation
 * 
 * @param {string} message - Texte actuellement dans l'input
 * @param {Function} onChangeMessage - Fonction appelée quand le texte change
 * @param {Function} onSendMessage - Fonction appelée quand le message est envoyé
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationInput = ({ message, onChangeMessage, onSendMessage, levelColor }) => {
  // Vérifier si le bouton d'envoi doit être activé
  const isButtonEnabled = message.trim() !== '';

  // Gérer l'envoi du message
  const handleSend = () => {
    if (isButtonEnabled) {
      onSendMessage();
    }
  };

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

export default ConversationInput;
