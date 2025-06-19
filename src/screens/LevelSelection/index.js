// src/screens/LevelSelection/index.js - VERSION RÉPARÉE
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes SIMPLIFIÉES
import { LANGUAGE_LEVELS, LEVELS_LIST } from "../../utils/constants";

// Styles
import styles, { getBackgroundGradient } from "./style";

const DEFAULT_THEME = {
  colors: {
    background: "#F8F9FA",
    primary: "#5E60CE", 
    text: "#1F2937",
    surface: "#FFFFFF",
  },
};

const DEFAULT_PROGRESS = {
  levels: {},
  isLoading: false,
};

const LevelSelection = () => {
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const progressContext = useContext(ProgressContext) || DEFAULT_PROGRESS;

  const { colors } = themeContext;
  const { progress, isLoading } = progressContext;

  // ========== PROGRESSION SIMPLE ==========
  const getCurrentUserLevel = () => {
    const levelsWithProgress = LEVELS_LIST
      .filter(key => key !== 'bonus')
      .filter(key => progress?.levels?.[key]?.completed > 0);
    
    if (levelsWithProgress.length === 0) return 1;
    
    const currentLevel = Math.max(...levelsWithProgress.map(Number));
    return Math.min(currentLevel + 1, 6);
  };

  const currentUserLevel = getCurrentUserLevel();
  const currentLevelData = LANGUAGE_LEVELS[currentUserLevel];

  // Background
  const backgroundGradient = getBackgroundGradient(
    currentLevelData.color, 
    colors.background
  );

  // ========== DONNÉES NIVEAUX AVEC NOUVELLES CONSTANTES ==========
  const levels = LEVELS_LIST.map((levelKey) => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const levelProgress = progress?.levels?.[levelKey]?.completed || 0;
    
    return {
      id: levelKey,
      title: levelInfo.title,
      progress: levelProgress,
      color: levelInfo.color,
      icon: levelInfo.icon,
      hasProgress: levelProgress > 0,
    };
  });

  // ========== NAVIGATION EXPO ROUTER ==========
  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  // ========== RENDU ==========
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Header
          title="Niveaux"
          showBackButton
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
        />
      </LinearGradient>
    </View>
  );

  const renderLevelCard = (level) => {
    return (
      <TouchableOpacity
        key={level.id}
        style={styles.modernCard}
        onPress={() => handleLevelSelect(level)}
        activeOpacity={0.8}
      >
        <View style={styles.modernCardContent}>
          {/* Header */}
          <View style={styles.modernCardHeader}>
            <View style={styles.modernTitleContainer}>
              <Text style={[styles.modernTitle, { color: colors.text }]}>
                {level.title}
              </Text>
              <View style={[styles.modernBadge, { backgroundColor: level.color }]}>
                <Text style={styles.modernBadgeText}>
                  {level.hasProgress ? `${level.progress}%` : '0%'}
                </Text>
              </View>
            </View>
            <Text style={styles.modernIcon}>{level.icon}</Text>
          </View>

          {/* Progression */}
          {level.hasProgress && (
            <View style={styles.modernProgressContainer}>
              <View style={styles.modernProgressBar}>
                <View 
                  style={[
                    styles.modernProgressFill,
                    { 
                      width: `${level.progress}%`,
                      backgroundColor: level.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.modernProgressText, { color: colors.textSecondary }]}>
                {level.progress}%
              </Text>
            </View>
          )}

          {/* Bouton */}
          <Button
            title={level.hasProgress ? "Continuer" : "Commencer"}
            variant="filled"
            color={level.color}
            fullWidth
            onPress={() => handleLevelSelect(level)}
            style={styles.modernButton}
            rightIcon={level.hasProgress ? "play-outline" : "rocket-outline"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container
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
        
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[styles.modernScrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modernIntro}>
            <Text style={[styles.modernIntroText, { color: colors.textSecondary }]}>
              À vous de choisir !
            </Text>
          </View>
          
          <View style={styles.modernLevelsContainer}>
            {levels.map(renderLevelCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default LevelSelection;