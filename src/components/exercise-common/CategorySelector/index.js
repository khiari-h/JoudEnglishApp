// src/components/exercise-common/CategorySelector/index.js
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Text, Animated } from "react-native";
import PropTypes from 'prop-types';
import createStyles from "./style";

const CategorySelector = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  primaryColor = "#3B82F6", // Couleur épurée par défaut
}) => {
  const styles = createStyles(primaryColor);
  const scrollViewRef = useRef(null);
  
  const animationsRef = useRef({});
  const pressAnimationsRef = useRef({});
  const itemLayoutsRef = useRef({});
  
  // ✅ Correction 1: Utilisation d'une ref pour gérer l'état d'animation de manière fiable.
  // C'est le "garde-fou" qui va bloquer les clics rapides.
  const isAnimatingRef = useRef(false);

  const prevSelectedCategoryRef = useRef(selectedCategory);

  useEffect(() => {
    const newAnimations = {};
    const newPressAnimations = {};
    const newItemLayouts = {};

    categories.forEach(category => {
      newAnimations[category.id] = animationsRef.current[category.id] || new Animated.Value(
        selectedCategory === category.id ? 1 : 0
      );
      newPressAnimations[category.id] = pressAnimationsRef.current[category.id] || new Animated.Value(1);
      newItemLayouts[category.id] = itemLayoutsRef.current[category.id] || null;
    });

    animationsRef.current = newAnimations;
    pressAnimationsRef.current = newPressAnimations;
    itemLayoutsRef.current = newItemLayouts;

  }, [categories, selectedCategory]);

  const handlePressIn = useCallback((categoryId) => {
    const pressAnimation = pressAnimationsRef.current[categoryId];
    if (pressAnimation) {
      Animated.timing(pressAnimation, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const handlePressOut = useCallback((categoryId) => {
    const pressAnimation = pressAnimationsRef.current[categoryId];
    if (pressAnimation) {
      Animated.timing(pressAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    const fromCategory = prevSelectedCategoryRef.current;
    const toCategory = selectedCategory;

    if (fromCategory === toCategory) {
      return;
    }
    
    // ✅ Correction 2: Le garde-fou est activé au début de l'animation.
    isAnimatingRef.current = true;
    const animationsArray = [];
    const fromAnim = animationsRef.current[fromCategory];
    const toAnim = animationsRef.current[toCategory];

    if (fromAnim) {
      animationsArray.push(
        Animated.timing(fromAnim, { toValue: 0, duration: 200, useNativeDriver: false })
      );
    }

    if (toAnim) {
      animationsArray.push(
        Animated.timing(toAnim, { toValue: 1, duration: 300, useNativeDriver: false })
      );
    }

    if (animationsArray.length > 0) {
      Animated.parallel(animationsArray).start(() => {
        // ✅ Correction 3: La ref est réinitialisée seulement à la fin de l'animation.
        isAnimatingRef.current = false;
      });
    } else {
      isAnimatingRef.current = false;
    }
  }, [selectedCategory]);

  useEffect(() => {
    triggerAnimation();
    prevSelectedCategoryRef.current = selectedCategory;
  }, [selectedCategory, triggerAnimation]);

  useEffect(() => {
    if (scrollViewRef.current && selectedCategory && itemLayoutsRef.current[selectedCategory]) {
      const layout = itemLayoutsRef.current[selectedCategory];
      scrollViewRef.current.scrollTo({
        x: Math.max(0, layout.x - layout.width / 2),
        y: 0,
        animated: true,
      });
    }
  }, [selectedCategory]);

  const handleCategoryPress = useCallback((categoryId) => {
    // ✅ Correction 4: Le contrôle de l'animation en cours se fait ici, de manière préventive.
    if (categoryId !== selectedCategory && !isAnimatingRef.current) {
      onSelectCategory?.(categoryId);
    }
  }, [selectedCategory, onSelectCategory]);

  const renderCategoryPill = useCallback((category) => {
    const isSelected = selectedCategory === category.id;
    const animation = animationsRef.current[category.id];
    const pressAnimation = pressAnimationsRef.current[category.id];

    const scale = animation?.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
      extrapolate: 'clamp',
    }) || 1;

    const pressScale = pressAnimation?.interpolate({
      inputRange: [0.95, 1],
      outputRange: [0.95, 1],
      extrapolate: 'clamp',
    }) || 1;

    const shadowOpacity = animation?.interpolate({
      inputRange: [0, 1],
      outputRange: [0.05, 0.15], // Ombres plus subtiles
      extrapolate: 'clamp',
    }) || 0.05;

    const borderWidth = animation?.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1], // Bordure constante
      extrapolate: 'clamp',
    }) || 1;

    return (
      <Animated.View
        key={category.id}
        onLayout={(event) => {
          itemLayoutsRef.current[category.id] = event.nativeEvent.layout;
        }}
        style={[
          styles.categoryItemWrapper,
          {
            transform: [{ scale: Animated.multiply(scale, pressScale) }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.categoryTouchable}
          onPress={() => handleCategoryPress(category.id)}
          onPressIn={() => handlePressIn(category.id)}
          onPressOut={() => handlePressOut(category.id)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={String(category.name)}
          accessibilityState={{ selected: isSelected }}
        >
          {isSelected ? (
            // ✅ SUPPRIMÉ: LinearGradient remplacé par View simple
            <View style={styles.selectedCategoryItem}>
              <View style={styles.selectedInner}>
                <Text style={styles.selectedCategoryText}>
                  {category.name}
                </Text>
              </View>
            </View>
          ) : (
            <Animated.View
              style={[
                styles.categoryItem,
                {
                  borderWidth,
                  borderColor: '#E2E8F0', // Couleur fixe au lieu de dynamique
                  shadowOpacity,
                }
              ]}
            >
              <View style={styles.categoryInner}>
                <Text style={styles.categoryText}>
                  {category.name}
                </Text>
              </View>
            </Animated.View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }, [
    selectedCategory,
    primaryColor,
    styles,
    handleCategoryPress,
    handlePressIn,
    handlePressOut,
  ]);

  return (
    <View style={styles.container}>
      {/* ✅ SUPPRIMÉ: LinearGradient de fond remplacé par View simple */}
      <View style={styles.backgroundGradient}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
        >
          {categories.map(renderCategoryPill)}
        </ScrollView>
      </View>
    </View>
  );
};

CategorySelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectCategory: PropTypes.func,
  primaryColor: PropTypes.string,
};

export function areEqual(prevProps, nextProps) {
  if (
    prevProps.selectedCategory !== nextProps.selectedCategory ||
    prevProps.primaryColor !== nextProps.primaryColor ||
    prevProps.categories.length !== nextProps.categories.length
  ) {
    return false;
  }

  if (prevProps.categories === nextProps.categories) {
    return true;
  }

  return prevProps.categories.every((cat, index) => {
    const nextCat = nextProps.categories[index];
    return nextCat && cat.id === nextCat.id && cat.name === nextCat.name;
  });
}

export default memo(CategorySelector, areEqual);