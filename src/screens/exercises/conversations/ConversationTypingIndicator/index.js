

import styles from './style';

/**
 * Composant qui affiche une animation indiquant que le bot est en train de taper
 * 
 * @param {string} levelColor - Couleur associée au niveau courant
 */
const ConversationTypingIndicator = ({ levelColor }) => {
  // Animation pour faire pulser les points
  const typingAnimation = useRef(new Animated.Value(0)).current;

  // Lancer l'animation en boucle
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();

    return () => {
      // Arrêter l'animation quand le composant est démonté
      typingAnimation.stopAnimation();
    };
  }, [typingAnimation]);

  return (
    <View
      style={[
        styles.messageBubble,
        styles.botBubble,
        { backgroundColor: `${levelColor}15` },
      ]}
    >
      <View style={styles.typingContainer}>
        <Animated.View
          style={[styles.typingDot, { opacity: typingAnimation }]}
        />
        <Animated.View
          style={[
            styles.typingDot,
            { opacity: typingAnimation, marginHorizontal: 4 },
          ]}
        />
        <Animated.View
          style={[styles.typingDot, { opacity: typingAnimation }]}
        />
      </View>
    </View>
  );
};

export default ConversationTypingIndicator;
