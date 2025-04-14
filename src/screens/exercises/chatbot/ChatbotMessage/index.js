import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher un message dans le chatbot
 * 
 * @param {Object} message - Objet contenant les informations du message
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ChatbotMessage = ({ message, levelColor }) => {
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
      
      <Text
        style={[
          styles.messageTime,
          isBotMessage
            ? { color: '#6b7280' }
            : { color: 'rgba(255,255,255,0.7)' },
        ]}
      >
        {message.timestamp}
      </Text>
    </View>
  );
};

export default ChatbotMessage;