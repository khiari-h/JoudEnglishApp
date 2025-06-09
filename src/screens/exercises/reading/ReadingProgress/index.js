// ReadingProgress/index.js - VERSION SIMPLIFIÉE (identique à VocabularyProgress)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalQuestions,
  calculateCompletedQuestionsCount,
  calculateTotalProgress,
  calculateExerciseProgress,
} from "../../../../utils/reading/readingStats.js";

/**
 * 📊 ReadingProgress - Version Simplifiée avec ProgressCard générique
 * API identique à VocabularyProgress et PhrasesProgress
 * Pattern uniforme sur tous les exercices
 * 
 * @param {object} readingData - Données de lecture
 * @param {object} completedQuestions - Questions complétées par exercice
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onExercisePress - Fonction appelée lors du clic sur exercice
 */
const ReadingProgress = ({
  readingData,
  completedQuestions,
  levelColor,
  expanded = false,
  onToggleExpand,
  onExercisePress,
}) => {
  
  // Calculs des statistiques (utilise des utilitaires externes comme Vocabulary)
  const totalQuestionsCount = calculateTotalQuestions(readingData?.exercises || []);
  const completedQuestionsCount = calculateCompletedQuestionsCount(completedQuestions);
  const totalProgress = calculateTotalProgress(readingData?.exercises || [], completedQuestions);
  
  // Données des exercices pour l'expansion
  const exerciseProgressData = calculateExerciseProgress(readingData?.exercises || [], completedQuestions);

  // Transformation pour le format ProgressCard (identique à Vocabulary)
  const formattedExerciseData = exerciseProgressData.map((exercise, index) => ({
    title: exercise.title,
    completed: exercise.completedQuestions,
    total: exercise.totalQuestions,
    progress: exercise.progress,
  }));

  return (
    <ProgressCard
      title="Reading Progress"
      progress={totalProgress}
      completed={completedQuestionsCount}
      total={totalQuestionsCount}
      unit="questions"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedExerciseData}
      onCategoryPress={onExercisePress}
    />
  );
};

export default ReadingProgress;