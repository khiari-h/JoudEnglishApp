// src/screens/exercises/spelling/exercises/SpellingRule/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour les exercices sur les règles d'orthographe
 * 
 * @param {string} rule - Règle d'orthographe à apprendre
 * @param {string} instruction - Instruction pour l'exercice
 */
const SpellingRule = ({ rule, instruction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{rule}</Text>
      </View>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
};

export default SpellingRule;