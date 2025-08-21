// src/components/ui/ProgressCard/index.js - VERSION CORRIGÉE
import { View, Text, TouchableOpacity, LayoutAnimation, Platform } from "react-native";
import { useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import ProgressBar from "../ProgressBar";
import createStyles from "./style";

/**
 * 📊 ProgressCard - Version Épurée Sans Dots
 * ✨ Design clean et moderne
 * 🚫 Suppression des categoryDot qui polluent l'interface
 * 🎯 Focus sur l'information, pas la décoration
 */
const ProgressCard = ({
  title = "Progression",
  subtitle = "",
  progress = 0,
  completed = 0,
  total = 0,
  levelColor = "#5E60CE",
  expandable = false,
  expanded = false,
  onToggleExpand,
  categoryData = [],
  onCategoryPress,
  gamificationData = null, // 🎭 NOUVEAU : Données de gamification
}) => {
  // 🎭 GAMIFICATION : Utilise les données de gamification si disponibles
  const isGamified = !!gamificationData;
  const gamification = gamificationData || {
    colors: { primary: levelColor, secondary: `${levelColor}15`, accent: levelColor },
    messages: { main: title, subtitle },
    badges: { current: null, next: null },
    visualEffects: { glowIntensity: 0, shadowDepth: 0 },
    celebration: null
  };

  const styles = createStyles(gamification.colors.primary);

  // Configuration LayoutAnimation pour smooth transition
  const configureLayoutAnimation = () => {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  // Toggle expansion avec LayoutAnimation smooth
  const toggleExpanded = useCallback(() => {
    if (!expandable) return;
    configureLayoutAnimation();
    onToggleExpand?.();
  }, [expandable, onToggleExpand]);

  const handleCategoryPress = useCallback((idx) => () => onCategoryPress?.(idx), [onCategoryPress]);

  // Sous-composant CardHeader
  const CardHeader = ({ headerTitle, headerSubtitle, headerCompleted, headerTotal, headerProgress, headerLevelColor, headerExpandable, headerExpanded, headerToggleExpanded, headerStyles }) => (
    <TouchableOpacity 
      style={headerStyles.header}
      onPress={headerToggleExpanded}
      activeOpacity={headerExpandable ? 0.8 : 1}
    >
      <View style={headerStyles.headerLeft}>
        <Text style={headerStyles.title}>{headerTitle || 'Progression'}</Text>
        {headerSubtitle && <Text style={headerStyles.subtitle}>{headerSubtitle}</Text>}
      </View>
      <View style={headerStyles.headerRight}>
        <View style={headerStyles.statsContainer}>
          <Text style={[headerStyles.statsCount, { color: headerLevelColor }]}>{headerCompleted || 0}</Text>
          <Text style={headerStyles.statsTotal}>/{headerTotal || 0}</Text>
        </View>
        <Text style={[headerStyles.statsPercentage, { color: headerLevelColor }]}>{Math.round(headerProgress || 0)}%</Text>
        {headerExpandable && (
          <View style={[headerStyles.chevronContainer, headerExpanded && headerStyles.chevronExpanded]}>
            <Ionicons name="chevron-down" size={16} color={headerLevelColor} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Sous-composant MainProgressBar
  const MainProgressBar = ({ mainProgress, mainLevelColor, mainStyles }) => (
    <View style={mainStyles.progressSection}>
      <ProgressBar
        progress={mainProgress}
        showPercentage={false}
        fillColor={mainLevelColor}
        height={12} // Plus haute pour plus de visibilité
        backgroundColor={`${mainLevelColor}15`}
        borderRadius={6} // Plus arrondi
        animated
      />
    </View>
  );

  // Sous-composant Expansion - CORRIGÉ
  const Expansion = ({ expandable: localExpandable, expanded: localExpanded, categoryData: localCategoryData, handleCategoryPress: localHandleCategoryPress, levelColor: localLevelColor, styles: localStyles }) => (
    localExpandable && localExpanded && localCategoryData.length > 0 && (
      <View style={localStyles.expansionWrapper}>
        <View style={localStyles.expansionContainer}>
          <View style={localStyles.expansionHeader}>
            <Text style={localStyles.expansionTitle}>Par catégorie</Text>
            <Text style={localStyles.expansionSubtitle}>
              {localCategoryData.length} {localCategoryData.length > 1 ? 'catégories' : 'catégorie'}
            </Text>
          </View>
          <CategoryList categoryData={localCategoryData} handleCategoryPress={localHandleCategoryPress} levelColor={localLevelColor} styles={localStyles} />
        </View>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${levelColor}15`, `${levelColor}08`, `${levelColor}03`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <CardHeader
          headerTitle={gamification.messages.main}
          headerSubtitle={gamification.messages.subtitle}
          headerCompleted={completed}
          headerTotal={total}
          headerProgress={progress}
          headerLevelColor={gamification.colors.primary}
          headerExpandable={expandable}
          headerExpanded={expanded}
          headerToggleExpanded={toggleExpanded}
          headerStyles={styles}
        />
        
        <MainProgressBar 
          mainProgress={progress} 
          mainLevelColor={gamification.colors.primary} 
          mainStyles={styles} 
        />
      </LinearGradient>
      <Expansion
        expandable={expandable}
        expanded={expanded}
        categoryData={categoryData}
        handleCategoryPress={handleCategoryPress}
        levelColor={levelColor}
        styles={styles}
      />
    </View>
  );
};

const CategoryList = ({ categoryData, handleCategoryPress, levelColor, styles }) => {
  if (!categoryData || !Array.isArray(categoryData)) return null;
  
  return (
    <View style={styles.categoriesList}>
      {categoryData.map((category, index) => {
        if (!category || typeof category !== 'object') return null;
        
        return (
          <TouchableOpacity
            key={category.id || category.title || index}
            style={styles.categoryItem}
            onPress={handleCategoryPress ? handleCategoryPress(index) : undefined}
            activeOpacity={0.7}
          >
            {/* Row principale avec titre et stats */}
            <View style={styles.categoryRow}>
              <View style={styles.categoryLeft}>
                <Text style={styles.categoryTitle} numberOfLines={1}>
                  {category.title || 'Catégorie'}
                </Text>
              </View>
              <Text style={[styles.categoryStats, { color: levelColor }]}>
                {category.completed || 0}/{category.total || 0}
              </Text>
            </View>
            {/* Barre de progression de la catégorie */}
            <View style={styles.categoryProgressContainer}>
              <ProgressBar
                progress={category.progress || 0}
                showPercentage={false}
                fillColor={levelColor}
                backgroundColor={`${levelColor}10`}
                height={3}
                borderRadius={2}
                animated
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// PropTypes pour le composant principal ProgressCard
ProgressCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  progress: PropTypes.number,
  completed: PropTypes.number,
  total: PropTypes.number,
  levelColor: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    completed: PropTypes.number,
    total: PropTypes.number,
    progress: PropTypes.number,
  })),
  onCategoryPress: PropTypes.func,
  gamificationData: PropTypes.object, // 🎭 NOUVEAU : Données de gamification
};

// PropTypes pour CategoryList
CategoryList.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    completed: PropTypes.number,
    total: PropTypes.number,
    progress: PropTypes.number,
  })),
  handleCategoryPress: PropTypes.func,
  levelColor: PropTypes.string,
  styles: PropTypes.object.isRequired,
};

export default ProgressCard;