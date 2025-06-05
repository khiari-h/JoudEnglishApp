// src/screens/LevelSelection/index.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes et Helpers
import { LANGUAGE_LEVELS } from "../../utils/constants";

// Styles centralisés
import styles from "./style";

// Valeurs par défaut pour les contextes
const DEFAULT_THEME = {
  colors: {
    background: "#F9FAFB",
    primary: "#5E60CE",
    text: "#1F2937",
  },
};

const DEFAULT_PROGRESS = {
  levels: {},
  isLoading: false,
};

const LevelSelection = () => {
  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const progressContext = useContext(ProgressContext) || DEFAULT_PROGRESS;

  const { colors } = themeContext;
  const { progress, isLoading } = progressContext;

  // Construire le tableau des niveaux avec la progression
  const levels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    return {
      id: levelKey,
      name: levelInfo.name,
      title: levelInfo.title,
      description: levelInfo.description,
      progress: progress?.levels?.[levelKey]?.completed || 0,
      color: levelInfo.color,
      icon: levelInfo.icon,
    };
  });

  // Naviguer vers la sélection d'exercice avec le niveau sélectionné
  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  // Générer le chemin compact de tous les niveaux (1,2,3,4,5,6,B)
  const renderCompactLevelPath = () => {
    const allLevels = Object.keys(LANGUAGE_LEVELS);

    return (
      <View style={styles.compactPathContainer}>
        <View style={styles.levelPath}>
          {allLevels.map((level, index, array) => (
            <React.Fragment key={level}>
              <View
                style={[
                  styles.smallLevelDot,
                  { backgroundColor: LANGUAGE_LEVELS[level].color },
                ]}
              >
                <Text style={styles.smallLevelDotText}>
                  {LANGUAGE_LEVELS[level].name}
                </Text>
              </View>

              {index < array.length - 1 && (
                <View style={styles.smallLevelLine} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  // Contenu principal de l'écran
  const renderMainContent = () => (
    <>
      {/* Header avec chemin de niveaux compact */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Header
            title="Choisissez votre niveau"
            showBackButton
            backgroundColor="transparent"
            textColor="white"
            withStatusBar={false}
            withShadow={false}
            titleContainerStyle={styles.headerTitle}
          />

          {/* Chemin de niveaux compact */}
          {renderCompactLevelPath()}
        </LinearGradient>
      </View>

      <View style={styles.introSection}>
        <Text style={styles.introText}>
          Nos niveaux structurés s'adaptent à votre progression. Commencez par
          le niveau qui correspond le mieux à vos capacités linguistiques.
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <Card
            key={level.id}
            style={styles.levelCard}
            withShadow
            bordered={false}
            withSideBorder
            onPress={() => handleLevelSelect(level)}
            headerIconColor={level.color}
            contentStyle={styles.cardContentStyle}
          >
            {/* En-tête personnalisé pour la carte */}
            <View style={styles.cardHeader}>
              <View style={styles.titleBadgeContainer}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: `${level.color}15` },
                  ]}
                >
                  <Text
                    style={[styles.badgeText, { color: level.color }]}
                  >
                    {level.name}
                  </Text>
                </View>
                <Text style={styles.levelTitle}>{level.title}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>{level.icon}</Text>
              </View>
            </View>

            <Text style={styles.levelDescription}>{level.description}</Text>

            {level.progress > 0 && (
              <ProgressBar
                progress={level.progress}
                fillColor={level.color}
                backgroundColor={`${level.color}15`}
                height={8}
                showPercentage
                label="Votre progression"
                style={styles.progressBar}
              />
            )}

            <Button
              title="Commencer l'apprentissage"
              variant="filled"
              color={level.color}
              fullWidth
              onPress={() => handleLevelSelect(level)}
              style={styles.startButton}
              rightIcon="arrow-forward-outline"
            />
          </Card>
        ))}
      </View>
    </>
  );

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM} // Garde la navigation bottom
      withScrollView
      backgroundColor={colors.background}
      statusBarColor="#6366F1"
      statusBarStyle="light-content"
      withPadding={false} // Le padding sera géré par les composants internes
      scrollViewProps={{
        style: styles.scrollView,
        contentContainerStyle: [
          styles.scrollContent,
          { paddingBottom: 100 } // Espace pour navigation
        ],
        showsVerticalScrollIndicator: false,
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default LevelSelection;