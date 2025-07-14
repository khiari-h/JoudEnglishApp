// ConversationExercise/index.js - VERSION CORRIGÉE
import { useMemo, useEffect, useCallback } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import ConversationHeader from "./ConversationHeader";
import ConversationSelector from "./ConversationSelector";
import ConversationProgress from "./ConversationProgress";
import ConversationScenarioDescription from "./ConversationScenarioDescription";
import ConversationMessageList from "./ConversationMessageList";
import ConversationSuggestions from "./ConversationSuggestions";
import ConversationInput from "./ConversationInput";

// Hook & Utils
import useConversation from "./hooks/useConversation";
import useLastActivity from "../../../hooks/useLastActivity";
import { getConversationData, getLevelColor } from "../../../utils/conversation/conversationDataHelper";
import styles from "./style";

/**
 * 🎯 ConversationExercise - VERSION CORRIGÉE
 */
const ConversationExercise = ({ route }) => {
  // const navigation = useNavigation(); // supprimé car inutilisé
  const { level = "A1" } = route?.params || {};

  // Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const conversationData = useMemo(() => getConversationData(level), [level]);

  // Hook unifié
  const {
    currentScenarioIndex,
    conversation,
    message,
    setMessage,
    isTyping,
    suggestions,
    showHelp,
    completedScenarios,
    conversationHistory,
    loaded,
    showDetailedProgress,
    currentScenario,
    totalScenarios,
    hasValidData,
    changeScenario,
    sendMessage,
    useSuggestion,
    toggleHelp,
    toggleDetailedProgress,
    isConversationStarted,
    stats,
    display,
  } = useConversation(conversationData, level);

  // ✅ CORRECTION : Mémoriser les métadonnées
  const activityMetadata = useMemo(() => ({
    scenario: currentScenarioIndex,
    step: stats.currentStep || 0,
    totalSteps: stats.totalSteps || 1,
    scenarioName: currentScenario?.title || `Scénario ${currentScenarioIndex + 1}`,
    totalScenarios: totalScenarios
  }), [currentScenarioIndex, stats.currentStep, stats.totalSteps, currentScenario?.title, totalScenarios]);

  // ✅ CORRECTION : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && hasValidData && currentScenario && isConversationStarted) {
      saveActivity({
        title: "Conversations",
        level: level,
        type: "conversations",
        metadata: activityMetadata
      });
    }
  }, [loaded, hasValidData, currentScenario, isConversationStarted, level, saveActivity, activityMetadata]);

  // ✅ CORRECTION : useEffect optimisé
  useEffect(() => {
    handleSaveActivity();
  }, [handleSaveActivity]);

  // Handlers
   const handleBackPress = () => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level }
    });
  };
  
  const handleScenarioChange = (index) => changeScenario(index);

  const handleSendMessage = () => sendMessage();

  const handleUseSuggestion = (suggestion) => useSuggestion(suggestion);

  const handleToggleHelp = () => toggleHelp();

  const handleToggleProgressDetails = () => toggleDetailedProgress();

  // Loading state
  if (!loaded || !hasValidData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#FAFBFC"
        statusBarStyle="dark-content"
      >
        {/* Loading content can be added here */}
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      backgroundColor="#FAFBFC"
      statusBarStyle="dark-content"
      withPadding={false}
      style={styles.safeArea}
    >
      {/* Header */}
      <ConversationHeader
        level={level}
        onBackPress={handleBackPress}
        levelColor={levelColor}
      />

      {/* Scenario Selector */}
      <ConversationSelector
        scenarios={conversationData.exercises}
        selectedIndex={currentScenarioIndex}
        onSelectScenario={handleScenarioChange}
        levelColor={levelColor}
      />

      {/* Progress */}
      <ConversationProgress
        progress={stats.completionProgress}
        currentStep={stats.currentStep}
        totalSteps={stats.totalSteps}
        levelColor={levelColor}
        conversationData={conversationData.exercises}
        completedScenarios={completedScenarios}
        conversationHistory={conversationHistory}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onScenarioPress={handleScenarioChange}
      />

      {/* Scenario Description */}
      <ConversationScenarioDescription
        description={currentScenario.description}
        helpText={display.currentHelp}
        showHelp={showHelp}
        toggleHelp={handleToggleHelp}
        levelColor={levelColor}
      />

      {/* Chat Area */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Message List */}
        <ConversationMessageList
          messages={conversation}
          isTyping={isTyping}
          levelColor={levelColor}
        />

        {/* Suggestions */}
        <ConversationSuggestions
          suggestions={suggestions}
          onPressSuggestion={handleUseSuggestion}
          levelColor={levelColor}
        />

        {/* Input */}
        <ConversationInput
          message={message}
          onChangeMessage={setMessage}
          onSendMessage={handleSendMessage}
          levelColor={levelColor}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ConversationExercise;