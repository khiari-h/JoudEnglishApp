// src/screens/exercises/Conversation/hooks/useConversationProgress.js
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook personnalisé pour gérer la progression dans les exercices de Conversation
 * Version optimisée pour sauvegarder la progression à des moments stratégiques
 *
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useConversationProgress = (level) => {
  // États pour suivre la progression
  const [completedScenarios, setCompletedScenarios] = useState({});
  const [lastPosition, setLastPosition] = useState({
    scenarioIndex: 0,
    stepIndex: 0,
  });
  const [conversationHistory, setConversationHistory] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_SCENARIOS_KEY = `Conversation_completed_${level}`;
  const LAST_POSITION_KEY = `Conversation_position_${level}`;
  const CONVERSATION_HISTORY_KEY = `Conversation_history_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les scénarios complétés
        const savedCompletedScenariosJson = await AsyncStorage.getItem(
          COMPLETED_SCENARIOS_KEY
        );
        const savedCompletedScenarios = savedCompletedScenariosJson
          ? JSON.parse(savedCompletedScenariosJson)
          : {};

        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson
          ? JSON.parse(savedPositionJson)
          : { scenarioIndex: 0, stepIndex: 0 };

        // Récupérer l'historique des conversations
        const savedHistoryJson = await AsyncStorage.getItem(
          CONVERSATION_HISTORY_KEY
        );
        const savedHistory = savedHistoryJson
          ? JSON.parse(savedHistoryJson)
          : {};

        setCompletedScenarios(savedCompletedScenarios);
        setLastPosition(savedPosition);
        setConversationHistory(savedHistory);
        setLoaded(true);
      } catch (error) {
        setCompletedScenarios({});
        setLastPosition({ scenarioIndex: 0, stepIndex: 0 });
        setConversationHistory({});
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [
    COMPLETED_SCENARIOS_KEY,
    LAST_POSITION_KEY,
    CONVERSATION_HISTORY_KEY,
    level,
  ]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(
    async (scenarioIndex, stepIndex) => {
      try {
        // Ajout du timestamp pour suivre la dernière activité
        const newPosition = {
          scenarioIndex,
          stepIndex,
          timestamp: Date.now(),
        };
        setLastPosition(newPosition);
        await AsyncStorage.setItem(
          LAST_POSITION_KEY,
          JSON.stringify(newPosition)
        );

        return true;
      } catch (error) {
        return false;
      }
    },
    [LAST_POSITION_KEY]
  );

  // Marquer un scénario comme complété
  const markScenarioAsCompleted = useCallback(
    async (scenarioIndex, conversation) => {
      try {
        // Mettre à jour les scénarios complétés
        const updatedCompletedScenarios = { ...completedScenarios };

        if (!updatedCompletedScenarios[scenarioIndex]) {
          updatedCompletedScenarios[scenarioIndex] = {
            completedAt: new Date().toISOString(),
            timestamp: Date.now(),
            messageCount: conversation.length,
          };

          setCompletedScenarios(updatedCompletedScenarios);
          await AsyncStorage.setItem(
            COMPLETED_SCENARIOS_KEY,
            JSON.stringify(updatedCompletedScenarios)
          );
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    [completedScenarios, COMPLETED_SCENARIOS_KEY]
  );

  // Sauvegarder une conversation complète
  const saveConversationMessage = useCallback(
    async (scenarioIndex, messageOrConversation) => {
      try {
        const updatedHistory = { ...conversationHistory };

        // Si c'est un objet de conversation complet
        if (messageOrConversation.conversation) {
          updatedHistory[scenarioIndex] = {
            conversation: messageOrConversation.conversation,
            updatedAt: new Date().toISOString(),
            timestamp: Date.now(),
          };
        }
        // Si c'est un message unique à ajouter
        else {
          // Initialiser la conversation si nécessaire
          if (!updatedHistory[scenarioIndex]) {
            updatedHistory[scenarioIndex] = {
              conversation: [],
              updatedAt: new Date().toISOString(),
              timestamp: Date.now(),
            };
          }

          // Ajouter le message à la conversation existante
          updatedHistory[scenarioIndex].conversation.push(
            messageOrConversation
          );
          updatedHistory[scenarioIndex].updatedAt = new Date().toISOString();
          updatedHistory[scenarioIndex].timestamp = Date.now();
        }

        setConversationHistory(updatedHistory);
        await AsyncStorage.setItem(
          CONVERSATION_HISTORY_KEY,
          JSON.stringify(updatedHistory)
        );

        return true;
      } catch (error) {
        return false;
      }
    },
    [conversationHistory, CONVERSATION_HISTORY_KEY]
  );

  // Initialiser la progression
  const initializeProgress = useCallback(
    (ConversationData) => {
      if (!initialized && loaded && ConversationData) {
        const scenarios = ConversationData.exercises || [];
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
    },
    [completedScenarios, initialized, loaded]
  );

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalScenarios = Object.keys(completedScenarios).length;
    if (totalScenarios === 0) return 0;

    const completedCount =
      Object.values(completedScenarios).filter(Boolean).length;
    const progress = (completedCount / totalScenarios) * 100;

    return progress;
  }, [completedScenarios]);

  // Réinitialiser une conversation spécifique
  const resetConversation = useCallback(
    async (scenarioIndex) => {
      try {
        const updatedHistory = { ...conversationHistory };
        if (updatedHistory[scenarioIndex]) {
          delete updatedHistory[scenarioIndex];
          setConversationHistory(updatedHistory);
          await AsyncStorage.setItem(
            CONVERSATION_HISTORY_KEY,
            JSON.stringify(updatedHistory)
          );
        }

        // Mettre à jour la position si c'est le scénario actuel
        if (lastPosition.scenarioIndex === scenarioIndex) {
          saveLastPosition(scenarioIndex, 0);
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    [
      conversationHistory,
      lastPosition,
      CONVERSATION_HISTORY_KEY,
      saveLastPosition,
    ]
  );

  // Réinitialiser toutes les données
  const resetAllProgress = useCallback(async () => {
    try {
      // Supprimer les données de l'AsyncStorage
      await AsyncStorage.multiRemove([
        COMPLETED_SCENARIOS_KEY,
        LAST_POSITION_KEY,
        CONVERSATION_HISTORY_KEY,
      ]);

      // Réinitialiser les états
      setCompletedScenarios({});
      setLastPosition({ scenarioIndex: 0, stepIndex: 0 });
      setConversationHistory({});
      setInitialized(false);

      return true;
    } catch (error) {
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
    resetAllProgress,
  };
};

export default useConversationProgress;
