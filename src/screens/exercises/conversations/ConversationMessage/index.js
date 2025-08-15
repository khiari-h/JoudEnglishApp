// ConversationMessage/index.js - VERSION CLEAN SANS TIMESTAMP
import { View, Text } from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';

/**
 * Composant pour afficher un message dans le Conversation
 * VERSION CLEAN : Timestamp inutile supprimé ✅
 * * @param {Object} message - Objet contenant les informations du message
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationMessage = ({ message, levelColor }) => {
  const isBotMessage = message.sender === 'bot';

  return (
    <View
      style={[
        styles.messageBubble,
        isBotMessage ? styles.botBubble : styles.userBubble,
        isBotMessage
          ? { backgroundColor: `${levelColor}15` }
          : { backgroundColor: levelColor },
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isBotMessage ? { color: '#1f2937' } : { color: 'white' },
        ]}
      >
        {message.text}
      </Text>

      {/* ❌ SUPPRIMÉ : Timestamp inutile */}
      {/* <Text style={styles.messageTime}>
        {message.timestamp}
      </Text> */}
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationMessage.propTypes = {
  // 'message' est manquant dans la validation
  message: PropTypes.shape({
    sender: PropTypes.oneOf(['bot', 'user']).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationMessage;