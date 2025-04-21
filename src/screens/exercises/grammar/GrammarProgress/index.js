// src/components/screens/exercises/grammar/GrammarProgress/index.js
import React from "react";
import { View, Text } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Composant pour afficher la progression dans les exercices de grammaire
 * Version indépendante et standardisée
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentExercise - Index de l'exercice actuel (commençant par 1)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {string} levelColor - Couleur du niveau actuel
 * @param {string} ruleTitle - Titre de la règle grammaticale actuelle
 */
const GrammarProgress = ({
  progress = 0,
  currentExercise = 1,
  totalExercises = 0,
  levelColor = "#3b82f6",
  ruleTitle,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {ruleTitle ? `${ruleTitle}` : "Progression"}
        </Text>
        <Text style={styles.counter}>
          {currentExercise}/{totalExercises}
        </Text>
      </View>
      <ProgressBar
        progress={progress}
        showPercentage={false}
        fillColor={levelColor}
        height={8}
        animated={true}
        style={styles.progressBar}
      />
    </View>
  );
};

export default GrammarProgress;