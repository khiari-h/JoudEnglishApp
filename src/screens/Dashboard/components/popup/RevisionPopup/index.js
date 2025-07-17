import { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../../../contexts/ThemeContext';
import styles from './style';

const RevisionPopup = ({
  visible = false,
  totalWordsLearned = 50,
  questionsCount = 10,
  onChoice,
  onDismiss,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    primary: "#10B981",
    accent: "#3B82F6"
  };

  if (!visible) return null;

  const handleChoicePress = useCallback((id) => () => onChoice?.(id), [onChoice]);

  const choices = [
    {
      id: 'now',
      icon: <Ionicons name="flash" size={22} color="#fff" style={{ marginRight: 8 }} />, 
      label: 'Réviser maintenant',
      subtitle: `${questionsCount} questions • ~3 min`,
      color: colors.primary,
      primary: true
    },
    {
      id: 'later_50',
      icon: <Ionicons name="time" size={20} color={colors.accent} style={{ marginRight: 8 }} />, 
      label: 'Plus tard (50 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 50} mots`,
      color: colors.accent
    },
    {
      id: 'later_100',
      icon: <Ionicons name="hourglass" size={20} color="#F59E0B" style={{ marginRight: 8 }} />, 
      label: 'Plus tard (100 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 100} mots`,
      color: '#F59E0B'
    },
    {
      id: 'disable',
      icon: <Ionicons name="close-circle" size={20} color="#6B7280" style={{ marginRight: 8 }} />, 
      label: 'Désactiver la révision automatique',
      subtitle: 'Vous pourrez la réactiver dans les paramètres',
      color: '#6B7280'
    }
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Animated.View style={styles.animatedPopup}>
          <BlurView intensity={Platform.OS === 'ios' ? 60 : 40} tint="light" style={styles.blurCard}>
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <Text style={styles.celebration}>🎯</Text>
              <Text style={styles.mainTitle}>Prêt pour une révision ?</Text>
              <Text style={styles.wordsCounter}>{totalWordsLearned} mots appris</Text>
              <Text style={styles.motivation}>Consolidez vos acquis !</Text>
            </LinearGradient>

            <View style={styles.choicesContainer}>
              {choices.map((choice, idx) => (
                <TouchableOpacity
                  key={choice.id}
                  style={[
                    styles.choiceButton,
                    choice.primary
                      ? styles.choiceButtonPrimary
                      : styles.choiceButtonSecondary,
                    { marginTop: idx === 0 ? 0 : 14, borderColor: choice.color }
                  ]}
                  onPress={handleChoicePress(choice.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.choiceContent}>
                    {choice.icon}
                    <View style={styles.choiceTexts}>
                      <Text style={[
                        styles.choiceLabel,
                        choice.primary ? styles.choiceLabelPrimary : styles.choiceLabelSecondary
                      ]}>
                        {choice.label}
                      </Text>
                      <Text style={styles.choiceSubtitle}>{choice.subtitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.footerNote}>
              <Ionicons name="settings-outline" size={16} color={colors.textSecondary} style={{ marginRight: 4 }} />
              <Text style={styles.noteText}>
                Vous pouvez modifier vos préférences à tout moment
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default RevisionPopup;
