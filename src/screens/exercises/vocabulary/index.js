// VocabularyExercise/index.js
import React, { useEffect } from "react";
import { View, Text, Animated, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout components
import { Container } from "../layout/Container";

// Common exercise components
import { ExerciseHeader } from "../exercise-common/ExerciseHeader";
import { CategorySelector } from "../exercise-common/CategorySelector";
import { NavigationButtons } from "../exercise-common/NavigationButtons";
import { WordCard } from "../exercise-common/WordCard";

// Custom hooks
import { useAnimation } from "../../hooks/useAnimation";
import { useExerciseState } from "../../hooks/useExerciseState";
import { useProgress } from "../../hooks/useProgress";
import { useTheme } from "../../hooks/useTheme";

// Components to be created
import { LearningTipCard } from "./LearningTipCard";
import { CardIndicatorsList } from "./CardIndicatorsList";

// Import styles
import { styles } from "./style";

// Import vocabulary data helper
import { getVocabularyData } from "../../utils/vocabularyDataHelper";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params || { level: 'A1' };
  const navigation = useNavigation();
  
  // Custom hooks
  const { getLevelColor } = useTheme();
  const levelColor = getLevelColor(level);
  
  const { fadeAnim, slideAnim, tipFadeAnim, animateTransition } = useAnimation();
  
  const { 
    completedWords, 
    markWordAsCompleted, 
    calculateProgress,
    initializeProgress 
  } = useProgress();
  
  const {
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    currentWordIndex,
    setCurrentWordIndex,
    showTranslation,
    setShowTranslation,
    showTip,
    setShowTip
  } = useExerciseState();

  // Récupération des données de vocabulaire
  const vocabularyData = getVocabularyData(level);
  const categories = vocabularyData.exercises;
  const currentCategory = categories[selectedCategoryIndex];
  const currentWord = currentCategory?.words[currentWordIndex];
  const totalWords = currentCategory?.words.length || 0;
  
  // Animation et initialisation
  useEffect(() => {
    animateTransition();
    initializeProgress(vocabularyData);
  }, [currentWordIndex, selectedCategoryIndex]);

  // Handlers
  const dismissTip = () => setShowTip(false);
  
  const toggleTranslation = () => setShowTranslation(!showTranslation);
  
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setCurrentWordIndex(0);
      setShowTranslation(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
    }
  };
  
  const handleNext = () => {
    // Marquer comme complété
    markWordAsCompleted(selectedCategoryIndex, currentWordIndex);
    setShowTranslation(false);
    
    if (currentWordIndex < currentCategory.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Gestion de la fin d'une catégorie
      const nextCategoryIndex = findNextCategory();
      
      if (nextCategoryIndex === -1) {
        // Tout est complété
        Alert.alert("Félicitations", "Tous les exercices de vocabulaire sont terminés !");
        navigation.goBack();
      } else {
        // Demander à passer à la catégorie suivante
        Alert.alert(
          "Catégorie terminée",
          `Passer à la catégorie ${categories[nextCategoryIndex].title}?`,
          [
            { text: "Non", style: "cancel", onPress: () => setCurrentWordIndex(0) },
            { text: "Oui", onPress: () => {
              setSelectedCategoryIndex(nextCategoryIndex);
              setCurrentWordIndex(0);
            }}
          ]
        );
      }
    }
  };
  
  // Helper pour trouver la prochaine catégorie non complétée
  const findNextCategory = () => {
    for (let i = 0; i < categories.length; i++) {
      const nextIndex = (selectedCategoryIndex + i + 1) % categories.length;
      if ((completedWords[nextIndex]?.length || 0) < categories[nextIndex].words.length) {
        return nextIndex;
      }
    }
    return -1; // Tout est complété
  };
  
  // Calculer progression
  const progress = calculateProgress(selectedCategoryIndex, totalWords);

  return (
    <Container style={[styles.container, { backgroundColor: `${levelColor}05` }]}>
      <ExerciseHeader
        title="Vocabulary"
        level={level}
        onBackPress={() => navigation.goBack()}
      />

      <CategorySelector
        categories={categories.map(cat => cat.title)}
        selectedIndex={selectedCategoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {showTip && (
        <LearningTipCard
          tipText="Pour une meilleure mémorisation, essayez de visualiser chaque mot ou recherchez des images en ligne pour créer des associations mentales."
          onDismiss={dismissTip}
          fadeAnim={tipFadeAnim}
        />
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%`, backgroundColor: levelColor }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedWords[selectedCategoryIndex]?.length || 0}/{totalWords}
        </Text>
      </View>

      {currentWord && (
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <WordCard
            word={currentWord.word}
            translation={currentWord.translation}
            definition={currentWord.definition}
            example={currentWord.example}
            showTranslation={showTranslation}
            onToggleTranslation={toggleTranslation}
            levelColor={levelColor}
          />
        </Animated.View>
      )}

      <CardIndicatorsList
        totalWords={totalWords}
        currentIndex={currentWordIndex}
        completedIndices={completedWords[selectedCategoryIndex] || []}
        onSelectIndex={(index) => {
          setCurrentWordIndex(index);
          setShowTranslation(false);
        }}
        levelColor={levelColor}
      />

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentWordIndex > 0}
        isLast={currentWordIndex === totalWords - 1}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default VocabularyExercise;