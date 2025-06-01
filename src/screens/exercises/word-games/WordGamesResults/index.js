// src/screens/exercises/wordGames/WordGamesResults/index.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Écran de résultats pour les jeux de mots
 * 
 * @param {Array} games - Liste des jeux joués
 * @param {Array} gameResults - Résultats pour chaque jeu
 * @param {number} score - Score total
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onPlayAgain - Fonction appelée pour rejouer
 * @param {Function} onExit - Fonction appelée pour quitter
 */
const WordGamesResults = ({
  games,
  gameResults,
  score,
  levelColor,
  onPlayAgain,
  onExit
}) => {
  // Calculer le score total et le pourcentage
  const totalMaxScore = gameResults.reduce(
    (sum, result) => sum + result.maxScore,
    0
  );
  const percentage = Math.round((score / totalMaxScore) * 100) || 0;

  // Déterminer le message de feedback en fonction du pourcentage
  const getFeedbackMessage = () => {
    if (percentage >= 80) {
      return "Excellent! You have great word skills.";
    } else if (percentage >= 60) {
      return "Good job! Keep practicing to improve your vocabulary.";
    } else {
      return "Keep working on your word skills. Practice makes perfect!";
    }
  };

  return (
    <ScrollView
      style={styles.resultsContainer}
      contentContainerStyle={styles.resultsContent}
    >
      <View style={styles.resultsCard}>
        <Text style={styles.resultsTitle}>Games Complete!</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>
            {score}/{totalMaxScore}
          </Text>
        </View>

        <Text style={styles.resultsFeedback}>
          {getFeedbackMessage()}
        </Text>

        <View style={styles.gamesReview}>
          <Text style={styles.reviewTitle}>Games Review:</Text>

          {games.map((game, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewGameType}>
                  {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                </Text>
                <Text style={styles.reviewScore}>
                  {gameResults[index].score}/{gameResults[index].maxScore}
                </Text>
              </View>
              {game.title && (
                <Text style={styles.reviewGameTitle}>{game.title}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.resultsButtons}>
          <TouchableOpacity
            style={[styles.resultsButton, { backgroundColor: levelColor }]}
            onPress={onPlayAgain}
          >
            <Text style={styles.resultsButtonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.resultsButton,
              styles.secondaryButton,
              { borderColor: levelColor },
            ]}
            onPress={onExit}
          >
            <Text style={[styles.resultsButtonText, { color: levelColor }]}>
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default WordGamesResults;
