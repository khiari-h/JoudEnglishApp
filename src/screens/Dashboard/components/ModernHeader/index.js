// src/screens/Dashboard/components/ModernHeader/index.js
import { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Header moderne pour le Dashboard - Version nettoyée
 * ✅ Logo + Badge niveau uniquement (textes utilisateur supprimés)
 */
const ModernHeader = ({ 
  level = "1", 
  levelColor = "#3B82F6"
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
        {/* Section gauche : Logo uniquement */}
        <HeaderLeftSection colors={colors} styles={styles} />

        {/* Section droite : Badge niveau uniquement */}
        <HeaderRightSection displayLevel={displayLevel} levelColor={levelColor} colors={colors} styles={styles} />
      </View>
    </LinearGradient>
  );
};

const HeaderLeftSection = ({ colors, styles }) => (
  <View style={styles.leftSection}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoEmoji}>🎓</Text>
      <Text style={[styles.logoText, { color: colors.surface }]}>JOUD</Text>
    </View>
  </View>
);

const HeaderRightSection = ({ displayLevel, levelColor, colors, styles }) => (
  <View style={styles.rightSection}>
    <View style={[styles.levelBadge, { backgroundColor: colors.surface }]}> 
      <Text style={[styles.levelText, { color: levelColor }]}>{displayLevel}</Text>
    </View>
  </View>
);

export default ModernHeader;