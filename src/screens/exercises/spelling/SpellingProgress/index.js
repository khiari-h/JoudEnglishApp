// SpellingProgress/index.js - VERSION CORRIGÉE AVEC DÉTECTION AUTO

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateStatsByType,
} from "../../../../utils/spelling/spellingStats";

/**
 * 📊 SpellingProgress - Version Corrigée avec détection automatique
 * ✅ Détecte automatiquement la structure des données
 * ✅ Gère différentes structures d'exercices
 */
const SpellingProgress = ({
  exercises = [],
  completedExercises = [],
  levelColor,
  expanded = false,
  onToggleExpand,
  onTypePress,
}) => {
  
  // ✅ DÉTECTION AUTOMATIQUE : Assure qu'on a les bonnes données
  const getValidExercises = () => {
    // Si c'est déjà un tableau d'exercices
    if (Array.isArray(exercises) && exercises.length > 0) {
      return exercises;
    }
    
    // Si c'est un objet avec des exercices
    if (exercises && typeof exercises === 'object') {
      return exercises.exercises || 
             exercises.items || 
             exercises.spelling || 
             [];
    }
    
    return [];
  };

  const validExercises = getValidExercises();
  
  // ✅ UTILISE la vraie structure détectée
  const totalExercisesCount = calculateTotalExercises(validExercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(validExercises, completedExercises);
  const typeProgressData = calculateStatsByType(validExercises, completedExercises);

  // Transformation pour le format ProgressCard
  const formattedTypeData = Object.keys(typeProgressData).map((type) => {
    const typeData = typeProgressData[type];
    const typeNames = {
      correction: 'Correction',
      spelling_rule: 'Règles',
      homophones: 'Homophones'
    };
    
    return {
      title: typeNames[type] || type,
      completed: typeData.completed,
      total: typeData.total,
      progress: typeData.progress,
    };
  }).filter(item => item.total > 0); // Afficher seulement les types avec des exercices

  console.log("🔍 SpellingProgress Debug:", {
    originalExercisesType: Array.isArray(exercises) ? 'array' : typeof exercises,
    originalExercisesLength: Array.isArray(exercises) ? exercises.length : 0,
    validExercisesLength: validExercises.length,
    totalExercisesCount,
    completedExercisesCount,
    totalProgress,
    exercisesKeys: exercises && typeof exercises === 'object' && !Array.isArray(exercises) ? Object.keys(exercises) : "not object"
  });

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedExercisesCount}
      total={totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable={formattedTypeData.length > 0}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedTypeData}
      onCategoryPress={onTypePress}
    />
  );
};

export default SpellingProgress;