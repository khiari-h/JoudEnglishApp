// src/screens/LevelSelection/index.js - AVEC CONSTANTES PROPRES
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes (TES constantes !)
import { LANGUAGE_LEVELS } from "../../utils/constants";

// Styles
import styles from "./style";

const DEFAULT_THEME = {
  colors: {
    background: "#F8F9FA",
    primary: "#5E60CE", 
    text: "#1F2937",
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

  // =================== LOGIQUE BACKGROUND INTELLIGENT ===================
  
  // Déterminer le niveau recommandé de l'utilisateur
  const getCurrentUserLevel = () => {
    // Logique : trouve le dernier niveau avec progression > 0
    const levelsWithProgress = Object.keys(LANGUAGE_LEVELS)
      .filter(key => key !== 'bonus')
      .filter(key => progress?.levels?.[key]?.completed > 0);
    
    if (levelsWithProgress.length === 0) return 1; // Débutant par défaut
    
    const currentLevel = Math.max(...levelsWithProgress.map(Number));
    return Math.min(currentLevel + 1, 6); // Niveau suivant ou max 6
  };

  const currentUserLevel = getCurrentUserLevel();
  const currentLevelData = LANGUAGE_LEVELS[currentUserLevel];

  // =================== BACKGROUND COLORS ÉDUCATIFS ===================
  
  const getEducationalBackground = (level) => {
    const levelData = LANGUAGE_LEVELS[level];
    const baseColor = levelData.color;
    
    // Couleur très pâle (3% opacity) pour background contextuel
    const backgroundColor = baseColor + "08"; // 8 = ~3% en hex
    
    // Gradient vertical subtil pour profondeur (sans être agressif)
    const gradientStart = baseColor + "05"; // 2%
    const gradientEnd = baseColor + "0A";   // 4%
    
    return {
      backgroundColor,
      gradientColors: [gradientStart, "#FFFFFF", gradientEnd],
      gradientLocations: [0, 0.5, 1]
    };
  };

  const backgroundSystem = getEducationalBackground(currentUserLevel);

  // =================== LEVELS DATA ===================
  
  const levels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const levelProgress = progress?.levels?.[levelKey]?.completed || 0;
    
    // Déterminer le type de niveau pour l'affichage
    const getLevelType = (id) => {
      if (['1', '2'].includes(id)) return 'beginner';
      if (['3', '4'].includes(id)) return 'intermediate';
      if (['5', '6'].includes(id)) return 'advanced';
      if (id === 'bonus') return 'premium';
      return 'beginner';
    };
    
    return {
      id: levelKey,
      name: levelInfo.name,
      title: levelInfo.title,
      description: levelInfo.description,
      progress: levelProgress,
      color: levelInfo.color,
      icon: levelInfo.icon,
      levelType: getLevelType(levelKey),
      isLocked: false, // Tous accessibles !
    };
  });

  const handleLevelSelect = (level) => {
    // Libre accès à tous les niveaux !
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  // =================== HEADER ADAPTATIF ===================
  
  const renderAdaptiveHeader = () => (
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

        {/* Indicateur progression dans header */}
        <View style={[styles.compactPathContainer, { paddingBottom: 12 }]}>
          <View style={styles.levelPath}>
            {Object.keys(LANGUAGE_LEVELS).map((levelKey, index, array) => (
              <React.Fragment key={levelKey}>
                <View
                  style={[
                    styles.smallLevelDot,
                    { 
                      backgroundColor: LANGUAGE_LEVELS[levelKey].color,
                      opacity: Number(levelKey) <= currentUserLevel ? 1 : 0.4
                    },
                  ]}
                >
                  <Text style={styles.smallLevelDotText}>
                    {LANGUAGE_LEVELS[levelKey].name}
                  </Text>
                </View>

                {index < array.length - 1 && (
                  <View style={[
                    styles.smallLevelLine,
                    { opacity: Number(levelKey) < currentUserLevel ? 1 : 0.3 }
                  ]} />
                )}
              </React.Fragment>
            ))}
          </View>
          
          {/* Indicateur niveau recommandé */}
          <Text style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 11,
            marginTop: 6,
            textAlign: 'center'
          }}>
            Niveau recommandé : {currentLevelData.title} {currentLevelData.name}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  // =================== CARDS AVEC CONTEXTE ===================
  
  const renderContextualLevelCard = (level) => {
    const isCurrentLevel = Number(level.id) === currentUserLevel;
    
    return (
      <TouchableOpacity
        key={level.id}
        style={[
          styles.levelCard,
          isCurrentLevel && {
            borderWidth: 1,
            borderColor: level.color + "40", // Highlight niveau recommandé
            backgroundColor: level.color + "05"
          }
        ]}
        onPress={() => handleLevelSelect(level)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContentStyle}>
          {/* Header avec badge contextuel */}
          <View style={styles.cardHeader}>
            <View style={styles.levelTitleContainer}>
              <Text style={styles.levelMainTitle}>{level.title}</Text>
              <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                <Text style={styles.levelBadgeText}>{level.name}</Text>
              </View>
              {isCurrentLevel && (
                <View style={{
                  backgroundColor: '#10B981',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginLeft: 8
                }}>
                  <Text style={{ color: 'white', fontSize: 9, fontWeight: '600' }}>
                    RECOMMANDÉ
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.levelIcon}>{level.icon}</Text>
          </View>

          {/* Description avec contexte éducatif */}
          <Text style={styles.levelDescription}>
            {level.description}
            {level.levelType === 'beginner' && ' • Débutant'}
            {level.levelType === 'intermediate' && ' • Intermédiaire'}  
            {level.levelType === 'advanced' && ' • Avancé'}
            {level.levelType === 'premium' && ' • Premium'}
          </Text>

          {/* Progression */}
          {level.progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${level.progress}%`,
                      backgroundColor: level.color
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{level.progress}%</Text>
            </View>
          )}

          {/* Bouton adaptatif */}
          <Button
            title={
              isCurrentLevel ? "Niveau recommandé" :
              level.progress > 0 ? "Réviser" : "Commencer"
            }
            variant="filled"
            color={level.color}
            fullWidth
            onPress={() => handleLevelSelect(level)}
            style={styles.startButton}
            rightIcon={
              isCurrentLevel ? "rocket-outline" :
              level.progress > 0 ? "refresh-outline" : "arrow-forward-outline"
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  // =================== INTRO CONTEXTUELLE ===================
  
  const renderEducationalIntro = () => (
    <View style={styles.introSection}>
      <Text style={styles.introText}>
        Choisissez librement votre niveau • Recommandé : {currentLevelData.title} {currentLevelData.name}
      </Text>
    </View>
  );

  // =================== RENDU PRINCIPAL ===================
  
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false} // On gère le scroll manuellement
      backgroundColor="transparent" 
      statusBarColor="#6366F1"
      statusBarStyle="light-content"
      withPadding={false}
    >
      {/* Background Éducatif Intelligent */}
      <LinearGradient
        colors={backgroundSystem.gradientColors}
        locations={backgroundSystem.gradientLocations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {renderAdaptiveHeader()}
        
        {/* SCROLL VIEW MANUEL AJOUTÉ */}
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          {renderEducationalIntro()}
          
          {/* Liste des niveaux avec contexte éducatif */}
          <View style={styles.levelsContainer}>
            {levels.map(renderContextualLevelCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default LevelSelection;