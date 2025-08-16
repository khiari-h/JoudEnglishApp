// src/components/exercise-common/CategorySelector/index.js
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';
import createStyles from "./style";

// Réfrence pour les mesures de layout du ScrollView
const itemLayouts = {};

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
  const scrollViewRef = useRef(null);
  
  // 🔥 Correction 1 : Gérer les animations de manière dynamique
  const animationsRef = useRef({});
  const [localAnimations, setLocalAnimations] = useState({});

  useEffect(() => {
    // Synchroniser les animations avec les catégories
    const newAnimations = {};
    let shouldUpdate = false;

    for (const category of categories) {
      if (!animationsRef.current[category.id]) {
        newAnimations[category.id] = new Animated.Value(0);
        shouldUpdate = true;
      } else {
        newAnimations[category.id] = animationsRef.current[category.id];
      }
    }
    
    // Animer la nouvelle sélection si elle est différente de la dernière connue
    if (selectedCategory && newAnimations[selectedCategory]) {
      newAnimations[selectedCategory].setValue(1);
    }

    animationsRef.current = newAnimations;
    setLocalAnimations(newAnimations);
  }, [categories, selectedCategory]);

  // Référence pour éviter les doubles animations
  const isAnimatingRef = useRef(false);
  const [prevSelectedCategory, setPrevSelectedCategory] = useState(selectedCategory);

  // 🚀 Nouveauté : Animation au toucher pour feedback immédiat
  const pressAnimationsRef = useRef({});

  const getPressAnimation = useCallback((categoryId) => {
    if (!pressAnimationsRef.current[categoryId]) {
      pressAnimationsRef.current[categoryId] = new Animated.Value(1);
    }
    return pressAnimationsRef.current[categoryId];
  }, []);

  const handlePressIn = useCallback((categoryId) => {
    Animated.timing(getPressAnimation(categoryId), {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [getPressAnimation]);

  const handlePressOut = useCallback((categoryId) => {
    Animated.timing(getPressAnimation(categoryId), {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [getPressAnimation]);

  // 🔥 Animation centralisée pour éviter la duplication
  const triggerAnimation = useCallback((fromCategory, toCategory) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const animationsArray = [];

    if (fromCategory !== undefined && animationsRef.current[fromCategory]) {
      animationsArray.push(
        Animated.timing(animationsRef.current[fromCategory], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        })
      );
    }

    if (toCategory !== undefined && animationsRef.current[toCategory]) {
      animationsArray.push(
        Animated.timing(animationsRef.current[toCategory], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        })
      );
    }

    if (animationsArray.length > 0) {
      Animated.parallel(animationsArray).start(() => {
        isAnimatingRef.current = false;
      });
    } else {
      isAnimatingRef.current = false;
    }
  }, []);

  // Suivre les changements de selectedCategory depuis le parent
  useEffect(() => {
    if (prevSelectedCategory !== selectedCategory) {
      triggerAnimation(prevSelectedCategory, selectedCategory);
      setPrevSelectedCategory(selectedCategory);
    }
  }, [selectedCategory, prevSelectedCategory, triggerAnimation]);

  // 🚀 Nouveauté : Scroll automatique vers la catégorie sélectionnée
  useEffect(() => {
    if (scrollViewRef.current && selectedCategory) {
      const layout = itemLayouts[selectedCategory];
      if (layout) {
        scrollViewRef.current.scrollTo({
          x: layout.x - (layout.width / 2),
          y: 0,
          animated: true,
        });
      }
    }
  }, [selectedCategory, localAnimations]);

  // Handler pour les clics utilisateur
  const handleCategoryPress = useCallback((categoryId) => {
    if (categoryId !== selectedCategory && !isAnimatingRef.current) {
      onSelectCategory(categoryId);
    }
  }, [selectedCategory, onSelectCategory]);

  const createPressHandler = useCallback((categoryId) => () => handleCategoryPress(categoryId), [handleCategoryPress]);

  // Rendu d'une pill de catégorie
  const renderCategoryPill = useCallback((category) => {
    const isSelected = selectedCategory === category.id;
    const animation = localAnimations[category.id] || new Animated.Value(0);
    const pressAnimation = getPressAnimation(category.id);

    // Interpolations pour les animations
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });

    const pressScale = pressAnimation.interpolate({
      inputRange: [0.95, 1],
      outputRange: [0.95, 1],
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
        onLayout={(event) => {
          itemLayouts[category.id] = event.nativeEvent.layout;
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
          onPress={createPressHandler(category.id)}
          onPressIn={() => handlePressIn(category.id)}
          onPressOut={() => handlePressOut(category.id)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={String(category.name)}
          accessibilityState={{ selected: isSelected }}
        >
          {isSelected ? (
            // État sélectionné - Gradient premium
            <LinearGradient
              colors={[primaryColor, `${primaryColor}E6`, `${primaryColor}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.selectedCategoryItem}
            >
              <View style={styles.selectedInner}>
                <Text style={styles.selectedCategoryText}>
                  {category.name}
                </Text>
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
  }, [
    selectedCategory,
    localAnimations,
    primaryColor,
    createPressHandler,
    handlePressIn,
    handlePressOut,
    getPressAnimation,
  ]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${primaryColor}04`, 'transparent', `${primaryColor}02`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.backgroundGradient}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
        >
          {categories.map(renderCategoryPill)}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

// ✅ PropTypes
CategorySelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectCategory: PropTypes.func.isRequired,
  primaryColor: PropTypes.string,
};

// 🔧 Correction 2 : Comparaison profonde pour les tableaux
export function areEqual(prevProps, nextProps) {
  const categoriesEqual = prevProps.categories === nextProps.categories ||
    (prevProps.categories.length === nextProps.categories.length &&
      prevProps.categories.every((cat, index) => cat.id === nextProps.categories[index].id));

  return (
    prevProps.selectedCategory === nextProps.selectedCategory &&
    prevProps.primaryColor === nextProps.primaryColor &&
    categoriesEqual
  );
}

export default memo(CategorySelector, areEqual);