// src/components/screens/exercises/errorCorrection/modes/MultipleChoiceMode/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../../components/ui/Card";
import styles from "./style";

/**
 * Composant pour le mode choix multiple
 */
const MultipleChoiceMode = ({
  exercise,
  selectedChoiceIndex,
  onSelectChoice,
  showFeedback = false,
  levelColor = "#5E60CE",
}) => {
  if (!exercise) return null;

  return (
    <Card
      title="Choix multiple"
      headerIcon="list-outline"
      headerIconColor={levelColor}
      style={styles.card}
    >
      <View style={styles.originalTextContainer}>
        <Text style={styles.originalTextLabel}>Texte original :</Text>
        <Text style={styles.originalText}>{exercise.text}</Text>
      </View>

      <Text style={styles.choicesLabel}>Choisir la version correcte :</Text>

      <View style={styles.choicesContainer}>
        {(exercise.choices || []).map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.choiceOption,
              selectedChoiceIndex === index && [
                styles.selectedChoiceOption,
                { borderColor: levelColor },
              ],
              showFeedback &&
                index === exercise.correctChoiceIndex &&
                styles.correctChoiceOption,
              showFeedback &&
                selectedChoiceIndex === index &&
                selectedChoiceIndex !== exercise.correctChoiceIndex &&
                styles.incorrectChoiceOption,
            ]}
            onPress={() => onSelectChoice(index)}
            disabled={showFeedback}
          >
            <Text
              style={[
                styles.choiceOptionText,
                selectedChoiceIndex === index && { color: levelColor },
                showFeedback &&
                  index === exercise.correctChoiceIndex &&
                  styles.correctChoiceOptionText,
                showFeedback &&
                  selectedChoiceIndex === index &&
                  selectedChoiceIndex !== exercise.correctChoiceIndex &&
                  styles.incorrectChoiceOptionText,
              ]}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};

export default MultipleChoiceMode;

