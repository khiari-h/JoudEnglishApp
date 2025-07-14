// hooks/useConversation.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Conversation Exercise
 * Remplace useConversationProgress + useConversationExerciseState + logique du composant
 * Simple, efficace, maintenable - pattern identique aux 4 autres exercices
 */
const useConversation = (conversationData = null, level = "A1") => {
  
  // =================== CORE STATE ===================
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState({});
  const [conversationHistory, setConversationHistory] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);
  const conversationChanged = useRef(false);

  // =================== COMPUTED VALUES ===================
  const scenarios = conversationData?.exercises || [];
  const currentScenario = scenarios[currentScenarioIndex] || {};
  const totalScenarios = scenarios.length;
  const totalSteps = currentScenario.steps?.length || 0;
  
  // =================== PERSISTENCE ===================
  const STORAGE_KEY = `conversation_${level}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedScenarios: savedCompleted, conversationHistory: savedHistory, lastPosition } = JSON.parse(saved);
          setCompletedScenarios(savedCompleted || {});
          setConversationHistory(savedHistory || {});
          if (lastPosition) {
            setCurrentScenarioIndex(lastPosition.scenarioIndex || 0);
            setCurrentStep(lastPosition.stepIndex || 0);
          }
        }
      } catch (error) {
        console.error('Error loading conversation data:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedScenarios,
        conversationHistory,
        lastPosition: {
          scenarioIndex: currentScenarioIndex,
          stepIndex: currentStep
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving conversation data:', error);
    }
  }, [completedScenarios, conversationHistory, currentScenarioIndex, currentStep, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new scenarios
  useEffect(() => {
    if (loaded && conversationData && !isInitialized.current) {
      const newCompletedScenarios = { ...completedScenarios };
      scenarios.forEach((_, index) => {
        if (!newCompletedScenarios[index]) {
          newCompletedScenarios[index] = null;
        }
      });
      setCompletedScenarios(newCompletedScenarios);
      isInitialized.current = true;
    }
  }, [loaded, conversationData, scenarios, completedScenarios]);

  // =================== CONVERSATION MANAGEMENT ===================
  const startConversation = useCallback(() => {
    if (!currentScenario.steps || currentScenario.steps.length === 0) return;

    // Check if there's saved conversation for this scenario
    const savedConversation = conversationHistory[currentScenarioIndex];
    
    if (savedConversation?.conversation && savedConversation.conversation.length > 0) {
      // Restore saved conversation
      setConversation(savedConversation.conversation);
      
      // Calculate current step based on bot messages
      const botMessages = savedConversation.conversation.filter(msg => msg.sender === "bot");
      const calculatedStep = Math.min(botMessages.length - 1, currentScenario.steps.length - 1);
      setCurrentStep(Math.max(0, calculatedStep));
      
      // Set suggestions for current step
      const stepIndex = Math.min(calculatedStep, currentScenario.steps.length - 1);
      setSuggestions(currentScenario.steps[stepIndex]?.suggestions || []);
    } else {
      // Start new conversation
      setConversation([]);
      setCurrentStep(0);
      
      // Add initial bot message
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          const initialMessage = {
            id: `bot-${Date.now()}`,
            text: currentScenario.steps[0].botMessage,
            sender: "bot",
          };
          
          setConversation([initialMessage]);
          setSuggestions(currentScenario.steps[0].suggestions || []);
          setIsTyping(false);
          conversationChanged.current = true;
        }, 1000);
      }, 500);
    }
  }, [currentScenario, conversationHistory, currentScenarioIndex]);

  // Initialize conversation when scenario changes
  useEffect(() => {
    if (loaded && currentScenario.steps) {
      startConversation();
    }
  }, [loaded, currentScenarioIndex, startConversation]);

  // =================== MESSAGE HANDLING ===================
  const sendMessage = useCallback(() => {
    if (message.trim() === "" || !currentScenario.steps) return;

    // User message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: message,
      sender: "user",
    };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setMessage("");
    setSuggestions([]);
    conversationChanged.current = true;

    // Bot response
    setIsTyping(true);

    setTimeout(() => {
      const nextStepIndex = currentStep + 1;

      if (nextStepIndex < currentScenario.steps.length) {
        const nextStep = currentScenario.steps[nextStepIndex];

        const botMessage = {
          id: `bot-${Date.now()}`,
          text: nextStep.botMessage,
          sender: "bot",
        };

        const conversationWithBot = [...updatedConversation, botMessage];
        setConversation(conversationWithBot);
        setCurrentStep(nextStepIndex);
        setSuggestions(nextStep.suggestions || []);

        // Save to history
        setConversationHistory(prev => ({
          ...prev,
          [currentScenarioIndex]: {
            conversation: conversationWithBot,
            updatedAt: new Date().toISOString(),
            timestamp: Date.now(),
          }
        }));

        // Mark as completed if last step
        if (nextStepIndex === currentScenario.steps.length - 1) {
          setCompletedScenarios(prev => ({
            ...prev,
            [currentScenarioIndex]: {
              completedAt: new Date().toISOString(),
              timestamp: Date.now(),
              messageCount: conversationWithBot.length,
            }
          }));
        }
      }

      setIsTyping(false);
    }, 1000);
  }, [message, currentScenario, currentStep, conversation, currentScenarioIndex]);

  // =================== NAVIGATION ACTIONS ===================
  const changeScenario = useCallback((newIndex) => {
    if (newIndex !== currentScenarioIndex && newIndex >= 0 && newIndex < scenarios.length) {
      setCurrentScenarioIndex(newIndex);
      setConversation([]);
      setCurrentStep(0);
      setSuggestions([]);
      setMessage("");
      setShowHelp(false);
      conversationChanged.current = false;
    }
  }, [currentScenarioIndex, scenarios.length]);

  const useSuggestion = useCallback((suggestion) => {
    setMessage(suggestion);
  }, []);

  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const completedScenariosCount = Object.values(completedScenarios).filter(Boolean).length;
    const totalProgress = totalScenarios > 0 ? Math.round((completedScenariosCount / totalScenarios) * 100) : 0;
    const completionProgress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

    return {
      totalScenarios,
      completedScenariosCount,
      totalProgress,
      completionProgress,
      currentStep: currentStep + 1,
      totalSteps
    };
  }, [completedScenarios, totalScenarios, totalSteps, currentStep]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const scenarioCounter = `${currentScenarioIndex + 1} / ${totalScenarios}`;
    const stepCounter = `${currentStep + 1} / ${totalSteps}`;
    const scenarioTitles = scenarios.map(scenario => scenario.title || "Scenario");
    
    return {
      scenarioCounter,
      stepCounter,
      scenarios: scenarioTitles,
      currentScenario,
      currentHelp: currentScenario.steps?.[currentStep]?.help || ""
    };
  }, [currentScenarioIndex, totalScenarios, currentStep, totalSteps, scenarios, currentScenario]);

  // =================== VALIDATION ===================
  const hasValidData = conversationData?.exercises && Array.isArray(conversationData.exercises) && conversationData.exercises.length > 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isConversationStarted = conversation.length > 0;

  return {
    // State
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
    
    // Data
    currentScenario,
    totalScenarios,
    totalSteps,
    hasValidData,
    
    // Actions
    changeScenario,
    sendMessage,
    useSuggestion,
    toggleHelp,
    toggleDetailedProgress,
    startConversation,
    
    // Computed
    isLastStep,
    isConversationStarted,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useConversation;