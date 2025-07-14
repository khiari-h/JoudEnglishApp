// src/components/ui/ProgressCard/index.js - VERSION ÉPURÉE SANS DOTS
import { View, Text, TouchableOpacity, LayoutAnimation, Platform } from "react-native";
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
  const toggleExpanded = () => {
    if (!expandable) return;
    configureLayoutAnimation();
    onToggleExpand?.();
  };

  return (
    <View style={styles.container}>
      {/* =================== CARD PRINCIPALE =================== */}
      <LinearGradient
        colors={[`${levelColor}06`, `${levelColor}03`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Header avec stats */}
        <TouchableOpacity 
          style={styles.header}
          onPress={toggleExpanded}
          activeOpacity={expandable ? 0.8 : 1}
        >
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>

          <View style={styles.headerRight}>
            <View style={styles.statsContainer}>
              <Text style={[styles.statsCount, { color: levelColor }]}>
                {completed}
              </Text>
              <Text style={styles.statsTotal}>/ {total}</Text>
            </View>
            <Text style={[styles.statsPercentage, { color: levelColor }]}>
              {Math.round(progress)}%
            </Text>
            
            {/* Flèche d'expansion */}
            {expandable && (
              <View style={[
                styles.chevronContainer,
                expanded && styles.chevronExpanded
              ]}>
                <Ionicons name="chevron-down" size={16} color={levelColor} />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Barre de progression principale */}
        <View style={styles.progressSection}>
          <ProgressBar
            progress={progress}
            showPercentage={false}
            fillColor={levelColor}
            height={6}
            backgroundColor={`${levelColor}15`}
            borderRadius={3}
            animated
          />
        </View>
      </LinearGradient>

      {/* =================== SECTION EXPANSION ÉPURÉE =================== */}
      {expandable && expanded && categoryData.length > 0 && (
        <View style={styles.expansionWrapper}>
          <View style={styles.expansionContainer}>
            {/* Header des catégories épuré */}
            <View style={styles.expansionHeader}>
              <Text style={styles.expansionTitle}>Par catégorie</Text>
              <Text style={styles.expansionSubtitle}>
                {categoryData.length} {categoryData.length > 1 ? 'catégories' : 'catégorie'}
              </Text>
            </View>
            
            {/* Liste des catégories - DESIGN ÉPURÉ SANS DOTS */}
            <View style={styles.categoriesList}>
              {categoryData.map((category, index) => (
                <TouchableOpacity
                  key={`category-${index}`}
                  style={styles.categoryItem}
                  onPress={() => onCategoryPress?.(index)}
                  activeOpacity={0.7}
                >
                  {/* Row principale avec titre et stats */}
                  <View style={styles.categoryRow}>
                    <View style={styles.categoryLeft}>
                      {/* 🚫 categoryDot SUPPRIMÉ - c'était ça les ronds ! */}
                      <Text style={styles.categoryTitle} numberOfLines={1}>
                        {category.title}
                      </Text>
                    </View>
                    <Text style={[styles.categoryStats, { color: levelColor }]}>
                      {category.completed}/{category.total}
                    </Text>
                  </View>
                  
                  {/* Barre de progression de la catégorie */}
                  <View style={styles.categoryProgressContainer}>
                    <ProgressBar
                      progress={category.progress}
                      showPercentage={false}
                      fillColor={levelColor}
                      backgroundColor={`${levelColor}10`}
                      height={3}
                      borderRadius={2}
                      animated
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProgressCard;