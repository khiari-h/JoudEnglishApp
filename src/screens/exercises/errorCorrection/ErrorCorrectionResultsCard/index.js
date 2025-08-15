// src/components/screens/exercises/errorCorrection/ErrorCorrectionResultsCard/index.js
import { View } from "react-native";
import PropTypes from "prop-types";
import ResultsScreen from "../../../../components/exercise-common/ResultsScreen";
import styles from "./style";

/**
 * Carte de résultats pour les exercices de correction d'erreurs
 * Réutilise le composant ResultsScreen générique
 * 
 * @param {number} score - Score obtenu (0-100)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {Array} userAttempts - Tentatives de l'utilisateur avec isCorrect et attempted
 * @param {Array} exercises - Liste des exercices avec text et correctedText
 * @param {string} level - Niveau actuel (ex: "Débutant", "Intermédiaire")
 * @param {string} levelColor - Couleur principale du niveau
 * @param {function} onRetry - Callback pour recommencer les exercices
 * @param {function} onContinue - Callback pour continuer vers le niveau suivant
 * @param {function} onExit - Callback pour sortir des exercices
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

// PropTypes pour la validation des props
ErrorCorrectionResultsCard.propTypes = {
  score: PropTypes.number.isRequired,
  totalExercises: PropTypes.number.isRequired,
  userAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      isCorrect: PropTypes.bool,
      attempted: PropTypes.bool,
      correction: PropTypes.string,
    })
  ),
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      correctedText: PropTypes.string.isRequired,
    })
  ),
  level: PropTypes.string.isRequired,
  levelColor: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
  onContinue: PropTypes.func,
  onExit: PropTypes.func.isRequired,
};

// Valeurs par défaut
ErrorCorrectionResultsCard.defaultProps = {
  userAttempts: [],
  exercises: [],
  onContinue: null,
};

export default ErrorCorrectionResultsCard;