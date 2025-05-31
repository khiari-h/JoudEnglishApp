import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

/**
 * Header compact pour le Dashboard - Design simplifié 🎓 JOUD [1] 🔥15
 */
const CompactHeader = ({ level = "1", streak = 0, levelColor = "#3B82F6" }) => {
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
          <Text style={styles.logoText}>JOUD</Text>
        </View>

        {/* Section droite : Niveau + Streak */}
        <View style={styles.rightSection}>
          {/* Badge niveau */}
          <View style={styles.levelBadge}>
            <Text style={[styles.levelText, { color: levelColor }]}>
              {displayLevel}
            </Text>
          </View>

          {/* Streak */}
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CompactHeader;
