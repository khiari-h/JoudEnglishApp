// VocabularyExercise/index.js
import React, { useState, useEffect, useMemo, useRef } from "react";
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

// Hook optimisé
import useVocabularyProgress from "./hooks/useVocabularyProgress";

/**
 * Exercice de vocabulaire - Version optimisée sans boucles infinies
 */
const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  
  // États UI locaux
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Flags de sécurité
  const hasRestoredPosition = useRef(false);
  const initialRender = useRef(true);
  
  // Données de vocabulaire
  const vocabularyData = useMemo(() => getVocabularyData(level), [level]);
  
  // Hook de progression
  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    calculateCategoryProgress,
    calculateTotalProgress,
    initializeProgress,
    resetProgress,
  } = useVocabularyProgress(level);
  
  // Initialisation et restauration - UNE SEULE FOIS
  useEffect(() => {
    if (!loaded || !vocabularyData) return;
    
    // Initialiser la progression
    initializeProgress(vocabularyData);
    
    // Restaurer la position UNE SEULE FOIS
    if (lastPosition && !hasRestoredPosition.current) {
      console.log("Restauration de la position:", lastPosition);
      setCategoryIndex(lastPosition.categoryIndex);
      setWordIndex(lastPosition.wordIndex);
      hasRestoredPosition.current = true;
    }
    
    // Marquer comme prêt après un court délai
    const timer = setTimeout(() => {
      setIsReady(true);
      initialRender.current = false;
    }, 100);
    
    return () => clearTimeout(timer);
  }, [loaded, vocabularyData, lastPosition, initializeProgress]);
  
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
        const nextWordIndex = wordIndex + 1;
        setWordIndex(nextWordIndex);
        
        // Sauvegarder manuellement la position
        saveLastPosition(categoryIndex, nextWordIndex);
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
          setCategoryIndex(nextCategoryIndex);
          setWordIndex(0);
          
          // Sauvegarder manuellement la position
          saveLastPosition(nextCategoryIndex, 0);
        }
      }
      
      // Masquer la traduction pour le mot suivant
      setShowTranslation(false);
    } catch (error) {
      console.error("Error in handleNext:", error);
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  
  // Gérer le bouton précédent
  const handlePrevious = () => {
    if (wordIndex > 0) {
      const prevWordIndex = wordIndex - 1;
      setWordIndex(prevWordIndex);
      setShowTranslation(false); // Masquer la traduction pour le mot précédent
      
      // Sauvegarder manuellement la position
      saveLastPosition(categoryIndex, prevWordIndex);
    }
  };
  
  // Gérer le changement de catégorie
  const handleCategoryChange = (newIndex) => {
    setCategoryIndex(newIndex);
    setWordIndex(0);
    setShowTranslation(false); // Masquer la traduction
    
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
            setCategoryIndex(0);
            setWordIndex(0);
            setShowTranslation(false);
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
  if (!loaded || !isReady) {
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
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
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