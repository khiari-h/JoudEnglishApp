// src/components/screens/exercises/grammar/GrammarExercise/index.js
import React, { useMemo, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import des composants
import GrammarHeader from "./GrammarHeader";
import GrammarRuleSelector from "./GrammarRuleSelector";
import GrammarProgress from "./GrammarProgress";
import GrammarRuleContent from "./GrammarRuleContent";
import GrammarExerciseRenderer from "./GrammarExerciceRenderer";
import GrammarFeedback from "./GrammarFeedback";
import GrammarNavigation from "./GrammarNavigation";

// Import des hooks personnalisés
import useGrammarExerciseState from "./hooks/useGrammarExerciceState";
import useGrammarProgress from "./hooks/useGrammarProgress";

// Import des utilitaires
import {
  getGrammarData,
  getLevelColor,
} from "../../../utils/grammar/grammarDataHelper";

import styles from "./style";

/**
 * Écran principal pour les exercices de grammaire
 * Utilise les composants standardisés pour le header, la progression et la navigation
 */
const GrammarExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level } = route.params || { level: "A1" };

  // Récupération des données avec les helpers
  const levelColor = getLevelColor(level);
  const grammarData = useMemo(() => getGrammarData(level), [level]);

  // Utiliser les hooks personnalisés
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

  // Restaurer l'état une fois les données chargées
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

  // Initialiser la progression une fois les données chargées
  useEffect(() => {
    if (loaded && grammarData) {
      initializeProgress(grammarData);
    }
  }, [loaded, grammarData, initializeProgress]);

  // Affiche le spinner pendant le chargement des données
  if (!loaded || !grammarData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  // Récupérer la règle et l'exercice actuels
  const currentRule = grammarData[ruleIndex];
  const currentExercise = currentRule?.exercises?.[exerciseIndex];

  // Calculs pour la navigation et la progression
  const isFirstExercise = exerciseIndex === 0;
  const isLastExercise = exerciseIndex === currentRule?.exercises?.length - 1;
  const progress =
    ((exerciseIndex + (showFeedback && isCorrect ? 1 : 0)) /
      (currentRule?.exercises?.length || 1)) *
    100;

  // Gérer le changement de règle
  const handleRuleChange = (index) => {
    if (index !== ruleIndex) {
      changeRule(index);
      saveLastPosition(index, 0);
    }
  };

  // Vérifier la réponse de l'utilisateur
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

  // Passer à l'exercice suivant
  const handleNextExercise = () => {
    if (isLastExercise) {
      if (ruleIndex < grammarData.length - 1) {
        // Passer à la règle suivante
        handleRuleChange(ruleIndex + 1);
      } else {
        // Toutes les règles sont terminées
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

  // Revenir à l'exercice précédent
  const handlePreviousExercise = () => {
    if (goToPreviousExercise()) {
      saveLastPosition(ruleIndex, exerciseIndex - 1);
    }
  };

  // Réessayer l'exercice actuel - CORRECTION ICI
  const handleRetryExercise = () => {
    // Utiliser la fonction resetExerciseState fournie par le hook
    // Cette fonction va gérer correctement la réinitialisation de tous les états
    resetExerciseState();
  };

  // Passer l'exercice actuel
  const handleSkipExercise = () => {
    handleNextExercise();
  };

  // Vérifier si l'utilisateur peut valider sa réponse
  const canCheckAnswer = () => {
    if (!currentExercise) return false;

    if (currentExercise.type === "fillInTheBlank" && currentExercise.options) {
      return selectedOption !== null;
    } else {
      return inputText.trim() !== "";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête simplifié */}
      <GrammarHeader
        level={level}
        onBackPress={() => navigation.goBack()}
        levelColor={levelColor}
      />

      {/* Sélecteur de règle */}
      <GrammarRuleSelector
        rules={grammarData}
        selectedIndex={ruleIndex}
        onSelectRule={handleRuleChange}
        levelColor={levelColor}
      />

      {/* Barre de progression unifiée */}
      <GrammarProgress
        progress={progress}
        currentExercise={exerciseIndex + 1}
        totalExercises={currentRule?.exercises?.length || 0}
        levelColor={levelColor}
        ruleTitle={currentRule?.title}
      />

      <ScrollView
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Contenu de la règle */}
        <GrammarRuleContent rule={currentRule} />

        {/* Exercice actuel - Ajout de key pour forcer le rafraîchissement */}
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

        {/* Feedback après réponse */}
        <GrammarFeedback
          isVisible={showFeedback}
          isCorrect={isCorrect}
          explanation={currentExercise?.explanation}
          correctAnswer={currentExercise?.answer}
          attempts={attempts}
        />
      </ScrollView>

      {/* Navigation unifiée */}
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
    </SafeAreaView>
  );
};

export default GrammarExercise;

