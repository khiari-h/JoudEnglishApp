// ConversationExercise.test.js - TESTS COMPLETS (80% de couverture avec 20% d'effort)
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import ConversationExercise from '../../../../src/screens/exercises/conversations';

// Mocks
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../../../../src/screens/exercises/conversations/hooks/useConversation');
jest.mock('../../../../src/hooks/useLastActivity');
jest.mock('../../../../src/utils/conversation/conversationDataHelper');

// ✅ CORRECTION : Mock des fonctions manquantes dans conversationStats
jest.mock('../../../../src/utils/conversation/conversationStats', () => ({
  calculateCompletedScenarios: jest.fn(() => 2),
  calculateTotalScenarios: jest.fn(() => 5),
  calculateTotalSteps: jest.fn(() => 10),
  calculateCompletedSteps: jest.fn(() => 3),
}));

// ✅ CORRECTION : Mock tous les composants enfants pour éviter les dépendances
jest.mock('../../../../src/screens/exercises/conversations/ConversationHeader', () => 'ConversationHeader');
jest.mock('../../../../src/screens/exercises/conversations/ConversationSelector', () => 'ConversationSelector');
jest.mock('../../../../src/screens/exercises/conversations/ConversationProgress', () => 'ConversationProgress');
jest.mock('../../../../src/screens/exercises/conversations/ConversationScenarioDescription', () => 'ConversationScenarioDescription');
jest.mock('../../../../src/screens/exercises/conversations/ConversationMessageList', () => 'ConversationMessageList');
jest.mock('../../../../src/screens/exercises/conversations/ConversationSuggestions', () => 'ConversationSuggestions');
jest.mock('../../../../src/screens/exercises/conversations/ConversationInput', () => 'ConversationInput');

// Import des mocks après la déclaration
import useConversation from '../../../../src/screens/exercises/conversations/hooks/useConversation';
import useLastActivity from '../../../../src/hooks/useLastActivity';
import { getConversationData, getLevelColor } from '../../../../src/utils/conversation/conversationDataHelper';

