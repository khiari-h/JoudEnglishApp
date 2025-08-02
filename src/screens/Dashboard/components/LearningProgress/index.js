// src/screens/Dashboard/components/LearningProgress/index.js
import React, { useContext, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Cercle pour chaque niveau avec gestion du clic
 */
const LevelsCircleRow = ({
  levels,
  currentLevel,
  onLevelPress,
  getLevelLabel,
  colors,
  primaryColor,
  styles,
}) => {
  // Memoriser handlers pour éviter re-création inline
  const handlers = useMemo(() => {
    const map = {};
    levels.forEach((level) => {
      map[level.id] = () => onLevelPress(level.id);
    });
    return map;
  }, [levels, onLevelPress]);

  return (
    <View style={styles.levelsContainer}>
      {levels.map((level) => {
        const isActive = level.id === currentLevel;
        return (
          <TouchableOpacity
            key={level.id}
            style={styles.levelButton}
            onPress={handlers[level.id]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.levelCircle,
                isActive
                  ? [styles.activeLevelCircle, { backgroundColor: level.color || primaryColor }]
                  : styles.futureLevelCircle,
              ]}
            >
              <Text
                style={[
                  styles.levelText,
                  isActive
                    ? styles.activeLevelText
                    : [styles.futureLevelText, { color: colors.textSecondary }],
                ]}
              >
                {getLevelLabel(level.id)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

LevelsCircleRow.propTypes = {
  levels: PropTypes.array.isRequired,
  currentLevel: PropTypes.string.isRequired,
  onLevelPress: PropTypes.func.isRequired,
  getLevelLabel: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  primaryColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

/**
 * Barre de progression globale
 */
const GlobalProgressBar = ({ progress, primaryColor, colors, styles }) => (
  <View style={styles.globalProgressContainer}>
    <View style={[styles.globalProgressTrack, { backgroundColor: `${primaryColor}15` }]}>
      <View
        style={[
          styles.globalProgressFill,
          {
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: primaryColor,
          },
        ]}
      />
    </View>
    <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Progression globale</Text>
  </View>
);

GlobalProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

/**
 * En-tête avec infos du niveau courant
 */
const ProgressHeader = ({ levelInfo, levelLabel, progress, primaryColor, colors, styles }) => (
  <View style={styles.header}>
    <View style={styles.progressInfo}>
      <Text style={[styles.progressTitle, { color: colors.text }]}>
        {levelInfo.title || `Niveau ${levelLabel}`}
      </Text>
      <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
        Continuez votre apprentissage {levelInfo.icon}
      </Text>
    </View>
    <View style={styles.progressBadge}>
      <Text style={[styles.progressPercentage, { color: primaryColor }]}>{progress}%</Text>
    </View>
  </View>
);

ProgressHeader.propTypes = {
  levelInfo: PropTypes.object.isRequired,
  levelLabel: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

/**
 * Composant principal LearningProgress
 */
const LearningProgress = ({
  levels,
  currentLevel,
  onSelectLevel,
  onChangeLevelVisual,
  primaryColor,
  globalProgress,
}) => {
  const { colors: themeColors = {} } = useContext(ThemeContext) || {};

  const colors = {
    surface: themeColors.surface || "#FFFFFF",
    text: themeColors.text || "#1F2937",
    textSecondary: themeColors.textSecondary || "#6B7280",
  };

  // Si pas de niveaux fournis, prendre ceux par défaut
  const effectiveLevels = levels.length
    ? levels
    : Object.entries(LANGUAGE_LEVELS).map(([id, data]) => ({
        id,
        color: data.color,
      }));

  const currentLevelInfo = LANGUAGE_LEVELS[currentLevel] || LANGUAGE_LEVELS["1"];
  const getLevelLabel = (id) => (id === "bonus" ? "B" : id);

  // Handler clique sur cercle (changement visuel)
  const handleLevelPress = useCallback(
    (levelId) => {
      if (onChangeLevelVisual) onChangeLevelVisual(levelId);
    },
    [onChangeLevelVisual]
  );

  // Handler clique sur bouton explorer (navigation)
  const handleExplorePress = useCallback(() => {
    if (onSelectLevel) onSelectLevel(currentLevel);
  }, [onSelectLevel, currentLevel]);

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>🏆 Progression générale</Text>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <ProgressHeader
          levelInfo={currentLevelInfo}
          levelLabel={getLevelLabel(currentLevel)}
          progress={globalProgress}
          primaryColor={primaryColor}
          colors={colors}
          styles={styles}
        />
        <GlobalProgressBar
          progress={globalProgress}
          primaryColor={primaryColor}
          colors={colors}
          styles={styles}
        />
        <LevelsCircleRow
          levels={effectiveLevels}
          currentLevel={currentLevel}
          onLevelPress={handleLevelPress}
          getLevelLabel={getLevelLabel}
          colors={colors}
          primaryColor={primaryColor}
          styles={styles}
        />
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: primaryColor }]}
          onPress={handleExplorePress}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, { color: primaryColor }]}>
            Explorer le niveau {getLevelLabel(currentLevel)}
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

LearningProgress.propTypes = {
  levels: PropTypes.array,
  currentLevel: PropTypes.string,
  onSelectLevel: PropTypes.func,
  onChangeLevelVisual: PropTypes.func,
  primaryColor: PropTypes.string,
  globalProgress: PropTypes.number,
};

LearningProgress.defaultProps = {
  levels: [],
  currentLevel: "1",
  primaryColor: "#3B82F6",
  globalProgress: 0,
};

export default LearningProgress;
