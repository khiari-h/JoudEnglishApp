import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

/**
 * Composant Header compact pour le Dashboard
 */
const CompactHeader = ({ 
  level = "A1", 
  progress = 0, 
  streak = 0, 
  levelColor = "#3B82F6",
  onProfilePress 
}) => {
  const router = useRouter();

  // Formater le pourcentage avec max 0 décimales
  const formattedProgress = Math.round(progress);

  return (
    <LinearGradient
      colors={[levelColor, `${levelColor}DD`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo et niveau */}
        <View style={styles.leftSection}>
          <Text style={styles.logo}>JOUD</Text>
          <View style={styles.levelContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{level}</Text>
            </View>
            <View style={styles.levelProgressContainer}>
              <View style={styles.levelProgressTrack}>
                <View 
                  style={[
                    styles.levelProgressFill, 
                    { width: `${formattedProgress}%` }
                  ]}
                />
              </View>
              <Text style={styles.levelPercentage}>{formattedProgress}%</Text>
            </View>
          </View>
        </View>

        {/* Streak et profil */}
        <View style={styles.rightSection}>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={16} color="#FFB830" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={onProfilePress}
          >
            <Ionicons name="person" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CompactHeader;