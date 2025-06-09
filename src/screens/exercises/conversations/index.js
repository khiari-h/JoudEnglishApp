// ConversationExercise/index.js - VERSION CLEAN & SIMPLE
import React, { useMemo } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
import { getConversationData, getLevelColor } from "../../../utils/conversation/conversationDataHelper";
import styles from "./style";

/**
 * 🎯 ConversationExercise - VERSION CLEAN & SIMPLE
 * 300+ lignes → 130 lignes (-60% de code)
 * 2 hooks + 9 états → 1 hook, logique claire, maintenable
 */
const ConversationExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1", initialScenarioIndex = 0, initialStepIndex = 0 } = route?.params || {};

  // Data
  const levelColor = getLevelColor(level);
  const conversationData = useMemo(() => getConversationData(level), [level]);

  // Hook unifié
  const {
    currentScenarioIndex,
    conversation,
    currentStep,
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
    totalSteps,
    hasValidData,
    changeScenario,
    sendMessage,
    useSuggestion,
    toggleHelp,
    toggleDetailedProgress,
    isLastStep,
    isConversationStarted,
    stats,
    display,
  } = useConversation(conversationData, level);

  // Handlers
  const handleBackPress = () => navigation.goBack();
  
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