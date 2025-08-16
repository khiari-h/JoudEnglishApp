// ErrorCorrectionProgress/index.js - VERSION CORRIGÉE AVEC useMemo ET PropTypes

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/errorCorrection/errorCorrectionStats";

/**
 * 📊 ErrorCorrectionProgress - Version corrigée avec mémorisation et PropTypes
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Détecte automatiquement la structure des données
 * ✅ Validation des props avec PropTypes
 */
const ErrorCorrectionProgress = ({
  categories = [],
  exercises = [],
  completedExercises = {},
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
  currentCategoryId, // ✅ AJOUTÉ : ID de la catégorie actuelle
}) => {
  
  // ✅ MÉMORISER la validation des catégories
  const validCategories = useMemo(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
    // Fallback si pas de catégories mais qu'on a des exercices
    if (Array.isArray(exercises) && exercises.length > 0) {
      // Créer des catégories virtuelles basées sur les exercices
      const categoriesFromExercises = exercises.reduce((cats, ex) => {
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
    // ✅ MODIFIÉ : Calculer la progression de la catégorie actuelle
    let totalExercisesCount, completedExercisesCount, totalProgress;
    
    if (currentCategoryId) {
      // Progression de la catégorie actuelle
      const currentCategory = validCategories.find(cat => cat.id === currentCategoryId);
      if (currentCategory) {
        const exercisesInCategory = validExercises.filter(ex => 
          (ex.categoryId || ex.category || 'general') === currentCategoryId
        );
        totalExercisesCount = exercisesInCategory.length;
        completedExercisesCount = completedExercises[currentCategoryId]?.length || 0;
        totalProgress = totalExercisesCount > 0 ? Math.round((completedExercisesCount / totalExercisesCount) * 100) : 0;
      } else {
        // Fallback au total global
        totalExercisesCount = calculateTotalExercises(validCategories, validExercises);
        completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
        totalProgress = calculateTotalProgress(validCategories, validExercises, completedExercises);
      }
    } else {
      // Progression globale
      totalExercisesCount = calculateTotalExercises(validCategories, validExercises);
      completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
      totalProgress = calculateTotalProgress(validCategories, validExercises, completedExercises);
    }
    
    const categoryProgressData = calculateCategoryProgress(validCategories, validExercises, completedExercises);

    return {
      totalExercisesCount,
      completedExercisesCount,
      totalProgress,
      categoryProgressData
    };
  }, [validCategories, validExercises, completedExercises, currentCategoryId]);

  // ✅ MÉMORISER la transformation des données
  const formattedCategoryData = useMemo(() => {
    return statsData.categoryProgressData.map((category) => ({
      title: category.title,
      completed: category.completedExercises,
      total: category.totalExercises,
      progress: category.progress,
    }));
  }, [statsData.categoryProgressData]);

  return (
    <ProgressCard
      title="Progression"
      progress={statsData.totalProgress}
      completed={statsData.completedExercisesCount}
      total={statsData.totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

// ✅ VALIDATION DES PROPS - Corrige toutes les erreurs PropTypes
ErrorCorrectionProgress.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      exercises: PropTypes.array,
    })
  ),
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      categoryName: PropTypes.string,
    })
  ),
  completedExercises: PropTypes.object,
  levelColor: PropTypes.string,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onCategoryPress: PropTypes.func,
  currentCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// ✅ VALEURS PAR DÉFAUT (optionnel, déjà définies dans la destructuration)
ErrorCorrectionProgress.defaultProps = {
  categories: [],
  exercises: [],
  completedExercises: {},
  levelColor: undefined,
  expanded: false,
  onToggleExpand: undefined,
  onCategoryPress: undefined,
  currentCategoryId: undefined,
};

export default ErrorCorrectionProgress;