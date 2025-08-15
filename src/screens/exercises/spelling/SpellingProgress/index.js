// SpellingProgress/index.js - VERSION ULTRA-SIMPLE

import { View, Text, useMemo } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";
import PropTypes from 'prop-types';

/**
 * 📊 SpellingProgress - VERSION ULTRA-SIMPLE
 * ✅ Juste une progress bar basique
 * ❌ Enlevé : expandable, détails par type, complexité
 * * AFFICHE :
 * - Progress bar visuelle
 * - "X / Y exercices"
 * - Pourcentage
 */
const SpellingProgress = ({
  exercises = [],
  completedExercises = [],
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);

  // =================== CALCULS SIMPLES ===================
  
  const progressData = useMemo(() => {
    const totalExercises = exercises.length;
    const completedCount = completedExercises.length;
    const progress = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

    return {
      totalExercises,
      completedCount,
      progress
    };
  }, [exercises, completedExercises]);

  const { totalExercises, completedCount, progress } = progressData;

  // =================== RENDER ===================
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        
        {/* Header avec titre et stats */}
        <View style={styles.header}>
          <Text style={styles.title}>Progression</Text>
          <Text style={[styles.stats, { color: levelColor }]}>
            {completedCount}/{totalExercises} exercices
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarTrack, { backgroundColor: `${levelColor}20` }]}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  backgroundColor: levelColor,
                  width: `${progress}%`
                }
              ]}
            />
          </View>
          
          {/* Pourcentage */}
          <Text style={[styles.percentage, { color: levelColor }]}>
            {progress}%
          </Text>
        </View>

      </LinearGradient>
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
SpellingProgress.propTypes = {
  // 'exercises' est manquant dans la validation
  exercises: PropTypes.arrayOf(PropTypes.shape({
    // On peut définir la structure des exercices si nécessaire
  })),
  // 'completedExercises' est manquant dans la validation
  completedExercises: PropTypes.arrayOf(PropTypes.number),
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default SpellingProgress;