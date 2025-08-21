// VocabularyProgress/index.js - VERSION AVEC GAMIFICATION
import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import useProgressGamification from "../../../../hooks/useProgressGamification";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/vocabulary/vocabularyStats";

const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // ✅ CORRIGÉ : Détecte la vraie structure CLASSIC vs FAST
  const getDataArray = () => {
    if (vocabularyData?.categories && Array.isArray(vocabularyData.categories)) {
      return vocabularyData.categories;
    } else if (vocabularyData?.exercises && Array.isArray(vocabularyData.exercises)) {
      return vocabularyData.exercises;
    } else if (vocabularyData?.fastExercises && Array.isArray(vocabularyData.fastExercises)) {
      return vocabularyData.fastExercises;
    }
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ CORRIGÉ : Utilise la vraie structure détectée
  const totalWordsCount = calculateTotalWords(dataArray);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(dataArray, completedWords);
  
  // Données des catégories pour l'expansion
  const categoryProgressData = calculateCategoryProgress(dataArray, completedWords);
  
  // 🎭 GAMIFICATION : Utilise le hook pour transformer la progression
  const gamification = useProgressGamification({
    progress: totalProgress,
    completed: completedWordsCount,
    total: totalWordsCount,
    type: "vocabulary"
  });

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category) => ({
    title: category.title,
    completed: category.completedWords,
    total: category.totalWords,
    progress: category.progress,
  }));

  return (
    <ProgressCard
      title="Vocabulaire" // Titre fixe comme dans la capture d'écran
      subtitle={gamification.messages.subtitle} // Sous-titre dynamique
      progress={totalProgress}
      completed={completedWordsCount}
      total={totalWordsCount}
      unit="mots"
      levelColor={gamification.colors.primary}
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
      // 🎭 Props de gamification pour ProgressCard
      gamificationData={gamification}
    />
  );
};

VocabularyProgress.propTypes = {
  vocabularyData: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.object),
    exercises: PropTypes.arrayOf(PropTypes.object),
    fastExercises: PropTypes.arrayOf(PropTypes.object), // ✅ Ajouté fastExercises
  }),
  completedWords: PropTypes.object,
  levelColor: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onCategoryPress: PropTypes.func,
};

export default VocabularyProgress;