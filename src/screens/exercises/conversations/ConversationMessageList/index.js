import { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import ConversationMessage from '../ConversationMessage';
import ConversationTypingIndicator from '../ConversationTypingIndicator';
import styles from './style';
import PropTypes from 'prop-types';

/**
 * Composant qui affiche la liste des messages dans la conversation
 * * @param {Array} messages - Liste des messages à afficher
 * @param {boolean} isTyping - Indique si le bot est en train de taper
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationMessageList = ({ messages, isTyping, levelColor }) => {
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
        <ConversationMessage
          key={message.id}
          message={message}
          levelColor={levelColor}
        />
      ))}

      {/* Afficher l'indicateur de frappe si nécessaire */}
      {isTyping && <ConversationTypingIndicator levelColor={levelColor} />}
    </ScrollView>
  );
};

// ✅ Définition de PropTypes pour la validation des props
ConversationMessageList.propTypes = {
  // 'messages' est manquant dans la validation
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  // 'isTyping' est manquant dans la validation
  isTyping: PropTypes.bool,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationMessageList;