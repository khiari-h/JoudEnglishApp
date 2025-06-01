import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
import Container from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes et Helpers
import { LANGUAGE_LEVELS } from "../../utils/constants";
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
      name: levelInfo.name, // Maintenant "1", "2", "3", etc. ou "B"
      title: levelInfo.title, // "Niveau 1", "Niveau 2", etc.
      description: levelInfo.description,
      progress: progress?.levels?.[levelKey]?.completed || 0,
      color: levelInfo.color,
      icon: levelInfo.icon,
    };
  });

  // Naviguer vers la sélection d'exercice avec le niveau sélectionné
  const handleLevelSelect = (level) => {
    console.log("Navigating to level:", level.id);
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  // Générer le chemin compact de tous les niveaux (1,2,3,4,5,6,B)
  const renderCompactLevelPath = () => {
    const allLevels = Object.keys(LANGUAGE_LEVELS);

    return (
      <View style={localStyles.compactPathContainer}>
        <View style={localStyles.levelPath}>
          {allLevels.map((level, index, array) => (
            <React.Fragment key={level}>
              <View
                style={[
                  localStyles.smallLevelDot,
                  { backgroundColor: LANGUAGE_LEVELS[level].color },
                ]}
              >
                <Text style={localStyles.smallLevelDotText}>
                  {LANGUAGE_LEVELS[level].name}
                </Text>
              </View>

              {index < array.length - 1 && (
                <View style={localStyles.smallLevelLine} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Container
      safeArea
      backgroundColor={colors.background}
      withScrollView={false}
      statusBarColor="#6366F1"
      statusBarStyle="light-content"
    >
      {/* Header avec chemin de niveaux compact */}
      <View style={localStyles.headerContainer}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={localStyles.headerGradient}
        >
          <Header
            title="Choisissez votre niveau"
            showBackButton
            backgroundColor="transparent"
            textColor="white"
            withStatusBar={false}
            withShadow={false}
            titleContainerStyle={localStyles.headerTitle}
          />

          {/* Chemin de niveaux compact : ○1 ○2 ○3 ○4 ○5 ○6 ○B */}
          {renderCompactLevelPath()}
        </LinearGradient>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              <View style={localStyles.cardHeader}>
                <View style={localStyles.titleBadgeContainer}>
                  <View
                    style={[
                      localStyles.badge,
                      { backgroundColor: `${level.color}15` },
                    ]}
                  >
                    <Text
                      style={[localStyles.badgeText, { color: level.color }]}
                    >
                      {level.name}
                    </Text>
                  </View>
                  <Text style={localStyles.levelTitle}>{level.title}</Text>
                </View>
                <View style={localStyles.iconContainer}>
                  <Text style={localStyles.iconText}>{level.icon}</Text>
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
      </ScrollView>
    </Container>
  );
};

// Styles locaux
const localStyles = StyleSheet.create({
  headerContainer: {
    overflow: "hidden",
  },
  headerGradient: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // Styles pour le chemin de niveaux compact
  compactPathContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  levelPath: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  smallLevelDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  smallLevelDotText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  smallLevelLine: {
    height: 2,
    width: 16,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  // Styles pour la mise en page des cartes
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleBadgeContainer: {
    flexDirection: "column",
    flex: 1,
    marginRight: 10,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
    minWidth: 32,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 28,
  },
});

export default LevelSelection;
