// src/components/screens/exercises/errorCorrection/modes/FullCorrectionMode/index.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import Card from "../../../../../components/ui/Card";
import styles from "./style";

/**
 * Composant pour le mode de correction complète
 */
const FullCorrectionMode = ({
  exercise,
  userCorrection,
  onChangeUserCorrection,
  showFeedback = false,
  isCorrect = false,
  levelColor = "#5E60CE",
}) => {
  if (!exercise) return null;

  return (
    <Card
      title="Correction complète"
      headerIcon="create-outline"
      headerIconColor={levelColor}
      style={styles.card}
    >
      <View style={styles.originalTextContainer}>
        <Text style={styles.originalTextLabel}>Texte original :</Text>
        <Text style={styles.originalText}>{exercise.text}</Text>
      </View>

      <TextInput
        style={[
          styles.correctionInput,
          showFeedback &&
            (isCorrect ? styles.correctInput : styles.incorrectInput),
        ]}
        value={userCorrection}
        onChangeText={onChangeUserCorrection}
        multiline
        placeholder="Tapez le texte corrigé ici..."
        placeholderTextColor="#94a3b8"
        editable={!showFeedback}
      />
    </Card>
  );
};

export default FullCorrectionMode;