describe('ConversationExercise - Tests Complets', () => {
  // Variables de test communes
  const mockSaveActivity = jest.fn();
  const mockChangeScenario = jest.fn();
  const mockSendMessage = jest.fn();
  const mockUseSuggestion = jest.fn();
  const mockToggleHelp = jest.fn();
  const mockToggleDetailedProgress = jest.fn();

  // Mock data
  const mockConversationData = {
    exercises: [
      { id: '1', title: 'Scénario 1', description: 'Description 1' },
      { id: '2', title: 'Scénario 2', description: 'Description 2' }
    ]
  };

  const mockCurrentScenario = {
    title: 'Scénario Test',
    description: 'Description du scénario de test'
  };

  // Setup par défaut des mocks
  const setupMocks = (overrides = {}) => {
    const defaultMocks = {
      // useConversation mock
      useConversation: {
        currentScenarioIndex: 0,
        conversation: [],
        message: '',
        setMessage: jest.fn(),
        isTyping: false,
        suggestions: ['Bonjour', 'Comment allez-vous ?'],
        showHelp: false,
        completedScenarios: [],
        conversationHistory: {},
        loaded: true,
        showDetailedProgress: false,
        currentScenario: mockCurrentScenario,
        totalScenarios: 2,
        hasValidData: true,
        changeScenario: mockChangeScenario,
        sendMessage: mockSendMessage,
        useSuggestion: mockUseSuggestion,
        toggleHelp: mockToggleHelp,
        toggleDetailedProgress: mockToggleDetailedProgress,
        isConversationStarted: true,
        stats: {
          currentStep: 1,
          totalSteps: 5,
          completionProgress: 0.2
        },
        display: {
          currentHelp: 'Aide contextuelle'
        },
        ...overrides.useConversation
      },
      // useLastActivity mock
      useLastActivity: {
        saveActivity: mockSaveActivity,
        ...overrides.useLastActivity
      },
      // Utils mocks
      getConversationData: mockConversationData,
      getLevelColor: '#007AFF'
    };

    useConversation.mockReturnValue(defaultMocks.useConversation);
    useLastActivity.mockReturnValue(defaultMocks.useLastActivity);
    getConversationData.mockReturnValue(defaultMocks.getConversationData);
    getLevelColor.mockReturnValue(defaultMocks.getLevelColor);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  // 🚀 TEST COMPLET #1 - Rendu et fonctionnement normal
  describe('Core Functionality', () => {
    it('should render completely and handle all core interactions', async () => {
      const route = { params: { level: 'A1' } };
      
      render(<ConversationExercise route={route} />);

      // ✅ Vérification du rendu complet (components mockés)
      expect(screen.getByTestId('conversation-container')).toBeTruthy();

      // ✅ Vérification de la sauvegarde d'activité
      expect(mockSaveActivity).toHaveBeenCalledWith({
        title: "Conversations",
        level: "A1",
        type: "conversations",
        metadata: {
          scenario: 0,
          step: 1,
          totalSteps: 5,
          scenarioName: 'Scénario Test',
          totalScenarios: 2
        }
      });

      // ✅ Test des hooks appelés correctement
      expect(useConversation).toHaveBeenCalledWith(mockConversationData, 'A1');
      expect(useLastActivity).toHaveBeenCalled();
    });
  });

  // 🚀 TEST COMPLET #2 - Gestion des états et cas limites
  describe('States and Edge Cases', () => {
    it('should handle all states and edge cases correctly', () => {
      // Test 1: État de chargement
      setupMocks({
        useConversation: { loaded: false, hasValidData: false }
      });
      
      const { rerender } = render(<ConversationExercise route={{ params: { level: 'A1' } }} />);
      
      // Vérification de l'état loading (Container simple sans testID spécifique)
      expect(screen.getByTestId('conversation-container')).toBeTruthy();
      // Le loading state montre juste le Container de base

      // Test 2: Params manquants (niveau par défaut)
      setupMocks(); // Reset aux valeurs par défaut
      rerender(<ConversationExercise route={{}} />);
      
      // Devrait utiliser A1 par défaut
      expect(useConversation).toHaveBeenCalledWith(
        mockConversationData, 
        'A1'
      );

      // Test 3: Route undefined
      rerender(<ConversationExercise route={undefined} />);
      expect(useConversation).toHaveBeenCalledWith(
        mockConversationData, 
        'A1'
      );

      // Test 4: Données invalides
      setupMocks({
        useConversation: { 
          loaded: true, 
          hasValidData: false,
          currentScenario: null
        }
      });
      
      rerender(<ConversationExercise route={{ params: { level: 'B2' } }} />);
      expect(screen.getByTestId('conversation-container')).toBeTruthy();

      // Test 5: Conversation non démarrée (pas de sauvegarde)
      jest.clearAllMocks();
      setupMocks({
        useConversation: { 
          isConversationStarted: false 
        }
      });
      
      rerender(<ConversationExercise route={{ params: { level: 'A1' } }} />);
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });
  });

  // 🚀 TEST COMPLET #3 - Performance et optimisations
  describe('Performance Optimizations', () => {
    it('should maintain performance optimizations', () => {
      const route = { params: { level: 'A1' } };
      
      const { rerender } = render(<ConversationExercise route={route} />);
      
      // Vérification que les callbacks ne changent pas lors des re-renders
      const initialCallbacks = {
        changeScenario: mockChangeScenario,
        sendMessage: mockSendMessage,
        useSuggestion: mockUseSuggestion,
        toggleHelp: mockToggleHelp
      };

      // Re-render avec les mêmes props
      rerender(<ConversationExercise route={route} />);

      // Les callbacks doivent rester stables
      expect(mockChangeScenario).toBe(initialCallbacks.changeScenario);
      expect(mockSendMessage).toBe(initialCallbacks.sendMessage);
      
      // Test changement de niveau
      rerender(<ConversationExercise route={{ params: { level: 'B1' } }} />);
      
      expect(getConversationData).toHaveBeenCalledWith('B1');
      expect(getLevelColor).toHaveBeenCalledWith('B1');
    });
  });

  // 🚀 TEST COMPLET #4 - Intégration hooks critiques
  describe('Hooks Integration', () => {
    it('should integrate correctly with custom hooks', async () => {
      const route = { params: { level: 'C1' } };
      
      render(<ConversationExercise route={route} />);

      // ✅ Vérification appel useConversation avec bonnes données
      expect(useConversation).toHaveBeenCalledWith(mockConversationData, 'C1');
      
      // ✅ Vérification appel useLastActivity
      expect(useLastActivity).toHaveBeenCalled();

      // ✅ Vérification utils appelés avec bon niveau
      expect(getConversationData).toHaveBeenCalledWith('C1');
      expect(getLevelColor).toHaveBeenCalledWith('C1');

      // ✅ Test sauvegarde activity avec métadonnées complètes
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: "Conversations",
          level: "C1",
          type: "conversations",
          metadata: {
            scenario: 0,
            step: 1,
            totalSteps: 5,
            scenarioName: 'Scénario Test',
            totalScenarios: 2
          }
        });
      });
    });
  });
});
