// HomophoneChoices/index.js - VERSION NETTOYÉE (logique simplifiée)

import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import HeroCard from "../../../../components/ui/HeroCard";
import createStyles from "./style";
import PropTypes from 'prop-types';

/**
 * 👂 HomophoneChoices - Version Nettoyée
 * Logique simplifiée + design cohérent
 * * @param {string} sentence - La phrase avec le blanc à compléter
 * @param {Array} choices - Les choix possibles
 * @param {string} selectedChoice - Le choix actuellement sélectionné
 * @param {function} onSelectChoice - Fonction appelée lors de la sélection
 * @param {boolean} disabled - Si les choix sont désactivés
 * @param {string} levelColor - Couleur du niveau
 */
const HomophoneChoices = ({
  sentence,
  choices = [],
  selectedChoice,
  onSelectChoice,
  disabled = false,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);

  // Handler stable pour la sélection d'un choix
  const handleSelectChoice = useCallback(
    (choice) => () => {
      if (!disabled) {
        onSelectChoice(choice);
      }
    },
    [onSelectChoice, disabled]
  );

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - Phrase avec blanc */}
      <HeroCard 
        content={sentence}
        fontSize={20}
        levelColor={levelColor}
        showUnderline={false}
        style={styles.heroCard}
      />

      {/* ✅ CHOIX MULTIPLES */}
      <Text style={styles.choicesLabel}>Choisissez le mot correct :</Text>

      <View style={styles.choicesGrid}>
        {choices.map((choice, index) => {
          const isSelected = selectedChoice === choice;

          return (
            <TouchableOpacity
              key={choice}
              style={[
                styles.choiceButton,
                isSelected && {
                  borderColor: levelColor,
                  backgroundColor: `${levelColor}15`,
                },
                disabled && styles.disabledChoice
              ]}
              onPress={handleSelectChoice(choice)}
              disabled={disabled}
            >
              <View style={styles.choiceContent}>
                <View style={[
                  styles.choiceIndicator,
                  isSelected && { backgroundColor: levelColor }
                ]}>
                  <Text style={[
                    styles.choiceIndicatorText,
                    isSelected && { color: 'white' }
                  ]}>
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </Text>
                </View>
                
                <Text style={[
                  styles.choiceText,
                  isSelected && { 
                    color: levelColor, 
                    fontWeight: '700' 
                  }
                ]}>
                  {choice}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
HomophoneChoices.propTypes = {
  // 'sentence' est manquant dans la validation
  sentence: PropTypes.string.isRequired,
  // 'choices' est manquant dans la validation
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  // 'selectedChoice' est manquant dans la validation
  selectedChoice: PropTypes.string,
  // 'onSelectChoice' est manquant dans la validation
  onSelectChoice: PropTypes.func.isRequired,
  // 'disabled' est manquant dans la validation
  disabled: PropTypes.bool,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default HomophoneChoices;