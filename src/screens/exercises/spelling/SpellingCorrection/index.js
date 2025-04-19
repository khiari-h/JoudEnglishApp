// src/screens/exercises/spelling/exercises/SpellingCorrection/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour les exercices de correction orthographique
 * 
 * @param {string} wordToCorrect - Mot à corriger
 * @param {string} instruction - Instruction pour l'exercice
 */
const SpellingCorrection = ({ wordToCorrect, instruction }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>{instruction}</Text>
      <Text style={styles.wordToCorrect}>{wordToCorrect}</Text>
    </View>
  );
};

export default SpellingCorrection;