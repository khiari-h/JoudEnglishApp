import React, { useContext, useCallback, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../../../contexts/ThemeContext';
import styles from './style';

// Sous-composant PopupHeader
const PopupHeader = ({ colors, totalWordsLearned, localStyles }) => (
  <View style={localStyles.header}>
    <Text style={localStyles.celebration}>🏆</Text>
    <Text style={[localStyles.mainTitle, { color: colors.text }]}>Prêt pour une révision ?</Text>
    <Text style={[localStyles.wordsCounter, { color: colors.textSecondary }]}>
      Vous avez appris {totalWordsLearned} mots !
    </Text>
  </View>
);

// ✅ COMPOSANT UNIFIÉ - avec effet visuel pour le principal
const UniformChoice = ({ choice, onPress, localStyles, isPrimary = false }) => (
  <TouchableOpacity
    style={[
      localStyles.choiceButton,
      isPrimary && localStyles.primaryChoiceModifier,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[
      localStyles.choiceIconContainer, 
      { backgroundColor: choice.color + '20' },
      // ✅ Icône plus marquée pour le principal
      isPrimary && { 
        backgroundColor: choice.color + '30',
        borderWidth: 1,
        borderColor: choice.color + '40',
      }
    ]}>
      <Ionicons 
        name={choice.iconName} 
        size={isPrimary ? 22 : 20} // ✅ Icône plus grosse pour le principal
        color={choice.color} 
      />
    </View>
    <View style={localStyles.choiceTextContainer}>
      <Text style={[
        localStyles.choiceLabel,
        isPrimary && localStyles.primaryChoiceLabel
      ]}>
        {choice.label}
        {isPrimary && ' ⚡'} {/* ✅ Petit emoji pour le principal */}
      </Text>
      {choice.subtitle && (
        <Text style={[
          localStyles.choiceSubtitle,
          isPrimary && { color: '#047857', fontWeight: '600' } // ✅ Subtitle plus foncé pour le principal
        ]}>
          {choice.subtitle}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

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

  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleChoicePress = useCallback((id) => () => onChoice?.(id), [onChoice]);

  // ✅ TOUTES LES OPTIONS avec le même format
  const allChoices = [
    {
      id: 'now',
      iconName: 'flash-outline',
      label: `Réviser (${questionsCount} questions)`,
      subtitle: 'Testez vos connaissances maintenant',
      color: colors?.primary || '#10B981',
      isPrimary: true, // ✅ Flag pour styling subtil
    },
    {
      id: 'later_50',
      iconName: 'time-outline',
      label: 'Plus tard (50 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 50} mots`,
      color: colors?.accent || '#3B82F6',
    },
    {
      id: 'later_100',
      iconName: 'hourglass-outline',
      label: 'Plus tard (100 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 100} mots`,
      color: '#F59E0B',
    },
    {
      id: 'disable',
      iconName: 'close-circle-outline',
      label: 'Désactiver',
      subtitle: 'Vous pourrez réactiver via les paramètres',
      color: '#6B7280',
    },
  ];

  const animatedContainerStyle = {
    opacity: opacityAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.popupContainer, animatedContainerStyle]}>
          <PopupHeader
            colors={colors}
            totalWordsLearned={totalWordsLearned}
            localStyles={styles}
          />
          <View style={styles.body}>
            {/* ✅ LISTE UNIFORME de toutes les options */}
            <View style={styles.choicesContainer}>
              {allChoices.map((choice) => (
                <UniformChoice
                  key={choice.id}
                  choice={choice}
                  onPress={handleChoicePress(choice.id)}
                  localStyles={styles}
                  isPrimary={choice.isPrimary}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default RevisionPopup;