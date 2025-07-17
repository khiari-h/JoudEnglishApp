// src/screens/LevelSelection/index.js - VERSION SIMPLE QUI GARDE TON DESIGN
import { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

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
import { LANGUAGE_LEVELS, LEVELS_LIST } from "../../utils/constants";

// Styles
import styles, { getBackgroundGradient } from "./style";

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
const ModernCardHeader = ({ level, colors, styles }) => (
  <View style={styles.modernCardHeader}>
    <View style={styles.modernTitleContainer}>
      <Text style={[styles.modernTitle, { color: colors.text }]}>
        {level.title}
      </Text>
      <View style={[styles.modernBadge, { backgroundColor: level.color }]}>
        <Text style={styles.modernBadgeText}>{level.progress}%</Text>
      </View>
    </View>
    <Text style={styles.modernIcon}>{level.icon}</Text>
  </View>
);

// Sous-composant ModernProgress
const ModernProgress = ({ level, colors, styles }) => (
  level.hasProgress && (
    <View style={styles.modernProgressContainer}>
      <View style={styles.modernProgressBar}>
        <View 
          style={[
            styles.modernProgressFill,
            { width: `${level.progress}%`, backgroundColor: level.color }
          ]} 
        />
      </View>
      <Text style={[styles.modernProgressText, { color: colors.textSecondary }]}>
        {level.progress}%
      </Text>
    </View>
  )
);

// Sous-composant ModernCardButton
const ModernCardButton = ({ level, handleLevelPress, styles }) => (
  <Button
    title={level.hasStarted ? "Continuer" : "Commencer"}
    variant="filled"
    color={level.color}
    fullWidth
    onPress={handleLevelPress(level)}
    style={styles.modernButton}
    rightIcon={level.hasStarted ? "play-outline" : "rocket-outline"}
  />
);

// Refactor LevelCardContent pour utiliser les sous-composants
const LevelCardContent = ({ level, colors, styles, handleLevelPress }) => (
  <View style={styles.modernCardContent}>
    <ModernCardHeader level={level} colors={colors} styles={styles} />
    <ModernProgress level={level} colors={colors} styles={styles} />
    <ModernCardButton level={level} handleLevelPress={handleLevelPress} styles={styles} />
  </View>
);

const LevelSelection = () => {
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;
  
  // 🚀 JUSTE POUR RÉCUPÉRER LES VRAIS CHIFFRES
  const { getLevelProgress, hasProgress } = useRealTimeProgress();

  // Niveau actuel simplifié
  const getCurrentUserLevel = () => {
    for (let i = 1; i <= 6; i++) {
      if (getLevelProgress(i.toString()) === 0) {
        return i;
      }
    }
    return 6;
  };

  const currentUserLevel = getCurrentUserLevel();
  const currentLevelData = LANGUAGE_LEVELS[currentUserLevel];

  // Background
  const backgroundGradient = getBackgroundGradient(
    currentLevelData.color, 
    colors.background
  );

  // ✅ DONNÉES NIVEAUX - DESIGN ORIGINAL + VRAIES DONNÉES
  const levels = LEVELS_LIST.map((levelKey) => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const progress = getLevelProgress(levelKey); // ✅ Seul changement : vrai chiffre
    
    // ✅ LOGIQUE SIMPLE : A-t-on commencé ce niveau ?
    const hasStarted = hasProgress('vocabulary', levelKey) || 
                      hasProgress('phrases', levelKey) ||
                      hasProgress('grammar', levelKey) ||
                      hasProgress('reading', levelKey) ||
                      hasProgress('spelling', levelKey) ||
                      hasProgress('conversations', levelKey) ||
                      hasProgress('errorCorrection', levelKey) ||
                      hasProgress('wordGames', levelKey) ||
                      hasProgress('assessment', levelKey);
    
    return {
      id: levelKey,
      title: levelInfo.title,
      progress, // ✅ Vrai chiffre
      color: levelInfo.color,
      icon: levelInfo.icon,
      hasProgress: progress > 0,
      hasStarted, // ✅ Pour logique bouton
    };
  });

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

  // ========== RENDU - TON DESIGN ORIGINAL ==========
  const renderHeader = useCallback(() => (
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
          onBackPress={useCallback(() => router.push("/tabs/dashboard"), [])}
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
        />
      </LinearGradient>
    </View>
  ), []);

  const renderLevelCard = useCallback((level) => {
    return (
      <TouchableOpacity
        key={level.id}
        style={styles.modernCard}
        onPress={handleLevelPress(level)}
        activeOpacity={0.8}
      >
        <LevelCardContent level={level} colors={colors} styles={styles} handleLevelPress={handleLevelPress} />
      </TouchableOpacity>
    );
  }, [handleLevelPress, colors.text, styles]);

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