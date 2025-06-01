// src/components/screens/exercises/reading/ReadingProgressBar/index.js
import React from "react";
import { View, Text } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour les exercices de lecture
 * Version unifiée suivant le pattern des autres modules
 * Structure : Exercises → Questions (2 niveaux comme Grammar)
 * 
 * @param {number} currentExercise - Index de l'exercice actuel (1-based)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {number} currentQuestion - Index de la question actuelle (1-based)  
 * @param {number} totalQuestions - Nombre de questions dans l'exercice actuel
 * @param {number} completedQuestionsInExercise - Questions complétées dans l'exercice actuel
 * @param {string} exerciseTitle - Titre de l'exercice actuel
 * @param {string} levelColor - Couleur du niveau
 */
const ReadingProgressBar = ({
  currentExercise = 1,
  totalExercises = 0,
  currentQuestion = 1,
  totalQuestions = 0,
  completedQuestionsInExercise = 0,
  exerciseTitle = "",
  levelColor = "#3b82f6"
}) => {
  // ✅ Progression de l'exercice actuel basée sur questions complétées
  const exerciseProgress = totalQuestions > 0 
    ? Math.round((completedQuestionsInExercise / totalQuestions) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Header avec titre exercice et compteurs */}
      <View style={styles.headerContainer}>
        <Text style={styles.exerciseTitle} numberOfLines={1}>
          {exerciseTitle || `Exercise ${currentExercise}`}
        </Text>
        <Text style={styles.exerciseCounter}>
          {currentExercise}/{totalExercises}
        </Text>
      </View>

      {/* Compteur questions */}
      <View style={styles.questionCounterContainer}>
        <Text style={styles.questionCounter}>
          Question {currentQuestion}/{totalQuestions}
        </Text>
        <Text style={styles.completionInfo}>
          Completed: {completedQuestionsInExercise}/{totalQuestions}
        </Text>
      </View>

      {/* ProgressBar unifiée */}
      <ProgressBar
        progress={exerciseProgress}
        showPercentage
        showValue={false}  // On affiche déjà dans le header
        height={8}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={4}
        animated
        labelPosition="none"
        percentageFormatter={(percentage) => `${percentage}% of exercise completed`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default ReadingProgressBar;