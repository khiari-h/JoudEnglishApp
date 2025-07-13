// ReadingProgress/index.js - VERSION CORRIGÉE AVEC DÉTECTION AUTO



import {
  calculateTotalQuestions,
  calculateCompletedQuestionsCount,
  calculateTotalProgress,
  calculateExerciseProgress,
} from "../../../../utils/reading/readingStats.js";

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

  // Transformation pour le format ProgressCard
  const formattedExerciseData = exerciseProgressData.map((exercise, index) => ({
    title: exercise.title,
    completed: exercise.completedQuestions,
    total: exercise.totalQuestions,
    progress: exercise.progress,
  }));

  console.log("🔍 ReadingProgress Debug:", {
    isReadingDataArray: Array.isArray(readingData),
    hasExercises: !!(readingData?.exercises),
    hasTexts: !!(readingData?.texts),
    hasPassages: !!(readingData?.passages),
    dataArrayLength: dataArray.length,
    totalQuestionsCount,
    completedQuestionsCount,
    totalProgress,
    readingDataKeys: readingData && typeof readingData === 'object' ? Object.keys(readingData) : "not object or null"
  });

  return (
    <ProgressCard
      title="Progression" // ✅ Titre uniforme
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