// GrammarProgress/index.js - VERSION CORRIGÉE AVEC DÉTECTION AUTO

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateRuleProgress,
} from "../../../../utils/grammar/grammarStats";

/**
 * 📊 GrammarProgress - Version Corrigée avec détection automatique
 * ✅ Détecte automatiquement la structure des données
 * ✅ Gère rules, exercises, categories, etc.
 */
const GrammarProgress = ({
  grammarData,
  completedExercises,
  levelColor,
  expanded = false,
  onToggleExpand,
  onRulePress,
}) => {
  
  // ✅ DÉTECTION AUTOMATIQUE de la structure
  const getDataArray = () => {
    if (!grammarData) return [];
    
    // Si c'est déjà un tableau (liste de rules)
    if (Array.isArray(grammarData)) {
      return grammarData;
    }
    
    // Si c'est un objet avec différentes propriétés possibles
    if (typeof grammarData === 'object') {
      return grammarData.rules || 
             grammarData.categories || 
             grammarData.exercises || 
             grammarData.grammar || 
             grammarData.items || 
             [];
    }
    
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ UTILISE la vraie structure détectée
  const totalExercisesCount = calculateTotalExercises(dataArray);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(dataArray, completedExercises);
  const ruleProgressData = calculateRuleProgress(dataArray, completedExercises);

  // Transformation pour le format ProgressCard
  const formattedRuleData = ruleProgressData.map((rule, index) => ({
    title: rule.title,
    completed: rule.completedExercises,
    total: rule.totalExercises,
    progress: rule.progress,
  }));

  console.log("🔍 GrammarProgress Debug:", {
    isGrammarDataArray: Array.isArray(grammarData),
    hasRules: !!(grammarData?.rules),
    hasCategories: !!(grammarData?.categories),
    hasExercises: !!(grammarData?.exercises),
    dataArrayLength: dataArray.length,
    totalExercisesCount,
    completedExercisesCount,
    totalProgress,
    grammarDataKeys: grammarData && typeof grammarData === 'object' ? Object.keys(grammarData) : "not object or null"
  });

  return (
    <ProgressCard
      title="Progression" // ✅ Titre uniforme
      progress={totalProgress}
      completed={completedExercisesCount}
      total={totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedRuleData}
      onCategoryPress={onRulePress}
    />
  );
};

export default GrammarProgress;