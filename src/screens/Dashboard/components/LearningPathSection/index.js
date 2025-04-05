import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Section from "@/src/components/layout/Section";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

const LearningPathSection = ({ onViewProgress }) => {
  const navigation = useNavigation();

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

  return (
    <Section
      title="Learning Path"
      actionText="Select Level"
      onActionPress={() => navigation.navigate('LevelSelection')}
    >
      {/* Carte principale avec dégradé */}
      <Pressable
        style={({ pressed }) => [
          styles.mainCard,
          { 
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
        onPress={() => navigation.navigate('LevelSelection')}
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
      </Pressable>

      {/* Niveaux CECRL */}
      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <Pressable
            key={level.id}
            style={({ pressed }) => [
              styles.levelItem,
              { 
                opacity: pressed ? 0.7 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
            onPress={() => navigation.navigate('LevelSelection')}
          >
            <View 
              style={[
                styles.levelCircle, 
                { backgroundColor: level.color }
              ]}
            >
              <Text style={styles.levelText}>{level.label}</Text>
            </View>
          </Pressable>
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