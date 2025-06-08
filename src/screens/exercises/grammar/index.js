// GrammarExercise/index.js - VERSION OPTIMISÉE pour composants refactorisés

import React, { useMemo, useEffect } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants refactorisés avec composants génériques
import GrammarHeader from "./GrammarHeader";
import GrammarRuleSelector from "./GrammarRuleSelector";
import GrammarProgress from "./GrammarProgress"; // ← Version ProgressCard
import GrammarRuleContent from "./GrammarRuleContent"; // ← Version ContentSection
import GrammarExerciseRenderer from "./GrammarExerciceRenderer"; // ← Version HeroCard
import GrammarFeedback from "./GrammarFeedback"; // ← Version ContentSection
import GrammarNavigation from "./GrammarNavigation";

// Hooks personnalisés (inchangés)
import useGrammarExerciseState from "./hooks/useGrammarExerciceState";
import useGrammarProgress from "./hooks/useGrammarProgress";

// Utilitaires (inchangés)
import {
  getGrammarData,
  getLevelColor,
} from "../../../utils/grammar/grammarDataHelper";

import createStyles from "./style";

/**
 * 🏆 GrammarExercise - Version Refactorisée avec composants génériques
 * - Utilise HeroCard, ContentSection, ProgressCard
 * - Design cohérent avec VocabularyExercise refactorisé
 * - Même logique métier, architecture optimisée
 * - Performance améliorée et code réduit
 */
const GrammarExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level } = route.params || { level: "A1" };
  const styles = createStyles();

  // Récupération des données (inchangé)
  const levelColor = getLevelColor(level);
  const grammarData = useMemo(() => getGrammarData(level), [level]);

  // Hooks personnalisés (inchangés)
  const {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
  } = useGrammarProgress(level);

  const {
    ruleIndex,
    exerciseIndex,
    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,
    showFeedback,
    setShowFeedback,
    isCorrect,
    setIsCorrect,
    attempts,
    setAttempts,
    resetExerciseState,
    goToPreviousExercise,
    goToNextExercise,
    changeRule,
    checkAnswer,
  } = useGrammarExerciseState(level, 0, 0);

  // Effets et logique métier (inchangés)
  useEffect(() => {
    if (loaded && lastPosition) {
      changeRule(lastPosition.ruleIndex);
      if (lastPosition.exerciseIndex > 0) {
        setTimeout(() => {
          goToNextExercise(lastPosition.exerciseIndex);
        }, 0);
      }
    }
  }, [loaded, lastPosition, changeRule, goToNextExercise]);

  useEffect(() => {
    if (loaded && grammarData) {
      initializeProgress(grammarData);
    }
  }, [loaded, grammarData, initializeProgress]);

  // Calculs et données dérivées (inchangés)
  const currentRule = grammarData?.[ruleIndex];
  const currentExercise = currentRule?.exercises?.[exerciseIndex];
  const isFirstExercise = exerciseIndex === 0;
  const isLastExercise = exerciseIndex === (currentRule?.exercises?.length || 0) - 1;
  const progress =
    ((exerciseIndex + (showFeedback && isCorrect ? 1 : 0)) /
      (currentRule?.exercises?.length || 1)) *
    100;

  // Handlers (inchangés)
  const handleRuleChange = (index) => {
    if (index !== ruleIndex) {
      changeRule(index);
      saveLastPosition(index, 0);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let answer = "";
    let correctAnswer = "";

    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      answer =
        selectedOption !== null ? currentExercise.options[selectedOption] : "";
      correctAnswer =
        typeof currentExercise.answer === "number"
          ? currentExercise.options[currentExercise.answer]
          : currentExercise.answer;
    } else if (
      currentExercise.type === "fillInTheBlank" ||
      currentExercise.type === "transformation"
    ) {
      answer = inputText.trim().toLowerCase();
      correctAnswer = currentExercise.answer.toLowerCase();
    }

    const isAnswerCorrect = checkAnswer(answer, correctAnswer);
    markExerciseAsCompleted(ruleIndex, exerciseIndex, isAnswerCorrect, answer);
  };

  const handleNextExercise = () => {
    if (isLastExercise) {
      if (ruleIndex < (grammarData?.length || 0) - 1) {
        handleRuleChange(ruleIndex + 1);
      } else {
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de grammaire !"
        );
        navigation.goBack();
      }
    } else {
      goToNextExercise();
      saveLastPosition(ruleIndex, exerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (goToPreviousExercise()) {
      saveLastPosition(ruleIndex, exerciseIndex - 1);
    }
  };

  const handleRetryExercise = () => {
    resetExerciseState();
  };

  const handleSkipExercise = () => {
    handleNextExercise();
  };

  const canCheckAnswer = () => {
    if (!currentExercise) return false;

    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      return selectedOption !== null;
    } else {
      return inputText.trim() !== "";
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // ========== ÉCRAN DE CHARGEMENT MODERNE ==========
  if (!loaded || !grammarData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={[styles.loadingText, { color: levelColor }]}>
            Loading grammar exercises...
          </Text>
        </View>
      </Container>
    );
  }

  // ========== CONTENU PRINCIPAL OPTIMISÉ ==========
  const renderMainContent = () => (
    <>
      {/* 🏆 Header (générique) */}
      <GrammarHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* 🎨 Rule Selector (générique) */}
      <GrammarRuleSelector
        rules={grammarData}
        selectedIndex={ruleIndex}
        onSelectRule={handleRuleChange}
        levelColor={levelColor}
      />

      {/* 📊 Progress - Utilise maintenant ProgressCard */}
      <GrammarProgress
        progress={progress}
        currentExercise={exerciseIndex + 1}
        totalExercises={currentRule?.exercises?.length || 0}
        levelColor={levelColor}
      />

      {/* 📚 Rule Content - Utilise maintenant ContentSection */}
      <GrammarRuleContent 
        rule={currentRule} 
        levelColor={levelColor}
      />

      {/* 🎯 Exercise Renderer - Utilise maintenant HeroCard */}
      <View key={`exercise-container-${exerciseIndex}-${attempts}`}>
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

      {/* 💬 Feedback - Utilise maintenant ContentSection */}
      <GrammarFeedback
        isVisible={showFeedback}
        isCorrect={isCorrect}
        explanation={currentExercise?.explanation}
        correctAnswer={currentExercise?.answer}
        attempts={attempts}
      />

      {/* ⏭️ Navigation (générique optimisé) */}
      <GrammarNavigation
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canCheckAnswer={canCheckAnswer()}
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
    </>
  );

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      backgroundColor="#f8fafc" // Cohérent avec VocabularyExercise
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default GrammarExercise;