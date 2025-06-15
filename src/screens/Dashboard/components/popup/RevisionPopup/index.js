// src/components/popups/RevisionPopup/index.js - VERSION ULTRA-SIMPLE
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Contextes
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './style';

const RevisionPopup = ({
  visible = false,
  questionsCount = 5,
  currentLevel = "mixed",
  onReviseNow,
  onSnoozeLater,
  onDismiss,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    primary: "#8B5CF6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // ========== HANDLERS SIMPLES ==========
  const handleReviseNow = async () => {
    onDismiss?.();
    
    if (onReviseNow) {
      await onReviseNow();
    }
    
    // Navigation simple vers révision
    router.push({
      pathname: "/(tabs)/vocabularyRevision",
      params: {
        level: currentLevel,
        questionsCount,
        source: 'popup_trigger'
      }
    });
  };

  const handleSnoozeLater = async () => {
    await onSnoozeLater?.();
    onDismiss?.();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#A855F7']}
            style={styles.gradientBackground}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.mainEmoji}>🧠</Text>
              <Text style={styles.congratsTitle}>Temps de réviser !</Text>
              <Text style={styles.achievementText}>
                {questionsCount} questions vous attendent
              </Text>
            </View>

            {/* Content */}
            <View style={[styles.content, { backgroundColor: colors.surface }]}>
              <Text style={[styles.motivationText, { color: colors.text }]}>
                Renforcez votre mémoire en quelques minutes !
              </Text>
              
              {/* Stats simples */}
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
                  <Text style={[styles.statNumber, { color: '#10B981' }]}>
                    ~3min
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    durée
                  </Text>
                </View>
              </View>

              {/* Boutons simples */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleReviseNow}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Réviser maintenant</Text>
                </TouchableOpacity>

                <View style={styles.delayButtons}>
                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonSnooze]}
                    onPress={handleSnoozeLater}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonText}>Plus tard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.delayButton, styles.delayButtonIgnore]}
                    onPress={onDismiss}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.delayButtonText}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default RevisionPopup;