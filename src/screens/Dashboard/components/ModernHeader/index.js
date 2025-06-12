// src/screens/Dashboard/components/ModernHeader/index.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Header moderne pour le Dashboard - Version simplifiée
 * ✅ Logo + User + Badge niveau uniquement (streak migré vers metrics)
 */
const ModernHeader = ({ 
  level = "1", 
  levelColor = "#3B82F6",
  userName = "Utilisateur"
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
  };

  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const displayLevel = level === "bonus" ? "B" : level;

  return (
    <LinearGradient
      colors={[levelColor, `${levelColor}DD`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Pattern décoratif subtil */}
      <View style={styles.backgroundPattern} />

      <View style={styles.content}>
        {/* Section gauche : Logo + context user */}
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🎓</Text>
            <Text style={[styles.logoText, { color: colors.surface }]}>
              JOUD
            </Text>
          </View>

          {/* Context utilisateur - SIMPLIFIÉ */}
          <View style={styles.userContext}>
            <Text style={[styles.welcomeText, { color: colors.surface }]}>
              Salut {userName}
            </Text>
            <Text style={[styles.levelContext, { color: colors.surface }]}>
              Niveau {displayLevel}
            </Text>
          </View>
        </View>

        {/* Section droite : Badge niveau uniquement */}
        <View style={styles.rightSection}>
          <View style={[styles.levelBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.levelText, { color: levelColor }]}>
              {displayLevel}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ModernHeader;