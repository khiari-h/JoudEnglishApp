// src/screens/VocabularyRevision/index.js - VERSION REFACTORISÉE
import { useState, useContext, useCallback } from 'react';
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
  const [slideAnim] = useState(new Animated.Value(0));

  // 3. HANDLERS & ANIMATIONS
  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const animateAndGoToNext = useCallback(() => {
    // Slide out to the left
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      quizEngine.goToNextQuestion();
      // Position instantly off-screen to the right
      slideAnim.setValue(width);
      // Slide in from the right
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [slideAnim, quizEngine]);

  const handleAnswer = useCallback((choice) => {
    if (quizEngine.showResult) return; // Prevent answering again
    quizEngine.handleAnswer(choice);
    setTimeout(animateAndGoToNext, 1500);
  }, [quizEngine, animateAndGoToNext]);

  const handleRestart = useCallback(() => {
    quizEngine.handleRestart();
    slideAnim.setValue(0);
  }, [quizEngine, slideAnim]);

  const handleFinish = useCallback(async () => {
    if (markRevisionCompleted) {
      await markRevisionCompleted(revisionQuestions, quizEngine.score, quizEngine.totalQuestions);
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
      const message = `Apprenez quelques mots avant de réviser !${stats.totalLearned > 0 ? `\nVous avez ${stats.totalLearned} mots appris` : ''}`;
      return (
        <EmptyState
          type="noWords"
          message={message}
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
        slideAnim={slideAnim}
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
