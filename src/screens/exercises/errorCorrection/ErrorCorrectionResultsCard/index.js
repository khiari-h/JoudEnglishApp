// src/components/screens/exercises/errorCorrection/ErrorCorrectionResultsCard/index.js



import styles from "./style";

/**
 * Carte de résultats pour les exercices de correction d'erreurs
 * Réutilise le composant ResultsScreen générique
 */
const ErrorCorrectionResultsCard = ({
  score,
  totalExercises,
  userAttempts = [],
  exercises = [],
  level,
  levelColor,
  onRetry,
  onContinue,
  onExit,
}) => {
  // Calculer le nombre de réponses correctes, incorrectes et passées
  const correctAnswers = userAttempts.filter(
    (attempt) => attempt.isCorrect
  ).length;
  const incorrectAnswers = userAttempts.filter(
    (attempt) => !attempt.isCorrect && attempt.attempted
  ).length;
  const skippedAnswers = totalExercises - (correctAnswers + incorrectAnswers);

  // Préparer les résultats détaillés pour chaque exercice
  const detailedResults = exercises.map((exercise, index) => {
    const attempt = userAttempts[index] || {};

    return {
      question: exercise.text,
      userAnswer: attempt.correction || "Pas de réponse",
      correctAnswer: exercise.correctedText,
      isCorrect: attempt.isCorrect || false,
      isSkipped: !attempt.attempted,
    };
  });

  // Générer un feedback personnalisé en fonction du score
  const getFeedback = () => {
    const percentage = Math.round((correctAnswers / totalExercises) * 100);

    if (percentage >= 80) {
      return "Excellent ! Vous avez très bien compris les différentes erreurs grammaticales et d'usage. Continuez sur cette voie !";
    } else if (percentage >= 60) {
      return "Bon travail ! Vous commencez à bien repérer les erreurs. Continuez à pratiquer pour améliorer votre précision.";
    } else {
      return "Continuez à pratiquer ! La correction d'erreurs demande de la pratique. Revoyez les règles grammaticales et observez attentivement les structures de phrases.";
    }
  };

  return (
    <View style={styles.container}>
      <ResultsScreen
        score={score}
        totalQuestions={totalExercises}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        skippedAnswers={skippedAnswers}
        exerciseType="Correction d'erreurs"
        level={level}
        levelColor={levelColor}
        feedback={getFeedback()}
        onRetry={onRetry}
        onContinue={onContinue || onExit}
        showDetailedResults
        detailedResults={detailedResults}
      />
    </View>
  );
};

export default ErrorCorrectionResultsCard;

