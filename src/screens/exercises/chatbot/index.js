import React, { useState, useCallback, useMemo, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Composants spécifiques au chatbot
import ChatbotHeader from "./ChatbotHeader";
import ChatbotProgressBar from "./ChatbotProgressBar";
import ChatbotMessageList from "./ChatbotMessageList";
import ChatbotSuggestions from "./ChatbotSuggestions";
import ChatbotInput from "./ChatbotInput";
import ChatbotScenarioDescription from "./ChatbotScenarioDescription";
import ChatbotConversationSelector from "./ChatbotConversationSelector";

// Utilitaires et helpers
import {
  getChatbotData,
  getLevelColor,
} from "../../../utils/chatbot/chatbotDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de Chatbot Writing
 */
const ChatbotExercise = () => {
  // Hooks de navigation
  const navigation = useNavigation();
  const route = useRoute();
  const { level = "A1" } = route.params || {};

  // Initialisation des données du chatbot
  const levelColor = getLevelColor(level);
  const chatbotData = useMemo(() => getChatbotData(level), [level]);
  const allScenarios = useMemo(
    () => chatbotData.exercises || [],
    [chatbotData]
  );

  // États de l'exercice
  const [scenarios, setScenarios] = useState(allScenarios);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  // Scénario courant
  const currentScenario = scenarios[currentScenarioIndex] || {};

  // Calcul de la progression
  const completionProgress = useMemo(() => {
    return currentScenario.steps
      ? (currentStep + 1) / currentScenario.steps.length
      : 0;
  }, [currentStep, currentScenario]);

  // Réinitialisation lors du changement de scénario
  useEffect(() => {
    setConversation([]);
    setSuggestions(currentScenario.steps?.[0]?.suggestions || []);
    setCurrentStep(0);
  }, [currentScenarioIndex, currentScenario]);

  // Gérer l'envoi d'un nouveau message
  const handleSendMessage = useCallback(() => {
    if (message.trim() === "") return;

    // Message de l'utilisateur
    const userMessage = {
      id: `user-${Date.now()}`,
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setConversation((prev) => [...prev, userMessage]);

    // Réponse du bot
    setIsTyping(true);

    setTimeout(() => {
      const botSteps = currentScenario.steps || [];
      const nextStepIndex = currentStep + 1;

      if (nextStepIndex < botSteps.length) {
        const nextStep = botSteps[nextStepIndex];

        const botMessage = {
          id: `bot-${Date.now()}`,
          text: nextStep.botMessage,
          sender: "bot",
          timestamp: new Date().toISOString(),
        };

        setConversation((prev) => [...prev, botMessage]);
        setCurrentStep(nextStepIndex);

        // Mettre à jour les suggestions
        setSuggestions(nextStep.suggestions || []);
      }

      setIsTyping(false);
      setMessage("");
    }, 1000);
  }, [message, currentScenario, currentStep]);

  // Gérer le changement de scénario
  const handleScenarioChange = useCallback(
    (index) => {
      if (index !== currentScenarioIndex) {
        setCurrentScenarioIndex(index);
      }
    },
    [currentScenarioIndex]
  );

  // Utiliser une suggestion
  const handleUseSuggestion = useCallback((suggestion) => {
    setMessage(suggestion);
  }, []);

  // Obtenir le texte d'aide pour l'étape actuelle
  const getCurrentHelp = useCallback(() => {
    return currentScenario.steps?.[currentStep]?.help || "";
  }, [currentScenario, currentStep]);

  // Basculer l'affichage de l'aide
  const toggleHelp = useCallback(() => {
    setShowHelp((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête du chatbot */}
      <ChatbotHeader
        level={level}
        onBackPress={() => navigation.goBack()}
        levelColor={levelColor}
      />

      {/* Sélecteur de conversations */}
      <ChatbotConversationSelector
        scenarios={scenarios}
        selectedIndex={currentScenarioIndex}
        onSelectScenario={handleScenarioChange}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <ChatbotProgressBar
        progress={completionProgress}
        currentStep={currentStep + 1}
        totalSteps={currentScenario.steps?.length || 0}
        levelColor={levelColor}
      />

      {/* Description du scénario et aide */}
      {currentScenario && (
        <ChatbotScenarioDescription
          description={currentScenario.description}
          helpText={getCurrentHelp()}
          showHelp={showHelp}
          toggleHelp={toggleHelp}
          levelColor={levelColor}
        />
      )}

      {/* Zone de chat */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Liste des messages */}
        <ChatbotMessageList
          messages={conversation}
          isTyping={isTyping}
          levelColor={levelColor}
        />

        {/* Suggestions */}
        <ChatbotSuggestions
          suggestions={suggestions}
          onPressSuggestion={handleUseSuggestion}
          levelColor={levelColor}
        />

        {/* Zone de saisie */}
        <ChatbotInput
          message={message}
          onChangeMessage={setMessage}
          onSendMessage={handleSendMessage}
          levelColor={levelColor}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotExercise;
