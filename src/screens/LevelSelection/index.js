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

// Constantes
import { LANGUAGE_LEVELS } from "../../utils/constants";

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

  // =================== LOGIQUE PROGRESSION SIMPLE ===================
  
  const getCurrentUserLevel = () => {
    const levelsWithProgress = Object.keys(LANGUAGE_LEVELS)
      .filter(key => key !== 'bonus')
      .filter(key => progress?.levels?.[key]?.completed > 0);
    
    if (levelsWithProgress.length === 0) return 1;
    
    const currentLevel = Math.max(...levelsWithProgress.map(Number));
    return Math.min(currentLevel + 1, 6);
  };

  const currentUserLevel = getCurrentUserLevel();
  const currentLevelData = LANGUAGE_LEVELS[currentUserLevel];

  // =================== BACKGROUND INTELLIGENT SIMPLE ===================
  
  const backgroundGradient = getBackgroundGradient(
    currentLevelData.color, 
    colors.background
  );

  // =================== DONNÉES NIVEAUX ÉPURÉES ===================
  
  const levels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const levelProgress = progress?.levels?.[levelKey]?.completed || 0;
    
    // ✅ DESCRIPTIONS COURTES ET ENGAGEANTES (max 2-3 mots)
    const getShortDescription = (id, title) => {
      const shortDescriptions = {
        '1': 'Premiers mots',
        '2': 'Phrases utiles', 
        '3': 'Vraies conversations',
        '4': 'Sujets du quotidien',
        '5': 'Discussions fluides',
        '6': 'Expertise complète',
        'bonus': 'Défis exclusifs'
      };
      return shortDescriptions[id] || title;
    };
    
    return {
      id: levelKey,
      name: levelInfo.name,
      title: levelInfo.title,
      description: getShortDescription(levelKey, levelInfo.title),
      progress: levelProgress, // ✅ Progression en pourcentage
      color: levelInfo.color,
      icon: levelInfo.icon,
    };
  });

  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  // =================== HEADER MODERNE ÉPURÉ ===================
  
  const renderModernHeader = () => (
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

        {/* ✅ PROGRESSION SIMPLE - Juste les cercles + infos comme ExerciseSelection */}
        <View style={styles.progressIndicator}>
          <View style={styles.levelDots}>
            {Object.keys(LANGUAGE_LEVELS).map((levelKey, index) => (
              <View
                key={levelKey}
                style={[
                  styles.progressDot,
                  { 
                    backgroundColor: LANGUAGE_LEVELS[levelKey].color,
                    opacity: Number(levelKey) <= currentUserLevel ? 1 : 0.3
                  },
                ]}
              >
                <Text style={styles.progressDotText}>
                  {levelKey === 'bonus' ? 'B' : levelKey}
                </Text>
              </View>
            ))}
          </View>
          
          {/* ✅ AJOUTÉ : Infos de progression comme ExerciceSelection */}
          <View style={styles.progressInfo}>
            <Text style={{
              color: 'white',
              fontSize: 13,
              fontWeight: '600'
            }}>
              {levels.length} niveaux
            </Text>
            <Text style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 11,
              marginLeft: 8
            }}>
              • {levels.filter(level => level.progress > 0).length} en cours
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  // =================== CARDS MODERNES ÉPURÉES ===================
  
  const renderModernLevelCard = (level) => {
    const hasProgress = level.progress > 0;
    
    return (
      <TouchableOpacity
        key={level.id}
        style={[
          styles.modernCard,
          hasProgress && {
            borderWidth: 1,
            borderColor: level.color + "30",
            backgroundColor: level.color + "03"
          }
        ]} // ✅ AJOUTÉ : Surbrillance si progression comme ExerciseSelection
        onPress={() => handleLevelSelect(level)}
        activeOpacity={0.8}
      >
        <View style={styles.modernCardContent}>
          {/* ✅ HEADER SIMPLE AVEC POURCENTAGES */}
          <View style={styles.modernCardHeader}>
            <View style={styles.modernTitleContainer}>
              <Text style={[styles.modernTitle, { color: colors.text }]}>
                {level.title}
              </Text>
              <View style={[styles.modernBadge, { backgroundColor: level.color }]}>
                <Text style={styles.modernBadgeText}>
                  {hasProgress ? `${level.progress}%` : '0%'}
                </Text>
              </View>
              {hasProgress && (
                <View style={{
                  backgroundColor: '#10B981',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginLeft: 8
                }}>
                  <Text style={{ color: 'white', fontSize: 9, fontWeight: '600' }}>
                    EN COURS
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.modernIcon}>{level.icon}</Text>
          </View>

          {/* ✅ DESCRIPTION COURTE */}
          <Text style={[styles.modernDescription, { color: colors.textSecondary }]}>
            {level.description}
          </Text>

          {/* ✅ PROGRESSION (si existante) comme ExerciseSelection */}
          {hasProgress && (
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

          {/* ✅ BOUTON AVEC FUSÉE */}
          <Button
            title={hasProgress ? "Continuer" : "Commencer"}
            variant="filled"
            color={level.color}
            fullWidth
            onPress={() => handleLevelSelect(level)}
            style={styles.modernButton}
            rightIcon="rocket-outline" // ✅ Icône fusée Ionicons
          />
        </View>
      </TouchableOpacity>
    );
  };

  // =================== INTRO ULTRA-ÉPURÉE ===================
  
  const renderSimpleIntro = () => {
    const levelsInProgress = levels.filter(level => level.progress > 0).length;
    
    return (
      <View style={styles.modernIntro}>
        <Text style={[styles.modernIntroText, { color: colors.textSecondary }]}>
          À vous de choisir ! • {levelsInProgress}/{levels.length} en cours
        </Text>
      </View>
    );
  };

  // =================== RENDU PRINCIPAL ===================
  
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
      {/* ✅ Background subtil */}
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {renderModernHeader()}
        
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[styles.modernScrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          {renderSimpleIntro()}
          
          {/* ✅ Liste épurée */}
          <View style={styles.modernLevelsContainer}>
            {levels.map(renderModernLevelCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default LevelSelection;