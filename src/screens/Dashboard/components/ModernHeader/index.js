// src/screens/Dashboard/components/ModernHeader/index.js
import { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';
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
        <HeaderLeftSection colors={colors} localStyles={styles} />

        {/* Section droite : Badge niveau uniquement */}
        <HeaderRightSection displayLevel={displayLevel} levelColor={levelColor} colors={colors} localStyles={styles} />
      </View>
    </LinearGradient>
  );
};

const HeaderLeftSection = ({ colors, localStyles }) => (
  <View style={localStyles.leftSection}>
    <View style={localStyles.logoContainer}>
      <Text style={localStyles.logoEmoji}>🎓</Text>
      <Text style={[localStyles.logoText, { color: colors.surface }]}>JOUD</Text>
    </View>
  </View>
);

const HeaderRightSection = ({ displayLevel, levelColor, colors, localStyles }) => (
  <View style={localStyles.rightSection}>
    <View style={[localStyles.levelBadge, { backgroundColor: colors.surface }]}> 
      <Text style={[localStyles.levelText, { color: levelColor }]}>{displayLevel}</Text>
    </View>
  </View>
);

// PropTypes pour le composant principal ModernHeader
ModernHeader.propTypes = {
  level: PropTypes.string,
  levelColor: PropTypes.string,
};

export default ModernHeader;