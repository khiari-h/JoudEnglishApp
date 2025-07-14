// src/components/exercise-common/ExerciseFooter/index.js
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

/**
 * Pied de page standardisé pour tous les écrans d'exercices 
 * avec boutons de navigation et validation
 */
const ExerciseFooter = ({
  primaryLabel = 'Continuer',
  secondaryLabel = 'Précédent',
  onPrimaryPress,
  onSecondaryPress,
  showSecondary = true,
  showCheck = false,
  isDisabled = false,
  color = '#5E60CE',
  isLastQuestion = false,
  hideSkip = false,
  onSkip,
  skipLabel = 'Passer'
}) => {
  // Ajustement du label pour le dernier exercice
  const finalPrimaryLabel = isLastQuestion ? 'Terminer' : primaryLabel;

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {showSecondary ? (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSecondaryPress}
          >
            <Ionicons name="chevron-back" size={20} color="#6B7280" />
            <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {!hideSkip && onSkip && (
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={onSkip}
          >
            <Text style={styles.skipText}>{skipLabel}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: color },
            isDisabled && styles.disabledButton
          ]}
          onPress={onPrimaryPress}
          disabled={isDisabled}
        >
          <Text style={styles.primaryButtonText}>{finalPrimaryLabel}</Text>
          {showCheck ? (
            <Ionicons name="checkmark" size={20} color="white" />
          ) : (
            <Ionicons name="chevron-forward" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseFooter;
