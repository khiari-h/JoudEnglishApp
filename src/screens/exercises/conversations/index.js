// src/screens/exercises/conversation/index.js
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants spécifiques au conversation
import ConversationHeader from "./ConversationHeader";
import ConversationProgressBar from "./ConversationProgressBar";
import ConversationMessageList from "./ConversationMessageList";
import ConversationSuggestions from "./ConversationSuggestions";
import ConversationInput from "./ConversationInput";
import ConversationScenarioDescription from "./ConversationScenarioDescription";
import ConversationSelector from "./ConversationSelector";

// Hook de progression
import useConversationProgress from "./hooks/useConversationProgress";

// Utilitaires et helpers
import {
  getConversationData,
  getLevelColor,
} from "../../../utils/conversation/conversationDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de Conversation Writing
 * Version optimisée avec Container SafeArea et enregistrement de progression à des moments stratégiques
 */
const ConversationExercise = ({ route }) => {
  // Hooks de navigation
  const navigation = useNavigation();
  const {
    level = "A1",
    initialScenarioIndex = 0,
    initialStepIndex = 0,
  } = route.params || {};

  // Initialisation des données du conversation
  const levelColor = getLevelColor(level);
  const conversationData = useMemo(() => getConversationData(level), [level]);
  const allScenarios = useMemo(
    () => conversationData.exercises || [],
    [conversationData]
  );

  // États de l'exercice
  const [scenarios, setScenarios] = useState(allScenarios);
  const [currentScenarioIndex, setCurrentScenarioIndex] =
    useState(initialScenarioIndex);
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(initialStepIndex);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [conversationChanged, setConversationChanged] = useState(false);

  // Utilisation du hook de progression
  const {
    completedScenarios,
    lastPosition,
    conversationHistory,
    loaded: progressLoaded,
    saveLastPosition,
    markScenarioAsCompleted,
    saveConversationMessage,
    initializeProgress,
  } = useConversationProgress(level);

  // Scénario courant
  const currentScenario = scenarios[currentScenarioIndex] || {};

  // Initialiser les données de progression
  useEffect(() => {
    if (progressLoaded && conversationData) {
      initializeProgress(conversationData);

      // Enregistrer la sélection initiale du scénario
      saveLastPosition(currentScenarioIndex, 0);
    }
  }, [
    progressLoaded,
    conversationData,
    initializeProgress,
    currentScenarioIndex,
    saveLastPosition,
  ]);

  // Restaurer l'historique de conversation si disponible
  useEffect(() => {
    if (progressLoaded && currentScenarioIndex !== undefined) {
      // Récupérer le scénario correspondant
      const scenario = scenarios[currentScenarioIndex];
      if (!scenario) return;

      // Récupérer l'historique de conversation pour ce scénario
      const scenarioHistory = conversationHistory[currentScenarioIndex];
      let initialStep = 0;

      // Vérifier si le scénario a déjà été commencé
      if (
        scenarioHistory?.conversation &&
        scenarioHistory.conversation.length > 0
      ) {
        setConversation(scenarioHistory.conversation);

        // Calculer l'étape actuelle en fonction des messages du bot
        const botMessages = scenarioHistory.conversation.filter(
          (msg) => msg.sender === "bot"
        );
        initialStep = Math.min(botMessages.length, scenario.steps.length - 1);
      } else {
        // Nouvelle conversation - initialiser avec le premier message du bot
        if (scenario.steps && scenario.steps.length > 0) {
          const initialBotMessage = {
            id: `bot-initial-${Date.now()}`,
            text: scenario.steps[0].botMessage,
            sender: "bot",
            timestamp: new Date().toISOString(),
          };

          setConversation([initialBotMessage]);
        }
      }

      // Mettre à jour l'étape actuelle
      setCurrentStep(initialStep);

      // Mettre à jour les suggestions
      if (scenario.steps?.[initialStep]) {
        setSuggestions(scenario.steps[initialStep].suggestions || []);
      }

      setConversationChanged(false);
    }
  }, [currentScenarioIndex, progressLoaded, conversationHistory, scenarios]);

  // Enregistrer la progression lorsque l'utilisateur quitte la page
  useFocusEffect(
    React.useCallback(() => {
      // Fonction de nettoyage exécutée lorsque l'utilisateur quitte la page
      return () => {
        if (progressLoaded && conversationChanged) {
          saveProgressState();
        }
      };
    }, [progressLoaded, conversationChanged])
  );

  // Fonction pour sauvegarder l'état complet de la progression
  const saveProgressState = useCallback(() => {
    if (!progressLoaded) return;

    // 1. Sauvegarder la position actuelle
    saveLastPosition(currentScenarioIndex, currentStep);

    // 2. Sauvegarder l'historique de conversation
    if (conversation.length > 0) {
      // Sauvegarder la conversation complète d'un coup
      const completeConversation = {
        id: `conversation-${currentScenarioIndex}-${Date.now()}`,
        conversation: conversation,
        timestamp: Date.now(),
      };
      saveConversationMessage(currentScenarioIndex, completeConversation);
    }

    // 3. Si le scénario est terminé, le marquer comme complété
    const scenario = scenarios[currentScenarioIndex];
    if (
      scenario?.steps &&
      currentStep >= scenario.steps.length - 1
    ) {
      markScenarioAsCompleted(currentScenarioIndex, conversation);
    }

    setConversationChanged(false);
  }, [
    progressLoaded,
    currentScenarioIndex,
    currentStep,
    conversation,
    scenarios,
    saveLastPosition,
    saveConversationMessage,
    markScenarioAsCompleted,
  ]);

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

    // Mise à jour locale de la conversation
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setConversationChanged(true);
    setMessage("");

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

        const conversationWithBot = [...updatedConversation, botMessage];
        setConversation(conversationWithBot);
        setCurrentStep(nextStepIndex);
        setSuggestions(nextStep.suggestions || []);

        // Si c'est le dernier message du bot, sauvegarder immédiatement la progression
        if (nextStepIndex === botSteps.length - 1) {
          setTimeout(() => {
            saveProgressState();
          }, 500);
        }
      }

      setIsTyping(false);
    }, 1000);
  }, [message, currentScenario, currentStep, conversation, saveProgressState]);

  // Gérer le changement de scénario
  const handleScenarioChange = useCallback(
    (index) => {
      if (index !== currentScenarioIndex) {
        // Sauvegarder la progression du scénario actuel avant de changer
        if (conversationChanged) {
          saveProgressState();
        }

        setCurrentScenarioIndex(index);
        setConversation([]);
        setCurrentStep(0);
        setSuggestions([]);
        setConversationChanged(false);
      }
    },
    [currentScenarioIndex, conversationChanged, saveProgressState]
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

  // Gérer le retour en arrière avec sauvegarde
  const handleBackPress = useCallback(() => {
    // Sauvegarder avant de quitter si nécessaire
    if (conversationChanged) {
      saveProgressState();
    }
    navigation.goBack();
  }, [conversationChanged, saveProgressState, navigation]);

  // Contenu principal de l'exercice
  const renderMainContent = () => (
    <>
      {/* En-tête du conversation */}
      <ConversationHeader
        level={level}
        onBackPress={handleBackPress}
        levelColor={levelColor}
      />

      {/* Sélecteur de conversations */}
      <ConversationSelector
        scenarios={scenarios}
        selectedIndex={currentScenarioIndex}
        onSelectScenario={handleScenarioChange}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <ConversationProgressBar
        progress={completionProgress}
        currentStep={currentStep + 1}
        totalSteps={currentScenario.steps?.length || 0}
        levelColor={levelColor}
      />

      {/* Description du scénario et aide */}
      {currentScenario && (
        <ConversationScenarioDescription
          description={currentScenario.description}
          helpText={getCurrentHelp()}
          showHelp={showHelp}
          toggleHelp={toggleHelp}
          levelColor={levelColor}
        />
      )}

      {/* Zone de conversation avec gestion du clavier */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Liste des messages */}
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

        {/* Zone de saisie */}
        <ConversationInput
          message={message}
          onChangeMessage={setMessage}
          onSendMessage={handleSendMessage}
          levelColor={levelColor}
        />
      </KeyboardAvoidingView>
    </>
  );

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL} // SafeArea complète pour les exercices
      backgroundColor="#FAFBFC"
      statusBarStyle="dark-content"
      withPadding={false} // Pas de padding global, géré par les composants internes
      style={styles.safeArea}
    >
      {renderMainContent()}
    </Container>
  );
};

export default ConversationExercise;