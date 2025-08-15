// GrammarProgress/index.js - VERSION TOTALEMENT RECODÉE AVEC useMemo

import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateRuleProgress,
} from "../../../../utils/grammar/grammarStats";
import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * 📊 GrammarProgress - Version totalement recodée avec mémorisation complète
 * ✅ Évite les boucles infinies avec useMemo partout
 * ✅ Détecte automatiquement la structure des données
 * ✅ Logs conditionnels en développement uniquement
 */
const GrammarProgress = ({
  grammarData,
  completedExercises,
  levelColor,
  expanded = false,
  onToggleExpand,
  onRulePress,
}) => {
  
  // ✅ MÉMORISER la détection automatique de la structure
  const dataArray = useMemo(() => {
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
  }, [grammarData]);
  
  // ✅ MÉMORISER tous les calculs statistiques
  const statsData = useMemo(() => {
    const totalExercisesCount = calculateTotalExercises(dataArray);
    const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
    const totalProgress = calculateTotalProgress(dataArray, completedExercises);
    const ruleProgressData = calculateRuleProgress(dataArray, completedExercises);

    return {
      totalExercisesCount,
      completedExercisesCount,
      totalProgress,
      ruleProgressData
    };
  }, [dataArray, completedExercises]);

  // ✅ MÉMORISER la transformation pour ProgressCard
  const formattedRuleData = useMemo(() => {
    return statsData.ruleProgressData.map((rule) => ({
      title: rule.title,
      completed: rule.completedExercises,
      total: rule.totalExercises,
      progress: rule.progress,
    }));
  }, [statsData.ruleProgressData]);

  // ✅ CORRECTION FINALE : Pas de log dans le render !
  // Le log était dans le render, il se déclenchait à chaque fois
  // On peut l'ajouter dans un useEffect si vraiment nécessaire

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
      categoryData={formattedRuleData}
      onCategoryPress={onRulePress}
    />
  );
};

// ✅ Ajout de la validation des props
GrammarProgress.propTypes = {
  // 'grammarData' est manquant dans la validation
  grammarData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      rules: PropTypes.array,
      categories: PropTypes.array,
      exercises: PropTypes.array,
      grammar: PropTypes.array,
      items: PropTypes.array,
    })
  ]).isRequired,
  // 'completedExercises' est manquant dans la validation
  completedExercises: PropTypes.object,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
  // 'expanded' est manquant dans la validation
  expanded: PropTypes.bool,
  // 'onToggleExpand' est manquant dans la validation
  onToggleExpand: PropTypes.func,
  // 'onRulePress' est manquant dans la validation
  onRulePress: PropTypes.func,
};

export default GrammarProgress;