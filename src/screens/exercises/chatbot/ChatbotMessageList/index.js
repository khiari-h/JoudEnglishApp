import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import ChatbotMessage from '../ChatbotMessage';
import ChatbotTypingIndicator from '../ChatbotTypingIndicator';
import styles from './style';

/**
 * Composant qui affiche la liste des messages dans la conversation
 * 
 * @param {Array} messages - Liste des messages à afficher
 * @param {boolean} isTyping - Indique si le bot est en train de taper
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ChatbotMessageList = ({ messages, isTyping, levelColor }) => {
  const scrollViewRef = useRef(null);
  
  // Faire défiler automatiquement vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);
  
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Afficher tous les messages */}
      {messages.map((message) => (
        <ChatbotMessage
          key={message.id}
          message={message}
          levelColor={levelColor}
        />
      ))}
      
      {/* Afficher l'indicateur de frappe si nécessaire */}
      {isTyping && <ChatbotTypingIndicator levelColor={levelColor} />}
    </ScrollView>
  );
};

export default ChatbotMessageList;