// GrammarRuleContent/index.js - VERSION REFACTORISÉE avec ContentSection (90 → 50 lignes)

import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import ContentSection from '../../../../components/ui/ContentSection';
import createStyles from './style';

/**
 * 📚 GrammarRuleContent - Version Refactorisée avec ContentSection
 * Garde le header collapsible custom (spécifique à Grammar)
 * Utilise ContentSection pour explication, exemples et règles
 * 90 lignes → 50 lignes (-45% de code)
 * Design cohérent avec les autres composants
 */
const GrammarRuleContent = ({ rule, levelColor = "#3b82f6" }) => {
  const styles = createStyles(levelColor);
  const [expanded, setExpanded] = useState(false);
  const [expandAnim] = useState(new Animated.Value(0));

  // Animation d'expansion (garde la logique custom)
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

  // Hauteur animée pour le contenu
  const contentHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600], // Augmenté pour les ContentSections
  });

  // Rotation de l'icône
  const iconRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // ✅ MAINTENANT on peut faire le return conditionnel
  if (!rule) return null;

  return (
    <View style={styles.container}>
      <CollapsibleHeader expanded={expanded} toggleExpanded={toggleExpanded} expandAnim={expandAnim} iconRotation={iconRotation} rule={rule} levelColor={levelColor} styles={styles} />
      <RuleContentSection
        expandAnim={expandAnim}
        contentHeight={contentHeight}
        rule={rule}
        levelColor={levelColor}
        styles={styles}
      />
    </View>
  );
};

// Sous-composant CollapsibleHeader
const CollapsibleHeader = ({ expanded, toggleExpanded, iconRotation, rule, levelColor, styles }) => (
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
      <HeaderContentSection expanded={expanded} iconRotation={iconRotation} rule={rule} levelColor={levelColor} styles={styles} />
    </LinearGradient>
  </TouchableOpacity>
);

// Sous-composant pour le contenu du header
const HeaderContentSection = ({ expanded, iconRotation, rule, levelColor, styles }) => (
  <View style={styles.headerContent}>
    <View style={styles.headerLeft}>
      <View style={[styles.ruleIcon, { backgroundColor: `${levelColor}15` }]}> 
        <Ionicons name="book-outline" size={16} color={levelColor} />
      </View>
      <Text style={styles.ruleTitle} numberOfLines={1}>{rule.title}</Text>
    </View>
    <View style={styles.headerRight}>
      <Text style={[styles.hintText, { color: levelColor }]}>{expanded ? 'Hide' : 'Show'} rule</Text>
      <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
        <Ionicons name="chevron-down" size={16} color={levelColor} />
      </Animated.View>
    </View>
  </View>
);

const RuleContentSection = ({ expandAnim, contentHeight, rule, levelColor, styles }) => (
  <Animated.View 
    style={[
      styles.contentWrapper,
      { 
        height: contentHeight,
        opacity: expandAnim,
      }
    ]}
  >
    <RuleContentInnerSection rule={rule} levelColor={levelColor} styles={styles} />
  </Animated.View>
);

// Sous-composant pour le contenu interne de la règle
const RuleContentInnerSection = ({ rule, levelColor, styles }) => (
  <View style={styles.contentContainer}>
    {/* 💡 EXPLICATION avec ContentSection */}
    <ContentSection
      title="Explanation"
      content={rule.explanation}
      levelColor={levelColor}
      backgroundColor="white"
      showIcon
    />
    {/* 📝 EXEMPLES avec ContentSection */}
    {rule.examples && rule.examples.length > 0 && (
      <ContentSection
        title="Examples"
        content={rule.examples.map((example, index) => 
          `${index + 1}. ${example.english}\n   → ${example.french}`
        ).join('\n\n')}
        levelColor={levelColor}
        backgroundColor="#F8FAFC"
        showIcon
        isItalic={false}
      />
    )}
    {/* 📋 RÈGLES avec ContentSection */}
    {rule.rules && rule.rules.length > 0 && (
      <ContentSection
        title="Rules"
        content={rule.rules.map((ruleItem, index) => 
          `${index + 1}. ${ruleItem}`
        ).join('\n\n')}
        levelColor={levelColor}
        backgroundColor="#F1F5F9"
        showIcon
        isItalic={false}
      />
    )}
  </View>
);

// PropTypes pour tous les sous-composants
CollapsibleHeader.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  iconRotation: PropTypes.object.isRequired,
  rule: PropTypes.object.isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

HeaderContentSection.propTypes = {
  expanded: PropTypes.bool.isRequired,
  iconRotation: PropTypes.object.isRequired,
  rule: PropTypes.object.isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

RuleContentSection.propTypes = {
  expandAnim: PropTypes.object.isRequired,
  contentHeight: PropTypes.object.isRequired,
  rule: PropTypes.object.isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

RuleContentInnerSection.propTypes = {
  rule: PropTypes.shape({
    explanation: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.shape({
      english: PropTypes.string,
      french: PropTypes.string,
    })),
    rules: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal GrammarRuleContent
GrammarRuleContent.propTypes = {
  rule: PropTypes.shape({
    title: PropTypes.string.isRequired,
    explanation: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.shape({
      english: PropTypes.string,
      french: PropTypes.string,
    })),
    rules: PropTypes.arrayOf(PropTypes.string),
  }),
  levelColor: PropTypes.string,
};

export default GrammarRuleContent;