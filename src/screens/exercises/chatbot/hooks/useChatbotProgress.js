// src/screens/exercises/chatbot/hooks/useChatbotProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de chatbot
 * Version optimisée pour sauvegarder la progression à des moments stratégiques
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
        console.log(`[ChatbotProgress] Chargement des données pour le niveau ${level}`);
        
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
        
        console.log(`[ChatbotProgress] Données chargées:`, { 
          completedScenarios: Object.keys(savedCompletedScenarios).length,
          position: savedPosition,
          conversationHistory: Object.keys(savedHistory).length
        });
        
        setCompletedScenarios(savedCompletedScenarios);
        setLastPosition(savedPosition);
        setConversationHistory(savedHistory);
        setLoaded(true);
      } catch (error) {
        console.error('[ChatbotProgress] Erreur lors du chargement des données:', error);
        setCompletedScenarios({});
        setLastPosition({ scenarioIndex: 0, stepIndex: 0 });
        setConversationHistory({});
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_SCENARIOS_KEY, LAST_POSITION_KEY, CONVERSATION_HISTORY_KEY, level]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (scenarioIndex, stepIndex) => {
    try {
      console.log(`[ChatbotProgress] Sauvegarde de la position: scénario ${scenarioIndex}, étape ${stepIndex}`);
      
      // Ajout du timestamp pour suivre la dernière activité
      const newPosition = { 
        scenarioIndex, 
        stepIndex,
        timestamp: Date.now()
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
      
      console.log(`[ChatbotProgress] Position sauvegardée avec succès`);
      return true;
    } catch (error) {
      console.error('[ChatbotProgress] Erreur lors de la sauvegarde de la position:', error);
      return false;
    }
  }, [LAST_POSITION_KEY]);

  // Marquer un scénario comme complété
  const markScenarioAsCompleted = useCallback(async (scenarioIndex, conversation) => {
    try {
      console.log(`[ChatbotProgress] Marquage du scénario ${scenarioIndex} comme complété`);
      
      // Mettre à jour les scénarios complétés
      const updatedCompletedScenarios = { ...completedScenarios };
      
      if (!updatedCompletedScenarios[scenarioIndex]) {
        updatedCompletedScenarios[scenarioIndex] = {
          completedAt: new Date().toISOString(),
          timestamp: Date.now(),
          messageCount: conversation.length
        };
        
        setCompletedScenarios(updatedCompletedScenarios);
        await AsyncStorage.setItem(COMPLETED_SCENARIOS_KEY, JSON.stringify(updatedCompletedScenarios));
        console.log(`[ChatbotProgress] Scénario marqué comme complété`);
      }
      
      return true;
    } catch (error) {
      console.error('[ChatbotProgress] Erreur lors du marquage du scénario:', error);
      return false;
    }
  }, [completedScenarios, COMPLETED_SCENARIOS_KEY]);

  // Sauvegarder une conversation complète
  const saveConversationMessage = useCallback(async (scenarioIndex, messageOrConversation) => {
    try {
      console.log(`[ChatbotProgress] Sauvegarde de la conversation pour le scénario ${scenarioIndex}`);
      
      const updatedHistory = { ...conversationHistory };
      
      // Si c'est un objet de conversation complet
      if (messageOrConversation.conversation) {
        updatedHistory[scenarioIndex] = {
          conversation: messageOrConversation.conversation,
          updatedAt: new Date().toISOString(),
          timestamp: Date.now()
        };
      } 
      // Si c'est un message unique à ajouter
      else {
        // Initialiser la conversation si nécessaire
        if (!updatedHistory[scenarioIndex]) {
          updatedHistory[scenarioIndex] = {
            conversation: [],
            updatedAt: new Date().toISOString(),
            timestamp: Date.now()
          };
        }
        
        // Ajouter le message à la conversation existante
        updatedHistory[scenarioIndex].conversation.push(messageOrConversation);
        updatedHistory[scenarioIndex].updatedAt = new Date().toISOString();
        updatedHistory[scenarioIndex].timestamp = Date.now();
      }
      
      setConversationHistory(updatedHistory);
      await AsyncStorage.setItem(CONVERSATION_HISTORY_KEY, JSON.stringify(updatedHistory));
      
      console.log(`[ChatbotProgress] Conversation sauvegardée avec succès`);
      return true;
    } catch (error) {
      console.error('[ChatbotProgress] Erreur lors de la sauvegarde de la conversation:', error);
      return false;
    }
  }, [conversationHistory, CONVERSATION_HISTORY_KEY]);

  // Initialiser la progression
  const initializeProgress = useCallback((chatbotData) => {
    if (!initialized && loaded && chatbotData) {
      console.log(`[ChatbotProgress] Initialisation de la progression`);
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
      console.log(`[ChatbotProgress] Progression initialisée pour ${scenarios.length} scénarios`);
    }
  }, [completedScenarios, initialized, loaded]);

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalScenarios = Object.keys(completedScenarios).length;
    if (totalScenarios === 0) return 0;
    
    const completedCount = Object.values(completedScenarios).filter(Boolean).length;
    const progress = (completedCount / totalScenarios) * 100;
    
    console.log(`[ChatbotProgress] Progression globale: ${progress.toFixed(1)}% (${completedCount}/${totalScenarios})`);
    return progress;
  }, [completedScenarios]);

  // Réinitialiser une conversation spécifique
  const resetConversation = useCallback(async (scenarioIndex) => {
    try {
      console.log(`[ChatbotProgress] Réinitialisation de la conversation ${scenarioIndex}`);
      
      const updatedHistory = { ...conversationHistory };
      if (updatedHistory[scenarioIndex]) {
        delete updatedHistory[scenarioIndex];
        setConversationHistory(updatedHistory);
        await AsyncStorage.setItem(CONVERSATION_HISTORY_KEY, JSON.stringify(updatedHistory));
      }
      
      // Mettre à jour la position si c'est le scénario actuel
      if (lastPosition.scenarioIndex === scenarioIndex) {
        saveLastPosition(scenarioIndex, 0);
      }
      
      console.log(`[ChatbotProgress] Conversation réinitialisée`);
      return true;
    } catch (error) {
      console.error('[ChatbotProgress] Erreur lors de la réinitialisation:', error);
      return false;
    }
  }, [conversationHistory, lastPosition, CONVERSATION_HISTORY_KEY, saveLastPosition]);

  // Réinitialiser toutes les données
  const resetAllProgress = useCallback(async () => {
    try {
      console.log(`[ChatbotProgress] Réinitialisation de toutes les données`);
      
      // Supprimer les données de l'AsyncStorage
      await AsyncStorage.multiRemove([
        COMPLETED_SCENARIOS_KEY,
        LAST_POSITION_KEY,
        CONVERSATION_HISTORY_KEY
      ]);
      
      // Réinitialiser les états
      setCompletedScenarios({});
      setLastPosition({ scenarioIndex: 0, stepIndex: 0 });
      setConversationHistory({});
      setInitialized(false);
      
      console.log(`[ChatbotProgress] Toutes les données ont été réinitialisées`);
      return true;
    } catch (error) {
      console.error('[ChatbotProgress] Erreur lors de la réinitialisation complète:', error);
      return false;
    }
  }, [COMPLETED_SCENARIOS_KEY, LAST_POSITION_KEY, CONVERSATION_HISTORY_KEY]);

  return {
    completedScenarios,
    lastPosition,
    conversationHistory,
    loaded,
    saveLastPosition,
    markScenarioAsCompleted,
    saveConversationMessage,
    initializeProgress,
    calculateOverallProgress,
    resetConversation,
    resetAllProgress
  };
};

export default useChatbotProgress;