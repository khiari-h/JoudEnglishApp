import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de Conversation
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {Array} scenarios - Liste des scénarios disponibles
 */
const useConversationExerciseState = (level, scenarios = []) => {
  // États pour la conversation et la navigation
  const [conversation, setConversation] = useState([]);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  
  // Ref pour suivre l'initialisation
  const isInitialized = useRef(false);
  
  // Réinitialiser la conversation lorsque le scénario change
  useEffect(() => {
    if (scenarios.length > 0 && !isInitialized.current) {
      startConversation();
      isInitialized.current = true;
    }
  }, [scenarios, scenarioIndex]);
  
  // Démarrer une nouvelle conversation
  const startConversation = useCallback(() => {
    if (scenarios.length === 0 || !scenarios[scenarioIndex]) return;
    
    // Réinitialiser l'état
    setConversation([]);
    setCurrentStep(0);
    setCompletionProgress(0);
    
    // Lancer la conversation avec un délai pour simuler le chargement
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const currentScenario = scenarios[scenarioIndex];
        if (currentScenario.steps && currentScenario.steps.length > 0) {
          const newMessage = {
            id: 1,
            text: currentScenario.steps[0].botMessage,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          
          setConversation([newMessage]);
          setSuggestions(currentScenario.steps[0].suggestions || []);
          setIsTyping(false);
          updateProgress();
        }
      }, 1500);
    }, 500);
  }, [scenarios, scenarioIndex]);
  
  // Mettre à jour la progression
  const updateProgress = useCallback(() => {
    if (!scenarios[scenarioIndex] || !scenarios[scenarioIndex].steps) return;
    
    const totalSteps = scenarios[scenarioIndex].steps.length;
    const progress = (currentStep / totalSteps) * 100;
    setCompletionProgress(progress);
  }, [currentStep, scenarioIndex, scenarios]);
  
  // Envoyer un message
  const sendMessage = useCallback((text) => {
    if (!text.trim() || !scenarios[scenarioIndex]) return;
    
    const currentScenario = scenarios[scenarioIndex];
    if (!currentScenario.steps) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: conversation.length + 1,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage(''); // Effacer l'input
    setSuggestions([]); // Effacer les suggestions
    
    // Vérifier s'il reste des étapes dans le scénario
    if (currentStep < currentScenario.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Simuler la frappe du bot
      setIsTyping(true);
      
      setTimeout(() => {
        // Réponse du bot
        const botResponse = {
          id: conversation.length + 2,
          text: currentScenario.steps[nextStep].botMessage,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        
        setConversation(prev => [...prev, botResponse]);
        setSuggestions(currentScenario.steps[nextStep].suggestions || []);
        setIsTyping(false);
        updateProgress();
      }, 1500);
    } else {
      // Fin de la conversation
      setCompletionProgress(100);
    }
  }, [conversation, currentStep, scenarioIndex, scenarios, updateProgress]);
  
  // Changer de scénario
  const changeScenario = useCallback((index) => {
    if (index !== scenarioIndex && index >= 0 && index < scenarios.length) {
      setScenarioIndex(index);
      setConversation([]);
      setCurrentStep(0);
      setCompletionProgress(0);
      setIsTyping(false);
      setSuggestions([]);
      setMessage('');
      
      // Réinitialiser le flag pour forcer une nouvelle initialisation
      isInitialized.current = false;
    }
  }, [scenarioIndex, scenarios]);
  
  // Basculer l'affichage de l'aide
  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);
  
  // Utiliser une suggestion
  const useSuggestion = useCallback((suggestion) => {
    setMessage(suggestion);
  }, []);
  
  return {
    conversation,
    scenarioIndex,
    currentStep,
    isTyping,
    message,
    setMessage,
    suggestions,
    showHelp,
    completionProgress,
    startConversation,
    sendMessage,
    changeScenario,
    toggleHelp,
    useSuggestion,
    currentScenario: scenarios[scenarioIndex] || null,
  };
};

export default useConversationExerciseState;