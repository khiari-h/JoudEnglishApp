// src/components/screens/exercises/vocabulary/VocabularyProgress/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../../../../components/ui/ProgressBar";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/vocabulary/vocabularyStats";
import createStyles from "./style";

/**
 * 🎯 VocabularyProgress - Version Correcte
 * - PAS d'icône rouge avec flèche montante
 * - GARDER expansion pour voir les catégories
 * - SUPPRIMER les labels "Débutant/Intermédiaire/Avancé"
 * - Focus sur l'essentiel
 */
const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  const styles = createStyles(levelColor);
  const [expandAnim] = useState(new Animated.Value(expanded ? 1 : 0));

  // Calculs des statistiques
  const totalWordsCount = calculateTotalWords(vocabularyData?.exercises || []);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(vocabularyData?.exercises || [], completedWords);
  const categoryProgressData = calculateCategoryProgress(vocabularyData?.exercises || [], completedWords);

  // Animation d'expansion
  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(expandAnim, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    onToggleExpand();
  };

  // Hauteur animée pour les catégories
  const categoriesHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, categoryProgressData.length * 70 + 40],
  });

  // Rotation de la flèche
  const iconRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      {/* 🎯 CARD PRINCIPALE */}
      <LinearGradient
        colors={[`${levelColor}06`, `${levelColor}03`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* 📊 HEADER SANS ICÔNE ROUGE */}
        <TouchableOpacity 
          style={styles.header}
          onPress={toggleExpanded}
          activeOpacity={0.8}
        >
          <View style={styles.headerLeft}>
            {/* PAS d'icône rouge ici */}
            <Text style={styles.title}>Progression</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={[styles.statsCount, { color: levelColor }]}>
              {completedWordsCount}
            </Text>
            <Text style={styles.statsTotal}>/ {totalWordsCount} mots</Text>
            <Text style={[styles.statsPercentage, { color: levelColor }]}>
              {Math.round(totalProgress)}%
            </Text>
            {/* GARDER la flèche d'expansion */}
            <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
              <Ionicons name="chevron-down" size={16} color={levelColor} />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* 📊 BARRE DE PROGRESSION SIMPLE */}
        <View style={styles.progressSection}>
          <ProgressBar
            progress={totalProgress}
            showPercentage={false}
            fillColor={levelColor}
            height={6}
            backgroundColor={`${levelColor}15`}
            borderRadius={3}
            animated
            style={styles.progressBar}
          />
          {/* PAS de labels "Débutant/Intermédiaire/Avancé" */}
        </View>
      </LinearGradient>

      {/* 📋 DÉTAIL PAR CATÉGORIE - Expansion gardée */}
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
            <Text style={styles.categoriesTitle}>Par catégorie</Text>
            <View style={[styles.categoryDivider, { backgroundColor: `${levelColor}20` }]} />
          </View>
          
          {categoryProgressData.map((category, index) => (
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
                  {category.completedWords}/{category.totalWords}
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
    </View>
  );
};

export default VocabularyProgress;