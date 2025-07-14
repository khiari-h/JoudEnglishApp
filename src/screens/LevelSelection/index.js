// src/screens/LevelSelection/index.js - VERSION SIMPLE QUI GARDE TON DESIGN
import React, { useContext } from "react";
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

const LevelSelection = () => {
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;
  
  // 🚀 JUSTE POUR RÉCUPÉRER LES VRAIS CHIFFRES
  const { getLevelProgress, hasProgress, hasVocabularyStarted, hasVocabularyFastStarted } = useRealTimeProgress();

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
  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level: level.id },
    });
  };

  // ========== RENDU - TON DESIGN ORIGINAL ==========
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
          onBackPress={() => router.push("/tabs/dashboard")}
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
    // ✅ LOGIQUE BOUTON SIMPLE
    const getButtonText = () => {
      if (level.hasStarted) return "Continuer"; // Dès qu'on a commencé = Continuer
      return "Commencer";
    };

    const getButtonIcon = () => {
      if (level.hasStarted) return "play-outline";
      return "rocket-outline";
    };

    return (
      <TouchableOpacity
        key={level.id}
        style={styles.modernCard}
        onPress={() => handleLevelSelect(level)}
        activeOpacity={0.8}
      >
        <View style={styles.modernCardContent}>
          {/* Header - TON DESIGN ORIGINAL */}
          <View style={styles.modernCardHeader}>
            <View style={styles.modernTitleContainer}>
              <Text style={[styles.modernTitle, { color: colors.text }]}>
                {level.title}
              </Text>
              {/* ✅ TON BADGE ORIGINAL avec VRAI CHIFFRE */}
              <View style={[styles.modernBadge, { backgroundColor: level.color }]}>
                <Text style={styles.modernBadgeText}>
                  {level.progress}% {/* ✅ SEUL CHANGEMENT : vrai chiffre */}
                </Text>
              </View>
            </View>
            <Text style={styles.modernIcon}>{level.icon}</Text>
          </View>

          {/* Progression - TON DESIGN ORIGINAL */}
          {level.hasProgress && (
            <View style={styles.modernProgressContainer}>
              <View style={styles.modernProgressBar}>
                <View 
                  style={[
                    styles.modernProgressFill,
                    { 
                      width: `${level.progress}%`, // ✅ Vrai chiffre
                      backgroundColor: level.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.modernProgressText, { color: colors.textSecondary }]}>
                {level.progress}% {/* ✅ Vrai chiffre */}
              </Text>
            </View>
          )}

          {/* Bouton - TON DESIGN ORIGINAL */}
          <Button
            title={getButtonText()} // ✅ Logique simple
            variant="filled"
            color={level.color}
            fullWidth
            onPress={() => handleLevelSelect(level)}
            style={styles.modernButton}
            rightIcon={getButtonIcon()}
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