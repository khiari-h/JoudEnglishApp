import React, { useContext } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
import styles from "./newStyle";

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

// Composant de carte de niveau amélioré
const LevelCard = ({ level, onSelect }) => {
  // Données pour le niveau
  const { id, name, title, description, progress, color, icon } = level;

  // Stats illustratives (à remplacer par vos vraies données)
  const levelStats = [
    { icon: "book-outline", label: `${Math.floor(Math.random() * 20) + 10} rules` },
    { icon: "list-outline", label: `${Math.floor(Math.random() * 30) + 20} exercises` },
    { icon: "time-outline", label: `Avg. ${Math.floor(Math.random() * 7) + 3} hrs` },
  ];
  
  return (
    <Card
      style={styles.levelCard}
      bordered={false}
      withShadow={true}
      withSideBorder={true}
      headerIconBackground={true}
      headerIcon={icon}
      headerIconColor={color}
      title={title}
      badge={name}
      badgeStyle={{ backgroundColor: `${color}15` }}
      badgeTextStyle={{ color: color }}
      onPress={() => onSelect(level)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.levelDescription}>{description}</Text>
        
        <View style={styles.statsContainer}>
          {levelStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon} size={16} color={color} style={styles.statIcon} />
              <Text style={styles.statText}>{stat.label}</Text>
            </View>
          ))}
        </View>
        
        {progress > 0 && (
          <View style={styles.progressWrapper}>
            <ProgressBar
              progress={progress}
              fillColor={color}
              backgroundColor={`${color}15`}
              height={8}
              borderRadius={4}
              showPercentage={true}
              animated={true}
              label="Your progress"
              labelPosition="top"
              style={styles.progressBar}
            />
          </View>
        )}
        
        <Button
          title="Start Learning"
          variant="filled"
          color={color === "#6B7280" ? "primary" : color}
          fullWidth
          onPress={() => onSelect(level)}
          style={styles.startButton}
          rightIcon="arrow-forward-outline"
        />
      </View>
    </Card>
  );
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
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level: level.id },
    });
  };

  return (
    <Container
      safeArea
      statusBarColor="#6366F1"
      statusBarStyle="light-content"
      backgroundColor={colors.background}
      withScrollView={true}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollViewContent,
      }}
    >
      {/* En-tête avec dégradé */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Choose your level</Text>
          <Text style={styles.headerSubtitle}>
            Select the level that matches your current language proficiency
          </Text>
        </View>
      </LinearGradient>

      {/* Image illustrative (optionnelle) */}
      <View style={styles.illustrationContainer}>
        {/* Remplacer par votre propre image ou icône */}
        <View style={styles.illustrationPlaceholder}>
          <Ionicons name="school" size={48} color="#6366F1" />
        </View>
      </View>

      {/* Section d'introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Ready to improve your language skills?</Text>
        <Text style={styles.introText}>
          Our structured levels adapt to your progression. Start from any level
          that matches your abilities.
        </Text>
      </View>

      {/* Liste des niveaux */}
      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>Available Levels</Text>
        
        {levels.map((level) => (
          <LevelCard 
            key={level.id} 
            level={level} 
            onSelect={handleLevelSelect} 
          />
        ))}
      </View>
    </Container>
  );
};

export default LevelSelection;