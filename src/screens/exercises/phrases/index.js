// PhrasesExercise/index.js - VERSION COMPLÈTE RECODÉE

import React, { useMemo, useCallback } from "react";
import { SafeAreaView, View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants spécifiques
import PhrasesHeader from "./PhrasesHeader";
import PhrasesCategorySelector from "./PhrasesCategorySelector";
import PhrasesProgressBar from "./PhrasesProgressBar";
import PhraseCard from "./PhraseCard";  // ✅ NOUVEAU - remplace PhrasePhraseCard + Modal
import PhrasesNavigation from "./PhrasesNavigation";

// Hooks personnalisés
import usePhrasesExerciseState from "./hooks/usePhrasesExerciseState";
import usePhrasesProgress from "./hooks/usePhrasesProgress";

// Utilitaires
import {
  getPhrasesData,
  getLevelColor,
} from "../../../utils/phrases/phrasesDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de Phrases & Expressions
 * Version recodée : PhraseCard au lieu de PhrasePhraseCard + Modal
 */
const PhrasesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};

  // Récupérer les données et la couleur du niveau
  const levelColor = getLevelColor(level);
  const phrasesData = useMemo(() => getPhrasesData(level), [level]);

  // Hook de progression (inchangé)
  const { 
    completedPhrases,
    lastPosition,
    loaded, 
    saveLastPosition,
    markPhraseAsCompleted 
  } = usePhrasesProgress(level);

  // Hook d'état modifié (avec showTranslation au lieu de showDetails)
  const {
    categoryIndex,
    phraseIndex,
    showTranslation,        // ✅ NOUVEAU - remplace selectedPhrase/showDetails
    completionProgress,
    changeCategory,
    goToNextPhrase,
    goToPreviousPhrase,
    toggleTranslation,      // ✅ NOUVEAU - remplace openPhraseDetails/closePhraseDetails
    currentCategory,
    currentPhrases,
    hasValidData,
  } = usePhrasesExerciseState(level, phrasesData);

  // Restaurer la position sauvegardée
  React.useEffect(() => {
    if (loaded && lastPosition && phrasesData) {
      // Utiliser changeCategory qui reset déjà phraseIndex à 0
      if (lastPosition.categoryIndex !== categoryIndex) {
        changeCategory(lastPosition.categoryIndex);
      }
      // Puis ajuster phraseIndex si nécessaire
      if (lastPosition.phraseIndex !== phraseIndex) {
        // On ne peut pas directement setter phraseIndex, il faudrait l'exposer du hook
        // Pour l'instant on garde la logique simple
      }
    }
  }, [loaded, lastPosition, phrasesData]);

  // Fonction pour trouver la prochaine catégorie incomplète
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = phrasesData?.categories?.length || 0;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = phrasesData.categories[nextIndex];
      const categoryPhrases = phrasesData.phrases?.filter(p => p.categoryId === category.id) || [];
      const completedInCategory = completedPhrases[nextIndex]?.length || 0;
      if (completedInCategory < categoryPhrases.length) {
        return nextIndex;
      }
    }
    return -1;
  }, [phrasesData, categoryIndex, completedPhrases]);

  // Gestionnaires d'événements
  const handleNext = useCallback(() => {
    // Marquer la phrase actuelle comme complétée
    markPhraseAsCompleted(categoryIndex, phraseIndex, currentPhrases[phraseIndex]);

    if (phraseIndex < currentPhrases.length - 1) {
      goToNextPhrase();
      saveLastPosition(categoryIndex, phraseIndex + 1);
    } else {
      // Passer à la catégorie suivante ou terminer
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de phrases !"
        );
        navigation.goBack();
      } else {
        changeCategory(nextCategoryIndex);
        saveLastPosition(nextCategoryIndex, 0);
      }
    }
  }, [
    markPhraseAsCompleted, 
    categoryIndex, 
    phraseIndex, 
    currentPhrases, 
    goToNextPhrase, 
    saveLastPosition, 
    findNextUncompletedCategory, 
    changeCategory, 
    navigation
  ]);

  const handlePrevious = useCallback(() => {
    goToPreviousPhrase();
    if (phraseIndex > 0) {
      saveLastPosition(categoryIndex, phraseIndex - 1);
    }
  }, [goToPreviousPhrase, phraseIndex, saveLastPosition, categoryIndex]);

  const handleCategoryChange = useCallback((newIndex) => {
    changeCategory(newIndex);
    saveLastPosition(newIndex, 0);
  }, [changeCategory, saveLastPosition]);

  // Effet pour sauvegarder la position actuelle
  React.useEffect(() => {
    if (loaded && hasValidData) {
      saveLastPosition(categoryIndex, phraseIndex);
    }
  }, [categoryIndex, phraseIndex, loaded, hasValidData, saveLastPosition]);

  // Afficher un indicateur de chargement si les données ne sont pas encore prêtes
  if (!loaded || !hasValidData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={styles.loadingText}>Chargement des phrases...</Text>
      </View>
    );
  }

  // Si nous n'avons pas de phrases dans la catégorie actuelle
  if (currentPhrases.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PhrasesHeader
          level={level}
          onBackPress={() => navigation.goBack()}
          levelColor={levelColor}
        />
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Aucune phrase disponible dans cette catégorie.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <PhrasesHeader
        level={level}
        onBackPress={() => navigation.goBack()}
        levelColor={levelColor}
      />

      {/* Sélecteur de catégories */}
      <PhrasesCategorySelector
        categories={phrasesData?.categories || []}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <PhrasesProgressBar
        progress={completionProgress}
        currentPhrase={phraseIndex + 1}
        totalPhrases={currentPhrases.length}
        levelColor={levelColor}
      />

      {/* Contenu de la phrase */}
      <View style={styles.contentContainer}>
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>
            {currentCategory?.name || "Catégorie"}
          </Text>
        </View>

        {/* ✅ NOUVELLE CARTE UNIQUE - Remplace PhrasePhraseCard + Modal */}
        {currentPhrases[phraseIndex] ? (
          <PhraseCard
            phraseData={currentPhrases[phraseIndex]}  // Vos données existantes
            showTranslation={showTranslation}
            onToggleTranslation={toggleTranslation}
            levelColor={levelColor}
          />
        ) : (
          <View style={styles.phrasePlaceholder}>
            <Text>Phrase non disponible</Text>
          </View>
        )}
      </View>

      {/* Navigation */}
      <PhrasesNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        disablePrevious={phraseIndex === 0}
        disableNext={phraseIndex === currentPhrases.length - 1}
        levelColor={levelColor}
      />

      {/* ✅ PLUS DE MODAL ! */}
    </SafeAreaView>
  );
};

export default PhrasesExercise;
