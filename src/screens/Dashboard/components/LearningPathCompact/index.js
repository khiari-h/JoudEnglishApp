import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Parcours d'apprentissage - Système 1-6+Bonus
 * ✅ VERSION COMPACT : style.js statique + overrides minimaux ThemeContext
 */
const LearningPathCompact = ({
  levels = [],
  currentLevel = "1",
  onSelectLevel,
  onViewProgress,
  primaryColor = "#3B82F6",
  globalProgress = 0,
}) => {
  // ✅ ThemeContext avec valeurs par défaut pour éviter le crash
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Avancement général
        </Text>
        <TouchableOpacity onPress={onViewProgress}>
          <Text style={[styles.actionText, { color: primaryColor }]}>
            Voir détails
          </Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        {/* Progression globale et niveau actif */}
        <View style={styles.progressInfoContainer}>
          <View style={styles.globalProgressContainer}>
            <Text style={[styles.globalProgressLabel, { color: colors.text }]}>
              Progression globale :
            </Text>
            <Text style={[styles.globalProgressValue, { color: primaryColor }]}>
              {globalProgress}%
            </Text>
          </View>

          <View style={styles.activeInfoContainer}>
            <Text style={[styles.activeInfoLabel, { color: colors.textSecondary }]}>
              Niveau actif :
            </Text>
            <View
              style={[
                styles.activeInfoBadge,
                { backgroundColor: primaryColor },
              ]}
            >
              <Text style={styles.activeInfoText}>{currentLevelDisplay}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.levelDescription, { color: colors.textSecondary }]}>
          {currentLevelInfo.description || "Continuez votre apprentissage"}
        </Text>

        {/* Niveaux */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level, index) => {
            const isActive = level.id === currentLevel || level.isActive;
            const isCompleted = index < currentLevelIndex;

            let circleStyle;
            let textStyle;

            if (isActive) {
              circleStyle = [
                styles.levelCircle,
                { backgroundColor: level.color || primaryColor },
                styles.activeLevelCircle,
              ];
              textStyle = [styles.activeLevelText];
            } else if (isCompleted) {
              circleStyle = [
                styles.levelCircle,
                { backgroundColor: `${level.color || primaryColor}40` },
                styles.completedLevelCircle,
              ];
              textStyle = [styles.completedLevelText, { color: colors.textSecondary }];
            } else {
              circleStyle = [styles.levelCircle, styles.futureLevelCircle];
              textStyle = [styles.futureLevelText, { color: colors.textSecondary + "60" }];
            }

            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelButton}
                onPress={() => onSelectLevel?.(level.id)}
                activeOpacity={0.7}
              >
                <View style={circleStyle}>
                  <Text style={textStyle}>{getLevelDisplay(level.id)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bouton explorer */}
        <Button
          title={`Explorer le niveau ${currentLevelDisplay}`}
          variant="filled"
          color={primaryColor}
          fullWidth
          rightIcon="arrow-forward-outline"
          onPress={() => onSelectLevel?.(currentLevel)}
          style={styles.exploreButton}
        />
      </Card>
    </View>
  );
};

export default LearningPathCompact;