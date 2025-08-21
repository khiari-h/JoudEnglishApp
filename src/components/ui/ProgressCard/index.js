// src/components/ui/ProgressCard/index.js - VERSION RÉORGANISÉE
import { View, Text, TouchableOpacity, LayoutAnimation, Platform } from "react-native";
import { useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import ProgressBar from "../ProgressBar";
import createStyles from "./style";

/**
 * 📊 ProgressCard - Version Réorganisée selon le Design
 * ✨ Header avec icônes et titre
 * 🎯 Section principale avec message motivant et score
 * 📈 Barre de progression en dessous
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
  gamificationData = null,
  showBackButton = false,
  onBackPress,
  levelBadge = null,
  showFlashcardIcon = true,
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

  // Sous-composant Header avec icônes et titre
  const CardHeader = ({ headerShowBackButton, headerOnBackPress, headerStyles }) => (
    <View style={headerStyles.header}>
      <View style={headerStyles.headerLeft}>
        {headerShowBackButton && (
          <TouchableOpacity 
            style={headerStyles.backButton} 
            onPress={headerOnBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={headerStyles.title.color} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Sous-composant Section principale avec message et score
  const MainContent = ({ mainTitle, mainCompleted, mainLevelColor, mainStyles }) => (
    <View style={mainStyles.mainContent}>
      <View style={mainStyles.mainContentLeft}>
        <Text style={mainStyles.mainTitle}>{mainTitle || 'Excellent début !'}</Text>
      </View>
      
      <View style={mainStyles.mainContentRight}>
        <View style={mainStyles.scoreContainer}>
          <Text style={mainStyles.scoreIcon}>🚀</Text>
          <Text style={mainStyles.scoreText}>{mainCompleted || 0}</Text>
        </View>
        
        {expandable && (
          <TouchableOpacity 
            style={mainStyles.expandButton}
            onPress={toggleExpanded}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-down" size={16} color={mainLevelColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Sous-composant Barre de progression avec pourcentage
  const MainProgressBar = ({ mainProgress, mainLevelColor, mainStyles }) => (
    <View style={mainStyles.progressSection}>
      <View style={mainStyles.progressHeader}>
        <Text style={mainStyles.percentageText}>
          {Math.round(mainProgress || 0)}%
        </Text>
      </View>
      
      {/* Version simplifiée pour tester */}
      <View style={mainStyles.simpleProgressBar}>
        <View style={[mainStyles.simpleProgressFill, { 
          width: `${Math.max(mainProgress || 0, 0)}%`,
        }]} />
      </View>
    </View>
  );

  // Sous-composant Expansion
  const Expansion = ({ expandable: localExpandable, expanded: localExpanded, categoryData: localCategoryData, handleCategoryPress: localHandleCategoryPress, levelColor: localLevelColor, styles: localStyles, totalWords }) => (
    localExpandable && localExpanded && localCategoryData.length > 0 && (
      <View style={localStyles.expansionWrapper}>
        <View style={localStyles.expansionContainer}>
          <View style={localStyles.expansionHeader}>
            <Text style={localStyles.expansionTitle}>Par catégorie</Text>
            <Text style={localStyles.expansionSubtitle}>
              Total du module : {totalWords} mots
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
          headerShowBackButton={showBackButton}
          headerOnBackPress={onBackPress}
          headerStyles={styles}
        />
        
        <MainContent
          mainTitle={gamification.messages.main} // Message motivant rouge
          mainCompleted={completed}
          mainLevelColor={gamification.colors.primary}
          mainStyles={styles}
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
        totalWords={total}
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
  showBackButton: PropTypes.bool,
  onBackPress: PropTypes.func,
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