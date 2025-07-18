// src/components/ui/ProgressCard/index.js - VERSION ÉPURÉE SANS DOTS
import { View, Text, TouchableOpacity, LayoutAnimation, Platform } from "react-native";
import { useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../ProgressBar";
import createStyles from "./style";

/**
 * 📊 ProgressCard - Version Épurée Sans Dots
 * ✨ Design clean et moderne
 * 🚫 Suppression des categoryDot qui polluent l'interface
 * 🎯 Focus sur l'information, pas la décoration
 * 
 * @param {string} title - Titre principal
 * @param {string} subtitle - Sous-titre
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} completed - Nombre d'items complétés
 * @param {number} total - Nombre total d'items
 * @param {string} unit - Unité (ex: "mots", "phrases", "règles")
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expandable - Peut être étendu pour voir détails
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {array} categoryData - Données des catégories pour l'expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
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
}) => {
  const styles = createStyles(levelColor);

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
  }, [expandable, configureLayoutAnimation, onToggleExpand]);

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
        height={6}
        backgroundColor={`${mainLevelColor}15`}
        borderRadius={3}
        animated
      />
    </View>
  );

  // Sous-composant Expansion
  const Expansion = ({ expandable: localExpandable, expanded: localExpanded, categoryData: localCategoryData, handleCategoryPress: localHandleCategoryPress, levelColor: localLevelColor, localStyles }) => (
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
        colors={[`${levelColor}06`, `${levelColor}03`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <CardHeader
          headerTitle={title}
          headerSubtitle={subtitle}
          headerCompleted={completed}
          headerTotal={total}
          headerProgress={progress}
          headerLevelColor={levelColor}
          headerExpandable={expandable}
          headerExpanded={expanded}
          headerToggleExpanded={toggleExpanded}
          headerStyles={styles}
        />
        <MainProgressBar mainProgress={progress} mainLevelColor={levelColor} mainStyles={styles} />
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

export default ProgressCard;