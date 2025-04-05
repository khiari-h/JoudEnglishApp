// src/components/exercise-common/NavigationButtons/index.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

/**
 * Boutons de navigation pour passer d'un exercice à l'autre
 * dans une série d'exercices
 */
const NavigationButtons = ({
  onNext,
  onPrevious,
  onSkip,
  currentIndex,
  totalCount,
  disablePrevious = false,
  disableNext = false,
  showSkip = true,
  primaryColor = '#5E60CE',
  buttonLabels = {
    previous: 'Précédent',
    next: 'Suivant',
    skip: 'Passer',
    finish: 'Terminer',
  },
  variant = 'standard', // 'standard', 'compact', 'centered'
}) => {
  // Déterminer si on est sur le dernier exercice
  const isLastItem = currentIndex === totalCount - 1;
  
  // Label pour le bouton suivant (Suivant ou Terminer si dernier item)
  const nextButtonLabel = isLastItem ? buttonLabels.finish : buttonLabels.next;
  
  // Rendu pour la version standard (boutons alignés)
  const renderStandard = () => (
    <View style={styles.standardContainer}>
      {/* Bouton précédent (sauf si désactivé) */}
      {!disablePrevious && (
        <TouchableOpacity
          style={styles.previousButton}
          onPress={onPrevious}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={20} color="#6B7280" />
          <Text style={styles.previousButtonText}>{buttonLabels.previous}</Text>
        </TouchableOpacity>
      )}
      
      {/* Bouton passer (si activé) */}
      {showSkip && onSkip && !isLastItem && (
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={onSkip}
        >
          <Text style={styles.skipButtonText}>{buttonLabels.skip}</Text>
        </TouchableOpacity>
      )}
      
      {/* Bouton suivant */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          { backgroundColor: primaryColor },
          disableNext && styles.disabledButton
        ]}
        onPress={onNext}
        disabled={disableNext}
      >
        <Text style={styles.nextButtonText}>{nextButtonLabel}</Text>
        <Ionicons 
          name={isLastItem ? "checkmark" : "chevron-forward"} 
          size={20} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
  
  // Rendu pour la version compacte (juste des icônes)
  const renderCompact = () => (
    <View style={styles.compactContainer}>
      <View style={styles.compactButtonsRow}>
        {/* Bouton précédent */}
        <TouchableOpacity
          style={[
            styles.compactButton,
            currentIndex === 0 && styles.disabledCompactButton
          ]}
          onPress={onPrevious}
          disabled={currentIndex === 0 || disablePrevious}
        >
          <Ionicons name="chevron-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        
        {/* Indicateur de progression */}
        <Text style={styles.progressIndicator}>
          {currentIndex + 1}/{totalCount}
        </Text>
        
        {/* Bouton suivant */}
        <TouchableOpacity
          style={[
            styles.compactButton,
            { backgroundColor: primaryColor },
            disableNext && styles.disabledCompactButton
          ]}
          onPress={onNext}
          disabled={disableNext}
        >
          <Ionicons 
            name={isLastItem ? "checkmark" : "chevron-forward"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Bouton passer */}
      {showSkip && onSkip && !isLastItem && (
        <TouchableOpacity 
          style={styles.compactSkipButton} 
          onPress={onSkip}
        >
          <Text style={styles.compactSkipButtonText}>{buttonLabels.skip}</Text>
          <Ionicons name="play-skip-forward" size={16} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  );
  
  // Rendu pour la version centrée (boutons alignés verticalement)
  const renderCentered = () => (
    <View style={styles.centeredContainer}>
      {/* Bouton suivant (au-dessus) */}
      <TouchableOpacity
        style={[
          styles.centeredNextButton,
          { backgroundColor: primaryColor },
          disableNext && styles.disabledButton
        ]}
        onPress={onNext}
        disabled={disableNext}
      >
        <Text style={styles.centeredNextButtonText}>{nextButtonLabel}</Text>
        <Ionicons 
          name={isLastItem ? "checkmark" : "chevron-forward"} 
          size={20} 
          color="white" 
        />
      </TouchableOpacity>
      
      {/* Bouton précédent (en dessous) */}
      {!disablePrevious && (
        <TouchableOpacity
          style={styles.centeredPreviousButton}
          onPress={onPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.centeredPreviousButtonText}>
            {buttonLabels.previous}
          </Text>
        </TouchableOpacity>
      )}
      
      {/* Bouton passer */}
      {showSkip && onSkip && !isLastItem && (
        <TouchableOpacity 
          style={styles.centeredSkipButton} 
          onPress={onSkip}
        >
          <Text style={styles.centeredSkipButtonText}>{buttonLabels.skip}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  // Choisir le rendu en fonction de la variante
  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'centered':
      return renderCentered();
    case 'standard':
    default:
      return renderStandard();
  }
};

export default NavigationButtons;
