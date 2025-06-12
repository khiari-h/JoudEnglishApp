// src/screens/Dashboard/components/LearningProgress/index.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Progression d'apprentissage avec comportement UX correct
 * ✅ Clic cercle = change niveau actif visuel seulement
 * ✅ Bouton Explorer = navigation vers exercices
 */
const LearningProgress = ({
  levels = [],
  currentLevel = "1",
  onSelectLevel, // Pour navigation vers exerciceSelection
  onChangeLevelVisual, // Pour changer niveau actif visuel seulement  
  primaryColor = "#3B82F6",
  globalProgress = 0,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // Générer les niveaux par défaut si pas fournis
  const defaultLevels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color,
    isActive: levelKey === currentLevel,
  }));

  const displayLevels = levels.length > 0 ? levels : defaultLevels;
  const currentLevelIndex = displayLevels.findIndex(
    (level) => level.id === currentLevel || level.isActive
  );

  // Info du niveau actuel
  const getCurrentLevelInfo = () => {
    return LANGUAGE_LEVELS[currentLevel] || LANGUAGE_LEVELS["1"];
  };

  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const getLevelDisplay = (levelId) => {
    return levelId === "bonus" ? "B" : levelId;
  };

  const currentLevelInfo = getCurrentLevelInfo();
  const currentLevelDisplay = getLevelDisplay(currentLevel);

  // ========== GESTION DES CLICS ==========
  
  // Clic sur cercle niveau = change juste visuel (pas de navigation)
  const handleLevelCirclePress = (levelId) => {
    if (onChangeLevelVisual) {
      onChangeLevelVisual(levelId);
    }
    // ❌ Pas de navigation ici !
  };

  // Clic sur bouton Explorer = navigation vers exercices
  const handleExplorePress = () => {
    if (onSelectLevel) {
      onSelectLevel(currentLevel);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        🎯 Progression générale
      </Text>

      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        {/* Header avec progression globale */}
        <View style={styles.header}>
          <View style={styles.progressInfo}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>
              Niveau {currentLevelDisplay}/6
            </Text>
            <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
              {currentLevelInfo.description || "Continuez votre apprentissage"}
            </Text>
          </View>

          <View style={styles.progressBadge}>
            <Text style={[styles.progressPercentage, { color: primaryColor }]}>
              {globalProgress}%
            </Text>
          </View>
        </View>

        {/* Barre de progression globale */}
        <View style={styles.globalProgressContainer}>
          <View style={[styles.globalProgressTrack, { backgroundColor: `${primaryColor}15` }]}>
            <View 
              style={[
                styles.globalProgressFill,
                { 
                  width: `${Math.min(globalProgress, 100)}%`,
                  backgroundColor: primaryColor
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
            Progression globale
          </Text>
        </View>

        {/* Niveaux en cercles - COMPORTEMENT CORRIGÉ */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level, index) => {
            const isActive = level.id === currentLevel || level.isActive;
            const isCompleted = index < currentLevelIndex;

            let circleStyle = [styles.levelCircle];
            let textStyle = [styles.levelText];

            if (isActive) {
              circleStyle.push([
                styles.activeLevelCircle,
                { backgroundColor: level.color || primaryColor }
              ]);
              textStyle.push(styles.activeLevelText);
            } else if (isCompleted) {
              circleStyle.push([
                styles.completedLevelCircle,
                { 
                  backgroundColor: `${level.color || primaryColor}30`,
                  borderColor: level.color || primaryColor
                }
              ]);
              textStyle.push([styles.completedLevelText, { color: level.color || primaryColor }]);
            } else {
              circleStyle.push(styles.futureLevelCircle);
              textStyle.push([styles.futureLevelText, { color: colors.textSecondary }]);
            }

            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelButton}
                onPress={() => handleLevelCirclePress(level.id)} // ✅ Change visuel seulement
                activeOpacity={0.7}
                // ✅ SUPPRIMÉ disabled - tous les niveaux cliquables pour navigation visuelle
              >
                <View style={circleStyle}>
                  <Text style={textStyle}>{getLevelDisplay(level.id)}</Text>
                </View>

                {/* Indicateur niveau actuel */}
                {isActive && (
                  <View style={styles.currentIndicator}>
                    <Text style={[styles.currentText, { color: primaryColor }]}>
                      Actuel
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action button - SEULE NAVIGATION RÉELLE */}
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: primaryColor }]}
          onPress={handleExplorePress} // ✅ Navigation vers exerciceSelection
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, { color: primaryColor }]}>
            Explorer le niveau {currentLevelDisplay}
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default LearningProgress;