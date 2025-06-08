// src/components/exercise-common/CategorySelector/index.js
import React, { useState, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🏆 CategorySelector - Design Niveau LDC (Paris Saint-Germain)
 * - Pills modernes avec glassmorphism
 * - Animations fluides de sélection
 * - Gradients dynamiques
 * - Micro-interactions premium
 * - Typography élégante
 */
const CategorySelector = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  primaryColor = "#5E60CE",
}) => {
  const styles = createStyles(primaryColor);
  const [animations] = useState(() => 
    categories.reduce((acc, category) => {
      acc[category.id] = new Animated.Value(selectedCategory === category.id ? 1 : 0);
      return acc;
    }, {})
  );

  // Animation de sélection
  const animateSelection = (categoryId) => {
    // Animer la désélection de l'ancienne catégorie
    if (selectedCategory !== undefined && animations[selectedCategory]) {
      Animated.timing(animations[selectedCategory], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    // Animer la sélection de la nouvelle catégorie
    if (animations[categoryId]) {
      Animated.timing(animations[categoryId], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    onSelectCategory(categoryId);
  };

  // Rendu d'une pill de catégorie
  const renderCategoryPill = (category, index) => {
    const isSelected = selectedCategory === category.id;
    const animation = animations[category.id] || new Animated.Value(0);

    // Interpolations pour les animations
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });

    const shadowOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.25],
    });

    const borderWidth = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
    });

    return (
      <Animated.View
        key={category.id}
        style={[
          styles.categoryItemWrapper,
          {
            transform: [{ scale }],
          }
        ]}
      >
        <TouchableOpacity
          style={styles.categoryTouchable}
          onPress={() => animateSelection(category.id)}
          activeOpacity={0.8}
        >
          {isSelected ? (
            // État sélectionné - Gradient premium
            <LinearGradient
              colors={[primaryColor, `${primaryColor}E6`, `${primaryColor}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.selectedCategoryItem}
            >
              {/* Effet glassmorphism sur la pill sélectionnée */}
              <View style={styles.selectedInner}>
                <Text style={styles.selectedCategoryText}>
                  {category.name}
                </Text>
                {/* Effet sparkle pour la sélection */}
                <View style={styles.sparkleContainer}>
                  <Text style={styles.sparkle}>✨</Text>
                </View>
              </View>
            </LinearGradient>
          ) : (
            // État non sélectionné - Glassmorphism subtil
            <Animated.View
              style={[
                styles.categoryItem,
                {
                  borderWidth,
                  borderColor: `${primaryColor}20`,
                  shadowOpacity,
                }
              ]}
            >
              <View style={[styles.categoryInner, { backgroundColor: `${primaryColor}08` }]}>
                <Text style={[styles.categoryText, { color: primaryColor }]}>
                  {category.name}
                </Text>
              </View>
            </Animated.View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🎨 Gradient de fond subtil */}
      <LinearGradient
        colors={[`${primaryColor}04`, 'transparent', `${primaryColor}02`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.backgroundGradient}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
        >
          {categories.map((category, index) => renderCategoryPill(category, index))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default CategorySelector;