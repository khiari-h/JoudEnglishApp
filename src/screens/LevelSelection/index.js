// src/screens/LevelSelection/index.js - VERSION SIMPLE QUI GARDE TON DESIGN
import { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import PropTypes from 'prop-types';

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";

// 🚀 HOOK PROGRESSION TEMPS RÉEL - JUSTE POUR LES CHIFFRES
import useRealTimeProgress from "../../hooks/useRealTimeProgress";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes
// Styles
import styles, { getBackgroundGradient } from "./style";
import useLevelListData from "./hooks/useLevelListData";

const DEFAULT_THEME = {
  colors: {
    background: "#F8F9FA",
    primary: "#5E60CE",
    text: "#1F2937",
    textSecondary: "#6B7280",
    surface: "#FFFFFF",
  },
};

// Sous-composant ModernCardHeader
const ModernCardHeader = ({ level, colors, localStyles }) => (
  <View style={localStyles.modernCardHeader}>
    <View style={localStyles.modernTitleContainer}>
      <Text style={[localStyles.modernTitle, { color: colors.text }]}>{level.title}</Text>
      <View style={[localStyles.modernBadge, { backgroundColor: level.color }]}>
        <Text style={localStyles.modernBadgeText}>{level.progress}%</Text>
      </View>
    </View>
    <Text style={localStyles.modernIcon}>{level.icon}</Text>
  </View>
);

// Sous-composant ModernProgress
const ModernProgress = ({ level, colors, localStyles }) => (
  level.hasProgress && (
    <View style={localStyles.modernProgressContainer}>
      <View style={localStyles.modernProgressBar}>
        <View 
          style={[
            localStyles.modernProgressFill,
            { width: `${level.progress}%`, backgroundColor: level.color }
          ]} 
        />
      </View>
      <Text style={[localStyles.modernProgressText, { color: colors.textSecondary }]}> {level.progress}% </Text>
    </View>
  )
);

// Sous-composant ModernCardButton
const ModernCardButton = ({ level, handleLevelPress, localStyles }) => (
  <Button
    title={level.hasStarted ? "Continuer" : "Commencer"}
    variant="filled"
    color={level.color}
    fullWidth
    onPress={handleLevelPress(level)}
    style={localStyles.modernButton}
    rightIcon={level.hasStarted ? "play-outline" : "rocket-outline"}
    testID={`level-${level.id}-button`}
  />
);

// Refactor LevelCardContent pour utiliser les sous-composants
const LevelCardContent = ({ level, colors, localStyles, handleLevelPress }) => (
  <View style={localStyles.modernCardContent}>
    <ModernCardHeader level={level} colors={colors} localStyles={localStyles} />
    <ModernProgress level={level} colors={colors} localStyles={localStyles} />
    <ModernCardButton level={level} handleLevelPress={handleLevelPress} localStyles={localStyles} />
  </View>
);

// Sous-composant pour la section liste de niveaux
const LevelListSection = ({ colors, localStyles, levels, renderLevelCard }) => (
  <ScrollView
    testID="level-selection-scroll"
    style={{ flex: 1 }}
    contentContainerStyle={[localStyles.modernScrollContent, { paddingBottom: 60 }]}
    showsVerticalScrollIndicator={false}
  >
    <View style={localStyles.modernLevelsContainer}>
      {levels.map(renderLevelCard)}
    </View>
  </ScrollView>
);

const LevelSelection = () => {
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;
  
  // 🚀 PROGRESSION TEMPS RÉEL + Préparation des données d'affichage
  const { getLevelProgress, hasProgress, refresh } = useRealTimeProgress();
  const { currentLevelData, levels } = useLevelListData({ getLevelProgress, hasProgress });

  // Background
  const backgroundGradient = getBackgroundGradient(
    currentLevelData.color, 
    colors.background
  );

  // levels déjà préparés par le hook

  // Navigation
  const handleLevelSelect = useCallback((level) => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level: level.id },
    });
  }, []);

  const handleLevelPress = useCallback(
    (level) => () => handleLevelSelect(level),
    [handleLevelSelect]
  );

  const onBackPress = useCallback(() => {
    router.push("/tabs/dashboard");
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // ========== RENDU - TON DESIGN ORIGINAL ==========
  const renderHeader = useCallback(() => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[colors.primary, `${colors.primary}DD`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Header
          title="Niveaux"
          showBackButton
          onBackPress={onBackPress}
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
          testID="level-selection-header"
        />
      </LinearGradient>
    </View>
  ), [colors.primary, onBackPress]);

  const renderLevelCard = useCallback((level) => {
    return (
      <TouchableOpacity
        key={level.id}
        testID={`level-${level.id}`}
        style={styles.modernCard}
        onPress={handleLevelPress(level)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Niveau ${level.id}`}
        accessibilityValue={{ min: 0, max: 100, now: level.progress }}
      >
        <LevelCardContent level={level} colors={colors} localStyles={styles} handleLevelPress={handleLevelPress} />
      </TouchableOpacity>
    );
  }, [handleLevelPress, colors.text, styles]);

  return (
    <Container
      testID="level-selection-container"
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent" 
      statusBarColor="#6366F1"
      statusBarStyle="light-content"
      withPadding={false}
    >
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {renderHeader()}
        <LevelListSection colors={colors} localStyles={styles} levels={levels} renderLevelCard={renderLevelCard} />
      </LinearGradient>
    </Container>
  );
};

// PropTypes pour tous les sous-composants
ModernCardHeader.propTypes = {
  level: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired, // ✅ Ajouté
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

ModernProgress.propTypes = {
  level: PropTypes.shape({
    hasProgress: PropTypes.bool,
    progress: PropTypes.number,
    color: PropTypes.string.isRequired, // ✅ Ajouté
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

ModernCardButton.propTypes = {
  level: PropTypes.shape({
    hasStarted: PropTypes.bool,
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleLevelPress: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
};

LevelCardContent.propTypes = {
  level: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    hasProgress: PropTypes.bool,
    hasStarted: PropTypes.bool,
    id: PropTypes.string.isRequired,
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
  handleLevelPress: PropTypes.func.isRequired,
};

LevelListSection.propTypes = {
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  renderLevelCard: PropTypes.func.isRequired,
};

export default LevelSelection;