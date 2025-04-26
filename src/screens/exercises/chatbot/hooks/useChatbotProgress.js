import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de chatbot
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useChatbotProgress = (level) => {
  // États pour suivre la progression
  const [completedScenarios, setCompletedScenarios] = useState({});
  const [lastPosition, setLastPosition] = useState({ scenarioIndex: 0, stepIndex: 0 });
  const [conversationHistory, setConversationHistory] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_SCENARIOS_KEY = `chatbot_completed_${level}`;
  const LAST_POSITION_KEY = `chatbot_position_${level}`;
  const CONVERSATION_HISTORY_KEY = `chatbot_history_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les scénarios complétés
        const savedCompletedScenariosJson = await AsyncStorage.getItem(COMPLETED_SCENARIOS_KEY);
        const savedCompletedScenarios = savedCompletedScenariosJson 
          ? JSON.parse(savedCompletedScenariosJson) 
          : {};
        
        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { scenarioIndex: 0, stepIndex: 0 };
        
        // Récupérer l'historique des conversations
        const savedHistoryJson = await AsyncStorage.getItem(CONVERSATION_HISTORY_KEY);
        const savedHistory = savedHistoryJson 
          ? JSON.parse(savedHistoryJson) 
          : {};
        
        setCompletedScenarios(savedCompletedScenarios);
        setLastPosition(savedPosition);
        setConversationHistory(savedHistory);
        setLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données de progression:', error);
        setCompletedScenarios({});
        setLastPosition({ scenarioIndex: 0, stepIndex: 0 });
        setConversationHistory({});
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_SCENARIOS_KEY, LAST_POSITION_KEY, CONVERSATION_HISTORY_KEY]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (scenarioIndex, stepIndex) => {
    try {
      // Ajout du timestamp pour suivre la dernière activité
      const newPosition = { 
        scenarioIndex, 
        stepIndex,
        timestamp: Date.now()
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, [LAST_POSITION_KEY]);

  // Marquer un scénario comme complété
  const markScenarioAsCompleted = useCallback(async (scenarioIndex, conversation) => {
    try {
      // Mettre à jour les scénarios complétés
      const updatedCompletedScenarios = { ...completedScenarios };
      
      if (!updatedCompletedScenarios[scenarioIndex]) {
        updatedCompletedScenarios[scenarioIndex] = {
          completedAt: new Date().toISOString(),
          messageCount: conversation.length
        };
        
        setCompletedScenarios(updatedCompletedScenarios);
        await AsyncStorage.setItem(COMPLETED_SCENARIOS_KEY, JSON.stringify(updatedCompletedScenarios));
      }
      
      // Sauvegarder la conversation dans l'historique
      const updatedHistory = { ...conversationHistory };
      updatedHistory[scenarioIndex] = {
        conversation,
        updatedAt: new Date().toISOString()
      };
      
      setConversationHistory(updatedHistory);
      await AsyncStorage.setItem(CONVERSATION_HISTORY_KEY, JSON.stringify(updatedHistory));
      
    } catch (error) {
      console.error('Erreur lors du marquage du scénario comme complété:', error);
    }
  }, [completedScenarios, conversationHistory, COMPLETED_SCENARIOS_KEY, CONVERSATION_HISTORY_KEY]);

  // Enregistrer un message de conversation
  const saveConversationMessage = useCallback(async (scenarioIndex, message) => {
    try {
      const updatedHistory = { ...conversationHistory };
      
      // Initialiser l'objet de conversation si nécessaire
      if (!updatedHistory[scenarioIndex]) {
        updatedHistory[scenarioIndex] = {
          conversation: [],
          updatedAt: new Date().toISOString()
        };
      }
      
      // Ajouter le message à la conversation existante
      updatedHistory[scenarioIndex].conversation.push(message);
      updatedHistory[scenarioIndex].updatedAt = new Date().toISOString();
      
      setConversationHistory(updatedHistory);
      await AsyncStorage.setItem(CONVERSATION_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du message de conversation:', error);
    }
  }, [conversationHistory, CONVERSATION_HISTORY_KEY]);

  // Initialiser la progression
  const initializeProgress = useCallback((chatbotData) => {
    if (!initialized && loaded && chatbotData) {
      const scenarios = chatbotData.exercises || [];
      const newCompletedScenarios = { ...completedScenarios };
      
      // Vérifier si les données correspondent aux scénarios disponibles
      scenarios.forEach((_, index) => {
        // Initialiser uniquement les entrées manquantes
        if (!newCompletedScenarios[index]) {
          newCompletedScenarios[index] = null;
        }
      });
      
      setCompletedScenarios(newCompletedScenarios);
      setInitialized(true);
    }
  }, [completedScenarios, initialized, loaded]);

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalScenarios = Object.keys(completedScenarios).length;
    if (totalScenarios === 0) return 0;
    
    const completedCount = Object.values(completedScenarios).filter(Boolean).length;
    return (completedCount / totalScenarios) * 100;
  }, [completedScenarios]);

  return {
    completedScenarios,
    lastPosition,
    conversationHistory,
    loaded,
    saveLastPosition,
    markScenarioAsCompleted,
    saveConversationMessage,
    initializeProgress,
    calculateOverallProgress
  };
};

export default useChatbotProgress;