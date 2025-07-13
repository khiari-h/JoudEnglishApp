// VocabularyProgress/index.js - VERSION CORRIGÉE POUR LES 2 STRUCTURES



import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/vocabulary/vocabularyStats";

/**
 * 📊 VocabularyProgress - Version Corrigée pour gérer categories ET exercises
 * ✅ Gère mode classique (categories) ET mode fast (exercises)
 * 
 * @param {object} vocabularyData - Données du vocabulaire
 * @param {object} completedWords - Mots complétés par catégorie
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
 * @param {string} mode - Mode d'exercice (classic/fast)
 * @param {number} overrideCompleted - Valeur forcée pour completed (mode fast)
 */
const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
  mode = "classic", // ✅ AJOUTÉ : mode pour différencier classic/fast
  overrideCompleted = null, // ✅ AJOUTÉ : correction progression fast
}) => {
  
  // ✅ CORRIGÉ : Détecte la vraie structure
  const getDataArray = () => {
    if (vocabularyData?.categories && Array.isArray(vocabularyData.categories)) {
      // Mode classique : { categories: [...] }
      return vocabularyData.categories;
    } else if (vocabularyData?.exercises && Array.isArray(vocabularyData.exercises)) {
      // Mode fast : { exercises: [...] }
      return vocabularyData.exercises;
    }
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ CORRIGÉ : Utilise la vraie structure détectée
  const totalWordsCount = calculateTotalWords(dataArray);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  
  // ✅ CORRECTION FAST : Utilise overrideCompleted si fourni (mode fast)
  const displayCompleted = overrideCompleted !== null ? overrideCompleted : completedWordsCount;
  
  // ✅ CORRECTION FAST : Recalcule le pourcentage avec la valeur corrigée
  const totalProgress = totalWordsCount > 0 
    ? Math.min(100, Math.round((displayCompleted / totalWordsCount) * 100))
    : 0;
  
  // Données des catégories pour l'expansion
  let categoryProgressData = calculateCategoryProgress(dataArray, completedWords);

  // 🟦 Correction spécifique pour le mode Fast : forcer l'égalité
  if (mode === "fast" && categoryProgressData.length === 1) {
    // On force la progression de la catégorie à être identique à la progression globale
    categoryProgressData[0].completedWords = displayCompleted; // ✅ CORRIGÉ : utilise displayCompleted
    categoryProgressData[0].totalWords = totalWordsCount;
    categoryProgressData[0].progress = totalProgress; // ✅ CORRIGÉ : utilise totalProgress recalculé
  }

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category) => ({
    title: category.title,
    completed: category.completedWords,
    total: category.totalWords,
    progress: category.progress,
  }));

  console.log("🔍 VocabularyProgress Debug:", {
    hasCategories: !!vocabularyData?.categories,
    hasExercises: !!vocabularyData?.exercises,
    dataArrayLength: dataArray.length,
    totalWordsCount,
    completedWordsCount,
    displayCompleted, // ✅ AJOUTÉ : afficher la valeur corrigée
    totalProgress,
    mode, // ✅ AJOUTÉ : afficher le mode
    overrideCompleted // ✅ AJOUTÉ : afficher la valeur d'override
  });

  return (
    <ProgressCard
      title={`Progression ${mode === "fast" ? "Fast" : ""}`}
      progress={totalProgress}
      completed={displayCompleted} // ✅ CORRIGÉ : utilise displayCompleted
      total={totalWordsCount}
      unit="mots"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
      mode={mode} // ✅ AJOUTÉ : passer le mode pour les tests
      overrideCompleted={overrideCompleted} // ✅ AJOUTÉ : passer overrideCompleted pour les tests
    />
  );
};

export default VocabularyProgress;