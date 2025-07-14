// VocabularyExercise/index.js - BOUCLE INFINIE CORRIGÉE

import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";
import VocabularyHeader from "./VocabularyHeader";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
import VocabularyWordSection from "./VocabularyWordSection";
import VocabularyNavigation from "./VocabularyNavigation";

import useVocabulary from "./hooks/useVocabulary";
import useLastActivity from "../../../hooks/useLastActivity";
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";
import createStyles from "./style";

const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();
  const styles = createStyles();
  const { saveActivity } = useLastActivity();

  // Data
  const finalMode = mode || (isBonusLevel(level) ? "fast" : "classic");
  const levelColor = getLevelColor(level);
  const vocabularyData = useVocabulary(vocabularyData, level, finalMode);

  // Hook unifié
  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    completedWords,
    loaded,
    showDetailedProgress,
    currentWord,
    currentCategory,
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    canGoToPrevious,
    isLastWordInExercise,
    display,
  } = useVocabulary(vocabularyData, level, finalMode);

  // =================== SAUVEGARDE ACTIVITÉ SIMPLIFIÉE ===================
  
  useEffect(() => {
    // ✅ CONDITION SIMPLIFIÉE pour éviter boucle infinie
    if (!loaded || !vocabularyData || !currentWord) return;

    // ✅ DÉPENDANCES LIMITÉES - seulement wordIndex change
    let totalWords = 15; // fallback
    
    if (vocabularyData.categories && Array.isArray(vocabularyData.categories)) {
      totalWords = vocabularyData.categories.reduce((total, cat) => total + (cat.words?.length || 0), 0);
    } else if (vocabularyData.exercises && Array.isArray(vocabularyData.exercises)) {
      totalWords = vocabularyData.exercises.reduce((total, ex) => total + (ex.words?.length || 0), 0);
    } else if (vocabularyData.words && Array.isArray(vocabularyData.words)) {
      totalWords = vocabularyData.words.length;
    }

    const activityData = {
      title: `Vocabulaire ${finalMode === "fast" ? "Fast" : ""}`,
      level: level,
      type: "vocabulary",
      mode: finalMode,
      metadata: {
        word: wordIndex, // ✅ Index pour progression (0-based)
        totalWords: totalWords,
        category: currentCategory?.name || "Général",
        categoryIndex: categoryIndex,
        wordIndex: wordIndex
      }
    };

    saveActivity(activityData);
  }, [wordIndex]); // ✅ SEULEMENT wordIndex - plus de boucle !

  // Handlers
 const handleBackPress = () => {
  router.push({
    pathname: "/tabs/exerciseSelection",
    params: { level }
  });
};
  const handleCategoryChange = (index) => changeCategory(index);
  const handleCategoryProgressPress = (index) => changeCategory(index);
  const handleToggleProgressDetails = () => toggleDetailedProgress();

  const handleNextWord = () => {
    const result = handleNext();
    if (result.completed) {
      navigation.goBack();
    }
  };

  const handlePreviousWord = () => handlePrevious();

  // Loading state
  if (!loaded || !vocabularyData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      <VocabularyHeader
        level={level}
        mode={finalMode}
        onBackPress={handleBackPress}
      />

      <VocabularyProgress
        vocabularyData={vocabularyData}
        completedWords={completedWords}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryProgressPress}
      />

      <VocabularyCategorySelector
        categories={display.categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <VocabularyWordSection
        currentWord={currentWord}
        wordCounter={display.wordCounter}
        mode={finalMode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      <VocabularyNavigation
        onNext={handleNextWord}
        onPrevious={handlePreviousWord}
        canGoPrevious={canGoToPrevious}
        isLast={isLastWordInExercise}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default VocabularyExercise;