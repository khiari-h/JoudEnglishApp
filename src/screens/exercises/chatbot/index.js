import React, { useMemo, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, View } from 'react-native';

// Composants communs
import ExerciseHeader from '../../../components/exercise-common/ExerciseHeader';
import CategorySelector from '../../../components/exercise-common/CategorySelector';
import ProgressBar from '../../../components/ui/ProgressBar';

// Composants spécifiques au chatbot
import ChatbotMessageList from './ChatbotMessageList';
import ChatbotSuggestions from './ChatbotSuggestions';
import ChatbotInput from './ChatbotInput';
import ChatbotScenarioDescription from './ChatbotScenarioDescription';

// Hooks personnalisés
import useChatbotExerciseState from './hooks/useChatbotExerciceState';
import useChatbotProgress from './hooks/useChatbotProgress';

// Helpers
import { getChatbotData, getLevelColor } from '../../../utils/chatbot/chatbotDataHelper';

import styles from './style';

/**
 * Écran principal pour les exercices de chatbot
 */
const ChatbotExercise = ({ route }) => {
  const { level } = route.params || { level: 'A1' };
  
  // Récupérer les données et la couleur du niveau
  const levelColor = getLevelColor(level);
  const chatbotData = useMemo(() => getChatbotData(level), [level]);
  const allScenarios = useMemo(() => chatbotData.exercises || [], [chatbotData]);
  
  // Utiliser les hooks personnalisés
  const {
    completedScenarios,
    lastPosition,
    loaded,
    saveLastPosition,
    markScenarioAsCompleted,
    saveConversationMessage,
    initializeProgress,
  } = useChatbotProgress(level);
  
  const {
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
    currentScenario,
  } = useChatbotExerciseState(level, allScenarios);
  
  // Restaurer la dernière position quand les données sont chargées
  useEffect(() => {
    if (loaded && lastPosition) {
      // Changer de scénario va déclencher une nouvelle conversation
      changeScenario(lastPosition.scenarioIndex);
    }
  }, [loaded, lastPosition, changeScenario]);
  
  // Initialiser la progression
  useEffect(() => {
    if (loaded && chatbotData) {
      initializeProgress(chatbotData);
    }
  }, [loaded, chatbotData, initializeProgress]);
  
  // Gérer l'envoi d'un nouveau message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Sauvegarder le message
    saveConversationMessage(scenarioIndex, {
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    });
    
    // Envoyer le message
    sendMessage(message);
    
    // Si c'était le dernier message du scénario, marquer comme terminé
    if (currentStep === allScenarios[scenarioIndex]?.steps?.length - 1) {
      markScenarioAsCompleted(scenarioIndex, [...conversation, {
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      }]);
    }
  };
  
  // Gérer le changement de scénario
  const handleScenarioChange = (index) => {
    if (index !== scenarioIndex) {
      changeScenario(index);
      saveLastPosition(index, 0);
    }
  };
  
  // Obtenir le texte d'aide pour l'étape actuelle
  const getCurrentHelp = () => {
    if (!currentScenario || !currentScenario.steps || currentStep >= currentScenario.steps.length) {
      return '';
    }
    return currentScenario.steps[currentStep].help || '';
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec badge de niveau */}
      <ExerciseHeader
        title="Chatbot Writing"
        level={level}
        progress={completionProgress}
        onClose={() => route.navigation.goBack()}
        levelColor={levelColor}
      />
      
      {/* Sélecteur de scénarios */}
      <CategorySelector
        categories={allScenarios.map(scenario => scenario.title) || []}
        selectedIndex={scenarioIndex}
        onSelectCategory={handleScenarioChange}
        levelColor={levelColor}
        label="Scenarios:"
      />
      
      {/* Barre de progression */}
      <ProgressBar
        progress={completionProgress}
        currentValue={currentStep + 1}
        totalValue={currentScenario?.steps?.length || 0}
        color={levelColor}
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
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
          onPressSuggestion={useSuggestion}
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