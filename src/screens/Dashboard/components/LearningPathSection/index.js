// src/components/sections/LearningPathSection/index.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Section from "@/src/components/layout/Section";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

const LearningPathSection = ({ onSelectLevel, onViewProgress }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  // Niveaux disponibles
  const levels = [
    { id: "A1", label: "A1", color: "#22C55E" },
    { id: "A2", label: "A2", color: "#10B981" },
    { id: "B1", label: "B1", color: "#3B82F6" },
    { id: "B2", label: "B2", color: "#8B5CF6" },
    { id: "C1", label: "C1", color: "#EC4899" },
    { id: "C2", label: "C2", color: "#F43F5E" },
  ];

  // Fonction pour gérer le clic sur un niveau
  const handleLevelPress = (levelId) => {
    onSelectLevel && onSelectLevel(levelId);
  };

  return (
    <Section
      title="Learning Path"
      actionText="Select Level"
      onActionPress={() => onSelectLevel && onSelectLevel("all")}
    >
      {/* Carte principale avec dégradé */}
      <TouchableOpacity
        style={styles.mainCard}
        onPress={() => onSelectLevel && onSelectLevel("A1")}
      >
        <LinearGradient
          colors={[colors.primary, "#7764E4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        />
        
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Start Your English Journey</Text>
            <Text style={styles.cardSubtitle}>
              Choose a level from beginner to advanced
            </Text>
          </View>
          
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🌐</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Niveaux CECRL */}
      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={styles.levelItem}
            onPress={() => handleLevelPress(level.id)}
          >
            <View 
              style={[
                styles.levelCircle, 
                { backgroundColor: level.color }
              ]}
            >
              <Text style={styles.levelText}>{level.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bouton de progression */}
      <Button
        title="View My Progress"
        variant="outlined"
        color="primary"
        fullWidth
        leftIcon="stats-chart"
        onPress={onViewProgress}
        style={styles.progressButton}
      />
    </Section>
  );
};

export default LearningPathSection;