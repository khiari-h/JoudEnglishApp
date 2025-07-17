// src/screens/Dashboard/components/LearningProgress/index.js
import { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Progression d'apprentissage - VERSION SIMPLE
 * ✅ Clic cercle = change niveau visuel seulement  
 * ✅ Seul le niveau en cours est coloré
 * ✅ Bouton Explorer = navigation vers exercices
 */
const LevelsCircleRow = ({ displayLevels, currentLevel, handleLevelPress, getLevelDisplay, colors, primaryColor, localStyles }) => (
  <View style={localStyles.levelsContainer}>
    {displayLevels.map((level) => {
      const isActive = level.id === currentLevel;
      const circleStyle = [localStyles.levelCircle];
      const textStyle = [localStyles.levelText];
      if (isActive) {
        circleStyle.push([
          localStyles.activeLevelCircle,
          { backgroundColor: level.color || primaryColor }
        ]);
        textStyle.push(localStyles.activeLevelText);
      } else {
        circleStyle.push(localStyles.futureLevelCircle);
        textStyle.push([localStyles.futureLevelText, { color: colors.textSecondary }]);
      }
      return (
        <TouchableOpacity
          key={level.id}
          style={localStyles.levelButton}
          onPress={handleLevelPress(level.id)}
          activeOpacity={0.7}
        >
          <View style={circleStyle}>
            <Text style={textStyle}>{getLevelDisplay(level.id)}</Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const GlobalProgressBar = ({ globalProgress, primaryColor, localStyles, colors }) => (
  <View style={localStyles.globalProgressContainer}>
    <View style={[localStyles.globalProgressTrack, { backgroundColor: `${primaryColor}15` }]}> 
      <View 
        style={[
          localStyles.globalProgressFill,
          { 
            width: `${Math.min(globalProgress, 100)}%`,
            backgroundColor: primaryColor
          }
        ]} 
      />
    </View>
    <Text style={[localStyles.progressLabel, { color: colors.textSecondary }]}>Progression globale</Text>
  </View>
);

// Sous-composant ProgressHeader
const ProgressHeader = ({ currentLevelInfo, currentLevelDisplay, globalProgress, primaryColor, colors, localStyles }) => (
  <View style={localStyles.header}>
    <View style={localStyles.progressInfo}>
      <Text style={[localStyles.progressTitle, { color: colors.text }]}>
        {currentLevelInfo.title || `Niveau ${currentLevelDisplay}`}
      </Text>
      <Text style={[localStyles.progressSubtitle, { color: colors.textSecondary }]}>
        Continuez votre apprentissage {currentLevelInfo.icon}
      </Text>
    </View>
    <View style={localStyles.progressBadge}>
      <Text style={[localStyles.progressPercentage, { color: primaryColor }]}>
        {globalProgress}%
      </Text>
    </View>
  </View>
);

// Refactor LearningProgress pour utiliser les sous-composants
const LearningProgress = ({
  levels = [],
  currentLevel = "1",
  onSelectLevel, // Pour navigation vers exercices
  onChangeLevelVisual, // Pour changer niveau visuel seulement
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
  }));

  const displayLevels = levels.length > 0 ? levels : defaultLevels;

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

  // ========== GESTION SIMPLE ==========
  
  // Clic sur cercle niveau = change affichage visuel seulement
  const handleLevelPress = useCallback((levelId) => () => {
    if (onChangeLevelVisual) {
      onChangeLevelVisual(levelId);
    }
  }, [onChangeLevelVisual]);

  // Clic sur bouton Explorer = navigation vers exercices du niveau courant
  const handleExplorePress = useCallback(() => {
    if (onSelectLevel) {
      onSelectLevel(currentLevel);
    }
  }, [onSelectLevel, currentLevel]);

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>🏆 Progression générale</Text>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <ProgressHeader currentLevelInfo={currentLevelInfo} currentLevelDisplay={currentLevelDisplay} globalProgress={globalProgress} primaryColor={primaryColor} colors={colors} localStyles={styles} />
        <GlobalProgressBar globalProgress={globalProgress} primaryColor={primaryColor} localStyles={styles} colors={colors} />
        <LevelsCircleRow displayLevels={displayLevels} currentLevel={currentLevel} handleLevelPress={handleLevelPress} getLevelDisplay={getLevelDisplay} colors={colors} primaryColor={primaryColor} localStyles={styles} />
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: primaryColor }]}
          onPress={handleExplorePress}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, { color: primaryColor }]}>Explorer le niveau {currentLevelDisplay}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default LearningProgress;