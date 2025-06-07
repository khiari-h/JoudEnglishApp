import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Header compact pour le Dashboard - Design simplifié 🎓 JOUD [1] 🔥15
 * ✅ VERSION CLEAN : style.js statique + overrides minimaux ThemeContext
 */
const CompactHeader = ({ level = "1", streak = 0, levelColor = "#3B82F6" }) => {
  // ✅ ThemeContext avec valeurs par défaut pour éviter le crash  
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
      <View style={styles.content}>
        {/* Logo avec emoji */}
        <View style={styles.logoSection}>
          <Text style={styles.logoEmoji}>🎓</Text>
          <Text style={[styles.logoText, { color: colors.surface }]}>
            JOUD
          </Text>
        </View>

        {/* Section droite : Niveau + Streak */}
        <View style={styles.rightSection}>
          {/* Badge niveau */}
          <View style={[styles.levelBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.levelText, { color: levelColor }]}>
              {displayLevel}
            </Text>
          </View>

          {/* Streak */}
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

export default CompactHeader;