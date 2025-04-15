import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';

/**
 * Composant de navigation pour les phrases
 * 
 * @param {function} onPrevious - Fonction appelée pour aller à la phrase précédente
 * @param {function} onNext - Fonction appelée pour aller à la phrase suivante
 * @param {boolean} disablePrevious - Désactive le bouton précédent
 * @param {boolean} disableNext - Désactive le bouton suivant
 * @param {string} levelColor - Couleur du niveau
 */
const PhrasesNavigation = ({ 
  onPrevious, 
  onNext, 
  disablePrevious, 
  disableNext, 
  levelColor 
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={[
          styles.navigationButton,
          styles.previousButton,
          { 
            backgroundColor: `${levelColor}10`,
            opacity: disablePrevious ? 0.5 : 1
          }
        ]}
        onPress={onPrevious}
        disabled={disablePrevious}
      >
        <Text style={[styles.navigationButtonText, { color: levelColor }]}>
          Précédent
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navigationButton,
          styles.nextButton,
          { 
            backgroundColor: levelColor,
            opacity: disableNext ? 0.5 : 1
          }
        ]}
        onPress={onNext}
        disabled={disableNext}
      >
        <Text style={styles.nextButtonText}>
          Suivant
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhrasesNavigation;