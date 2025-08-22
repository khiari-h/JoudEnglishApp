// GrammarRuleContent/index.js - VERSION REDESIGNÉE avec sections "micro" 🎯

import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import createStyles from './style';

/**
 * 🎯 GrammarRuleContent - Version redesignée avec sections "micro"
 * NOUVEAU : Sections custom avec icônes colorées dans des cercles (comme vocabulaire)
 * ✅ 💡 Explanation avec icône ampoule violette
 * ✅ 📝 Examples avec icône crayon bleue  
 * ✅ ✅ Rules avec icône check verte
 * Garde le header collapsible custom mais modernisé
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
    outputRange: [0, 800], // Augmenté pour les nouvelles sections micro
  });

  // Rotation de l'icône
  const iconRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (!rule) return null;

  return (
    <View style={styles.container}>
      <CollapsibleHeader 
        expanded={expanded} 
        toggleExpanded={toggleExpanded} 
        iconRotation={iconRotation} 
        rule={rule} 
        levelColor={levelColor} 
        styles={styles} 
      />
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

// Sous-composant CollapsibleHeader (modernisé)
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
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View style={[styles.ruleIcon, { backgroundColor: `${levelColor}15` }]}> 
            <Ionicons name="book-outline" size={16} color={levelColor} />
          </View>
          <Text style={styles.ruleTitle} numberOfLines={1}>{rule.title}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.hintText, { color: levelColor }]}>
            {expanded ? 'Hide rule' : 'Show rule'}
          </Text>
          <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
            <Ionicons name="chevron-down" size={16} color={levelColor} />
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
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
    <View style={styles.contentContainer}>
      {/* 🆕 EXPLANATION SECTION avec style "micro" */}
      {rule.explanation && (
        <ExplanationSection explanation={rule.explanation} styles={styles} />
      )}

      {/* 🆕 EXAMPLES SECTION avec style "micro" */}
      {rule.examples && rule.examples.length > 0 && (
        <ExamplesSection examples={rule.examples} styles={styles} />
      )}

      {/* 🆕 RULES SECTION avec style "micro" */}
      {rule.rules && rule.rules.length > 0 && (
        <RulesSection rules={rule.rules} styles={styles} />
      )}
    </View>
  </Animated.View>
);

// 🆕 EXPLANATION SECTION avec icône ampoule violette
const ExplanationSection = ({ explanation, styles }) => (
  <View style={styles.explanationSection}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconContainer, styles.explanationIcon]}>
        <Ionicons name="bulb-outline" size={16} color="#A855F7" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Explanation</Text>
      </View>
    </View>
    <Text style={styles.sectionContent}>{explanation}</Text>
  </View>
);

// 🆕 EXAMPLES SECTION avec icône crayon bleue
const ExamplesSection = ({ examples, styles }) => (
  <View style={styles.examplesSection}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconContainer, styles.examplesIcon]}>
        <Ionicons name="pencil-outline" size={16} color="#0EA5E9" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Examples</Text>
      </View>
    </View>
    <View style={styles.sectionContent}>
      {examples.map((example, index) => (
        <View key={index} style={styles.exampleItem}>
          <Text style={styles.exampleEnglish}>
            {index + 1}. {example.english}
          </Text>
          <Text style={styles.exampleFrench}>
            → {example.french}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

// 🆕 RULES SECTION avec icône check verte
const RulesSection = ({ rules, styles }) => (
  <View style={styles.rulesSection}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconContainer, styles.rulesIcon]}>
        <Ionicons name="checkmark-circle-outline" size={16} color="#22C55E" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Rules</Text>
      </View>
    </View>
    <View style={styles.sectionContent}>
      {rules.map((ruleItem, index) => (
        <View key={index} style={styles.ruleItem}>
          <View style={styles.ruleNumber}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              {index + 1}
            </Text>
          </View>
          <Text style={styles.ruleText}>{ruleItem}</Text>
        </View>
      ))}
    </View>
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

RuleContentSection.propTypes = {
  expandAnim: PropTypes.object.isRequired,
  contentHeight: PropTypes.object.isRequired,
  rule: PropTypes.object.isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

ExplanationSection.propTypes = {
  explanation: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

ExamplesSection.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.shape({
    english: PropTypes.string,
    french: PropTypes.string,
  })).isRequired,
  styles: PropTypes.object.isRequired,
};

RulesSection.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
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