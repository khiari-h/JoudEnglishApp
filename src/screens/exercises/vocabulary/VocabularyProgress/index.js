// VocabularyProgress/index.js - VERSION DEBUG
import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
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
    console.log(`🔍 DEBUG VocabularyProgress - Data structure:`, vocabularyData ? Object.keys(vocabularyData) : 'null');
    
    if (vocabularyData?.categories && Array.isArray(vocabularyData.categories)) {
      console.log(`   - Mode: CLASSIC (categories)`);
      return vocabularyData.categories;
    } else if (vocabularyData?.exercises && Array.isArray(vocabularyData.exercises)) {
      console.log(`   - Mode: CLASSIC (exercises)`);
      return vocabularyData.exercises;
    } else if (vocabularyData?.fastExercises && Array.isArray(vocabularyData.fastExercises)) {
      console.log(`   - Mode: FAST (fastExercises)`);
      return vocabularyData.fastExercises;
    }
    console.log(`   - Mode: UNKNOWN - Retourne tableau vide`);
    return [];
  };

  const dataArray = getDataArray();
  
  // 🔧 DEBUG CRITIQUE - Vérifier les completedWords
  console.log('🔧 DEBUG VocabularyProgress - DONNÉES REÇUES:');
  console.log(`   - vocabularyData keys:`, vocabularyData ? Object.keys(vocabularyData) : 'null');
  console.log(`   - completedWords:`, completedWords);
  console.log(`   - dataArray length:`, dataArray.length);
  
  // ✅ CORRIGÉ : Utilise la vraie structure détectée
  const totalWordsCount = calculateTotalWords(dataArray);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(dataArray, completedWords);
  
  // 🔧 DEBUG CRITIQUE - Vérifier les calculs
  console.log('🔧 DEBUG VocabularyProgress - CALCULS:');
  console.log(`   - totalWordsCount:`, totalWordsCount);
  console.log(`   - completedWordsCount:`, completedWordsCount);
  console.log(`   - totalProgress:`, totalProgress);
  
  // Données des catégories pour l'expansion
  const categoryProgressData = calculateCategoryProgress(dataArray, completedWords);
  
  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category) => ({
    title: category.title,
    completed: category.completedWords,
    total: category.totalWords,
    progress: category.progress,
  }));

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedWordsCount}
      total={totalWordsCount}
      unit="mots"
      levelColor={levelColor}
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
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