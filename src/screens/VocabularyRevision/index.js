// src/screens/VocabularyRevision/index.js - VERSION PROPRE ET MODERNE
import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../contexts/ThemeContext';
import useRevisionManager from '../../hooks/useRevisionManager';

// Utils
import { getVocabularyData } from "../../utils/vocabulary/vocabularyDataHelper";

import styles from './style';

const VocabularyRevision = ({ route }) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const { markRevisionCompleted } = useRevisionManager();
  
  const { 
    level = "mixed", 
    questionsCount = 10,
    source = 'manual',
    revisionWords = null
  } = route?.params || {};

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    primary: "#3B82F6"
  };

  // ========== ÉTATS ==========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // ========== RÉCUPÉRATION DES MOTS ==========
  const parsedRevisionWords = useMemo(() => {
    if (revisionWords && typeof revisionWords === 'string') {
      try {
        return JSON.parse(revisionWords);
      } catch (error) {
        return null;
      }
    }
    return revisionWords;
  }, [revisionWords]);

  const questions = useMemo(() => {
    let wordsToUse = [];

    if (parsedRevisionWords && parsedRevisionWords.length > 0) {
      wordsToUse = parsedRevisionWords;
    } else {
      // Fallback système
      const words = [];
      const levels = level === "mixed" ? ['1', '2', '3', '4', '5', '6', 'bonus'] : [level];
      
      levels.forEach(levelKey => {
        ['classic', 'fast'].forEach(mode => {
          const levelData = getVocabularyData(levelKey, mode);
          if (levelData?.exercises) {
            levelData.exercises.forEach(exercise => {
              if (exercise.words) {
                words.push(...exercise.words.map(word => ({
                  ...word,
                  fromLevel: levelKey,
                  fromMode: mode
                })));
              }
            });
          }
        });
      });
      
      const shuffled = words.sort(() => Math.random() - 0.5);
      wordsToUse = shuffled.slice(0, questionsCount);
    }
    
    // ========== GÉNÉRATION INTELLIGENTE DES CHOIX ==========
    return wordsToUse.map((word, idx) => {
      // Pool de tous les autres mots pour les mauvaises réponses
      const otherWords = wordsToUse.filter((_, i) => i !== idx);
      
      // Prendre 3 mauvaises réponses aléatoires
      const wrongAnswers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.translation);
      
      // Mélanger toutes les réponses
      const choices = [word.translation, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);
      
      return {
        ...word,
        choices,
        correctAnswer: word.translation
      };
    });
  }, [level, questionsCount, parsedRevisionWords]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // ========== VÉRIFICATION ==========
  if (!questions.length) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Aucun mot disponible
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
            Apprenez quelques mots avant de réviser !
          </Text>
          <TouchableOpacity 
            style={[styles.emptyButton, { backgroundColor: colors.primary }]} 
            onPress={() => navigation.goBack()}
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
      if (currentIndex < questions.length - 1) {
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
      await markRevisionCompleted(questions, score, questions.length);
    }
    navigation.goBack();
  };

  // ========== ÉCRAN FINAL MODERNE ==========
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        
        <View style={styles.resultContainer}>
          {/* Émoji principal */}
          <Text style={styles.resultEmoji}>{resultConfig.emoji}</Text>
          
          {/* Titre et message */}
          <Text style={[styles.resultTitle, { color: colors.text }]}>
            {resultConfig.title}
          </Text>
          <Text style={[styles.resultMessage, { color: colors.textSecondary }]}>
            {resultConfig.message}
          </Text>
          
          {/* Score moderne */}
          <View style={[styles.scoreCard, { backgroundColor: colors.surface }]}>
            <View style={styles.scoreRow}>
              <Text style={[styles.scoreNumber, { color: resultConfig.color }]}>
                {score}
              </Text>
              <Text style={[styles.scoreSlash, { color: colors.textSecondary }]}>
                /{questions.length}
              </Text>
            </View>
            
            {/* Barre de progression moderne */}
            <View style={[styles.progressBar, { backgroundColor: '#F3F4F6' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: resultConfig.color,
                    width: `${percentage}%` 
                  }
                ]} 
              />
            </View>
            
            <Text style={[styles.percentageText, { color: resultConfig.color }]}>
              {percentage}% de réussite
            </Text>
          </View>
          
          {/* Source info */}
          {source && (
            <Text style={[styles.sourceText, { color: colors.textSecondary }]}>
              {source === 'popup_trigger' ? '🤖 Révision automatique' : '👤 Révision manuelle'}
            </Text>
          )}
          
          {/* Boutons modernes */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.restartButton, { backgroundColor: colors.surface }]} 
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.restartIcon}>🔄</Text>
                <Text style={[styles.restartText, { color: colors.text }]}>
                  Rejouer
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.finishButton, { backgroundColor: resultConfig.color }]} 
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.finishIcon}>✓</Text>
                <Text style={styles.finishText}>
                  Terminer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // ========== ÉCRAN QUIZ MODERNE ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header propre */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.questionCounter, { color: colors.text }]}>
            Question {currentIndex + 1}
          </Text>
          <Text style={[styles.totalQuestions, { color: colors.textSecondary }]}>
            sur {questions.length}
          </Text>
        </View>
        
        <View style={[styles.scoreChip, { backgroundColor: colors.primary }]}>
          <Text style={styles.scoreChipText}>{score}</Text>
        </View>
      </View>

      {/* Progress bar propre */}
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
        <View style={[styles.questionCard, { backgroundColor: colors.surface }]}>
          <Text style={styles.questionLabel}>Traduisez :</Text>
          <Text style={[styles.wordToTranslate, { color: colors.text }]}>
            {currentQuestion.word}
          </Text>
          {currentQuestion.fromLevel && (
            <Text style={[styles.levelInfo, { color: colors.textSecondary }]}>
              Niveau {currentQuestion.fromLevel}
            </Text>
          )}
        </View>
      </Animated.View>

      {/* Choix modernes */}
      <View style={styles.choicesSection}>
        {currentQuestion.choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === currentQuestion.correctAnswer;
          const isWrong = showResult && isSelected && !isCorrect;
          const shouldHighlight = showResult && isCorrect;
          
          let buttonStyle = [styles.choiceButton, { backgroundColor: colors.surface }];
          let textStyle = [styles.choiceText, { color: colors.text }];
          let icon = null;
          
          if (shouldHighlight) {
            buttonStyle.push(styles.choiceCorrect);
            textStyle.push(styles.choiceTextCorrect);
            icon = <Text style={styles.choiceIcon}>✓</Text>;
          } else if (isWrong) {
            buttonStyle.push(styles.choiceWrong);
            textStyle.push(styles.choiceTextWrong);
            icon = <Text style={styles.choiceIcon}>✗</Text>;
          } else if (isSelected) {
            buttonStyle.push({ borderColor: colors.primary, borderWidth: 2 });
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => handleAnswer(choice)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text style={textStyle}>{choice}</Text>
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default VocabularyRevision;