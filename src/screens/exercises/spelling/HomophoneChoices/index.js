// src/screens/exercises/spelling/HomophoneChoices/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher les choix multiples des homophones
 * 
 * @param {string} sentence - La phrase avec le blanc à compléter
 * @param {Array} choices - Les choix possibles
 * @param {string} selectedChoice - Le choix actuellement sélectionné
 * @param {Function} onSelectChoice - Fonction appelée lors de la sélection
 * @param {boolean} disabled - Si les choix sont désactivés
 * @param {string} levelColor - Couleur du niveau
 */
const HomophoneChoices = ({
  sentence,
  choices,
  selectedChoice,
  onSelectChoice,
  disabled = false,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      {/* Phrase avec le blanc */}
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>{sentence}</Text>
      </View>

      {/* Choix multiples */}
      <View style={styles.choicesContainer}>
        <Text style={styles.choicesLabel}>Choose the correct word:</Text>

        <View style={styles.choicesGrid}>
          {choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.choiceButton,
                selectedChoice === choice && [
                  styles.selectedChoice,
                  { borderColor: levelColor }
                ],
                disabled && styles.disabledChoice
              ]}
              onPress={() => !disabled && onSelectChoice(choice)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.choiceText,
                  selectedChoice === choice && [
                    styles.selectedChoiceText,
                    { color: levelColor }
                  ]
                ]}
              >
                {choice}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomophoneChoices;
