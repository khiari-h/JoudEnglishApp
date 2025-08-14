// src/screens/VocabularyRevision/index.js - VERSION REFACTORISÉE
import { useState, useContext, useCallback, useRef } from 'react';
import { View, Animated, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../contexts/ThemeContext';
import useRevisionManager from '../../hooks/useRevisionManager';
import useRevisionData from '../../hooks/useRevisionData';
import useQuizEngine from '../../hooks/useQuizEngine';

import EmptyState from './components/EmptyState';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

import styles from './style';

const { width } = Dimensions.get('window');

// Seuil pour débloquer la fonctionnalité de révision.
const MIN_WORDS_FOR_REVISION_UNLOCK = 50;

const VocabularyRevision = ({ route }) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const { markRevisionCompleted } = useRevisionManager();

  const {
    level = "mixed",
    questionsCount = 10,
    source = 'manual'
  } = route?.params || {};

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    primary: "#3B82F6"
  };

  // 1. HOOK DE DONNÉES
  const {
    revisionQuestions,
    isLoading,
    error,
    stats,
    hasEnoughWords,
    canGenerateQuestions
  } = useRevisionData(level, questionsCount);

  // 2. HOOK DE LOGIQUE DU QUIZ
  const quizEngine = useQuizEngine(revisionQuestions);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // 3. HANDLERS & ANIMATIONS
  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const triggerShakeAnimation = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const handleContinue = useCallback(() => {
    // Slide out to the left
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      quizEngine.goToNextQuestion();
      // Position instantly off-screen to the right
      slideAnim.setValue(width);
      // Slide in from the right
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 5,
        useNativeDriver: true,
      }).start();
    });
  }, [slideAnim, quizEngine, width]);

  const handleAnswer = useCallback((choice) => {
    if (quizEngine.showResult) return;
    const isCorrect = quizEngine.handleAnswer(choice);
    if (!isCorrect) {
      triggerShakeAnimation();
    }
  }, [quizEngine, triggerShakeAnimation]);

  const handleRestart = useCallback(() => {
    quizEngine.handleRestart();
    slideAnim.setValue(0);
  }, [quizEngine, slideAnim]);

  const handleFinish = useCallback(() => {
    if (markRevisionCompleted) {
      try {
        const result = markRevisionCompleted(revisionQuestions, quizEngine.score, quizEngine.totalQuestions);
        // Si c'est une Promise, on la gère de manière asynchrone
        if (result && typeof result.then === 'function') {
          result.catch(error => {
            console.error('Erreur lors de la finalisation de la révision:', error);
          });
        }
      } catch (error) {
        console.error('Erreur lors de la finalisation de la révision:', error);
      }
    }
    navigation.goBack();
  }, [navigation, markRevisionCompleted, revisionQuestions, quizEngine.score, quizEngine.totalQuestions]);

  // 4. LOGIQUE D'AFFICHAGE (Le Chef d'Orchestre)
  const renderContent = () => {
    if (isLoading) {
      return (
        <EmptyState
          type="loading"
          message="Récupération de vos mots appris"
          colors={colors}
          localStyles={styles}
        />
      );
    }

    if (error) {
      return (
        <EmptyState
          type="error"
          message={error}
          onAction={handleGoBack}
          colors={colors}
          localStyles={styles}
        />
      );
    }

    if (!canGenerateQuestions || !hasEnoughWords) {
      // Si le quiz ne peut pas être généré mais que la révision est débloquée, on affiche un message spécifique.
      if (hasEnoughWords && !canGenerateQuestions) {
        return <EmptyState type="noWords" message={`Continuez d'apprendre pour diversifier les questions !\nUn quiz de ${questionsCount} questions ne peut pas être généré pour ce niveau.`} onAction={handleGoBack} colors={colors} localStyles={styles} />;
      }

      // Sinon, on affiche l'écran de progression "verrouillé".
      return (
        <EmptyState
          type="locked"
          progress={stats.totalLearned}
          goal={MIN_WORDS_FOR_REVISION_UNLOCK}
          onAction={handleGoBack}
          colors={colors}
          localStyles={styles}
        />
      );
    }

    if (quizEngine.isFinished) {
      return (
        <ResultScreen
          score={quizEngine.score}
          totalQuestions={quizEngine.totalQuestions}
          source={source}
          handleRestart={handleRestart}
          handleFinish={handleFinish}
          localStyles={styles}
          colors={colors}
        />
      );
    }

        return (
      <QuizScreen
        quizEngine={quizEngine}
        onGoBack={handleGoBack}
        onAnswer={handleAnswer}
        onContinue={handleContinue}
        slideAnim={slideAnim}
        shakeAnim={shakeAnim}
        colors={colors}
        localStyles={styles}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {renderContent()}
    </View>
  );
};

export default VocabularyRevision;
