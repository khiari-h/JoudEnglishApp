// src/components/ui/ProgressCard/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../ProgressBar";
import createStyles from "./style";

/**
 * 📊 ProgressCard - Composant générique pour progression avec expansion
 * Usage : Vocabulary, Phrases, Grammar, Reading, etc.
 * 
 * @param {string} title - Titre principal (ex: "Progression", "Phrases Progress")
 * @param {string} subtitle - Sous-titre (ex: "Phrase 1 of 20")
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
  title = "Progress",
  subtitle,
  progress = 0,
  completed = 0,
  total = 0,
  unit = "items",
  levelColor = "#5E60CE",
  expandable = false,
  expanded = false,
  onToggleExpand,
  categoryData = [],
  onCategoryPress,
}) => {
  const styles = createStyles(levelColor);
  const [expandAnim] = useState(new Animated.Value(expanded ? 1 : 0));

  // Animation d'expansion
  const toggleExpanded = () => {
    if (!expandable) return;
    
    const toValue = expanded ? 0 : 1;
    Animated.spring(expandAnim, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    onToggleExpand?.();
  };

  // Hauteur animée pour les catégories
  const categoriesHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, categoryData.length * 70 + 40],
  });

  // Rotation de la flèche
  const iconRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      {/* Card principale avec gradient */}
      <LinearGradient
        colors={[`${levelColor}06`, `${levelColor}03`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Header */}
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
            <Text style={[styles.statsCount, { color: levelColor }]}>
              {completed}
            </Text>
            <Text style={styles.statsTotal}>/ {total} {unit}</Text>
            <Text style={[styles.statsPercentage, { color: levelColor }]}>
              {Math.round(progress)}%
            </Text>
            {/* Flèche d'expansion */}
            {expandable && (
              <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
                <Ionicons name="chevron-down" size={16} color={levelColor} />
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>

        {/* Barre de progression */}
        <View style={styles.progressSection}>
          <ProgressBar
            progress={progress}
            showPercentage={false}
            fillColor={levelColor}
            height={6}
            backgroundColor={`${levelColor}15`}
            borderRadius={3}
            animated
            style={styles.progressBar}
          />
        </View>
      </LinearGradient>

      {/* Section expansion pour catégories */}
      {expandable && categoryData.length > 0 && (
        <Animated.View 
          style={[
            styles.categoriesWrapper,
            { 
              height: categoriesHeight,
              opacity: expandAnim,
            }
          ]}
        >
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <View style={[styles.categoryDivider, { backgroundColor: `${levelColor}20` }]} />
              <Text style={styles.categoriesTitle}>By category</Text>
              <View style={[styles.categoryDivider, { backgroundColor: `${levelColor}20` }]} />
            </View>
            
            {categoryData.map((category, index) => (
              <TouchableOpacity
                key={`category-${index}`}
                style={styles.categoryItem}
                onPress={() => onCategoryPress?.(index)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryRow}>
                  <View style={styles.categoryLeft}>
                    <View style={[styles.categoryDot, { backgroundColor: levelColor }]} />
                    <Text style={styles.categoryTitle} numberOfLines={1}>
                      {category.title}
                    </Text>
                  </View>
                  <Text style={[styles.categoryStats, { color: levelColor }]}>
                    {category.completed}/{category.total}
                  </Text>
                </View>
                
                <ProgressBar
                  progress={category.progress}
                  showPercentage={false}
                  fillColor={levelColor}
                  backgroundColor={`${levelColor}10`}
                  height={4}
                  borderRadius={2}
                  animated
                  style={styles.categoryProgress}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ProgressCard;