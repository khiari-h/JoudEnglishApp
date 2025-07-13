// GrammarExercise/index.js - VERSION TOTALEMENT RECODÉE



import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

// Layout


// Components
import GrammarHeader from "./GrammarHeader";
import GrammarRuleSelector from "./GrammarRuleSelector";
import GrammarProgress from "./GrammarProgress";
import GrammarRuleContent from "./GrammarRuleContent";
import GrammarExerciseRenderer from "./GrammarExerciceRenderer";
import GrammarFeedback from "./GrammarFeedback";
import GrammarNavigation from "./GrammarNavigation";

// Hook & Utils
import useGrammar from "./hooks/useGrammar";
import useLastActivity from "../../../hooks/useLastActivity";
import { getGrammarData, getLevelColor } from "../../../utils/grammar/grammarDataHelper";
import createStyles from "./style";

/**
 * 🎯 GrammarExercise - VERSION TOTALEMENT RECODÉE AVEC OPTIMISATIONS COMPLÈTES
 * ✅ Mémorisation complète avec useMemo et useCallback
 * ✅ useEffect optimisé pour saveActivity
 * ✅ Gestion des handlers mémorisés
 * ✅ Performance maximale
 */
const GrammarExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Hook pour sauvegarder l'activité


  // ✅ MÉMORISER les données principales
  const levelColor = useMemo(() => getLevelColor(level), [level]);
  const grammarData = useMemo(() => getGrammarData(level), [level]);

  // Hook unifié
  const {
    ruleIndex,
    exerciseIndex,
    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,
    showFeedback,
    isCorrect,
    attempts,
    completedExercises,
    loaded,
    showDetailedProgress,
    currentRule,
    currentExercise,
    totalExercises,
    canCheckAnswer,
    isFirstExercise,
    isLastExercise,
    progress,
    changeRule,
    submitAnswer,
    nextExercise,
    previousExercise,
    retryExercise,
    toggleDetailedProgress,
  } = useGrammar(grammarData, level);

  // ✅ CORRECTION FINALE : Suppression de la double sauvegarde
  // Le hook useGrammar gère déjà la sauvegarde, pas besoin de doublon
  // Si on veut vraiment sauvegarder l'activité, on peut le faire à des moments spécifiques
  // comme quand on change de règle ou termine un exercice

  // ✅ TOUS LES HANDLERS MÉMORISÉS pour éviter les re-renders
const handleBackPress = useCallback(() => {
  router.push({
    pathname: "/(tabs)/exerciseSelection",
    params: { level }
  });
}, [level]);
  
  const handleCheckAnswer = useCallback(() => {
    submitAnswer();
  }, [submitAnswer]);
  
  const handleNextExercise = useCallback(() => {
    if (!nextExercise()) {
      // All exercises completed
      navigation.goBack();
    }
  }, [nextExercise, navigation]);

  const handlePreviousExercise = useCallback(() => {
    previousExercise();
  }, [previousExercise]);

  const handleRetryExercise = useCallback(() => {
    retryExercise();
  }, [retryExercise]);

  const handleSkipExercise = useCallback(() => {
    handleNextExercise();
  }, [handleNextExercise]);

  const handleRuleChange = useCallback((index) => {
    changeRule(index);
  }, [changeRule]);

  const handleRuleProgressPress = useCallback((index) => {
    changeRule(index);
  }, [changeRule]);

  const handleToggleProgressDetails = useCallback(() => {
    toggleDetailedProgress();
  }, [toggleDetailedProgress]);

  // ✅ MÉMORISER les conditions de rendu
  const isLoading = useMemo(() => {
    return !loaded || !grammarData.length;
  }, [loaded, grammarData.length]);

  // Loading state
  if (isLoading) {
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
      {/* Header */}
      <GrammarHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Rule Selector */}
      <GrammarRuleSelector
        rules={grammarData}
        selectedIndex={ruleIndex}
        onSelectRule={handleRuleChange}
        levelColor={levelColor}
      />

      {/* Progress */}
      <GrammarProgress
        grammarData={grammarData}
        completedExercises={completedExercises}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onRulePress={handleRuleProgressPress}
      />

      {/* Rule Content */}
      <GrammarRuleContent 
        rule={currentRule} 
        levelColor={levelColor}
      />

      {/* Exercise Renderer */}
      {currentExercise && (
        <View key={`exercise-${exerciseIndex}-${attempts}`}>
          <GrammarExerciseRenderer
            exercise={currentExercise}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            inputText={inputText}
            setInputText={setInputText}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            exerciseIndex={exerciseIndex}
            attempts={attempts}
          />
        </View>
      )}

      {/* Feedback */}
      <GrammarFeedback
        isVisible={showFeedback}
        isCorrect={isCorrect}
        explanation={currentExercise?.explanation}
        correctAnswer={currentExercise?.answer}
        attempts={attempts}
      />

      {/* Navigation */}
      <GrammarNavigation
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canCheckAnswer={canCheckAnswer}
        onCheckAnswer={handleCheckAnswer}
        onPreviousExercise={handlePreviousExercise}
        onNextExercise={handleNextExercise}
        onRetryExercise={handleRetryExercise}
        onSkipExercise={handleSkipExercise}
        isFirstExercise={isFirstExercise}
        isLastExercise={isLastExercise}
        attempts={attempts}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default GrammarExercise;