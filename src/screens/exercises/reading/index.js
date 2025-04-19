// src/components/screens/exercises/reading/ReadingExercise/index.js
import React, { useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Components communs
import ExerciseHeader from "../../../components/exercise-common/ExerciseHeader";
import ProgressBar from "../../../components/ui/ProgressBar";
import ExerciseFeedback from "../../../components/exercise-common/ExerciseFeedback";
import NavigationButtons from "../../../components/exercise-common/NavigationButtons";
import InstructionBox from "../../../components/exercise-common/InstructionBox";

// Components spécifiques à la lecture
import ReadingTextSelector from "./ReadingTextSelector";
import ReadingText from "./ReadingText";
import ReadingQuestion from "./ReadingQuestion";
import QuestionIndicators from "./QuestionIndicators";
import VocabularyPopup from "./VocabularyPopup";

// Hooks
import useReadingExerciseState from "./hooks/useReadingExerciseState";
import useReadingProgress from "./hooks/useReadingProgress";

// Utils
import {
  getReadingData,
  getLevelColor,
} from "../../../utils/reading/readingHelper";
import styles from "./style";

/**
 * Composant principal pour l'exercice de lecture
 */
const ReadingExercise = ({ route }) => {
  // Hooks de navigation
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};

  // Récupérer la couleur du niveau et les données
  const levelColor = getLevelColor(level);
  const readingData = getReadingData(level);

  // Hooks d'état et de progression
  const {
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    isCorrect,
    attempts,
    textExpanded,
    highlightedWord,
    fadeAnim,
    slideAnim,
    scrollViewRef,
    textsScrollViewRef,
    handleExerciseChange,
    handleSelectAnswer,
    checkAnswer,
    retryQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    getCurrentQuestion,
    setAllExercises,
  } = useReadingExerciseState(level, []);

  const {
    completedQuestions,
    loaded,
    isQuestionCompleted,
    markQuestionAsCompleted,
    resetExerciseProgress,
    calculateProgress,
    areAllQuestionsCompleted,
    initializeCompletedQuestions,
  } = useReadingProgress(level);

  // Initialiser les exercices au chargement
  useEffect(() => {
    if (readingData && readingData.exercises) {
      setAllExercises(readingData.exercises);
      initializeCompletedQuestions(readingData.exercises);
    }
  }, [readingData, setAllExercises, initializeCompletedQuestions]);

  // Obtenir la question courante
  const currentQuestion = getCurrentQuestion;

  // Calculer la progression
  const progress = currentExercise
    ? calculateProgress(selectedExerciseIndex, currentExercise.questions.length)
    : 0;

  // Marquer une question comme complétée et passer à la suivante
  const handleNextQuestion = () => {
    if (isCorrect) {
      markQuestionAsCompleted(selectedExerciseIndex, currentQuestionIndex);
    }
    goToNextQuestion();

    // Vérifier si tous les exercices sont complétés
    if (currentQuestionIndex === currentExercise?.questions.length - 1) {
      if (areAllQuestionsCompleted(allExercises)) {
        alert("All reading exercises completed!");
        navigation.goBack();
      }
    }
  };

  // Gérer la vérification de la réponse
  const handleCheckAnswer = () => {
    checkAnswer();
  };

  // Gérer la navigation
  const handleNavigation = (action) => {
    if (action === "next") {
      showFeedback ? handleNextQuestion() : handleCheckAnswer();
    } else if (action === "previous") {
      goToPreviousQuestion();
    } else if (action === "retry") {
      retryQuestion();
    }
  };

  // Si les données ne sont pas encore chargées
  if (allExercises.length === 0 || !currentExercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <ExerciseHeader
        title="Reading"
        level={level}
        onClose={() => navigation.goBack()}
        levelColor={levelColor}
        showProgress={false}
      />

      {/* Sélecteur de textes */}
      <ReadingTextSelector
        exercises={allExercises}
        selectedIndex={selectedExerciseIndex}
        onSelectExercise={handleExerciseChange}
        scrollViewRef={textsScrollViewRef}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          showPercentage={false}
          showValue={true}
          total={currentExercise.questions.length}
          valueFormatter={(value, total) =>
            `${completedQuestions[selectedExerciseIndex]?.length || 0}/${total}`
          }
          height={6}
          backgroundColor="#e2e8f0"
          fillColor={levelColor}
          borderRadius={3}
        />
      </View>

      {/* Contenu principal */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Instructions */}
        <InstructionBox
          title="Reading Exercise"
          instructions="Read the text carefully and answer the questions. You can tap on underlined words to see their definition."
          variant="compact"
          primaryColor={levelColor}
          initiallyExpanded={false}
        />

        {/* Texte de lecture */}
        <ReadingText
          exercise={currentExercise}
          textExpanded={textExpanded}
          onToggleExpand={toggleTextExpansion}
          onWordPress={handleWordPress}
          levelColor={levelColor}
        />

        {/* Question */}
        {currentQuestion && (
          <ReadingQuestion
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            showFeedback={showFeedback}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            levelColor={levelColor}
          />
        )}

        {/* Feedback */}
        {showFeedback && currentQuestion && (
          <ExerciseFeedback
            type={isCorrect ? "success" : "error"}
            message={isCorrect ? "Correct!" : "Incorrect!"}
            explanation={
              isCorrect
                ? currentQuestion.explanation
                : attempts > 1
                ? `The correct answer is: ${
                    currentQuestion.options[currentQuestion.correctAnswer]
                  }`
                : "Try again!"
            }
            showDismissButton={false}
          />
        )}

        {/* Indicateurs de questions */}
        <QuestionIndicators
          totalQuestions={currentExercise.questions.length}
          currentQuestionIndex={currentQuestionIndex}
          completedQuestions={completedQuestions[selectedExerciseIndex] || []}
          onSelectQuestion={(index) => {
            setCurrentQuestionIndex(index);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setAttempts(0);
            fadeAnim.setValue(0);
            slideAnim.setValue(50);
          }}
          levelColor={levelColor}
        />
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        {!showFeedback ? (
          <NavigationButtons
            onNext={() => handleNavigation("next")}
            onPrevious={() => handleNavigation("previous")}
            currentIndex={currentQuestionIndex}
            totalCount={currentExercise.questions.length}
            disableNext={selectedAnswer === null}
            disablePrevious={currentQuestionIndex === 0}
            showSkip={false}
            primaryColor={levelColor}
            buttonLabels={{
              previous: "Previous",
              next: "Check Answer",
              skip: "Skip",
              finish: "Finish",
            }}
            variant="standard"
          />
        ) : isCorrect ? (
          <NavigationButtons
            onNext={() => handleNavigation("next")}
            onPrevious={() => handleNavigation("previous")}
            currentIndex={currentQuestionIndex}
            totalCount={currentExercise.questions.length}
            disablePrevious={currentQuestionIndex === 0}
            primaryColor={levelColor}
            buttonLabels={{
              previous: "Previous",
              next:
                currentQuestionIndex < currentExercise.questions.length - 1
                  ? "Next Question"
                  : "Complete",
              skip: "Skip",
              finish: "Finish",
            }}
            variant="standard"
          />
        ) : (
          <NavigationButtons
            onNext={
              attempts > 1
                ? () => handleNavigation("next")
                : () => handleNavigation("retry")
            }
            onPrevious={() => handleNavigation("previous")}
            currentIndex={currentQuestionIndex}
            totalCount={currentExercise.questions.length}
            disablePrevious={currentQuestionIndex === 0}
            primaryColor={levelColor}
            buttonLabels={{
              previous: "Previous",
              next: attempts > 1 ? "Skip" : "Try Again",
              skip: "Skip",
              finish: "Finish",
            }}
            variant="standard"
          />
        )}
      </View>

      {/* Popup de vocabulaire */}
      <VocabularyPopup
        visible={!!highlightedWord}
        word={highlightedWord?.word}
        definition={highlightedWord?.definition}
        onClose={closeVocabularyPopup}
      />
    </SafeAreaView>
  );
};

export default ReadingExercise;
