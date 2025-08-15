import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
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

// Composant choix uniforme
const OPACITY_LEVELS = {
  normal: '20',
  primary: '30',
  primaryBorder: '40',
};

const UniformChoice = React.memo(({ choice, onPress, localStyles, isPrimary = false }) => {
  const primarySubtitleStyle = React.useMemo(() => ({
    color: '#047857',
    fontWeight: '600'
  }), []);

  return (
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
        { backgroundColor: choice.color + OPACITY_LEVELS.normal },
        isPrimary && {
          backgroundColor: choice.color + OPACITY_LEVELS.primary,
          borderWidth: 1,
          borderColor: choice.color + OPACITY_LEVELS.primaryBorder,
        }
      ]}>
        <Ionicons
          name={choice.iconName}
          size={isPrimary ? 22 : 20}
          color={choice.color}
        />
      </View>
      <View style={localStyles.choiceTextContainer}>
        <Text style={[
          localStyles.choiceLabel,
          isPrimary && localStyles.primaryChoiceLabel
        ]}>
          {choice.label}
          {isPrimary && ' ⚡'}
        </Text>
        {choice.subtitle && (
          <Text style={[
            localStyles.choiceSubtitle,
            isPrimary && primarySubtitleStyle
          ]}>
            {choice.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

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
    accent: "#3B82F6",
    warning: "#F59E0B",
  };

  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Méthode pour animer l'entrée du popup
  const animateIn = useCallback(() => {
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
  }, [scaleAnim, opacityAnim]);

  // Méthode pour animer la sortie du popup
  const animateOut = useCallback(() => {
    scaleAnim.setValue(0.95);
    opacityAnim.setValue(0);
  }, [scaleAnim, opacityAnim]);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible, animateIn, animateOut]);

  // Liste des choix hors du useEffect !
  const allChoices = [
    {
      id: 'now',
      iconName: 'flash-outline',
      label: `Réviser (${questionsCount} questions)`,
      subtitle: 'Testez vos connaissances maintenant',
      color: colors.primary,
      isPrimary: true,
    },
    {
      id: 'later_50',
      iconName: 'time-outline',
      label: 'Plus tard (50 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 50} mots`,
      color: colors.accent,
    },
    {
      id: 'later_100',
      iconName: 'hourglass-outline',
      label: 'Plus tard (100 mots)',
      subtitle: `Prochaine révision à ${totalWordsLearned + 100} mots`,
      color: colors.warning,
    },
    {
      id: 'disable',
      iconName: 'close-circle-outline',
      label: 'Désactiver',
      subtitle: 'Vous pourrez réactiver via les paramètres',
      color: '#6B7280',
    },
  ];

  // Callback pour gérer la sélection
  const handleChoicePress = useCallback((id) => () => {
    if (onChoice) onChoice(id);
  }, [onChoice]);

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

// PropTypes pour PopupHeader
PopupHeader.propTypes = {
  colors: PropTypes.object.isRequired,
  totalWordsLearned: PropTypes.number.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour UniformChoice
UniformChoice.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    color: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
  isPrimary: PropTypes.bool,
};

// PropTypes pour le composant principal RevisionPopup
RevisionPopup.propTypes = {
  visible: PropTypes.bool,
  totalWordsLearned: PropTypes.number,
  questionsCount: PropTypes.number,
  onChoice: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default RevisionPopup;
