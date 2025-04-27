// src/screens/exercises/chatbot/index.js
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

// Hook de progression
import useChatbotProgress from "./hooks/useChatbotProgress";

// Utilitaires et helpers
import {
  getChatbotData,
  getLevelColor,
} from "../../../utils/chatbot/chatbotDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de Chatbot Writing
 * Version améliorée avec suivi de progression
 */
const ChatbotExercise = () => {
  // Hooks de navigation
  const navigation = useNavigation();
  const route = useRoute();
  const { level = "A1", initialScenarioIndex = 0, initialStepIndex = 0 } = route.params || {};

  // Initialisation des données du chatbot
  const levelColor = getLevelColor(level);
  const chatbotData = useMemo(() => getChatbotData(level), [level]);
  const allScenarios = useMemo(
    () => chatbotData.exercises || [],
    [chatbotData]
  );

  // États de l'exercice
  const [scenarios, setScenarios] = useState(allScenarios);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(initialScenarioIndex);
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(initialStepIndex);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  // Utilisation du hook de progression
  const {
    completedScenarios,
    lastPosition,
    conversationHistory,
    loaded: progressLoaded,
    saveLastPosition,
    markScenarioAsCompleted,
    saveConversationMessage,
    initializeProgress
  } = useChatbotProgress(level);

  // Scénario courant
  const currentScenario = scenarios[currentScenarioIndex] || {};

  // Initialiser les données de progression
  useEffect(() => {
    if (progressLoaded && chatbotData) {
      console.log('[Chatbot] Initialisation de la progression');
      initializeProgress(chatbotData);
    }
  }, [progressLoaded, chatbotData, initializeProgress]);

  // Restaurer la dernière position et l'historique de conversation
  useEffect(() => {
    if (progressLoaded && lastPosition) {
      console.log('[Chatbot] Restauration depuis la position sauvegardée:', lastPosition);
      
      // Restaurer l'index du scénario si différent
      if (typeof lastPosition.scenarioIndex === 'number' && 
          lastPosition.scenarioIndex !== currentScenarioIndex &&
          lastPosition.scenarioIndex < scenarios.length) {
        setCurrentScenarioIndex(lastPosition.scenarioIndex);
      }
      
      // Restaurer l'étape si différente
      if (typeof lastPosition.stepIndex === 'number' && 
          lastPosition.stepIndex !== currentStep) {
        setCurrentStep(lastPosition.stepIndex);
      }
      
      // Restaurer l'historique de conversation si disponible
      const scenarioHistory = conversationHistory[lastPosition.scenarioIndex];
      if (scenarioHistory && scenarioHistory.conversation) {
        console.log('[Chatbot] Restauration de la conversation');
        setConversation(scenarioHistory.conversation);
      }
    }
  }, [progressLoaded, lastPosition, conversationHistory, scenarios.length]);

  // Sauvegarder la position lorsque le scénario ou l'étape change
  useEffect(() => {
    if (progressLoaded && (currentScenarioIndex !== undefined && currentStep !== undefined)) {
      console.log(`[Chatbot] Sauvegarde de la position: scénario ${currentScenarioIndex}, étape ${currentStep}`);
      saveLastPosition(currentScenarioIndex, currentStep);
    }
  }, [currentScenarioIndex, currentStep, progressLoaded, saveLastPosition]);

  // Réinitialisation lors du changement de scénario
  useEffect(() => {
    // Vérifier si une conversation existe déjà dans l'historique
    if (progressLoaded && conversationHistory[currentScenarioIndex]) {
      const savedConversation = conversationHistory[currentScenarioIndex].conversation;
      if (savedConversation && savedConversation.length > 0) {
        console.log('[Chatbot] Restauration de la conversation pour le scénario', currentScenarioIndex);
        setConversation(savedConversation);
        
        // Déterminer l'étape actuelle en fonction de la longueur de la conversation
        // (simplification - à adapter selon votre logique exacte)
        const estimatedStep = Math.floor(savedConversation.length / 2);
        if (estimatedStep > 0 && estimatedStep !== currentStep) {
          setCurrentStep(estimatedStep);
        }
      } else {
        resetConversation();
      }
    } else {
      resetConversation();
    }
  }, [currentScenarioIndex, currentScenario, progressLoaded, conversationHistory]);

  // Réinitialiser la conversation
  const resetConversation = () => {
    console.log('[Chatbot] Réinitialisation de la conversation');
    setConversation([]);
    setCurrentStep(0);
    
    // Ajouter le premier message du bot si disponible
    if (currentScenario.steps && currentScenario.steps.length > 0) {
      const initialBotMessage = {
        id: `bot-initial-${Date.now()}`,
        text: currentScenario.steps[0].botMessage,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setConversation([initialBotMessage]);
      setSuggestions(currentScenario.steps[0].suggestions || []);
      
      // Sauvegarder ce message initial
      if (progressLoaded) {
        saveConversationMessage(currentScenarioIndex, initialBotMessage);
      }
    }
  };

  // Calcul de la progression
  const completionProgress = useMemo(() => {
    return currentScenario.steps
      ? (currentStep + 1) / currentScenario.steps.length
      : 0;
  }, [currentStep, currentScenario]);

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
    
    // Sauvegarder le message de l'utilisateur
    if (progressLoaded) {
      saveConversationMessage(currentScenarioIndex, userMessage);
    }

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

        // Sauvegarder le message du bot
        if (progressLoaded) {
          saveConversationMessage(currentScenarioIndex, botMessage);
          
          // Si c'est le dernier message du bot dans ce scénario, marquer comme complété
          if (nextStepIndex === botSteps.length - 1) {
            const fullConversation = [...conversation, userMessage, botMessage];
            markScenarioAsCompleted(currentScenarioIndex, fullConversation);
          }
        }

        // Mettre à jour les suggestions
        setSuggestions(nextStep.suggestions || []);
      }

      setIsTyping(false);
      setMessage("");
    }, 1000);
  }, [message, currentScenario, currentStep, conversation, progressLoaded, saveConversationMessage, markScenarioAsCompleted, currentScenarioIndex]);

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