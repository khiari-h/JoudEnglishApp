// src/screens/exercises/levelAssessment/AssessmentResults/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher les résultats de l'évaluation avec système de notation
 * Compatible avec l'index existant - fonctionne avec ou sans userScore
 * 
 * @param {string} level - Niveau de langue
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Object} userScore - Score de l'utilisateur (optionnel)
 * @param {Function} onContinue - Fonction appelée quand l'utilisateur continue
 * @param {Function} onRetry - Fonction pour recommencer (optionnel)
 */
const AssessmentResults = ({ 
  level, 
  levelColor, 
  userScore, // Peut être undefined si pas encore implémenté
  onContinue,
  onRetry 
}) => {
  
  // Si userScore n'est pas fourni, afficher la version basique
  if (!userScore) {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Assessment Complete!</Text>
        <Text style={styles.resultsFeedback}>
          Thank you for completing the level {level} assessment.
        </Text>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: levelColor }]}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Version avec notation si userScore est fourni
  const scoreOutOf20 = Math.round((userScore.percentage / 100) * 20);
  
  // Messages de performance
  const getPerformanceMessage = (percentage) => {
    if (percentage >= 85) return "Excellent work! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  // Couleurs du score
  const getScoreColor = (percentage) => {
    if (percentage >= 85) return "#10B981";
    if (percentage >= 70) return "#F59E0B";
    if (percentage >= 60) return "#F97316";
    return "#EF4444";
  };

  const performanceMessage = getPerformanceMessage(userScore.percentage);
  const scoreColor = getScoreColor(userScore.percentage);

  return (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Assessment Complete!</Text>
      
      {/* Section Score */}
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>Your Score</Text>
        <Text style={[styles.mainScore, { color: scoreColor }]}>
          {scoreOutOf20}/20
        </Text>
        <Text style={styles.percentageScore}>
          ({userScore.percentage.toFixed(1)}%)
        </Text>
        
        {/* Détails du score */}
        <View style={styles.scoreDetails}>
          <Text style={styles.scoreDetailText}>
            {userScore.correctAnswers} correct out of {userScore.totalQuestions} questions
          </Text>
        </View>
        
        {/* Message de performance */}
        <Text style={[styles.performanceMessage, { color: scoreColor }]}>
          {performanceMessage}
        </Text>
      </View>

      <Text style={styles.resultsFeedback}>
        Thank you for completing the level {level} assessment.
      </Text>

      {/* Boutons d'action */}
      <View style={styles.buttonContainer}>
        {/* Bouton Try Again seulement si score < 70% et fonction fournie */}
        {onRetry && userScore.percentage < 70 && (
          <TouchableOpacity
            style={[styles.retryButton, { borderColor: levelColor }]}
            onPress={onRetry}
          >
            <Text style={[styles.retryButtonText, { color: levelColor }]}>
              Try Again
            </Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: levelColor }]}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssessmentResults;