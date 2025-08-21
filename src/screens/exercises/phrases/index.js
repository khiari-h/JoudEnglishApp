// PhrasesExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import { useEffect, useCallback, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import PropTypes from 'prop-types';

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import PhrasesHeader from "./PhrasesHeader";
import PhrasesCategorySelector from "./PhrasesCategorySelector";
import PhrasesProgress from "./PhrasesProgress";
import PhraseCard from "./PhraseCard";
import PhrasesNavigation from "./PhrasesNavigation";


// Hook & Utils
import usePhrases from "./hooks/usePhrases";
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import useExerciseBackground from "../../../hooks/useExerciseBackground";
import { getPhrasesData, loadPhrasesData, getLevelColor } from "../../../utils/phrases/phrasesDataHelper";
import createStyles from "./style";

/**
 * 🎯 PhrasesExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const PhrasesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();



  // Data
  const levelColor = getLevelColor(level);
  const [phrasesData, setPhrasesData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true); // ✅ AJOUTÉ : État de chargement des données
  
  // 🎨 BACKGROUND DYNAMIQUE : Utilise le hook pour un fond coloré
  const { gradientColors } = useExerciseBackground("phrases", levelColor);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsDataLoading(true); // ✅ AJOUTÉ : Démarrer le chargement
      try {
        if (process.env.JEST_WORKER_ID) {
          const data = getPhrasesData(level);
          if (isMounted) {
            setPhrasesData(data);
            setIsDataLoading(false); // ✅ AJOUTÉ : Fin du chargement
          }
          return;
        }
        const data = await loadPhrasesData(level);
        if (isMounted) {
          setPhrasesData(data);
          setIsDataLoading(false); // ✅ AJOUTÉ : Fin du chargement
        }
      } catch (error) {
        console.error('Erreur chargement données phrases:', error);
        if (isMounted) {
          setIsDataLoading(false); // ✅ AJOUTÉ : Fin du chargement même en cas d'erreur
        }
      }
    };
    load();
    return () => { isMounted = false; };
  }, [level]);

  // Hook unifié - Garde seulement les variables utilisées
  const {
    categoryIndex,
    phraseIndex,
    showTranslation,
    completedPhrases,
    loaded,
    showDetailedProgress,
    currentPhrase,
    currentPhrases,
    totalPhrasesInCategory,
    hasValidData,
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    canGoToPrevious,
    isLastPhraseInCategory,
    stats,
    display,
  } = usePhrases(phrasesData, level);

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement de phrase/catégorie
  useEffect(() => {
    if (loaded && hasValidData && currentPhrase && currentPhrases.length > 0 && phraseIndex < 100) { // ✅ Protection boucle
      const currentCategory = phrasesData?.categories?.[categoryIndex];
      
      const activityData = {
        title: "Expressions",
        level,
        type: "phrases",
        metadata: {
          phrase: phraseIndex,
          totalPhrases: totalPhrasesInCategory || currentPhrases.length, // ✅ Fallback
          category: currentCategory?.name || "Général",
          categoryIndex,
          totalCategories: phrasesData?.categories?.length || 1
        }
      };

      saveActivity(activityData);
    }
  }, [loaded, hasValidData, currentPhrase, currentPhrases.length, phraseIndex, totalPhrasesInCategory, categoryIndex, level]); // ✅ CORRIGÉ : Supprimé phrasesData des dépendances

  // Handlers
  const handleBackPress = useCallback(() => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }, [level]);

  const handleCategoryChange = useCallback((index) => changeCategory(index), [changeCategory]);

  const handleToggleProgressDetails = useCallback(() => toggleDetailedProgress(), [toggleDetailedProgress]);

  const handleNextPhrase = useCallback(() => {
    const result = handleNext();
    if (result.completed) {
      navigation.goBack();
    }
  }, [handleNext, navigation]);

  const handlePreviousPhrase = useCallback(() => handlePrevious(), [handlePrevious]);

  // Loading state
  console.log('🔍 DEBUG Phrases:', { 
    isDataLoading, 
    loaded, 
    hasValidData, 
    phrasesData: !!phrasesData,
    phrasesDataLength: phrasesData?.categories?.length || 0
  });
  
  if (isDataLoading || !loaded || !hasValidData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
        </View>
      </Container>
    );
  }

  // Empty state
  if (currentPhrases.length === 0) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        gradientColors={gradientColors} // 🎨 BACKGROUND DYNAMIQUE
        statusBarStyle="dark-content"
      >
        <PhrasesHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
        </View>
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      gradientColors={gradientColors} // 🎨 BACKGROUND DYNAMIQUE
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      {/* Header */}
      <PhrasesHeader
        level={level}
        onBackPress={handleBackPress}
      />



      {/* Progress - MAINTENANT COLLÉ AU HEADER */}
      <PhrasesProgress
        progress={stats.completionProgress}
        currentPhrase={phraseIndex + 1}
        totalPhrases={totalPhrasesInCategory}
        completedCount={stats.completedPhrasesCount}
        levelColor={levelColor}
        phrasesData={phrasesData}
        completedPhrases={completedPhrases}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryChange}
      />

      {/* Category Selector - APRÈS PROGRESS comme les autres exercices */}
      <PhrasesCategorySelector
        categories={display.categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Phrase Card */}
      <PhraseCard
        phraseData={currentPhrase}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
        levelColor={levelColor}
        counter={`${phraseIndex + 1} / ${totalPhrasesInCategory}`}
      />

      {/* Navigation */}
      <PhrasesNavigation
        onNext={handleNextPhrase}
        onPrevious={handlePreviousPhrase}
        disablePrevious={!canGoToPrevious}
        disableNext={false}
        isLast={isLastPhraseInCategory}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default PhrasesExercise;

// ✅ Ajout de la validation des props
PhrasesExercise.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
};