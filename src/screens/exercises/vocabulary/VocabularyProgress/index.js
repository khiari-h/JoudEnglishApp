// src/components/screens/exercises/vocabulary/VocabularyProgress/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Composant pour afficher la progression du vocabulaire
 * avec une barre globale et des barres par catégorie
 */
const VocabularyProgress = ({
  vocabularyData,
  completedWords,
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  // Calcul des statistiques globales
  const totalWordsCount = calculateTotalWords(vocabularyData?.exercises);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(vocabularyData?.exercises, completedWords);
  
  // Calcul des statistiques par catégorie
  const categoryProgressData = calculateCategoryProgress(vocabularyData?.exercises, completedWords);

  return (
    <View style={styles.container}>
      {/* Titre de la section */}
      <TouchableOpacity 
        style={styles.headerContainer}
        onPress={onToggleExpand}
      >
        <Text style={styles.headerTitle}>Progression du vocabulaire</Text>
        <Text style={styles.expandIcon}>{expanded ? "▼" : "▶"}</Text>
      </TouchableOpacity>

      {/* Barre de progression globale - toujours visible */}
      <View style={styles.globalProgressContainer}>
        <ProgressBar
          progress={totalProgress}
          showValue={true}
          total={totalWordsCount}
          valueFormatter={(value, total) => `${value}/${total} mots`}
          showPercentage={true}
          fillColor={levelColor}
          height={10}
          label="Progression globale"
          labelPosition="top"
          style={styles.progressBar}
        />
      </View>

      {/* Barres de progression par catégorie - visibles seulement si expanded=true */}
      {expanded && (
        <View style={styles.categoriesContainer}>
          {categoryProgressData.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryContainer}
              onPress={() => onCategoryPress && onCategoryPress(index)}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryCount}>
                  {category.completedWords}/{category.totalWords}
                </Text>
              </View>
              <ProgressBar
                progress={category.progress}
                showPercentage={false}
                fillColor={levelColor}
                height={6}
                animated={true}
                style={styles.categoryProgressBar}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Fonctions utilitaires pour calculer les statistiques
function calculateTotalWords(exercises) {
  return exercises?.reduce((total, category) => total + (category.words?.length || 0), 0) || 0;
}

function calculateCompletedWordsCount(completedWords) {
  return Object.values(completedWords).reduce(
    (total, categoryCompletions) => total + (categoryCompletions?.length || 0),
    0
  );
}

function calculateTotalProgress(exercises, completedWords) {
  const total = calculateTotalWords(exercises);
  const completed = calculateCompletedWordsCount(completedWords);
  return total > 0 ? (completed / total) * 100 : 0;
}

function calculateCategoryProgress(exercises, completedWords) {
  return exercises?.map((category, index) => {
    const totalInCategory = category.words?.length || 0;
    const completedInCategory = completedWords[index]?.length || 0;
    const progress = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0;
    
    return {
      title: category.title,
      totalWords: totalInCategory,
      completedWords: completedInCategory,
      progress: progress
    };
  }) || [];
}

export default VocabularyProgress;