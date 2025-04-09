import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
// Remplacer useNavigation par router d'Expo Router
import { router } from "expo-router";

// Importation des routes
import { ROUTES } from "../../navigation/routes";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import Badge from "../../components/ui/Badge";

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
  // Enlever useNavigation
  // const navigation = useNavigation();

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
      name: levelKey,
      title: levelInfo.title,
      description: levelInfo.description,
      progress: progress?.levels?.[levelKey]?.completed || 0,
      color: levelInfo.color,
      icon: levelInfo.icon,
    };
  });

  // Naviguer vers la sélection d'exercice avec le niveau sélectionné
  const handleLevelSelect = (level) => {
    console.log("Navigating to level:", level.id);

    // Remplacer navigation.navigate par router.push
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  return (
    <Container
      safeArea
      statusBarColor={colors.background}
      statusBarStyle="dark-content"
      backgroundColor={colors.background}
    >
      <Header title="Language Levels" showBackButton />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>
            Choose any level to start your learning journey
          </Text>
        </View>

        <View style={styles.levelsContainer}>
          {levels.map((level, index) => (
            <Card
              key={level.id}
              style={[
                styles.levelCard,
                { borderLeftColor: level.color, borderLeftWidth: 5 },
              ]}
              onPress={() => handleLevelSelect(level)}
            >
              <View style={styles.levelContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${level.color}15` },
                  ]}
                >
                  <Text style={styles.levelIcon}>{level.icon}</Text>
                </View>

                <View style={styles.levelInfo}>
                  <View style={styles.levelHeader}>
                    <Badge
                      label={level.name}
                      color={level.color}
                      variant="filled"
                      style={styles.levelBadge}
                    />
                    <Text style={styles.levelTitle}>{level.title}</Text>
                  </View>

                  <Text style={styles.levelDescription}>
                    {level.description}
                  </Text>

                  {level.progress > 0 && (
                    <View style={styles.progressContainer}>
                      <ProgressBar
                        progress={level.progress}
                        fillColor={level.color}
                        height={6}
                        showPercentage
                      />
                    </View>
                  )}
                </View>
              </View>

              <Button
                title="Start Learning"
                variant="filled"
                color={level.color}
                fullWidth
                onPress={() => handleLevelSelect(level)}
                style={styles.startButton}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default LevelSelection;
