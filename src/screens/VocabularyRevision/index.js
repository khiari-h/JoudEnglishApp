// src/screens/VocabularyRevision/index.js - VERSION AVEC HOOK DÉDIÉ
import { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../contexts/ThemeContext';
import useRevisionManager from '../../hooks/useRevisionManager';
import useRevisionData from '../../hooks/useRevisionData'; // ← NOUVEAU HOOK

import styles from './style';

// Sous-composant ScoreCard
const ScoreCard = ({ score, revisionQuestions, percentage, resultConfig, colors, localStyles }) => (
  <View style={[localStyles.scoreCard, { backgroundColor: colors.surface }]}> 
    <View style={localStyles.scoreRow}>
      <Text style={[localStyles.scoreNumber, { color: resultConfig.color }]}>
        {score}
      </Text>
      <Text style={[localStyles.scoreSlash, { color: colors.textSecondary }]}>/{revisionQuestions.length}</Text>
    </View>
    <View style={[localStyles.progressBar, { backgroundColor: '#F3F4F6' }]}> 
      <View 
        style={[
          localStyles.progressFill, 
          { backgroundColor: resultConfig.color, width: `${percentage}%` }
        ]} 
      />
    </View>
    <Text style={[localStyles.percentageText, { color: resultConfig.color }]}> {percentage}% de réussite </Text>
  </View>
);

// Sous-composant StatsDetails
const StatsDetails = ({ stats, colors, localStyles }) => (
  <View style={[localStyles.statsContainer, { backgroundColor: colors.surface }]}> 
    <Text style={[localStyles.statsTitle, { color: colors.text }]}>📊 Statistiques</Text>
    <Text style={[localStyles.statsText, { color: colors.textSecondary }]}> {stats.totalLearned} mots appris au total </Text>
    {Object.entries(stats.byLevel).map(([lvl, count]) => (
      <Text key={lvl} style={[localStyles.statsText, { color: colors.textSecondary }]}> Niveau {lvl}: {count} mots </Text>
    ))}
  </View>
);

// Sous-composant ResultButtons
const ResultButtons = ({ colors, resultConfig, handleRestartPress, handleFinishPress, localStyles }) => (
  <View style={localStyles.buttonsContainer}>
    <TouchableOpacity 
      style={[localStyles.restartButton, { backgroundColor: colors.surface }]} 
      onPress={handleRestartPress}
      activeOpacity={0.8}
    >
      <View style={localStyles.buttonContent}>
        <Text style={localStyles.restartIcon}>🔄</Text>
        <Text style={[localStyles.restartText, { color: colors.text }]}>Rejouer</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[localStyles.finishButton, { backgroundColor: resultConfig.color }]} 
      onPress={handleFinishPress}
      activeOpacity={0.8}
    >
      <View style={localStyles.buttonContent}>
        <Text style={localStyles.finishIcon}>✓</Text>
        <Text style={localStyles.finishText}>Terminer</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Refactor ResultScreenContent pour utiliser les sous-composants
const ResultScreenContent = ({ resultConfig, score, revisionQuestions, percentage, stats, source, colors, handleRestartPress, handleFinishPress, localStyles }) => (
  <View style={localStyles.resultContainer}>
    <Text style={localStyles.resultEmoji}>{resultConfig.emoji}</Text>
    <Text style={[localStyles.resultTitle, { color: colors.text }]}>{resultConfig.title}</Text>
    <Text style={[localStyles.resultMessage, { color: colors.textSecondary }]}>{resultConfig.message}</Text>
    <ScoreCard score={score} revisionQuestions={revisionQuestions} percentage={percentage} resultConfig={resultConfig} colors={colors} localStyles={localStyles} />
    <StatsDetails stats={stats} colors={colors} localStyles={localStyles} />
    {source && (
      <Text style={[localStyles.sourceText, { color: colors.textSecondary }]}>{source === 'popup_trigger' ? '🤖 Révision automatique' : '👤 Révision manuelle'}</Text>
    )}
    <ResultButtons colors={colors} resultConfig={resultConfig} handleRestartPress={handleRestartPress} handleFinishPress={handleFinishPress} localStyles={localStyles} />
  </View>
);

const QuestionCard = ({ currentQuestion, colors, localStyles }) => (
  <View style={[localStyles.questionCard, { backgroundColor: colors.surface }]}>
    <Text style={localStyles.questionLabel}>Traduisez :</Text>
    <Text style={[localStyles.wordToTranslate, { color: colors.text }]}>
      {currentQuestion.word}
    </Text>
    {currentQuestion.fromLevel && (
      <Text style={[localStyles.levelInfo, { color: colors.textSecondary }]}>
        Niveau {currentQuestion.fromLevel} ({currentQuestion.fromMode})
      </Text>
    )}
  </View>
);

const ChoicesSection = ({ currentQuestion, selectedAnswer, showResult, handleAnswerPress, colors, localStyles }) => (
  <View style={localStyles.choicesSection}>
    {currentQuestion.choices.map((choice) => {
      const isSelected = selectedAnswer === choice;
      const isCorrect = choice === currentQuestion.correctAnswer;
      const isWrong = showResult && isSelected && !isCorrect;
      const shouldHighlight = showResult && isCorrect;
      
      const buttonStyle = [localStyles.choiceButton, { backgroundColor: colors.surface }];
      const textStyle = [localStyles.choiceText, { color: colors.text }];
      let icon = null;
      
      if (shouldHighlight) {
        buttonStyle.push(localStyles.choiceCorrect);
        textStyle.push(localStyles.choiceTextCorrect);
        icon = <Text style={localStyles.choiceIcon}>✓</Text>;
      } else if (isWrong) {
        buttonStyle.push(localStyles.choiceWrong);
        textStyle.push(localStyles.choiceTextWrong);
        icon = <Text style={localStyles.choiceIcon}>✗</Text>;
      } else if (isSelected) {
        buttonStyle.push({ borderColor: colors.primary, borderWidth: 2 });
      }
      
      return (
        <TouchableOpacity
          key={choice}
          style={buttonStyle}
          onPress={handleAnswerPress(choice)}
          disabled={showResult}
          activeOpacity={0.7}
        >
          <Text style={textStyle}>{choice}</Text>
          {icon}
        </TouchableOpacity>
      );
    })}
  </View>
);

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

  // ========== HOOK RÉVISION DÉDIÉ ==========
  const {
    revisionQuestions,
    isLoading,
    error,
    stats,
    hasEnoughWords,
    canGenerateQuestions
  } = useRevisionData(level, questionsCount);

  // ========== ÉTATS DU QUIZ ==========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentQuestion = revisionQuestions[currentIndex];
  const progress = revisionQuestions.length > 0 ? ((currentIndex + 1) / revisionQuestions.length) * 100 : 0;

  const handleGoBackPress = useCallback(() => navigation.goBack(), [navigation]);

  // ========== ÉCRAN DE CHARGEMENT ==========
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🔄</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Chargement...
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            Récupération de vos mots appris
          </Text>
        </View>
      </View>
    );
  }

  // ========== ÉCRAN D'ERREUR ==========
  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>⚠️</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Erreur
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            {error}
          </Text>
          <TouchableOpacity 
            style={[styles.emptyButton, { backgroundColor: colors.primary }]} 
            onPress={handleGoBackPress}
            activeOpacity={0.8}
          >
            <Text style={styles.emptyButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ========== ÉCRAN VIDE ==========
  if (!hasEnoughWords || !canGenerateQuestions) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Aucun mot disponible
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            Apprenez quelques mots avant de réviser !{stats.totalLearned > 0 ? `\nVous avez ${stats.totalLearned} mots appris` : ''}
          </Text>
          <TouchableOpacity 
            style={[styles.emptyButton, { backgroundColor: colors.primary }]} 
            onPress={handleGoBackPress}
            activeOpacity={0.8}
          >
            <Text style={styles.emptyButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ========== ANIMATIONS ==========
  const animateTransition = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentIndex < revisionQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setIsFinished(true);
      }
    });
  };

  // ========== HANDLERS ==========
  const handleAnswer = (choice) => {
    if (showResult) return;
    
    setSelectedAnswer(choice);
    setShowResult(true);
    
    if (choice === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(animateTransition, 1500);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsFinished(false);
    fadeAnim.setValue(1);
  };

  const handleFinish = async () => {
    if (markRevisionCompleted) {
      await markRevisionCompleted(revisionQuestions, score, revisionQuestions.length);
    }
    navigation.goBack();
  };

  const handleAnswerPress = useCallback((choice) => () => handleAnswer(choice), [handleAnswer]);
  const handleRestartPress = useCallback(() => handleRestart(), [handleRestart]);
  const handleFinishPress = useCallback(() => handleFinish(), [handleFinish]);

  // ========== ÉCRAN FINAL ==========
  if (isFinished) {
    const percentage = Math.round((score / revisionQuestions.length) * 100);
    
    let resultConfig = {
      emoji: "😊",
      title: "Bien joué !",
      message: "Continuez comme ça !",
      color: "#3B82F6"
    };

    if (percentage >= 80) {
      resultConfig = {
        emoji: "🎉",
        title: "Excellent !",
        message: "Vous maîtrisez parfaitement ces mots !",
        color: "#10B981"
      };
    } else if (percentage >= 60) {
      resultConfig = {
        emoji: "👍",
        title: "Bien joué !", 
        message: "Bonne progression, continuez !",
        color: "#3B82F6"
      };
    } else {
      resultConfig = {
        emoji: "📖",
        title: "À améliorer",
        message: "Révisez encore ces mots pour progresser",
        color: "#F59E0B"
      };
    }
    
    return (
      <ResultScreenContent
        resultConfig={resultConfig}
        score={score}
        revisionQuestions={revisionQuestions}
        percentage={percentage}
        stats={stats}
        source={source}
        colors={colors}
        handleRestartPress={handleRestartPress}
        handleFinishPress={handleFinishPress}
        localStyles={styles}
      />
    );
  }

  // ========== ÉCRAN QUIZ ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleGoBackPress} 
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.questionCounter, { color: colors.text }]}>
            Question {currentIndex + 1}
          </Text>
          <Text style={[styles.totalQuestions, { color: colors.textSecondary }]}>
            sur {revisionQuestions.length}
          </Text>
        </View>
        
        <View style={[styles.scoreChip, { backgroundColor: colors.primary }]}>
          <Text style={styles.scoreChipText}>{score}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={[styles.progressTrack, { backgroundColor: '#F3F4F6' }]}>
          <View 
            style={[
              styles.progressBarQuiz, 
              { 
                backgroundColor: colors.primary,
                width: `${progress}%` 
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Question card */}
      <Animated.View style={[styles.questionSection, { opacity: fadeAnim }]}>
        <QuestionCard
          currentQuestion={currentQuestion}
          colors={colors}
          localStyles={styles}
        />
      </Animated.View>

      {/* Choix */}
      <ChoicesSection
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        handleAnswerPress={handleAnswerPress}
        colors={colors}
        localStyles={styles}
      />
    </View>
  );
};

export default VocabularyRevision;