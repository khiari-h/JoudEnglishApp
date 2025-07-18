// src/components/exercise-common/ResultsScreen/index.js
import { useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Écran de résultats pour afficher le score et les statistiques
 * à la fin d'une série d'exercices
 */
// Sous-composant ResultsHeader
const ResultsHeader = ({ level, levelColor, exerciseType, localStyles }) => (
  <View style={localStyles.header}>
    <View style={[localStyles.levelBadge, { backgroundColor: levelColor }]}>
      <Text style={localStyles.levelText}>{level}</Text>
    </View>
    <Text style={localStyles.exerciseType}>{exerciseType}</Text>
  </View>
);

// Sous-composant ScoreSection
const ScoreSection = ({ color, icon, successPercentage, correctAnswers, totalQuestions, title, message, localStyles }) => (
  <View style={localStyles.scoreSection}>
    <View style={[localStyles.scoreCircle, { borderColor: color }]}>
      <Ionicons name={icon} size={36} color={color} />
      <Text style={[localStyles.scorePercentage, { color }]}>{successPercentage}%</Text>
      <Text style={localStyles.scoreRatio}>{correctAnswers}/{totalQuestions}</Text>
    </View>
    <View style={localStyles.scoreSummary}>
      <Text style={localStyles.scoreTitle}>{title}</Text>
      <Text style={localStyles.scoreMessage}>{message}</Text>
    </View>
  </View>
);

// Sous-composant FeedbackSection
const FeedbackSection = ({ feedback, localStyles }) => (
  feedback ? (
    <View style={localStyles.feedbackContainer}>
      <Text style={localStyles.feedbackTitle}>Conseils pour progresser</Text>
      <Text style={localStyles.feedbackText}>{feedback}</Text>
    </View>
  ) : null
);

// Sous-composant ResultsButtons
const ResultsButtons = ({ shareResults, onRetry, onContinue, levelColor, localStyles }) => (
  <>
    <TouchableOpacity style={localStyles.shareButton} onPress={shareResults}>
      <Ionicons name="share-social" size={20} color="#6B7280" />
      <Text style={localStyles.shareButtonText}>Partager</Text>
    </TouchableOpacity>
    <TouchableOpacity style={localStyles.retryButton} onPress={onRetry}>
      <Ionicons name="refresh" size={20} color="#6B7280" />
      <Text style={localStyles.retryButtonText}>Réessayer</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[localStyles.continueButton, { backgroundColor: levelColor }]}
      onPress={onContinue}
    >
      <Text style={localStyles.continueButtonText}>Continuer</Text>
      <Ionicons name="arrow-forward" size={20} color="white" />
    </TouchableOpacity>
  </>
);

// Refactor ResultsScreen pour utiliser les sous-composants
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
  onRetry = () => { /* intentionally empty: default no-op to avoid errors if not provided */ },
  onContinue = () => { /* intentionally empty: default no-op to avoid errors if not provided */ },
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
  const shareResults = useCallback(async () => {
    try {
      await Share.share({
        message: `J'ai obtenu ${correctAnswers}/${totalQuestions} (${successPercentage}%) dans mon exercice de ${exerciseType} niveau ${level} sur l'application JOUD English!`,
        title: "Mes résultats d'apprentissage",
      });
    } catch (error) {
      // Ignored on purpose
    }
  }, [correctAnswers, totalQuestions, successPercentage, exerciseType, level]);

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
        <ResultsHeader level={level} levelColor={levelColor} exerciseType={exerciseType} localStyles={styles} />
        <ScoreSection color={color} icon={icon} successPercentage={successPercentage} correctAnswers={correctAnswers} totalQuestions={totalQuestions} title={title} message={message} localStyles={styles} />
        <StatsSection correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} skippedAnswers={skippedAnswers} timeTaken={timeTaken} localStyles={styles} />
        <FeedbackSection feedback={feedback} localStyles={styles} />
        <DetailedResultsSection showDetailedResults={showDetailedResults} detailedResults={detailedResults} localStyles={styles} />
        <ResultsButtons shareResults={shareResults} onRetry={onRetry} onContinue={onContinue} levelColor={levelColor} localStyles={styles} />
      </Animated.View>
    </ScrollView>
  );
};

const StatsSection = ({ correctAnswers, incorrectAnswers, skippedAnswers, timeTaken, localStyles }) => (
  <View style={localStyles.statsContainer}>
    <View style={localStyles.statItem}>
      <View
        style={[localStyles.statIconContainer, { backgroundColor: "#ECFDF5" }]}
      >
        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
      </View>
      <Text style={localStyles.statLabel}>Correctes</Text>
      <Text style={localStyles.statValue}>{correctAnswers}</Text>
    </View>

    <View style={localStyles.statItem}>
      <View
        style={[localStyles.statIconContainer, { backgroundColor: "#FEF2F2" }]}
      >
        <Ionicons name="close-circle" size={24} color="#EF4444" />
      </View>
      <Text style={localStyles.statLabel}>Incorrectes</Text>
      <Text style={localStyles.statValue}>{incorrectAnswers}</Text>
    </View>

    <View style={localStyles.statItem}>
      <View
        style={[localStyles.statIconContainer, { backgroundColor: "#F3F4F6" }]}
      >
        <Ionicons name="play-skip-forward" size={24} color="#6B7280" />
      </View>
      <Text style={localStyles.statLabel}>Passées</Text>
      <Text style={localStyles.statValue}>{skippedAnswers}</Text>
    </View>

    <View style={localStyles.statItem}>
      <View
        style={[localStyles.statIconContainer, { backgroundColor: "#EFF6FF" }]}
      >
        <Ionicons name="time" size={24} color="#3B82F6" />
      </View>
      <Text style={localStyles.statLabel}>Temps</Text>
      <Text style={localStyles.statValue}>{timeTaken}</Text>
    </View>
  </View>
);

const DetailedResultsSection = ({ showDetailedResults, detailedResults, localStyles }) => (
  showDetailedResults && detailedResults.length > 0 && (
    <View style={localStyles.detailedResultsContainer}>
      <Text style={localStyles.detailedResultsTitle}>Détail des réponses</Text>

      {detailedResults.map((result) => (
        <View key={result.question} style={localStyles.detailedResultItem}>
          <View style={localStyles.questionHeader}>
            <Text style={localStyles.questionNumber}>
              Question {detailedResults.indexOf(result) + 1}
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

          <Text style={localStyles.questionText}>{result.question}</Text>

          <View style={localStyles.answersContainer}>
            <View style={localStyles.answerRow}>
              <Text style={localStyles.answerLabel}>Votre réponse:</Text>
              <Text
                style={[
                  localStyles.answerValue,
                  result.isCorrect
                    ? localStyles.correctAnswer
                    : result.isSkipped
                    ? localStyles.skippedAnswer
                    : localStyles.incorrectAnswer,
                ]}
              >
                {result.isSkipped ? "Passée" : result.userAnswer}
              </Text>
            </View>

            {!result.isCorrect && !result.isSkipped && (
              <View style={localStyles.answerRow}>
                <Text style={localStyles.answerLabel}>Réponse correcte:</Text>
                <Text style={[localStyles.answerValue, localStyles.correctAnswer]}>
                  {result.correctAnswer}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  )
);

export default ResultsScreen;

