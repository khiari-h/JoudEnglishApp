// src/screens/exercises/phrases/hooks/usePhrases.js - VERSION CORRIGÉE

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Phrases Exercise
 * Remplace usePhrasesExerciseState + usePhrasesProgress + usePhrasesDisplay
 * Simple, efficace, maintenable - pattern identique à useReading, useGrammar et useVocabulary
 */
const usePhrases = (phrasesData, level) => {
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Phrases storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEY ===================
  const STORAGE_KEY = `phrases_${level}`;

  // =================== STATE ===================
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const categories = phrasesData?.categories || [];
  // ✅ CORRIGÉ : Les phrases sont dans phrasesData.phrases, pas dans les catégories
  const allPhrases = phrasesData?.phrases || [];
  const currentCategory = categories[categoryIndex];
  
  // ✅ CORRIGÉ : Filtrer les phrases par catégorie actuelle
  const currentPhrases = allPhrases.filter(phrase => phrase.categoryId === currentCategory?.id) || [];
  const currentPhrase = currentPhrases[phraseIndex];
  const totalPhrasesInCategory = currentPhrases.length;
  
  // ✅ CORRIGÉ : hasValidData vérifie que nous avons des données et des catégories avec des phrases
  const hasValidData = phrasesData && categories.length > 0 && allPhrases.length > 0;

  // ✅ AJOUTÉ : Debug pour comprendre pourquoi hasValidData est false
  console.log('🔍 DEBUG usePhrases:', {
    categoryIndex,
    phraseIndex,
    categoriesLength: categories.length,
    currentCategory: !!currentCategory,
    currentCategoryName: currentCategory?.name,
    currentPhrasesLength: currentPhrases.length,
    allPhrasesLength: allPhrases.length,
    hasValidData,
    phrasesData: !!phrasesData,
    // ✅ AJOUTÉ : Vérifier la structure des données
    categoriesWithPhrases: categories.filter(cat => 
      allPhrases.some(phrase => phrase.categoryId === cat.id)
    ).length
  });

  // =================== DATA LOADING ===================
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const { completedPhrases: savedCompleted } = JSON.parse(savedData);
          setCompletedPhrases(savedCompleted || {});
          // ✅ SUPPRIMÉ : Initialisation des indices ici car phrasesData n'est pas encore disponible
        }
      } catch (error) {
        // ✅ Gestion d'erreur appropriée
        handleStorageError(error, 'loadData');
        // Fallback: utiliser les valeurs par défaut
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]); // ✅ CORRIGÉ : Supprimé phrasesData des dépendances

  // ✅ AJOUTÉ : Reset quand niveau change
  useEffect(() => {
    console.log(`🔄 DEBUG usePhrases - Level changed to: ${level}`);
    console.log(`   - Resetting completedPhrases and positions for new level`);
    
    // Reset de l'état au changement de niveau
    setCompletedPhrases({});
    setCategoryIndex(0);
    setPhraseIndex(0);
    setLoaded(false);
    isInitialized.current = false;
  }, [level]);

  // ✅ AJOUTÉ : Initialisation des indices quand phrasesData est disponible
  useEffect(() => {
    if (loaded && phrasesData && categories.length > 0 && !isInitialized.current) {
      // Initialiser les indices avec des valeurs valides
      const validCategoryIndex = 0; // Commencer par la première catégorie
      const validPhraseIndex = 0;   // Commencer par la première phrase
      
      setCategoryIndex(validCategoryIndex);
      setPhraseIndex(validPhraseIndex);
      
      // ✅ CORRIGÉ : Initialiser les phrases complétées avec un objet vide
      const newCompletedPhrases = {};
      categories.forEach((_, index) => {
        newCompletedPhrases[index] = [];
      });
      setCompletedPhrases(newCompletedPhrases);
      
      isInitialized.current = true;
    }
  }, [loaded, phrasesData, categories.length]); // ✅ CORRIGÉ : Dépendances simplifiées

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedPhrases,
        lastPosition: {
          categoryIndex,
          phraseIndex
        }
      };
      
      // ✅ AJOUTÉ : Log de debug pour voir ce qui est sauvegardé
      console.log(`🔍 PHRASES - Sauvegarde:`, {
        storageKey: STORAGE_KEY,
        completedPhrases,
        lastPosition: dataToSave.lastPosition,
        totalCompleted: Object.values(completedPhrases).reduce((sum, arr) => sum + (arr?.length || 0), 0)
      });
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveData');
      // Fallback: continuer sans sauvegarde
    }
  }, [completedPhrases, categoryIndex, phraseIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded && isInitialized.current) saveData();
  }, [loaded, isInitialized.current]); // ✅ CORRIGÉ : Ajouté isInitialized.current

  // =================== NAVIGATION ACTIONS ===================
  const changeCategory = useCallback((newCategoryIndex) => {
    if (newCategoryIndex !== categoryIndex && newCategoryIndex >= 0 && newCategoryIndex < categories.length && isInitialized.current) {
      setCategoryIndex(newCategoryIndex);
      setPhraseIndex(0);
      setShowTranslation(false);
      
      // ✅ AJOUTÉ : Sauvegarder la position après changement de catégorie
      const dataToSave = {
        completedPhrases,
        lastPosition: {
          categoryIndex: newCategoryIndex,
          phraseIndex: 0
        }
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => handleStorageError(error, 'changeCategory save'));
    }
  }, [categoryIndex, categories.length, isInitialized.current, completedPhrases, STORAGE_KEY]);

  const goToNextPhrase = useCallback(() => {
    if (phraseIndex < totalPhrasesInCategory - 1 && isInitialized.current) {
      const newPhraseIndex = phraseIndex + 1;
      setPhraseIndex(newPhraseIndex);
      setShowTranslation(false);
      
      // ✅ AJOUTÉ : Sauvegarder la position après navigation
      const dataToSave = {
        completedPhrases,
        lastPosition: {
          categoryIndex,
          phraseIndex: newPhraseIndex
        }
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => handleStorageError(error, 'goToNextPhrase save'));
    }
  }, [phraseIndex, totalPhrasesInCategory, isInitialized.current, completedPhrases, categoryIndex, STORAGE_KEY]);

  const goToPreviousPhrase = useCallback(() => {
    if (phraseIndex > 0 && isInitialized.current) {
      const newPhraseIndex = phraseIndex - 1;
      setPhraseIndex(newPhraseIndex);
      setShowTranslation(false);
      
      // ✅ AJOUTÉ : Sauvegarder la position après navigation
      const dataToSave = {
        completedPhrases,
        lastPosition: {
          categoryIndex,
          phraseIndex: newPhraseIndex
        }
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => handleStorageError(error, 'goToPreviousPhrase save'));
      
      return true;
    }
    return false;
  }, [phraseIndex, isInitialized.current, completedPhrases, categoryIndex, STORAGE_KEY]);

  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPLETION LOGIC ===================
  const markPhraseAsCompleted = useCallback((catIndex, pIndex) => {
    if (!isInitialized.current) return; // ✅ AJOUTÉ : Protection contre l'accès avant initialisation
    
    setCompletedPhrases(prev => {
      const categoryCompleted = prev[catIndex] || [];
      if (!categoryCompleted.includes(pIndex)) {
        const newCompletedPhrases = {
          ...prev,
          [catIndex]: [...categoryCompleted, pIndex]
        };
        
        // ✅ AJOUTÉ : Sauvegarder immédiatement la progression
        const dataToSave = {
          completedPhrases: newCompletedPhrases,
          lastPosition: {
            categoryIndex: catIndex,
            phraseIndex: pIndex
          }
        };
        
        // ✅ AJOUTÉ : Log de debug pour voir la phrase marquée comme complétée
        console.log(`🔍 PHRASES - Phrase marquée comme complétée:`, {
          categoryIndex: catIndex,
          phraseIndex: pIndex,
          totalCompleted: Object.values(newCompletedPhrases).reduce((sum, arr) => sum + (arr?.length || 0), 0)
        });
        
        // Sauvegarder en arrière-plan (non-bloquant)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
          .catch(error => handleStorageError(error, 'markPhraseAsCompleted save'));
        
        return newCompletedPhrases;
      }
      return prev;
    });
  }, [isInitialized.current, STORAGE_KEY]);

  // Find next uncompleted category
  const findNextUncompletedCategory = useCallback(() => {
    const numCategories = categories.length;
    for (let i = 1; i <= numCategories; i++) {
      const nextIndex = (categoryIndex + i) % numCategories;
      const category = categories[nextIndex];
      // ✅ CORRIGÉ : Utiliser allPhrases au lieu de currentPhrases
      const categoryPhrases = allPhrases.filter(p => p.categoryId === category.id);
      const completedInCategory = completedPhrases[nextIndex]?.length || 0;
      
      if (completedInCategory < categoryPhrases.length) {
        return nextIndex;
      }
    }
    return -1;
  }, [categories, categoryIndex, allPhrases, completedPhrases]);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    if (!isInitialized.current) return { completed: false }; // ✅ AJOUTÉ : Protection contre l'accès avant initialisation
    
    // Mark current phrase as completed
    markPhraseAsCompleted(categoryIndex, phraseIndex);

    // Check if there are more phrases in current category
    if (phraseIndex < totalPhrasesInCategory - 1) {
      goToNextPhrase();
    } else {
      // End of category - find next uncompleted category
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        // All done!
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de phrases !"
        );
        return { completed: true };
      } else {
        changeCategory(nextCategoryIndex);
      }
    }
    return { completed: false };
  }, [categoryIndex, phraseIndex, totalPhrasesInCategory, markPhraseAsCompleted, goToNextPhrase, findNextUncompletedCategory, changeCategory, isInitialized.current]);

  const handlePrevious = useCallback(() => {
    if (!isInitialized.current) return; // ✅ AJOUTÉ : Protection contre l'accès avant initialisation
    goToPreviousPhrase();
  }, [goToPreviousPhrase, isInitialized.current]);

  // =================== COMPUTED STATS ===================
  const stats = useMemo(() => {
    if (!isInitialized.current) { // ✅ AJOUTÉ : Protection contre le calcul avant initialisation
      return {
        totalPhrases: 0,
        completedPhrasesCount: 0,
        totalProgress: 0,
        completionProgress: 0,
        completedInCurrentCategory: 0,
        totalInCurrentCategory: 0
      };
    }
    
    const totalPhrases = currentPhrases.length;
    const completedPhrasesCount = Object.values(completedPhrases).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const totalProgress = totalPhrases > 0 ? Math.round((completedPhrasesCount / totalPhrases) * 100) : 0;
    const completionProgress = totalPhrasesInCategory > 0 ? ((phraseIndex + 1) / totalPhrasesInCategory) * 100 : 0;

    return {
      totalPhrases,
      completedPhrasesCount,
      totalProgress,
      completionProgress,
      completedInCurrentCategory: completedPhrases[categoryIndex]?.length || 0,
      totalInCurrentCategory: totalPhrasesInCategory
    };
  }, [currentPhrases, completedPhrases, totalPhrasesInCategory, phraseIndex, categoryIndex, isInitialized.current]);

  // =================== COMPUTED DISPLAY ===================
  const display = useMemo(() => {
    if (!isInitialized.current) { // ✅ AJOUTÉ : Protection contre le calcul avant initialisation
      return {
        phraseCounter: "0 / 0",
        categories: [],
        currentPhrase: null,
        currentCategory: null,
        currentPhrases: []
      };
    }
    
    const phraseCounter = `${phraseIndex + 1} / ${totalPhrasesInCategory || 0}`;
    const categoriesNames = categories.map(cat => cat.name);
    
    return {
      phraseCounter,
      categories: categoriesNames,
      currentPhrase,
      currentCategory,
      currentPhrases
    };
  }, [phraseIndex, totalPhrasesInCategory, categories, currentPhrase, currentCategory, currentPhrases, isInitialized.current]);

  // =================== VALIDATION ===================
  const canGoToPrevious = phraseIndex > 0;
  const isLastPhraseInCategory = phraseIndex === totalPhrasesInCategory - 1;

  return {
    // State
    categoryIndex,
    phraseIndex,
    showTranslation,
    completedPhrases,
    loaded,
    showDetailedProgress,
    
    // Data
    currentPhrase,
    currentCategory,
    currentPhrases,
    totalCategories: categories.length,
    totalPhrasesInCategory,
    hasValidData,
    
    // Actions
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    
    // Computed
    canGoToPrevious,
    isLastPhraseInCategory,
    stats, // ✅ OPTIMISÉ : Objet mémorisé
    display, // ✅ OPTIMISÉ : Objet mémorisé
  };
};

export default usePhrases;