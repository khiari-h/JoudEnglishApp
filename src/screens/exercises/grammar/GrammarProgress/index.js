// src/components/screens/exercises/grammar/GrammarProgress/index.js
import React from "react";
import { View, Text } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Composant pour afficher la progression dans les exercices de grammaire
 * Version unifiée et améliorée avec ProgressBar de base
 * 
 * @param {number} progress - Pourcentage de progression (0-100) basé sur exercices COMPLÉTÉS
 * @param {number} currentExercise - Index de l'exercice actuel (commençant par 1)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {number} completedCount - Nombre d'exercices complétés ✅ NOUVEAU
 * @param {string} levelColor - Couleur du niveau actuel
 * @param {string} ruleTitle - Titre de la règle grammaticale actuelle
 * @param {Object} style - Styles personnalisés
 */
const GrammarProgress = ({
  progress = 0,
  currentExercise = 1,
  totalExercises = 0,
  completedCount = 0,     // ✅ NOUVEAU pour cohérence
  levelColor = "#3b82f6",
  ruleTitle,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Header avec titre et compteur */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {ruleTitle || "Progression Grammaire"}
        </Text>
        <Text style={styles.counter}>
          Exercise {currentExercise}/{totalExercises}
        </Text>
      </View>

      {/* ProgressBar unifiée */}
      <ProgressBar
        progress={progress}
        showPercentage={true}
        showValue={false}  // On affiche déjà dans le header
        height={8}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={4}
        animated={true}
        labelPosition="none"
        percentageFormatter={(percentage) => `Completed: ${completedCount}/${totalExercises} (${percentage}%)`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default GrammarProgress;