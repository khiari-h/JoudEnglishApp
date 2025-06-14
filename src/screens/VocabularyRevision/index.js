// src/screens/VocabularyRevision/index.js
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Utils
import { getVocabularyData } from "../../utils/vocabulary/vocabularyDataHelper";

import styles from './style';

const VocabularyRevision = ({ route }) => {
  const navigation = useNavigation();
  const { 
    level = "mixed", 
    questionsCount = 5,
    source = 'manual'
  } = route?.params || {};

  // ========== ÉTATS ==========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // ========== RÉCUPÉRATION DES MOTS ==========
  const revisionWords = useMemo(() => {
    const words = [];
    
    if (level === "mixed") {
      // Prendre de tous les niveaux
      ['1', '2', '3', '4', '5', '6', 'bonus'].forEach(levelKey => {
        ['classic', 'fast'].forEach(mode => {
          const levelData = getVocabularyData(levelKey, mode);
          if (levelData?.exercises) {
            levelData.exercises.forEach(exercise => {
              if (exercise.words) {
                exercise.words.forEach(word => {
                  words.push({
                    ...word,
                    fromLevel: levelKey,
                    fromMode: mode
                  });
                });
              }
            });
          }
        });
      });
    } else {
      // Niveau spécifique
      const currentLevelNum = parseInt(level);
      for (let i = 1; i <= currentLevelNum; i++) {
        ['classic', 'fast'].forEach(mode => {
          const levelData = getVocabularyData(i.toString(), mode);
          if (levelData?.exercises) {
            levelData.exercises.forEach(exercise => {
              if (exercise.words) {
                words.push(...exercise.words.map(word => ({
                  ...word,
                  fromLevel: i.toString(),
                  fromMode: mode
                })));
              }
            });
          }
        });
      }
    }
    
    // Mélanger et prendre le nombre requis
    const shuffled = words.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionsCount);
    
    console.log("🎯 Mots chargés:", {
      level,
      totalWords: words.length,
      selectedWords: selected.length,
      questionsCount
    });
    
    return selected;
  }, [level, questionsCount]);

  // ========== QUESTIONS AVEC CHOIX MULTIPLES ==========
  const questions = useMemo(() => {
    return revisionWords.map((word, idx) => {
      // Générer 3 mauvaises réponses depuis les autres mots
      const wrongAnswers = revisionWords
        .filter((_, i) => i !== idx)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.translation);
      
      // Mélanger avec la bonne réponse
      const choices = [word.translation, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);
      
      return {
        ...word,
        choices,
        correctAnswer: word.translation
      };
    });
  }, [revisionWords]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // ========== VÉRIFICATION DES DONNÉES ==========
  if (!revisionWords.length || !questions.length) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>📚</Text>
          <Text style={styles.resultTitle}>Aucun mot trouvé</Text>
          <Text style={styles.resultMessage}>
            Impossible de charger les mots pour ce niveau.
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  // ========== HANDLERS ==========
  const handleAnswer = (choice) => {
    if (showResult) return;
    
    setSelectedAnswer(choice);
    setShowResult(true);
    
    if (choice === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsFinished(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // ========== ÉCRAN FINAL ==========
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪";
    const message = percentage >= 80 ? "Excellent !" : percentage >= 60 ? "Bien joué !" : "Continuez !";
    
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>Quiz terminé !</Text>
          <Text style={styles.resultMessage}>{message}</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score}/{questions.length}</Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Recommencer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  // ========== ÉCRAN QUIZ ==========
  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.questionCounter}>
          {currentIndex + 1} / {questions.length}
        </Text>
        
        <Text style={styles.currentScore}>
          Score: {score}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.wordToTranslate}>
          {currentQuestion.word}
        </Text>
        <Text style={styles.instruction}>
          Choisissez la traduction :
        </Text>
        {currentQuestion.fromLevel && (
          <Text style={styles.wordSource}>
            Niveau {currentQuestion.fromLevel} • {currentQuestion.fromMode}
          </Text>
        )}
      </View>

      {/* Choices */}
      <View style={styles.choicesContainer}>
        {currentQuestion.choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === currentQuestion.correctAnswer;
          const isWrong = showResult && isSelected && !isCorrect;
          const shouldHighlight = showResult && isCorrect;
          
          let choiceStyle = [styles.choiceButton];
          if (isSelected) choiceStyle.push(styles.choiceSelected);
          if (shouldHighlight) choiceStyle.push(styles.choiceCorrect);
          if (isWrong) choiceStyle.push(styles.choiceWrong);
          
          return (
            <TouchableOpacity
              key={index}
              style={choiceStyle}
              onPress={() => handleAnswer(choice)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.choiceText,
                shouldHighlight && styles.choiceTextCorrect,
                isWrong && styles.choiceTextWrong
              ]}>
                {choice}
              </Text>
              
              {showResult && isCorrect && (
                <Text style={styles.feedbackIcon}>✓</Text>
              )}
              {showResult && isWrong && (
                <Text style={styles.feedbackIcon}>✗</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default VocabularyRevision;