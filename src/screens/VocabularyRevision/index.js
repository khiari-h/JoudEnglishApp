// src/screens/VocabularyRevision/index.js
import React, { useState, useEffect, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Utils
import { getVocabularyData } from "../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../utils/constants";

import styles from "./style";

/**
 * Écran de révision vocabulaire avec support des styles Light/Standard/Intensive
 * Format: Quiz 4 choix avec nombre de questions variable (5/8/12)
 */
const VocabularyRevision = ({ route }) => {
  const navigation = useNavigation();
  const { 
    level = "mixed", 
    wordsToReview = 10, 
    questionsCount = 10,
    source = 'manual'
  } = route.params || {};

  console.log("🎯 VocabularyRevision params:", { level, wordsToReview, questionsCount, source });

  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#8B5CF6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    success: "#10B981",
    error: "#EF4444",
  };

  // ========== ÉTATS ==========
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // ========== DONNÉES RÉVISION INTELLIGENTE ==========
  const revisionWords = useMemo(() => {
    const words = [];
    
    // Si level = "mixed", prendre de tous les niveaux
    if (level === "mixed") {
      // Stratégie : 60% récents, 30% intermédiaires, 10% anciens
      const allWords = [];
      
      // Récupérer tous les mots de tous les niveaux
      ['1', '2', '3', '4', '5', '6', 'bonus'].forEach(levelKey => {
        ['classic', 'fast'].forEach(mode => {
          const levelData = getVocabularyData(levelKey, mode);
          if (levelData?.exercises) {
            levelData.exercises.forEach(exercise => {
              if (exercise.words) {
                exercise.words.forEach(word => {
                  allWords.push({
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
      
      // Mélanger et prendre selon la stratégie
      const shuffledWords = allWords.sort(() => Math.random() - 0.5);
      const totalNeeded = questionsCount;
      const selectedWords = shuffledWords.slice(0, totalNeeded);
      
      console.log("🎯 Sélection mots révision:", {
        total: selectedWords.length,
        needed: totalNeeded
      });
      
      return selectedWords;
    } else {
      // Révision d'un niveau spécifique
      const currentLevelNum = parseInt(level);
      
      // Prendre mots des niveaux 1 à niveau actuel
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
      
      // Mélanger et prendre le nombre requis
      const shuffled = words.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, questionsCount);
    }
  }, [level, questionsCount]);

  // Question actuelle avec choix multiples
  const currentQuestion = useMemo(() => {
    if (!revisionWords[currentQuestionIndex]) return null;
    
    const word = revisionWords[currentQuestionIndex];
    
    // Générer 3 mauvaises réponses aléatoires
    const wrongAnswers = revisionWords
      .filter((_, idx) => idx !== currentQuestionIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.translation);
    
    // Mélanger avec la bonne réponse
    const allChoices = [word.translation, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
      word: word.word,
      correctAnswer: word.translation,
      example: word.example,
      fromLevel: word.fromLevel,
      fromMode: word.fromMode,
      choices: allChoices
    };
  }, [revisionWords, currentQuestionIndex]);

  // ========== COULEUR NIVEAU ==========
  const levelColor = level === "mixed" 
    ? "#8B5CF6" // Violet pour mixed
    : LANGUAGE_LEVELS[level]?.color || colors.primary;

  // ========== HANDLERS ==========
  const handleChoiceSelect = (choice) => {
    if (showFeedback) return;
    setSelectedChoice(choice);
  };

  const handleValidate = () => {
    if (!selectedChoice || !currentQuestion) return;
    
    const isCorrect = selectedChoice === currentQuestion.correctAnswer;
    
    // Sauvegarder réponse
    const answer = {
      word: currentQuestion.word,
      userAnswer: selectedChoice,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      fromLevel: currentQuestion.fromLevel,
      fromMode: currentQuestion.fromMode
    };
    
    setAnswers(prev => [...prev, answer]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Afficher feedback
    setShowFeedback(true);
    
    // Passer à la question suivante
    setTimeout(() => {
      if (currentQuestionIndex < revisionWords.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedChoice(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const handleFinish = async () => {
    try {
      // Sauvegarder résultats de révision
      const percentage = Math.round((score / revisionWords.length) * 100);
      
      // Update stats révision dans ProgressContext
      if (progressContext.updateStats) {
        progressContext.updateStats({
          lastRevisionScore: percentage,
          lastRevisionDate: new Date().toISOString(),
          totalRevisionsCompleted: (progressContext.progress?.stats?.totalRevisionsCompleted || 0) + 1
        });
      }
      
      console.log("✅ Révision terminée:", {
        source,
        questionsCount,
        score,
        percentage
      });
      
      navigation.goBack();
    } catch (error) {
      console.error('Erreur sauvegarde révision:', error);
      navigation.goBack();
    }
  };

  const handleQuit = () => {
    Alert.alert(
      "Quitter la révision",
      "Êtes-vous sûr de vouloir abandonner ? Vos progrès ne seront pas sauvegardés.",
      [
        { text: "Continuer", style: "cancel" },
        { text: "Quitter", style: "destructive", onPress: () => navigation.goBack() }
      ]
    );
  };

  // ========== LOADING ==========
  if (!currentQuestion && !isFinished) {
    return (
      <Container safeArea backgroundColor={colors.background}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Préparation de la révision...
          </Text>
          <Text style={[styles.loadingSubtext, { color: colors.textSecondary }]}>
            {questionsCount} questions • Source: {source}
          </Text>
        </View>
      </Container>
    );
  }

  // ========== ÉCRAN FINAL ==========
  if (isFinished) {
    const percentage = Math.round((score / revisionWords.length) * 100);
    const emoji = percentage >= 80 ? "🎉" : percentage >= 60 ? "👏" : "💪";
    const message = percentage >= 80 ? "Excellent !" : percentage >= 60 ? "Bien joué !" : "Continuez vos efforts !";
    
    return (
      <Container
        safeArea
        backgroundColor="transparent"
        statusBarStyle="light-content"
        withPadding={false}
      >
        <LinearGradient
          colors={[levelColor, `${levelColor}DD`]}
          style={styles.container}
        >
          <View style={styles.finishContainer}>
            <Text style={styles.finishEmoji}>{emoji}</Text>
            <Text style={styles.finishTitle}>Révision terminée !</Text>
            <Text style={styles.finishMessage}>{message}</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {score}/{revisionWords.length}
              </Text>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
            </View>
            
            {/* Info source */}
            <View style={styles.sourceInfo}>
              <Text style={styles.sourceText}>
                {questionsCount} questions • {source === 'popup_trigger' ? 'Révision automatique' : 'Révision manuelle'}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.finishButtonText}>Retour au dashboard</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Container>
    );
  }

  // ========== ÉCRAN RÉVISION ==========
  const progress = ((currentQuestionIndex + 1) / revisionWords.length) * 100;
  
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent"
      statusBarStyle="light-content"
      withPadding={false}
    >
      <LinearGradient
        colors={[levelColor, `${levelColor}DD`]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonIcon}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitle}>
            <Text style={styles.titleEmoji}>🔄</Text>
            <Text style={styles.titleText}>
              Révision {level === "mixed" ? "Globale" : `Niveau ${level}`}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={handleQuit}>
            <Text style={styles.buttonIcon}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} sur {revisionWords.length}
            </Text>
            <Text style={styles.scoreText}>
              Score : {score}/{currentQuestionIndex + (showFeedback ? 1 : 0)} 
              {score > 0 && " ✅"}
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          
          {/* Info révision */}
          <View style={styles.revisionInfo}>
            <Text style={styles.revisionInfoText}>
              📚 {questionsCount} questions • {source === 'popup_trigger' ? 'Auto' : 'Manuel'}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Question Card */}
          <View style={[styles.questionCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.questionType, { color: levelColor }]}>
              TRADUCTION
            </Text>
            <Text style={[styles.questionWord, { color: colors.text }]}>
              {currentQuestion.word}
            </Text>
            <Text style={[styles.questionInstruction, { color: colors.textSecondary }]}>
              Choisissez la traduction correcte :
            </Text>
            
            {/* Info niveau source */}
            <Text style={[styles.questionSource, { color: colors.textSecondary }]}>
              Niveau {currentQuestion.fromLevel} • {currentQuestion.fromMode}
            </Text>
          </View>

          {/* Choices */}
          <View style={styles.choicesGrid}>
            {currentQuestion.choices.map((choice, index) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedChoice === choice;
              const isCorrect = choice === currentQuestion.correctAnswer;
              const isWrong = showFeedback && isSelected && !isCorrect;
              const shouldHighlight = showFeedback && isCorrect;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.choiceButton,
                    { backgroundColor: colors.surface },
                    isSelected && styles.choiceSelected,
                    shouldHighlight && styles.choiceCorrect,
                    isWrong && styles.choiceWrong,
                  ]}
                  onPress={() => handleChoiceSelect(choice)}
                  activeOpacity={0.7}
                  disabled={showFeedback}
                >
                  <View style={[
                    styles.choiceLetter,
                    isSelected && { backgroundColor: levelColor, borderColor: levelColor },
                    shouldHighlight && styles.choiceLetterCorrect,
                    isWrong && styles.choiceLetterWrong,
                  ]}>
                    <Text style={[
                      styles.choiceLetterText,
                      isSelected && styles.choiceLetterTextSelected,
                      shouldHighlight && styles.choiceLetterTextCorrect,
                      isWrong && styles.choiceLetterTextWrong,
                    ]}>
                      {letters[index]}
                    </Text>
                  </View>
                  
                  <Text style={[
                    styles.choiceText,
                    { color: colors.text },
                    shouldHighlight && { color: colors.success },
                    isWrong && { color: colors.error },
                  ]}>
                    {choice}
                  </Text>
                  
                  {/* Feedback icons */}
                  {showFeedback && isCorrect && (
                    <Text style={styles.feedbackIcon}>✅</Text>
                  )}
                  {showFeedback && isWrong && (
                    <Text style={styles.feedbackIcon}>❌</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: selectedChoice ? levelColor : colors.textSecondary },
            ]}
            onPress={handleValidate}
            disabled={!selectedChoice || showFeedback}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {showFeedback ? "..." : "Valider"} ✓
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Container>
  );
};

export default VocabularyRevision;