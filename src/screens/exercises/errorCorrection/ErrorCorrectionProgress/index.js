// ErrorCorrectionProgress/index.js - VERSION CORRIGÉE AVEC useMemo



import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/errorCorrection/errorCorrectionStats";

/**
 * 📊 ErrorCorrectionProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Détecte automatiquement la structure des données
 */
const ErrorCorrectionProgress = ({
  categories = [],
  exercises = [],
  completedExercises = {},
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // ✅ MÉMORISER la validation des catégories
  const validCategories = useMemo(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
    // Fallback si pas de catégories mais qu'on a des exercices
    if (Array.isArray(exercises) && exercises.length > 0) {
      // Créer des catégories virtuelles basées sur les exercices
      const categoriesFromExercises = exercises.reduce((cats, ex, index) => {
        const categoryId = ex.categoryId || ex.category || 'general';
        if (!cats.find(c => c.id === categoryId)) {
          cats.push({
            id: categoryId,
            name: ex.categoryName || `Catégorie ${categoryId}`,
            exercises: exercises.filter(e => (e.categoryId || e.category || 'general') === categoryId)
          });
        }
        return cats;
      }, []);
      return categoriesFromExercises;
    }
    return [];
  }, [categories, exercises]);

  // ✅ MÉMORISER la validation des exercices
  const validExercises = useMemo(() => {
    if (Array.isArray(exercises) && exercises.length > 0) {
      return exercises;
    }
    // Si pas d'exercices directement, extraire des catégories
    if (Array.isArray(categories) && categories.length > 0) {
      return categories.reduce((exs, cat) => {
        if (cat.exercises && Array.isArray(cat.exercises)) {
          return [...exs, ...cat.exercises];
        }
        return exs;
      }, []);
    }
    return [];
  }, [categories, exercises]);
  
  // ✅ MÉMORISER tous les calculs
  const statsData = useMemo(() => {
    const totalExercisesCount = calculateTotalExercises(validCategories, validExercises);
    const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
    const totalProgress = calculateTotalProgress(validCategories, validExercises, completedExercises);
    const categoryProgressData = calculateCategoryProgress(validCategories, validExercises, completedExercises);

    return {
      totalExercisesCount,
      completedExercisesCount,
      totalProgress,
      categoryProgressData
    };
  }, [validCategories, validExercises, completedExercises]);

  // ✅ MÉMORISER la transformation des données
  const formattedCategoryData = useMemo(() => {
    return statsData.categoryProgressData.map((category, index) => ({
      title: category.title,
      completed: category.completedExercises,
      total: category.totalExercises,
      progress: category.progress,
    }));
  }, [statsData.categoryProgressData]);

  // ✅ MÉMORISER les données de debug (seulement en dev)

    if (process.env.NODE_ENV !== 'development') return null;
    
    return {
      originalCategoriesLength: categories.length,
      originalExercisesLength: exercises.length,
      validCategoriesLength: validCategories.length,
      validExercisesLength: validExercises.length,
      totalExercisesCount: statsData.totalExercisesCount,
      completedExercisesCount: statsData.completedExercisesCount,
      totalProgress: statsData.totalProgress
    };
  }, [categories.length, exercises.length, validCategories.length, validExercises.length, statsData]);

  // ✅ CORRECTION FINALE : Pas de log dans le render !

  return (
    <ProgressCard
      title="Progression"
      progress={statsData.totalProgress}
      completed={statsData.completedExercisesCount}
      total={statsData.totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

export default ErrorCorrectionProgress;