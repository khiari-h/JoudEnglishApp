import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import styles from "./style";

/**
 * Composant pour afficher le parcours d'apprentissage de manière compacte
 */
const LearningPathCompact = ({
  levels = [],
  currentLevel = "A1",
  onSelectLevel,
  onViewProgress,
  primaryColor = "#3B82F6"
}) => {
  // Si aucun niveau n'est fourni, utiliser les niveaux CECRL par défaut
  const defaultLevels = [
    { id: "A1", color: "#22C55E" },
    { id: "A2", color: "#10B981" },
    { id: "B1", color: "#3B82F6" },
    { id: "B2", color: "#8B5CF6" },
    { id: "C1", color: "#EC4899" },
    { id: "C2", color: "#F43F5E" },
  ];

  const displayLevels = levels.length > 0 ? levels : defaultLevels;
  
  // Trouver l'index du niveau actuel
  const currentLevelIndex = displayLevels.findIndex(level => level.id === currentLevel);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Parcours d'apprentissage</Text>
      
      <Card style={styles.card}>
        {/* Niveaux de langue */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level, index) => {
            // Déterminer l'état du niveau (complété, actuel, ou futur)
            const isCurrentLevel = level.id === currentLevel;
            const isCompletedLevel = index < currentLevelIndex;
            
            let circleStyle;
            let textStyle;
            
            if (isCurrentLevel) {
              circleStyle = [styles.levelCircle, { backgroundColor: primaryColor }];
              textStyle = styles.currentLevelText;
            } else if (isCompletedLevel) {
              circleStyle = [styles.levelCircle, { backgroundColor: `${primaryColor}40` }];
              textStyle = styles.completedLevelText;
            } else {
              circleStyle = [styles.levelCircle, styles.futureLevelCircle];
              textStyle = styles.futureLevelText;
            }
            
            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelButton}
                onPress={() => onSelectLevel && onSelectLevel(level.id)}
                activeOpacity={0.7}
              >
                <View style={circleStyle}>
                  <Text style={textStyle}>{level.id}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Ligne de progression */}
        <View style={styles.progressLineContainer}>
          <View style={styles.progressLineTrack} />
          <View 
            style={[
              styles.progressLineFill,
              { 
                width: `${((currentLevelIndex) / (displayLevels.length - 1)) * 100}%`,
                backgroundColor: primaryColor
              }
            ]} 
          />
        </View>
        
        {/* Bouton pour voir les progrès détaillés */}
        <Button
          title="Voir mon progrès"
          variant="outlined"
          color={primaryColor}
          fullWidth
          leftIcon="stats-chart-outline"
          onPress={onViewProgress}
          style={styles.progressButton}
        />
      </Card>
    </View>
  );
};

export default LearningPathCompact;