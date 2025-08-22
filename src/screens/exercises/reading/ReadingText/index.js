// ReadingText/index.js - VERSION STYLE GRAMMAR avec texte pepsy 🎯
import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import createStyles from "./style";

/**
 * 📖 ReadingText - Version style Grammar avec texte pepsy
 * Même design que GrammarRuleContent : header collapsible + section reading pepsy
 * ✅ Header collapsible avec icône livre
 * ✅ Section Reading avec style pepsy et texte plus gros
 * ❌ SUPPRIMÉ : Section Instructions (inutile)
 */
const ReadingText = ({
  exercise,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);
  const [expanded, setExpanded] = useState(true); // Par défaut ouvert pour la lecture
  const [expandAnim] = useState(new Animated.Value(1));

  // Animation d'expansion
  const toggleExpanded = useCallback(() => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(expandAnim, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setExpanded((prev) => !prev);
  }, [expanded, expandAnim]);

  // Rotation de l'icône
  const iconRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (!exercise) return null;

  return (
    <View style={styles.container}>
      <CollapsibleHeader 
        expanded={expanded} 
        toggleExpanded={toggleExpanded} 
        iconRotation={iconRotation} 
        exercise={exercise} 
        levelColor={levelColor} 
        styles={styles} 
      />
      <ReadingContentSection
        expandAnim={expandAnim}
        exercise={exercise}
        levelColor={levelColor}
        styles={styles}
      />
    </View>
  );
};

// Sous-composant CollapsibleHeader (style Grammar)
const CollapsibleHeader = ({ expanded, toggleExpanded, iconRotation, exercise, levelColor, styles }) => (
  <TouchableOpacity
    style={styles.headerContainer}
    onPress={toggleExpanded}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View style={[styles.ruleIcon, { backgroundColor: `${levelColor}15` }]}> 
            <Ionicons name="book-outline" size={16} color={levelColor} />
          </View>
          <Text style={styles.ruleTitle} numberOfLines={1}>
            {exercise.title || "Reading Text"}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.hintText, { color: levelColor }]}>
            {expanded ? 'Hide text' : 'Show text'}
          </Text>
          <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
            <Ionicons name="chevron-down" size={16} color={levelColor} />
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const ReadingContentSection = ({ expandAnim, exercise, levelColor, styles }) => (
  <Animated.View 
    style={[
      styles.contentWrapper,
      { 
        opacity: expandAnim,
        // Utilisation de maxHeight au lieu de height pour un meilleur contrôle
        maxHeight: expandAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1000], // Hauteur maximale suffisante pour le contenu
        }),
        overflow: 'hidden', // Cache le contenu qui dépasse
      }
    ]}
  >
    <View style={styles.contentContainer}>
      {/* 📖 READING SECTION avec style pepsy */}
      <ReadingSection exercise={exercise} styles={styles} />
    </View>
  </Animated.View>
);

// 📖 READING SECTION avec style pepsy et texte plus gros
const ReadingSection = ({ exercise, styles }) => (
  <View style={styles.readingSection}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconContainer, styles.readingIcon]}>
        <Ionicons name="book-outline" size={20} color="#0EA5E9" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Reading Content</Text>
      </View>
    </View>
    <Text style={styles.readingText}>{exercise.text || ""}</Text>
  </View>
);

// ✅ PropTypes
ReadingText.propTypes = {
  exercise: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  levelColor: PropTypes.string,
};

export default ReadingText;