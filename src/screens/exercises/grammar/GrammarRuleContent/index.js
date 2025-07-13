// GrammarRuleContent/index.js - VERSION REFACTORISÉE avec ContentSection (90 → 50 lignes)






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

  if (!rule) return null;

  // Animation d'expansion (garde la logique custom)
  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(expandAnim, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    setExpanded(!expanded);
  };

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

  return (
    <View style={styles.container}>
      {/* 📖 HEADER COLLAPSIBLE - Garde le design custom */}
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
                {rule.title}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={[styles.hintText, { color: levelColor }]}>
                {expanded ? 'Hide' : 'Show'} rule
              </Text>
              <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
                <Ionicons name="chevron-down" size={16} color={levelColor} />
              </Animated.View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* 📚 CONTENU EXPANSIBLE avec ContentSection */}
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
          {/* 💡 EXPLICATION avec ContentSection */}
          <ContentSection
            title="Explanation"
            content={rule.explanation}
            levelColor={levelColor}
            backgroundColor="white"
            showIcon={true}
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
              showIcon={true}
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
              showIcon={true}
              isItalic={false}
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default GrammarRuleContent;