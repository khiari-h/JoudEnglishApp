// src/components/screens/exercises/errorCorrection/modes/IdentifyErrorsMode/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../../components/ui/Card";
import styles from "./style";

/**
 * Composant pour le mode d'identification des erreurs
 */
const IdentifyErrorsMode = ({
  exercise,
  selectedErrorIndices = [],
  onToggleErrorIndex,
  showFeedback = false,
  levelColor = "#5E60CE",
}) => {
  if (!exercise) return null;

  // Diviser le texte en mots
  const words = exercise.text.split(" ");

  return (
    <Card
      title="Identifier les erreurs"
      headerIcon="search-outline"
      headerIconColor={levelColor}
      style={styles.card}
    >
      <Text style={styles.instructionText}>
        Toucher les mots qui contiennent des erreurs :
      </Text>

      <View style={styles.wordsContainer}>
        {words.map((word, index) => {
          const isSelected = selectedErrorIndices.includes(index);
          const isHighlighted =
            showFeedback && (exercise.errorPositions || []).includes(index);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => !showFeedback && onToggleErrorIndex(index)}
              disabled={showFeedback}
              style={[
                styles.word,
                isSelected && [
                  styles.selectedWord,
                  {
                    backgroundColor: `${levelColor}20`,
                    borderColor: levelColor,
                  },
                ],
                showFeedback && isHighlighted && styles.highlightedWord,
              ]}
            >
              <Text
                style={[
                  styles.wordText,
                  isSelected && { color: levelColor, fontWeight: "600" },
                  showFeedback && isHighlighted && styles.highlightedWordText,
                ]}
              >
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!showFeedback && (
        <Text style={styles.identifyHelp}>
          Vous devez trouver {exercise.errorPositions?.length || "?"} erreur(s).
        </Text>
      )}
    </Card>
  );
};

export default IdentifyErrorsMode;

