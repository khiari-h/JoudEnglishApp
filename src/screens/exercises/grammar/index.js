// GrammarExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import React, { useMemo, useEffect } from "react";
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
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getGrammarData, getLevelColor } from "../../../utils/grammar/grammarDataHelper";
import createStyles from "./style";

/**
 * 🎯 GrammarExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const GrammarExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

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

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement de règle/exercice
  useEffect(() => {
    if (loaded && grammarData.length > 0 && currentRule && currentExercise) {
      saveActivity({
        title: "Grammaire",
        level: level,
        type: "grammar",
        metadata: {
          rule: ruleIndex,
          exercise: exerciseIndex,
          totalExercises: totalExercises,
          ruleName: currentRule.title || `Règle ${ruleIndex + 1}`,
          totalRules: grammarData.length
        }
      });
    }
  }, [loaded, grammarData.length, currentRule, currentExercise, ruleIndex, exerciseIndex, totalExercises, level, saveActivity]);

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