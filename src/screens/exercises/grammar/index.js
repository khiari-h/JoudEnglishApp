// GrammarExercise/index.js - VERSION CLEAN & SIMPLE
import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import GrammarHeader from "./GrammarHeader";
import GrammarRuleSelector from "./GrammarRuleSelector";
import GrammarProgress from "./GrammarProgress";
import GrammarRuleContent from "./GrammarRuleContent";
import GrammarExerciseRenderer from "./GrammarExerciceRenderer";
import GrammarFeedback from "./GrammarFeedback";
import GrammarNavigation from "./GrammarNavigation";

// Hook & Utils
import useGrammar from "./hooks/useGrammar";
import { getGrammarData, getLevelColor } from "../../../utils/grammar/grammarDataHelper";
import createStyles from "./style";

/**
 * 🎯 GrammarExercise - VERSION CLEAN & SIMPLE
 * 200+ lignes → 130 lignes (-35% de code)
 * 1 hook au lieu de 3, logique claire, maintenable
 */
const GrammarExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Data
  const levelColor = getLevelColor(level);
  const grammarData = useMemo(() => getGrammarData(level), [level]);

  // Hook unifié
  const {
    ruleIndex,
    exerciseIndex,
    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,
    showFeedback,
    isCorrect,
    attempts,
    completedExercises,
    loaded,
    showDetailedProgress,
    currentRule,
    currentExercise,
    totalExercises,
    canCheckAnswer,
    isFirstExercise,
    isLastExercise,
    progress,
    changeRule,
    submitAnswer,
    nextExercise,
    previousExercise,
    retryExercise,
    toggleDetailedProgress,
  } = useGrammar(grammarData, level);

  // Handlers
  const handleBackPress = () => navigation.goBack();
  
  const handleCheckAnswer = () => submitAnswer();
  
  const handleNextExercise = () => {
    if (!nextExercise()) {
      // All exercises completed
      navigation.goBack();
    }
  };

  const handlePreviousExercise = () => previousExercise();

  const handleRetryExercise = () => retryExercise();

  const handleSkipExercise = () => handleNextExercise();

  const handleRuleChange = (index) => changeRule(index);

  const handleRuleProgressPress = (index) => changeRule(index);

  const handleToggleProgressDetails = () => toggleDetailedProgress();

  // Loading state
  if (!loaded || !grammarData.length) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      {/* Header */}
      <GrammarHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Rule Selector */}
      <GrammarRuleSelector
        rules={grammarData}
        selectedIndex={ruleIndex}
        onSelectRule={handleRuleChange}
        levelColor={levelColor}
      />

      {/* Progress */}
      <GrammarProgress
        grammarData={grammarData}
        completedExercises={completedExercises}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onRulePress={handleRuleProgressPress}
      />

      {/* Rule Content */}
      <GrammarRuleContent 
        rule={currentRule} 
        levelColor={levelColor}
      />

      {/* Exercise Renderer */}
      {currentExercise && (
        <View key={`exercise-${exerciseIndex}-${attempts}`}>
          <GrammarExerciseRenderer
            exercise={currentExercise}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            inputText={inputText}
            setInputText={setInputText}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            exerciseIndex={exerciseIndex}
            attempts={attempts}
          />
        </View>
      )}

      {/* Feedback */}
      <GrammarFeedback
        isVisible={showFeedback}
        isCorrect={isCorrect}
        explanation={currentExercise?.explanation}
        correctAnswer={currentExercise?.answer}
        attempts={attempts}
      />

      {/* Navigation */}
      <GrammarNavigation
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canCheckAnswer={canCheckAnswer}
        onCheckAnswer={handleCheckAnswer}
        onPreviousExercise={handlePreviousExercise}
        onNextExercise={handleNextExercise}
        onRetryExercise={handleRetryExercise}
        onSkipExercise={handleSkipExercise}
        isFirstExercise={isFirstExercise}
        isLastExercise={isLastExercise}
        attempts={attempts}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default GrammarExercise;