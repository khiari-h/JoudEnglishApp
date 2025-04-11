// VocabularyExercise/index.js
import React, { useEffect, useMemo } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";

// Composants UI
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";

// Utilitaires
import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

// Hooks personnalisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";

/**
 * Exercice de vocabulaire - Version modulaire sans boucles infinies
 */
const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  
  // Données de vocabulaire
  const vocabularyData = useMemo(() => getVocabularyData(level), [level]);
  
  // Hook de progression
  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    calculateTotalProgress,
    initializeProgress,
    resetProgress,
  } = useVocabularyProgress(level);
  
  // Hook d'état de l'exercice
  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
    resetState
  } = useVocabularyExerciseState(level);
  
  // Initialisation et restauration
  useEffect(() => {
    if (!loaded || !vocabularyData) return;
    
    // Initialiser la progression
    initializeProgress(vocabularyData);
    
    // Restaurer la position (la fonction restoreState s'assure que cela ne se produit qu'une fois)
    if (lastPosition) {
      restoreState(lastPosition.categoryIndex, lastPosition.wordIndex);
    }
  }, [loaded, vocabularyData, lastPosition, initializeProgress, restoreState]);
  
  // Fonction pour calculer le nombre total de mots
  const calculateTotalWords = () => {
    let total = 0;
    vocabularyData?.exercises?.forEach(category => {
      total += category.words?.length || 0;
    });
    return total;
  };
  
  // Fonction pour calculer le nombre de mots complétés
  const calculateCompletedWordsCount = () => {
    let completed = 0;
    Object.keys(completedWords).forEach(categoryId => {
      completed += completedWords[categoryId]?.length || 0;
    });
    return completed;
  };
  
  // Obtenir le mot actuel
  const getCurrentWord = () => {
    try {
      if (
        vocabularyData?.exercises &&
        categoryIndex >= 0 &&
        categoryIndex < vocabularyData.exercises.length
      ) {
        const currentCategory = vocabularyData.exercises[categoryIndex];
        
        if (
          currentCategory?.words &&
          wordIndex >= 0 &&
          wordIndex < currentCategory.words.length
        ) {
          return currentCategory.words[wordIndex];
        }
      }
      
      return {
        term: "",
        translation: "",
        definition: "",
        example: "",
      };
    } catch (error) {
      console.error("Error getting current word:", error);
      return {
        term: "",
        translation: "",
        definition: "",
        example: "",
      };
    }
  };
  
  // Vérifier si c'est le dernier mot
  const isLastWordInExercise = () => {
    try {
      if (
        vocabularyData?.exercises &&
        categoryIndex >= 0 &&
        categoryIndex < vocabularyData.exercises.length
      ) {
        const currentCategory = vocabularyData.exercises[categoryIndex];
        return (
          currentCategory?.words &&
          wordIndex === currentCategory.words.length - 1
        );
      }
      return false;
    } catch (error) {
      console.error("Error checking if last word:", error);
      return false;
    }
  };
  
  // Trouver la prochaine catégorie non complétée
  const findNextUncompletedCategory = () => {
    const totalCategories = vocabularyData?.exercises?.length || 0;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = vocabularyData.exercises[nextIndex];
      const completedInCategory = completedWords[nextIndex]?.length || 0;

      if (completedInCategory < (category.words?.length || 0)) {
        return nextIndex;
      }
    }
    return -1; // Tout est complété
  };
  
  // Gérer le bouton suivant
  const handleNext = () => {
    try {
      if (!vocabularyData?.exercises || !vocabularyData.exercises[categoryIndex]) {
        return;
      }
      
      const currentCategory = vocabularyData.exercises[categoryIndex];

      // Marquer le mot comme complété
      markWordAsCompleted(categoryIndex, wordIndex);

      // Logique de progression dans les mots/catégories
      if (wordIndex < (currentCategory.words?.length || 0) - 1) {
        // Mot suivant dans la même catégorie
        goToNextWord();
        
        // Sauvegarder manuellement la position
        saveLastPosition(categoryIndex, wordIndex + 1);
      } else {
        // Fin de catégorie, trouver la prochaine
        const nextCategoryIndex = findNextUncompletedCategory();

        if (nextCategoryIndex === -1) {
          // Tous les exercices terminés
          Alert.alert(
            "Félicitations",
            "Vous avez terminé tous les exercices de vocabulaire !"
          );
          router.back();
        } else {
          // Passer à la prochaine catégorie
          changeCategory(nextCategoryIndex);
          
          // Sauvegarder manuellement la position
          saveLastPosition(nextCategoryIndex, 0);
        }
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  
  // Gérer le bouton précédent
  const handlePrevious = () => {
    if (goToPreviousWord()) {
      // Sauvegarder manuellement la position
      saveLastPosition(categoryIndex, wordIndex - 1);
    }
  };
  
  // Gérer le changement de catégorie
  const handleCategoryChange = (newIndex) => {
    changeCategory(newIndex);
    
    // Sauvegarder manuellement la position
    saveLastPosition(newIndex, 0);
  };
  
  // Réinitialiser la progression
  const handleResetProgress = () => {
    Alert.alert(
      "Réinitialiser la progression",
      "Êtes-vous sûr de vouloir réinitialiser votre progression pour ce niveau ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => {
            resetProgress();
            resetState();
          }
        }
      ]
    );
  };
  
  // Obtenir le mot actuel
  const currentWord = getCurrentWord();
  
  // Obtenir la couleur du niveau
  const levelColor = LANGUAGE_LEVELS[level]?.color || "#5E60CE";
  
  // Attendre que les données soient chargées
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }
  
  // Calculer les statistiques
  const totalProgress = calculateTotalProgress(vocabularyData?.exercises || []);
  const completedWordsCount = calculateCompletedWordsCount();
  const totalWordsCount = calculateTotalWords();
  
  // Rendu principal
  return (
    <View>
      <VocabularyHeader
        level={level}
        progress={totalProgress}
        completedWords={completedWordsCount}
        totalWords={totalWordsCount}
        levelColor={levelColor}
        onBackPress={() => router.back()}
      />

      <VocabularyCategorySelector
        categories={vocabularyData?.exercises?.map((cat) => cat.title) || []}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <VocabularyWordCard
        word={currentWord.term || ""}
        translation={currentWord.translation || ""}
        definition={currentWord.definition || ""}
        example={currentWord.example || ""}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
        levelColor={levelColor}
      />

      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={wordIndex > 0}
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </View>
  );
};

export default VocabularyExercise;