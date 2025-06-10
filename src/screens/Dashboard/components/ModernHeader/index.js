// src/screens/Dashboard/components/ModernHeader/index.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Header moderne pour le Dashboard - Design amélioré
 * ✅ Typography plus impactante + micro-animations
 */
const ModernHeader = ({ 
  level = "1", 
  streak = 0, 
  levelColor = "#3B82F6",
  userName = "Utilisateur"
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
  };

  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const displayLevel = level === "bonus" ? "B" : level;

  // Nom du niveau pour context
  const getLevelName = (lvl) => {
    const levelNames = {
      "1": "Débutant",
      "2": "Élémentaire", 
      "3": "Intermédiaire",
      "4": "Intermédiaire+",
      "5": "Avancé",
      "6": "Expert",
      "bonus": "Bonus"
    };
    return levelNames[lvl] || "Débutant";
  };

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
            {/* SUPPRIMÉ : niveau redondant avec badge */}
          </View>
        </View>

        {/* Section droite : Stats importantes */}
        <View style={styles.rightSection}>
          {/* Badge niveau */}
          <View style={[styles.levelBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.levelText, { color: levelColor }]}>
              {displayLevel}
            </Text>
          </View>

          {/* Streak avec animation */}
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={[styles.streakText, { color: colors.surface }]}>
              {streak}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ModernHeader;