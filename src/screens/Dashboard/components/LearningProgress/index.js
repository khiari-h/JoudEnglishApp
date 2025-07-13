// src/screens/Dashboard/components/LearningProgress/index.js



import { ThemeContext } from "../../../../contexts/ThemeContext";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Progression d'apprentissage - VERSION SIMPLE
 * ✅ Clic cercle = change niveau visuel seulement  
 * ✅ Seul le niveau en cours est coloré
 * ✅ Bouton Explorer = navigation vers exercices
 */
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
  const handleLevelPress = (levelId) => {
    if (onChangeLevelVisual) {
      onChangeLevelVisual(levelId);
    }
  };

  // Clic sur bouton Explorer = navigation vers exercices du niveau courant
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
              {currentLevelInfo.title || `Niveau ${currentLevelDisplay}`}
            </Text>
            <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
              Continuez votre apprentissage {currentLevelInfo.icon}
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

        {/* Niveaux en cercles - VERSION SIMPLE */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level) => {
            // ✅ SIMPLE : Seul le niveau en cours est actif
            const isActive = level.id === currentLevel;

            let circleStyle = [styles.levelCircle];
            let textStyle = [styles.levelText];

            if (isActive) {
              // ✅ Niveau en cours = coloré
              circleStyle.push([
                styles.activeLevelCircle,
                { backgroundColor: level.color || primaryColor }
              ]);
              textStyle.push(styles.activeLevelText);
            } else {
              // ❌ Autres niveaux = gris
              circleStyle.push(styles.futureLevelCircle);
              textStyle.push([styles.futureLevelText, { color: colors.textSecondary }]);
            }

            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelButton}
                onPress={() => handleLevelPress(level.id)} // ✅ Change visuel seulement
                activeOpacity={0.7}
              >
                <View style={circleStyle}>
                  <Text style={textStyle}>{getLevelDisplay(level.id)}</Text>
                </View>

                {/* ❌ SUPPRIMÉ : Indicateur "Actuel" inutile */}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action button - SEULE NAVIGATION */}
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: primaryColor }]}
          onPress={handleExplorePress}
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