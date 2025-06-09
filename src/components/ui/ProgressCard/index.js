// src/components/ui/ProgressCard/index.js - VERSION SANS TREMBLEMENT
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../ProgressBar";
import createStyles from "./style";

/**
 * 📊 ProgressCard - Version Sans Tremblement
 * Fix du bug d'animation : LayoutAnimation au lieu d'Animated.View conflictuel
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
      // Android - animation plus simple
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  // Toggle expansion avec LayoutAnimation smooth
  const toggleExpanded = () => {
    if (!expandable) return;
    
    // Déclencher l'animation layout AVANT le changement d'état
    configureLayoutAnimation();
    onToggleExpand?.();
  };

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
            {/* Flèche d'expansion - rotation simple */}
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

      {/* Section expansion - Affichage conditionnel SIMPLE */}
      {expandable && expanded && categoryData.length > 0 && (
        <View style={styles.categoriesWrapper}>
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
        </View>
      )}
    </View>
  );
};

export default ProgressCard;