// src/components/screens/exercises/vocabulary/VocabularyProgress/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
  calculateCategoryProgress,  // ✅ AJOUTÉ
} from "../../../../utils/vocabulary/vocabularyStats";
import styles from "./style";

/**
 * Composant pour afficher la progression du vocabulaire
 * Version finale : utilise uniquement les fonctions de vocabularyStats.js
 * Avec progression globale + détail par catégorie
 */
const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  // ✅ TOUTES LES FONCTIONS VIENNENT DE vocabularyStats.js
  const totalWordsCount = calculateTotalWords(vocabularyData?.exercises || []);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(vocabularyData?.exercises || [], completedWords);
  const categoryProgressData = calculateCategoryProgress(vocabularyData?.exercises || [], completedWords);

  return (
    <View style={styles.container}>
      {/* Header avec toggle pour expansion */}
      <TouchableOpacity 
        style={styles.headerContainer}
        onPress={onToggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.headerTitle}>Progression Vocabulaire</Text>
        <View style={styles.headerRight}>
          <Text style={styles.globalCount}>
            {completedWordsCount}/{totalWordsCount} mots
          </Text>
          <Text style={styles.expandIcon}>{expanded ? "▼" : "▶"}</Text>
        </View>
      </TouchableOpacity>

      {/* Barre de progression globale - toujours visible */}
      <View style={styles.globalProgressContainer}>
        <ProgressBar
          progress={totalProgress}
          showValue={false}  // On affiche déjà dans le header
          showPercentage
          fillColor={levelColor}
          height={10}
          backgroundColor="#e2e8f0"
          borderRadius={5}
          animated
          labelPosition="none"
          percentageFormatter={(percentage) => `${Math.round(percentage)}% complété`}
          style={styles.progressBar}
        />
      </View>

      {/* Détail par catégorie - visible si expanded */}
      {expanded && (
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Détail par catégorie :</Text>
          {categoryProgressData.map((category, index) => (
            <TouchableOpacity
              key={`category-${index}`}
              style={styles.categoryContainer}
              onPress={() => onCategoryPress && onCategoryPress(index)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle} numberOfLines={1}>
                  {category.title}
                </Text>
                <Text style={styles.categoryCount}>
                  {category.completedWords}/{category.totalWords}
                </Text>
              </View>
              <ProgressBar
                progress={category.progress}
                showPercentage
                showValue={false}
                fillColor={levelColor}
                backgroundColor="#f1f5f9"
                height={6}
                borderRadius={3}
                animated
                labelPosition="none"
                percentageFormatter={(percentage) => `${Math.round(percentage)}%`}
                style={styles.categoryProgressBar}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default VocabularyProgress;