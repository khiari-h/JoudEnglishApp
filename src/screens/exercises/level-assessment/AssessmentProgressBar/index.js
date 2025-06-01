// src/components/screens/exercises/levelAssessment/AssessmentProgressBar/index.js
import React from "react";
import { View, Text } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour l'évaluation de niveau
 * Version unifiée suivant le pattern des autres modules
 * Structure : Sections → Questions (2 niveaux comme Reading/Grammar)
 * 
 * @param {number} currentSection - Index de la section actuelle (1-based)
 * @param {number} totalSections - Nombre total de sections
 * @param {string} sectionTitle - Titre de la section actuelle
 * @param {number} currentQuestion - Index de la question actuelle (1-based)  
 * @param {number} totalQuestions - Nombre de questions dans la section actuelle
 * @param {number} answeredQuestionsInSection - Questions répondues dans la section actuelle
 * @param {string} levelColor - Couleur du niveau
 */
const AssessmentProgressBar = ({
  currentSection = 1,
  totalSections = 0,
  sectionTitle = "",
  currentQuestion = 1,
  totalQuestions = 0,
  answeredQuestionsInSection = 0,
  levelColor = "#3b82f6"
}) => {
  // ✅ Progression de la section actuelle basée sur questions répondues
  const sectionProgress = totalQuestions > 0 
    ? Math.round((answeredQuestionsInSection / totalQuestions) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Header avec section et compteurs */}
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle} numberOfLines={1}>
            {sectionTitle || `Section ${currentSection}`}
          </Text>
          <Text style={styles.sectionCounter}>
            Section {currentSection}/{totalSections}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.assessmentLabel}>Level Assessment</Text>
        </View>
      </View>

      {/* Compteur questions */}
      <View style={styles.questionCounterContainer}>
        <Text style={styles.questionCounter}>
          Question {currentQuestion}/{totalQuestions}
        </Text>
        <Text style={styles.progressInfo}>
          Answered: {answeredQuestionsInSection}/{totalQuestions}
        </Text>
      </View>

      {/* ProgressBar unifiée */}
      <ProgressBar
        progress={sectionProgress}
        showPercentage
        showValue={false}  // On affiche déjà dans le header
        height={8}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={4}
        animated
        labelPosition="none"
        percentageFormatter={(percentage) => `${percentage}% of section completed`}
        style={styles.progressBar}
      />

      {/* Indicateur global (optionnel) */}
      <View style={styles.globalIndicator}>
        <Text style={styles.globalProgress}>
          Overall Progress: {currentSection}/{totalSections} sections
        </Text>
      </View>
    </View>
  );
};

export default AssessmentProgressBar;