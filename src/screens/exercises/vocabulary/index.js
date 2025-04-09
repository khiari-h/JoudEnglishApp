// VocabularyExercise/index.js
import React, { useEffect } from "react";
import { View, Text, Animated, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout components
import { Container } from "../../../components/Container";

// Common exercise components
import { ExerciseHeader } from "../../../components/exercise-common/ExerciseHeader";
import { CategorySelector } from "../../../components/exercise-common/CategorySelector";
import { NavigationButtons } from "../../../components/NavigationButtons";
import { WordCard } from "../../../components/WordCard";

// Custom hooks
import { useAnimation } from "../../../hooks/useAnimation";
import { useExerciseState } from "../../../hooks/useExerciseState";
import { useVocabularyProgress } from "../../../hooks/useVocabularyProgress";
import { useTheme } from "../../../hooks/useTheme";

// Components to be created
import { LearningTipCard } from "./LearningTipCard";
import { CardIndicatorsList } from "./CardIndicatorsList";

// Import styles
import { styles } from "./style";

// Import vocabulary data helper
import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params || { level: 'A1' };
  const navigation = useNavigation();
  
  // Custom hooks
  const { getLevelColor } = useTheme();
  const levelColor = getLevelColor(level);
  
  const { fadeAnim, slideAnim, tipFadeAnim, animateTransition } = useAnimation();
  
  // Utilisation du hook de progression spécifique au vocabulaire
  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    isWordCompleted,
    calculateCategoryProgress,
    calculateTotalProgress,
    initializeProgress
  } = useVocabularyProgress(level);
  
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
  
  // Initialiser la progression et restaurer la dernière position
  useEffect(() => {
    // Initialiser le suivi de progression
    initializeProgress(vocabularyData);
    
    // Restaurer la dernière position quand les données sont chargées
    if (loaded && lastPosition) {
      // Vérifier que les indices sont valides
      if (lastPosition.categoryIndex < categories.length) {
        setSelectedCategoryIndex(lastPosition.categoryIndex);
        
        const category = categories[lastPosition.categoryIndex];
        if (category && lastPosition.wordIndex < category.words.length) {
          setCurrentWordIndex(lastPosition.wordIndex);
        }
      }
    }
  }, [loaded, vocabularyData]);
  
  // Sauvegarder la position actuelle quand elle change
  useEffect(() => {
    if (loaded) {
      saveLastPosition(selectedCategoryIndex, currentWordIndex);
    }
  }, [selectedCategoryIndex, currentWordIndex, loaded, saveLastPosition]);
  
  // Animation lors du changement de mot
  useEffect(() => {
    animateTransition();
  }, [currentWordIndex, selectedCategoryIndex, animateTransition]);

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
    // Marquer le mot actuel comme complété
    markWordAsCompleted(selectedCategoryIndex, currentWordIndex);
    setShowTranslation(false);
    
    if (currentWordIndex < currentCategory.words.length - 1) {
      // Passer au mot suivant dans la même catégorie
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Fin de la catégorie - chercher la prochaine catégorie non complétée
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
      const categoryWords = categories[nextIndex].words;
      const completedCount = completedWords[nextIndex]?.length || 0;
      
      if (completedCount < categoryWords.length) {
        return nextIndex;
      }
    }
    return -1; // Tout est complété
  };
  
  // Calculer la progression pour la catégorie actuelle
  const progress = calculateCategoryProgress(selectedCategoryIndex, totalWords);
  
  // Calculer la progression globale pour l'en-tête
  const totalProgress = calculateTotalProgress(categories);

  return (
    <Container style={[styles.container, { backgroundColor: `${levelColor}05` }]}>
      <ExerciseHeader
        title="Vocabulary"
        level={level}
        onBackPress={() => navigation.goBack()}
        progress={totalProgress}
        currentExercise={(completedWords[selectedCategoryIndex]?.length || 0)}
        totalExercises={totalWords}
        levelColor={levelColor}
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