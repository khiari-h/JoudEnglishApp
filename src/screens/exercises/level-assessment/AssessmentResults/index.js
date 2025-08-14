// src/screens/exercises/level-assessment/AssessmentResults/index.js - AVEC PROPTYPES

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import HeroCard from "../../../../components/ui/HeroCard";
import ContentSection from "../../../../components/ui/ContentSection";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import createStyles from "./style";

/**
 * 🏆 AssessmentResults - Version Refactorisée avec composants génériques
 * 200+ lignes → 60 lignes (-70% de code)
 * Utilise HeroCard + ContentSection + NavigationButtons
 * 
 * @param {string} level - Niveau de l'évaluation
 * @param {string} levelColor - Couleur du niveau
 * @param {object} userScore - Score utilisateur {correctAnswers, totalQuestions, percentage}
 * @param {function} onContinue - Fonction pour continuer
 * @param {function} onRetry - Fonction pour recommencer
 */
const AssessmentResults = ({
  level,
  levelColor = "#3b82f6",
  userScore,
  onContinue,
  onRetry,
}) => {
  const styles = createStyles(levelColor);

  // Fallback si pas de score
  if (!userScore) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 🎯 HERO - Titre simple */}
        <HeroCard 
          content="Évaluation Terminée"
          fontSize={24}
          levelColor={levelColor}
          showUnderline
          backgroundColor="white"
        />

        {/* 📝 MESSAGE SIMPLE */}
        <ContentSection
          title={`Niveau ${level}`}
          content="Votre évaluation est terminée. Merci d'avoir participé !"
          levelColor={levelColor}
          backgroundColor="#f8fafc"
        />

        {/* 🚀 NAVIGATION */}
        <View style={styles.navigationContainer}>
          <NavigationButtons
            onNext={onContinue}
            disablePrevious
            disableNext={false}
            primaryColor={levelColor}
            isLast
            buttonLabels={{
              next: "Continuer",
              finish: "Continuer"
            }}
          />
        </View>
      </ScrollView>
    );
  }

  // Calculs pour l'affichage
  const scoreOutOf20 = Math.round((userScore.percentage / 100) * 20);
  const wrongAnswers = userScore.totalQuestions - userScore.correctAnswers;

  // Système de couleurs et messages basé sur performance
  const getPerformanceData = (scoreOut20) => {
    if (scoreOut20 >= 16) {
      return {
        title: "🏆 Bravo champion !",
        subtitle: "Tu maîtrises bien ton affaire !",
        color: "#16a34a",
        backgroundColor: "#f0fdf4",
        showRetry: false
      };
    } else if (scoreOut20 >= 12) {
      return {
        title: "👌 Pas mal du tout !",
        subtitle: "On est sur la bonne voie !",
        color: "#ea580c",
        backgroundColor: "#fff7ed",
        showRetry: false
      };
    } else if (scoreOut20 >= 8) {
      return {
        title: "😬 Hmm... on a vu mieux !",
        subtitle: "Allez, on remonte la pente !",
        color: "#dc2626",
        backgroundColor: "#fef2f2",
        showRetry: true
      };
    } else {
      return {
        title: "🔥 Oula... c'est chaud !",
        subtitle: "Bon, on va pas se mentir, il faut bosser !",
        color: "#b91c1c",
        backgroundColor: "#fef2f2",
        showRetry: true
      };
    }
  };

  const performance = getPerformanceData(scoreOutOf20);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 🎯 HERO - Score principal spectaculaire */}
      <HeroCard 
        content={`${scoreOutOf20}/20`}
        fontSize={56}
        levelColor={performance.color}
        showUnderline={false}
        backgroundColor={performance.backgroundColor}
        padding={32}
        subtitle={`${userScore.percentage.toFixed(1)}%`}
      />

      {/* 📊 STATISTIQUES - ContentSection */}
      <ContentSection
        title="Statistiques détaillées"
        content={`✅ ${userScore.correctAnswers} correctes\n❌ ${wrongAnswers} incorrectes\n📊 ${userScore.totalQuestions} questions au total`}
        levelColor="#6366f1"
        backgroundColor="white"
        isMonospace
      />

      {/* 🎭 MESSAGE DE PERFORMANCE */}
      <ContentSection
        title="Votre Performance"
        content={`${performance.title}\n\n${performance.subtitle}`}
        levelColor={performance.color}
        backgroundColor={performance.backgroundColor}
        icon={performance.title.split(' ')[0]} // Récupère l'emoji
      />

      {/* 🏷️ BADGE NIVEAU */}
      <ContentSection
        title={`Évaluation Niveau ${level}`}
        content="Évaluation terminée avec succès !"
        levelColor={levelColor}
        backgroundColor="#f1f5f9"
        isItalic
      />

      {/* 🚀 NAVIGATION - Boutons d'action */}
      <View style={styles.navigationContainer}>
        {/* Bouton Retry conditionnel */}
        {performance.showRetry && onRetry && (
          <View style={styles.retryContainer}>
            <NavigationButtons
              onNext={onRetry}
              disablePrevious
              disableNext={false}
              primaryColor={performance.color}
              isLast={false}
              buttonLabels={{
                next: "Recommencer",
              }}
            />
          </View>
        )}

        {/* Bouton principal Continue */}
        <NavigationButtons
          onNext={onContinue}
          disablePrevious
          disableNext={false}
          primaryColor={levelColor}
          isLast
          buttonLabels={{
            next: "Continuer",
            finish: "Continuer"
          }}
        />
      </View>
    </ScrollView>
  );
};

// PropTypes pour le composant AssessmentResults
AssessmentResults.propTypes = {
  level: PropTypes.string.isRequired,
  levelColor: PropTypes.string.isRequired,
  userScore: PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    correctAnswers: PropTypes.number.isRequired,
  }).isRequired,
  onContinue: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default AssessmentResults;