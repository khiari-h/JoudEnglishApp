// src/screens/exercises/levelAssessment/AssessmentResults/index.js
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher les résultats de l'évaluation
 * Design complètement repensé - fond clair, couleurs logiques
 */
const AssessmentResults = ({
  level,
  levelColor,
  userScore,
  onContinue,
  onRetry,
}) => {
  // Fallback si pas de score
  if (!userScore) {
    return (
      <ScrollView style={styles.resultsContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.resultsTitle}>ÉVALUATION TERMINÉE</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>Niveau {level}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: levelColor }]}
            onPress={onContinue}
          >
            <Text style={styles.primaryButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Calculs pour l'affichage
  const scoreOutOf20 = Math.round((userScore.percentage / 100) * 20);
  const wrongAnswers = userScore.totalQuestions - userScore.correctAnswers;

  // Système de couleurs LOGIQUE avec messages humoristiques
  const getPerformanceData = (scoreOut20) => {
    if (scoreOut20 >= 16) {
      // 16-20/20 = 80%+
      return {
        title: "Bravo champion ! 🏆",
        subtitle: "Tu maîtrises bien ton affaire !",
        color: "#16a34a", // Vert
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
      };
    } else if (scoreOut20 >= 12) {
      // 12-15/20 = 60-75%
      return {
        title: "Pas mal du tout ! 👌",
        subtitle: "On est sur la bonne voie !",
        color: "#ea580c", // Orange
        backgroundColor: "#fff7ed",
        borderColor: "#fed7aa",
      };
    } else if (scoreOut20 >= 8) {
      // 8-11/20 = 40-55%
      return {
        title: "Hmm... on a vu mieux ! 😬",
        subtitle: "Allez, on remonte la pente !",
        color: "#dc2626", // Rouge modéré
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
      };
    } else {
      // 0-7/20 = 0-35%
      return {
        title: "Oula... c'est chaud ! 🔥",
        subtitle: "Bon, on va pas se mentir, il faut bosser !",
        color: "#b91c1c", // Rouge plus fort
        backgroundColor: "#fef2f2",
        borderColor: "#fca5a5",
      };
    }
  };

  const performance = getPerformanceData(scoreOutOf20);

  return (
    <ScrollView
      style={styles.resultsContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.resultsTitle}>ÉVALUATION TERMINÉE</Text>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>Niveau {level}</Text>
        </View>
      </View>

      {/* Carte de score principale */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Votre Score</Text>

        {/* Cercle de score avec couleur logique */}
        <View
          style={[
            styles.scoreCircle,
            {
              borderColor: performance.color,
              backgroundColor: performance.backgroundColor,
            },
          ]}
        >
          <Text style={[styles.mainScore, { color: performance.color }]}>
            {scoreOutOf20}/20
          </Text>
          <Text style={styles.percentageScore}>
            ({userScore.percentage.toFixed(1)}%)
          </Text>
        </View>

        {/* Statistiques avec couleurs logiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#16a34a" }]}>
              {userScore.correctAnswers}
            </Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#dc2626" }]}>
              {wrongAnswers}
            </Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#475569" }]}>
              {userScore.totalQuestions}
            </Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Message de performance */}
      <View
        style={[
          styles.performanceSection,
          {
            backgroundColor: performance.backgroundColor,
            borderColor: performance.borderColor,
          },
        ]}
      >
        <Text style={[styles.performanceMessage, { color: performance.color }]}>
          {performance.title}
        </Text>
        <Text
          style={[styles.performanceSubtitle, { color: performance.color }]}
        >
          {performance.subtitle}
        </Text>
      </View>

      {/* Boutons d'action */}
      <View style={styles.buttonsContainer}>
        {/* Bouton Try Again pour scores < 12/20 */}
        {onRetry && scoreOutOf20 < 12 && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: performance.color }]}
            onPress={onRetry}
          >
            <Text
              style={[styles.secondaryButtonText, { color: performance.color }]}
            >
              Recommencer
            </Text>
          </TouchableOpacity>
        )}

        {/* Bouton principal */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: levelColor }]}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AssessmentResults;

