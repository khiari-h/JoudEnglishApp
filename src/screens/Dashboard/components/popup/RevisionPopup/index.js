// src/components/popups/RevisionPopup/index.js
import React, { useContext, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Animated, 
  Dimensions,
  ScrollView  // ✅ Ajout ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Contextes
import { ThemeContext } from '../../../../../contexts/ThemeContext';
import { ROUTES } from '../../../../../navigation/routes';
import styles from './style';

const { width, height } = Dimensions.get('window');

/**
 * Popup de révision intelligent avec options anti-spam
 * ✅ 4 options : Réviser / Plus tard / Reporter / Ignorer
 * ✅ Système de délais pour éviter le spam
 * ✅ Adaptatif à toutes les tailles d'écran
 */
const RevisionPopup = ({
  visible = false,
  wordsToReview = 5,
  questionsCount = 5,
  currentLevel = "mixed",
  styleTitle = "Standard",
  onReviseNow,
  onSnoozeLater, // +10 mots
  onPostpone,    // +15 mots  
  onIgnore,      // Cycle suivant
  onDismiss,
}) => {
  const navigation = useNavigation();
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

  // ========== ANIMATIONS ==========
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

      // Animation émojis bounce
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

  // ========== GESTIONNAIRES ==========

  // Gérer "Réviser maintenant" avec navigation
  const handleReviseNow = async () => {
    try {
      const revisionData = await onReviseNow?.();
      
      if (revisionData) {
        navigation.navigate(ROUTES.VOCABULARY_REVISION, {
          level: currentLevel,
          wordsToReview: revisionData.questionsCount || questionsCount,
          questionsCount: revisionData.questionsCount || questionsCount,
          source: 'popup_trigger'
        });
      }
    } catch (error) {
      console.error('Erreur navigation révision:', error);
      onDismiss?.();
    }
  };

  const handleSnoozeLater = async () => {
    await onSnoozeLater?.();
    onDismiss?.();
  };

  const handlePostpone = async () => {
    await onPostpone?.();
    onDismiss?.();
  };

  const handleIgnore = async () => {
    await onIgnore?.();
    onDismiss?.();
  };

  // ========== UTILS ==========

  const getMotivationalMessage = () => {
    const messages = [
      "Temps de renforcer votre mémoire !",
      "Ancrez ces mots pour de bon !",
      "Quelques minutes pour un boost mémoriel !",
      "Votre cerveau vous remerciera !"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getEstimatedDuration = () => {
    if (questionsCount <= 5) return "~2min";
    if (questionsCount <= 8) return "~3min";
    return "~5min";
  };

  // Animation interpolations
  const bounceTransform = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

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
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {/* Confetti animation */}
        <Animated.View
          style={[
            styles.confettiContainer,
            { transform: [{ translateY: confettiTransform }] }
          ]}
        >
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
            {/* Header */}
            <View style={styles.header}>
              <Animated.View
                style={[
                  styles.emojiContainer,
                  { transform: [{ translateY: bounceTransform }] }
                ]}
              >
                <Text style={styles.mainEmoji}>🧠</Text>
                <Text style={styles.sideEmoji}>✨</Text>
              </Animated.View>
              
              <Text style={styles.congratsTitle}>Il est temps de réviser !</Text>
              <Text style={styles.achievementText}>
                Révision {styleTitle} disponible
              </Text>
            </View>

            {/* Content avec ScrollView adaptatif */}
            <View style={[styles.content, { backgroundColor: colors.surface }]}>
              <ScrollView
                style={styles.scrollableContent}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <Text style={[styles.motivationText, { color: colors.text }]}>
                  {getMotivationalMessage()}
                </Text>
                
                {/* Stats */}
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.primary }]}>
                      {questionsCount}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                      questions
                    </Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.success }]}>
                      {getEstimatedDuration()}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                      durée estimée
                    </Text>
                  </View>
                </View>

                {/* Benefits */}
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
                      Révision {styleTitle} personnalisée
                    </Text>
                  </View>
                </View>
              </ScrollView>

              {/* Buttons - Toujours visibles en bas */}
              <View style={styles.buttonsContainer}>
                {/* Bouton principal */}
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleReviseNow}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>🔥 Réviser maintenant</Text>
                </TouchableOpacity>

                {/* Boutons de délai */}
                <View style={styles.delayButtons}>
                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonSnooze]}
                    onPress={handleSnoozeLater}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonIcon}>⏰</Text>
                    <Text style={styles.delayButtonText}>Plus tard</Text>
                    <Text style={styles.delayButtonSubtext}>+10 mots</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonPostpone]}
                    onPress={handlePostpone}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonIcon}>😴</Text>
                    <Text style={styles.delayButtonText}>Reporter</Text>
                    <Text style={styles.delayButtonSubtext}>+15 mots</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonIgnore]}
                    onPress={handleIgnore}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonIcon}>❌</Text>
                    <Text style={styles.delayButtonText}>Ignorer</Text>
                    <Text style={styles.delayButtonSubtext}>Cette fois</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonClose]}
                    onPress={onDismiss}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonIcon}>✕</Text>
                    <Text style={styles.delayButtonText}>Fermer</Text>
                    <Text style={styles.delayButtonSubtext}>Sans action</Text>
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