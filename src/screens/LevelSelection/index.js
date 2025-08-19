// src/screens/LevelSelection/index.js - VERSION FINALE CORRIGÉE

import { useContext, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import PropTypes from 'prop-types';

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";

// 🚀 CONTEXTE PROGRESSION - REMPLACE useRealTimeProgress
import { useProgressRead } from "../../contexts/ProgressContext";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Styles et Hooks
import styles, { getBackgroundGradient } from "./style";
import useLevelListData from "./hooks/useLevelListData";

// Thème par défaut
const DEFAULT_THEME = {
  colors: {
    background: "#F8F9FA",
    primary: "#5E60CE",
    text: "#1F2937",
    textSecondary: "#6B7280",
    surface: "#FFFFFF",
  },
};

// Sous-composants réutilisables
const ModernCardHeader = ({ level, colors, localStyles }) => (
  <View style={localStyles.modernCardHeader}>
    <View style={localStyles.modernTitleContainer}>
      <Text style={[localStyles.modernTitle, { color: colors.text }]}>{level.title}</Text>
      {/* ✅ MODIFIÉ : Pas de progression pour le niveau bonus */}
      {level.id !== "bonus" && (
        <View style={[localStyles.modernBadge, { backgroundColor: level.color }]}>
          <Text style={localStyles.modernBadgeText}>{level.progress}%</Text>
        </View>
      )}
    </View>
    <Text style={localStyles.modernIcon}>{level.icon}</Text>
  </View>
);

const ModernProgress = ({ level, colors, localStyles }) => (
  /* ✅ MODIFIÉ : Pas de progression pour le niveau bonus */
  level.hasProgress && level.id !== "bonus" && (
    <View style={localStyles.modernProgressContainer}>
      <View style={localStyles.modernProgressBar}>
        <View 
          style={[
            localStyles.modernProgressFill,
            { width: `${level.progress}%`, backgroundColor: level.color }
          ]} 
        />
      </View>
      <Text style={[localStyles.modernProgressText, { color: colors.textSecondary }]}>{level.progress}%</Text>
    </View>
  )
);

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

const LevelCardContent = ({ level, colors, localStyles, handleLevelPress }) => (
  <View style={localStyles.modernCardContent}>
    <ModernCardHeader level={level} colors={colors} localStyles={localStyles} />
    <ModernProgress level={level} colors={colors} localStyles={localStyles} />
    <ModernCardButton level={level} handleLevelPress={handleLevelPress} localStyles={localStyles} />
  </View>
);

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

// Composant principal
const LevelSelection = () => {
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;
  
  const { getLevelProgress, hasProgress, refreshProgress } = useProgressRead();
  const { levels } = useLevelListData({ getLevelProgress, hasProgress });

  const backgroundGradient = getBackgroundGradient(
    colors.primary, 
    colors.background
  );

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
      refreshProgress();
    }, [refreshProgress])
  );

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
        accessibilityValue={{ min: 0, max: 100, now: level.progress ?? 0 }}
      >
        <LevelCardContent level={level} colors={colors} localStyles={styles} handleLevelPress={handleLevelPress} />
      </TouchableOpacity>
    );
  }, [handleLevelPress, colors, styles]);

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
    icon: PropTypes.string.isRequired,
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

ModernProgress.propTypes = {
  level: PropTypes.shape({
    hasProgress: PropTypes.bool,
    progress: PropTypes.number,
    color: PropTypes.string.isRequired,
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