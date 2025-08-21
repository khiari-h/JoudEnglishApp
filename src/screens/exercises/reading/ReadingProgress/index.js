// ReadingProgress/index.js - VERSION AVEC GAMIFICATION

import ProgressCard from "../../../../components/ui/ProgressCard";
import useProgressGamification from "../../../../hooks/useProgressGamification";
import {
  calculateTotalQuestions,
  calculateCompletedQuestionsCount,
  calculateTotalProgress,
  calculateExerciseProgress,
} from "../../../../utils/reading/readingStats.js";
import PropTypes from 'prop-types';

/**
 * 📊 ReadingProgress - Version Corrigée avec détection automatique
 * ✅ Détecte automatiquement la structure des données
 * ✅ Gère exercises, texts, passages, etc.
 */
const ReadingProgress = ({
  readingData,
  completedQuestions,
  levelColor,
  expanded = false,
  onToggleExpand,
  onExercisePress,
}) => {
  
  // ✅ DÉTECTION AUTOMATIQUE de la structure
  const getDataArray = () => {
    if (!readingData) return [];
    
    // Si c'est déjà un tableau directement
    if (Array.isArray(readingData)) {
      return readingData;
    }
    
    // Si c'est un objet avec différentes propriétés possibles
    if (typeof readingData === 'object') {
      return readingData.exercises || 
             readingData.texts || 
             readingData.passages || 
             readingData.readings || 
             readingData.items || 
             [];
    }
    
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ UTILISE la vraie structure détectée
  const totalQuestionsCount = calculateTotalQuestions(dataArray);
  const completedQuestionsCount = calculateCompletedQuestionsCount(completedQuestions);
  const totalProgress = calculateTotalProgress(dataArray, completedQuestions);
  const exerciseProgressData = calculateExerciseProgress(dataArray, completedQuestions);

  // 🎭 GAMIFICATION : Utilise le hook pour transformer la progression
  const gamification = useProgressGamification({
    progress: totalProgress,
    completed: completedQuestionsCount,
    total: totalQuestionsCount,
    type: "reading"
  });

  // Transformation pour le format ProgressCard
  const formattedExerciseData = exerciseProgressData.map((exercise) => ({
    title: exercise.title,
    completed: exercise.completedQuestions,
    total: exercise.totalQuestions,
    progress: exercise.progress,
  }));

  return (
    <ProgressCard
      title={gamification.messages.main} // 🎭 Titre dynamique et motivant
      subtitle={gamification.messages.subtitle} // 🎭 Sous-titre dynamique
      progress={totalProgress}
      completed={completedQuestionsCount}
      total={totalQuestionsCount}
      unit="questions"
      levelColor={gamification.colors.primary} // 🎭 Couleur dynamique selon la progression
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedExerciseData}
      onCategoryPress={onExercisePress}
      // 🎭 Props de gamification pour ProgressCard
      gamificationData={gamification}
    />
  );
};

// ✅ Ajout de la validation des props
ReadingProgress.propTypes = {
  // 'readingData' est manquant dans la validation
  readingData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      exercises: PropTypes.array,
      texts: PropTypes.array,
      passages: PropTypes.array,
      readings: PropTypes.array,
      items: PropTypes.array,
    })
  ]).isRequired,
  // 'completedQuestions' est manquant dans la validation
  completedQuestions: PropTypes.object,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
  // 'expanded' est manquant dans la validation
  expanded: PropTypes.bool,
  // 'onToggleExpand' est manquant dans la validation
  onToggleExpand: PropTypes.func,
  // 'onExercisePress' est manquant dans la validation
  onExercisePress: PropTypes.func,
};

export default ReadingProgress;