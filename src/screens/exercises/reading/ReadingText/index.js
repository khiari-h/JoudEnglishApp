// src/components/screens/exercises/reading/ReadingText/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../ui/Card";
import styles from "./style";

/**
 * Composant pour afficher le texte de lecture avec possibilité de réduire/étendre
 */
const ReadingText = ({
  exercise,
  textExpanded,
  onToggleExpand,
  onWordPress,
  levelColor,
}) => {
  if (!exercise) return null;

  return (
    <Card
      title={exercise.title}
      headerIcon="book-outline"
      headerIconColor={levelColor}
    >
      {textExpanded ? (
        <View style={styles.textContainer}>
          {exercise.text.split(" ").map((word, index) => {
            // Supprimer la ponctuation pour vérifier le vocabulaire
            const cleanWord = word.replace(/[.,!?;:""]/g, "");
            const hasDefinition =
              exercise.vocabulary && exercise.vocabulary[cleanWord];

            return (
              <TouchableOpacity
                key={index}
                disabled={!hasDefinition}
                onPress={() => hasDefinition && onWordPress(cleanWord)}
                style={styles.wordContainer}
              >
                <Text
                  style={[
                    styles.word,
                    hasDefinition && styles.highlightedWord,
                  ]}
                >
                  {word}{" "}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <Text style={styles.collapsedText}>
          {exercise.text.substring(0, 100)}...
        </Text>
      )}

      <TouchableOpacity
        style={[styles.expandButton, { borderColor: levelColor }]}
        onPress={onToggleExpand}
      >
        <Text style={[styles.expandButtonText, { color: levelColor }]}>
          {textExpanded ? "Collapse Text" : "Expand Text"}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

export default ReadingText;