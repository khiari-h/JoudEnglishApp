// src/components/popups/RevisionPopup/RevisionPopup.js
import React, { useContext, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Animated, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Contextes
import { ThemeContext } from '../../../../../contexts/ThemeContext';

import styles from './style';

const { width, height } = Dimensions.get('window');

/**
 * Popup de révision motivant et scientifiquement optimisé
 * ✅ Trigger à 15 mots (recherche prouve optimal)
 * ✅ Design celebration pour engagement
 */
const RevisionPopup = ({
  visible = false,
  wordsToReview = 10,
  currentLevel = "2",
  onReviseNow,
  onSnoozeLater,
  onDismiss,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#8B5CF6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    success: "#10B981",
  };

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  // Animations d'entrée
  useEffect(() => {
    if (visible) {
      // Animation principal
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Animation émojis bounce (délai)
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, 500);

      // Animation confetti
      setTimeout(() => {
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 200);
    } else {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      bounceAnim.setValue(0);
      confettiAnim.setValue(0);
    }
  }, [visible]);

  // Gérer "Réviser maintenant" avec navigation
  const handleReviseNow = async () => {
    try {
      const revisionData = await onReviseNow?.();
      
      if (revisionData) {
        router.push({
          pathname: "/(tabs)/vocabularyRevision",
          params: {
            level: currentLevel,
            wordsToReview: revisionData.wordsToReview || wordsToReview,
            source: 'popup_trigger' // Pour analytics
          }
        });
      }
    } catch (error) {
      console.error('Erreur navigation révision:', error);
      onDismiss?.();
    }
  };

  // Messages motivants dynamiques
  const getMotivationalMessage = () => {
    const messages = [
      "Temps de renforcer votre mémoire !",
      "Ancrez ces mots pour de bon !",
      "5 minutes pour un boost mémoriel !",
      "Votre cerveau vous remerciera !"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Animation émojis bounce
  const bounceTransform = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  // Animation confetti fall
  const confettiTransform = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, height + 50],
  });

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      {/* Overlay avec fade */}
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        {/* Confetti animation */}
        <Animated.View
          style={[
            styles.confettiContainer,
            {
              transform: [{ translateY: confettiTransform }]
            }
          ]}
        >
          {/* Émojis confetti */}
          <Text style={[styles.confettiEmoji, { left: width * 0.1 }]}>🎉</Text>
          <Text style={[styles.confettiEmoji, { left: width * 0.3 }]}>✨</Text>
          <Text style={[styles.confettiEmoji, { left: width * 0.5 }]}>🏆</Text>
          <Text style={[styles.confettiEmoji, { left: width * 0.7 }]}>🎊</Text>
          <Text style={[styles.confettiEmoji, { left: width * 0.9 }]}>💎</Text>
        </Animated.View>

        {/* Popup principal */}
        <Animated.View
          style={[
            styles.popupContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#8B5CF6', '#A855F7', '#C084FC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {/* Header avec émojis animés */}
            <View style={styles.header}>
              <Animated.View
                style={[
                  styles.emojiContainer,
                  {
                    transform: [{ translateY: bounceTransform }]
                  }
                ]}
              >
                <Text style={styles.mainEmoji}>🧠</Text>
                <Text style={styles.sideEmoji}>✨</Text>
              </Animated.View>
              
              <Text style={styles.congratsTitle}>
                Félicitations !
              </Text>
              
              <Text style={styles.achievementText}>
                15 nouveaux mots appris
              </Text>
            </View>

            {/* Content */}
            <View style={[styles.content, { backgroundColor: colors.surface }]}>
              <Text style={[styles.motivationText, { color: colors.text }]}>
                {getMotivationalMessage()}
              </Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.primary }]}>
                    {wordsToReview}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    mots à réviser
                  </Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.success }]}>
                    ~5min
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    durée estimée
                  </Text>
                </View>
              </View>

              {/* Benefits list */}
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🚀</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>
                    +75% de rétention mémoire
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🎯</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>
                    Méthode scientifiquement prouvée
                  </Text>
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleReviseNow}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>
                    🔥 Réviser maintenant
                  </Text>
                </TouchableOpacity>

                <View style={styles.secondaryButtons}>
                  <TouchableOpacity
                    style={[styles.secondaryButton, { borderColor: colors.textSecondary }]}
                    onPress={onSnoozeLater}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
                      ⏰ Dans 2h
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.secondaryButton, { borderColor: colors.textSecondary }]}
                    onPress={onDismiss}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
                      ✕ Ignorer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default RevisionPopup;