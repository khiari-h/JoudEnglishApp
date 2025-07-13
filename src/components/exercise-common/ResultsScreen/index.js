// src/components/exercise-common/ResultsScreen/index.js

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import styles from "./style";

/**
 * Écran de résultats pour afficher le score et les statistiques
 * à la fin d'une série d'exercices
 */
const ResultsScreen = ({
  totalQuestions = 0,
  correctAnswers = 0,
  incorrectAnswers = 0,
  skippedAnswers = 0,
  timeTaken = "00:00",
  exerciseType = "exercise",
  level = "A1",
  levelColor = "#3b82f6",
  feedback = "",
  onRetry = () => {},
  onContinue = () => {},
  showDetailedResults = false,
  detailedResults = [],
}) => {


  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Calculer le pourcentage de réussite
  const successPercentage =
    Math.round((correctAnswers / totalQuestions) * 100) || 0;

  // Déterminer les messages et couleurs en fonction du score
  const getPerformanceData = () => {
    if (successPercentage >= 80) {
      return {
        title: "Excellent!",
        message: "Vous maîtrisez ce niveau.",
        color: "#10B981",
        icon: "trophy",
      };
    } else if (successPercentage >= 60) {
      return {
        title: "Bien joué!",
        message: "Vous progressez bien.",
        color: "#3B82F6",
        icon: "thumbs-up",
      };
    } else if (successPercentage >= 40) {
      return {
        title: "Pas mal!",
        message: "Continuez à pratiquer.",
        color: "#F59E0B",
        icon: "fitness",
      };
    } else {
      return {
        title: "Continuez vos efforts",
        message: "Vous pouvez vous améliorer.",
        color: "#EF4444",
        icon: "school",
      };
    }
  };

  const { title, message, color, icon } = getPerformanceData();

  // Partager les résultats
  const shareResults = async () => {
    try {
      await Share.share({
        message: `J'ai obtenu ${correctAnswers}/${totalQuestions} (${successPercentage}%) dans mon exercice de ${exerciseType} niveau ${level} sur l'application JOUD English!`,
        title: "Mes résultats d'apprentissage",
      });
    } catch (error) {

    }
  };

  // Effet pour lancer les animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          styles.resultsCard,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
          <Text style={styles.exerciseType}>{exerciseType}</Text>
        </View>

        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: color }]}>
            <Ionicons name={icon} size={36} color={color} />
            <Text style={[styles.scorePercentage, { color }]}>
              {successPercentage}%
            </Text>
            <Text style={styles.scoreRatio}>
              {correctAnswers}/{totalQuestions}
            </Text>
          </View>

          <View style={styles.scoreSummary}>
            <Text style={styles.scoreTitle}>{title}</Text>
            <Text style={styles.scoreMessage}>{message}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#ECFDF5" }]}
            >
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <Text style={styles.statLabel}>Correctes</Text>
            <Text style={styles.statValue}>{correctAnswers}</Text>
          </View>

          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#FEF2F2" }]}
            >
              <Ionicons name="close-circle" size={24} color="#EF4444" />
            </View>
            <Text style={styles.statLabel}>Incorrectes</Text>
            <Text style={styles.statValue}>{incorrectAnswers}</Text>
          </View>

          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#F3F4F6" }]}
            >
              <Ionicons name="play-skip-forward" size={24} color="#6B7280" />
            </View>
            <Text style={styles.statLabel}>Passées</Text>
            <Text style={styles.statValue}>{skippedAnswers}</Text>
          </View>

          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#EFF6FF" }]}
            >
              <Ionicons name="time" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statLabel}>Temps</Text>
            <Text style={styles.statValue}>{timeTaken}</Text>
          </View>
        </View>

        {feedback ? (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>Conseils pour progresser</Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}

        {showDetailedResults && detailedResults.length > 0 && (
          <View style={styles.detailedResultsContainer}>
            <Text style={styles.detailedResultsTitle}>Détail des réponses</Text>

            {detailedResults.map((result, index) => (
              <View key={index} style={styles.detailedResultItem}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>
                    Question {index + 1}
                  </Text>
                  <Ionicons
                    name={
                      result.isCorrect
                        ? "checkmark-circle"
                        : result.isSkipped
                        ? "play-skip-forward"
                        : "close-circle"
                    }
                    size={20}
                    color={
                      result.isCorrect
                        ? "#10B981"
                        : result.isSkipped
                        ? "#6B7280"
                        : "#EF4444"
                    }
                  />
                </View>

                <Text style={styles.questionText}>{result.question}</Text>

                <View style={styles.answersContainer}>
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Votre réponse:</Text>
                    <Text
                      style={[
                        styles.answerValue,
                        result.isCorrect
                          ? styles.correctAnswer
                          : result.isSkipped
                          ? styles.skippedAnswer
                          : styles.incorrectAnswer,
                      ]}
                    >
                      {result.isSkipped ? "Passée" : result.userAnswer}
                    </Text>
                  </View>

                  {!result.isCorrect && !result.isSkipped && (
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Réponse correcte:</Text>
                      <Text style={[styles.answerValue, styles.correctAnswer]}>
                        {result.correctAnswer}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
            <Ionicons name="share-social" size={20} color="#6B7280" />
            <Text style={styles.shareButtonText}>Partager</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Ionicons name="refresh" size={20} color="#6B7280" />
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: levelColor }]}
            onPress={onContinue}
          >
            <Text style={styles.continueButtonText}>Continuer</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ResultsScreen;

