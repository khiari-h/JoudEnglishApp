import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Composant pour afficher le parcours d'apprentissage avec
 * mise en évidence du niveau actif sélectionné par l'utilisateur
 * Mise à jour pour le système 1-6+B
 */
const LearningPathCompact = ({
  levels = [],
  currentLevel = "1",
  onSelectLevel,
  onViewProgress,
  primaryColor = "#3B82F6",
}) => {
  // Mapper les anciens niveaux CECRL vers les nouveaux niveaux numériques
  const mapOldLevelToNew = (oldLevel) => {
    const mapping = {
      A1: "1",
      A2: "2",
      B1: "3",
      B2: "4",
      C1: "5",
      C2: "6",
      bonus: "bonus",
    };
    return mapping[oldLevel] || oldLevel;
  };

  // Mapper les nouveaux niveaux vers les anciens pour compatibilité
  const mapNewLevelToOld = (newLevel) => {
    const mapping = {
      1: "A1",
      2: "A2",
      3: "B1",
      4: "B2",
      5: "C1",
      6: "C2",
      bonus: "bonus",
    };
    return mapping[newLevel] || newLevel;
  };

  // Utiliser le niveau mappé pour l'affichage
  const displayCurrentLevel = mapOldLevelToNew(currentLevel);

  // Générer les niveaux depuis les constantes avec le bon mapping
  const defaultLevels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color,
    isActive:
      levelKey === displayCurrentLevel ||
      mapNewLevelToOld(levelKey) === currentLevel,
  }));

  const displayLevels = levels.length > 0 ? levels : defaultLevels;

  // Trouver l'index du niveau actuel (utiliser le niveau mappé)
  const currentLevelIndex = displayLevels.findIndex(
    (level) => level.id === displayCurrentLevel || level.isActive
  );

  // Texte explicatif selon le niveau actuel (utiliser le niveau mappé)
  const getLevelDescription = () => {
    const levelInfo = LANGUAGE_LEVELS[displayCurrentLevel];
    if (levelInfo) {
      return levelInfo.description;
    }
    return "Choisissez votre niveau d'apprentissage";
  };

  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const getLevelDisplay = (levelId) => {
    return levelId === "bonus" ? "B" : levelId;
  };

  // Titre du niveau actuel (utiliser le niveau mappé)
  const getCurrentLevelTitle = () => {
    const levelInfo = LANGUAGE_LEVELS[displayCurrentLevel];
    if (levelInfo) {
      return levelInfo.name === "B" ? "B" : levelInfo.name;
    }
    return displayCurrentLevel;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Avancement général</Text>
        <TouchableOpacity onPress={onViewProgress}>
          <Text style={[styles.actionText, { color: primaryColor }]}>
            Voir détails
          </Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        {/* Information sur le niveau actif */}
        <View style={styles.activeInfoContainer}>
          <Text style={styles.activeInfoLabel}>Niveau actif :</Text>
          <View
            style={[styles.activeInfoBadge, { backgroundColor: primaryColor }]}
          >
            <Text style={styles.activeInfoText}>{getCurrentLevelTitle()}</Text>
          </View>
        </View>

        <Text style={styles.levelDescription}>{getLevelDescription()}</Text>

        {/* Niveaux de langue */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level, index) => {
            // Déterminer l'état du niveau (actif, complété, ou futur)
            const isActive = level.id === displayCurrentLevel || level.isActive;
            const isCompletedLevel = index < currentLevelIndex;

            let circleStyle;
            let textStyle;

            if (isActive) {
              circleStyle = [
                styles.levelCircle,
                { backgroundColor: level.color || primaryColor },
                styles.activeLevelCircle,
              ];
              textStyle = styles.activeLevelText;
            } else if (isCompletedLevel) {
              circleStyle = [
                styles.levelCircle,
                { backgroundColor: `${level.color || primaryColor}40` },
                styles.completedLevelCircle,
              ];
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
                  <Text style={textStyle}>{getLevelDisplay(level.id)}</Text>
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
                width: `${Math.max(
                  0,
                  (currentLevelIndex / Math.max(1, displayLevels.length - 1)) *
                    100
                )}%`,
                backgroundColor: primaryColor,
              },
            ]}
          />
        </View>

        {/* Bouton pour explorer le niveau actuel */}
        <Button
          title={`Explorer le niveau ${getCurrentLevelTitle()}`}
          variant="filled"
          color={primaryColor}
          fullWidth
          rightIcon="arrow-forward-outline"
          onPress={() => onSelectLevel && onSelectLevel(displayCurrentLevel)}
          style={styles.exploreButton}
        />
      </Card>
    </View>
  );
};

export default LearningPathCompact;
