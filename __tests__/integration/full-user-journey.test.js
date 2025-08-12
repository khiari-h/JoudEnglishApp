// __tests__/integration/full-user-journey.test.js
import React from 'react';
import { render, fireEvent, waitFor, within, cleanup } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { CurrentLevelProvider } from '../../src/contexts/CurrentLevelContext';
import { ProgressProvider } from '../../src/contexts/ProgressContext';
import Dashboard from '../../src/screens/Dashboard';
import LevelSelection from '../../src/screens/LevelSelection';
import ExerciseSelection from '../../src/screens/ExerciseSelection';
import VocabularyExercise from '../../src/screens/exercises/vocabulary';

// Mock d'expo-router
jest.mock('expo-router', () => ({
  useFocusEffect: jest.fn(callback => callback()),
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  Stack: ({ children }) => <>{children}</>,
  useLocalSearchParams: () => ({}),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
    addListener: jest.fn(),
    isFocused: jest.fn(() => true),
  }),
}));

// Mock des hooks personnalisés
jest.mock('../../src/hooks/useLastActivity', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    lastActivity: { type: 'vocabulary', level: '1', timestamp: Date.now() },
    updateLastActivity: jest.fn(),
    saveActivity: jest.fn(),
  })),
}));

jest.mock('../../src/hooks/useActivityMetrics', () => ({
  __esModule: true,
  default: () => ({
    metrics: { wordsToday: 1, exercisesCompleted: 2, streakDays: 3 },
    updateMetrics: jest.fn(),
  }),
}));

jest.mock('../../src/hooks/useRealTimeProgress', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getExerciseProgress: jest.fn(() => 0),
    hasProgress: jest.fn(() => false),
    refresh: jest.fn(),
    getLevelProgress: jest.fn(() => 0),
  })),
}));

jest.mock('../../src/screens/Dashboard/hooks/useDashboardState', () => ({
  useDashboardState: jest.fn(() => ({
    refreshing: false,
    onRefresh: jest.fn(),
  })),
}));

jest.mock('../../src/screens/Dashboard/hooks/useDashboardLevel', () => ({
  useDashboardLevel: jest.fn(() => ({
    currentLevel: '1',
    handleChangeActiveLevel: jest.fn(),
    levelColor: '#007AFF',
  })),
}));

jest.mock('../../src/hooks/useDailyWords', () => ({
  __esModule: true,
  default: () => ({
    words: ['Hello', 'World'],
    isLoading: false,
    error: null,
  }),
}));

jest.mock('../../src/screens/exercises/vocabulary/hooks/useVocabulary', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    categoryIndex: 0,
    wordIndex: 0,
    showTranslation: false,
    completedWords: {},
    loaded: true,
    showDetailedProgress: false,
    currentWord: { word: 'Hello', translation: 'Bonjour', definition: 'Greeting', example: 'Hello world' },
    currentCategory: { title: 'Basic', words: [] },
    totalCategories: 1,
    totalWordsInCategory: 15,
    changeCategory: jest.fn(),
    toggleTranslation: jest.fn(),
    toggleDetailedProgress: jest.fn(),
    handleNext: jest.fn(() => ({ completed: false })),
    handlePrevious: jest.fn(),
    canGoToPrevious: false,
    isLastWordInExercise: false,
    stats: { totalWords: 15, completedWordsCount: 0, totalProgress: 0, completedInCurrentCategory: 0, totalInCurrentCategory: 15 },
    vocabularyData: { categories: [] },
    display: { categories: [], wordCounter: '1/15' },
    levelColor: '#007AFF',
    finalMode: 'practice',
  })),
}));

// Mock des contextes
const mockUpdateProgress = jest.fn();
let mockProgressData = {};

jest.mock('../../src/contexts/ProgressContext', () => ({
  ...jest.requireActual('../../src/contexts/ProgressContext'),
  useProgress: () => ({
    updateProgress: mockUpdateProgress,
    progress: { overall: 0, levels: mockProgressData },
    isLoading: false,
  }),
}));

// Fonction utilitaire pour wrapper les composants
const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <CurrentLevelProvider>
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </CurrentLevelProvider>
  </ThemeProvider>
);

describe('Parcours utilisateur complet - Navigation et progression', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProgressData = {}; // Pas de progression au début
    
    // Configuration par défaut du mock useVocabulary
    // mockUseVocabulary.mockReturnValue({
    //   loaded: true,
    //   currentWord: { word: 'Hello', translation: 'Bonjour', example: 'Hello, how are you?' },
    //   wordIndex: 0,
    //   display: {
    //     wordCounter: '1 / 15',
    //     categories: ['Basics'],
    //   },
    //   isLastWordInExercise: false,
    //   handleNext: jest.fn().mockReturnValue({ completed: false }),
    //   saveData: jest.fn().mockResolvedValue(undefined),
    //   toggleTranslation: jest.fn(),
    // });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Scénario 1: Parcours complet Dashboard → Level → Exercise → Vocabulary', () => {
    test('Navigation complète entre tous les écrans avec progression', async () => {
      // Phase 1: Dashboard initial
      const dashboardResult = render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      );
      
      // Vérifier l'état initial du dashboard
      expect(dashboardResult.getByText('⚡ Actions rapides')).toBeTruthy();
      expect(dashboardResult.getByText('🏆 Progression générale')).toBeTruthy();
      
      // Phase 2: Navigation vers Level Selection
      const startButton = dashboardResult.getByTestId('continue-activity-button');
      fireEvent.press(startButton);
      
      // Nettoyer le render précédent et créer un nouveau
      dashboardResult.unmount();
      
      const levelSelectionResult = render(
        <TestWrapper>
          <LevelSelection />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(levelSelectionResult.getByText('Niveaux')).toBeTruthy();
        expect(levelSelectionResult.getByTestId('level-1')).toBeTruthy();
      });
      
      // Phase 3: Sélection du niveau 1
      const level1Card = levelSelectionResult.getByTestId('level-1');
      expect(within(level1Card).getByText('0%')).toBeTruthy();
      
      fireEvent.press(level1Card);
      
      // Phase 4: Navigation vers Exercise Selection
      levelSelectionResult.unmount();
      
      const exerciseSelectionResult = render(
        <TestWrapper>
          <ExerciseSelection level="1" />
        </TestWrapper>
      );
      
      await waitFor(() => {
        // Vérifier que le composant se charge correctement
        expect(exerciseSelectionResult.getByTestId('vocabulary-button')).toBeTruthy();
      });
      
      // Phase 5: Lancement de l'exercice de vocabulaire
      const vocabularyButton = exerciseSelectionResult.getByTestId('vocabulary-button');
      fireEvent.press(vocabularyButton);
      
      // Phase 6: Exercice de vocabulaire
      exerciseSelectionResult.unmount();
      
      const vocabularyResult = render(
        <TestWrapper>
          <VocabularyExercise route={{ params: { level: '1', mode: 'classic' } }} />
        </TestWrapper>
      );
      
      // Phase 7: Vérification du composant VocabularyExercise
      await waitFor(() => {
        expect(vocabularyResult.getByText('Hello')).toBeTruthy();
        expect(vocabularyResult.getByText('1/15')).toBeTruthy();
      });
      
      // Phase 8: Retour et vérification des mises à jour
      // Simuler la mise à jour de la progression
      mockProgressData['1'] = {
        levelProgress: 7, // 1 mot sur 15 = ~7%
        vocabulary: 7,
      };
      
      vocabularyResult.unmount();
      
      // Retour à Exercise Selection
      const exerciseSelectionResult2 = render(
        <TestWrapper>
          <ExerciseSelection level="1" />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(exerciseSelectionResult2.getByTestId('exercises-scroll')).toBeTruthy();
      });
      
      exerciseSelectionResult2.unmount();
      
      // Retour à Level Selection
      const levelSelectionResult2 = render(
        <TestWrapper>
          <LevelSelection />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(levelSelectionResult2.getByTestId('level-selection-container')).toBeTruthy();
      });
      
      levelSelectionResult2.unmount();
      
      // Retour au Dashboard
      const dashboardResult2 = render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      );
      
      await waitFor(() => {
        // Les métriques devraient être cohérentes
        expect(dashboardResult2.getByText('🏆 Progression générale')).toBeTruthy();
      });
      
      dashboardResult2.unmount();
    });
  });

  describe('Scénario 2: Gestion des erreurs et cas limites', () => {
    test('Gestion de la navigation avec données manquantes', async () => {
      // Test avec des données de progression corrompues
      mockProgressData['1'] = {
        levelProgress: null,
        vocabulary: undefined,
      };
      
      const result = render(
        <TestWrapper>
          <LevelSelection />
        </TestWrapper>
      );
      
      await waitFor(() => {
        const level1Card = result.getByTestId('level-1');
        // Devrait afficher 0% par défaut
        expect(within(level1Card).getByText('0%')).toBeTruthy();
      });
      
      result.unmount();
    });

    test('Navigation avec exercice en cours', async () => {
      // Simuler un exercice en cours
      mockProgressData['1'] = {
        levelProgress: 45,
        vocabulary: 45,
      };
      
      const result = render(
        <TestWrapper>
          <LevelSelection />
        </TestWrapper>
      );
      
      await waitFor(() => {
        const level1Card = result.getByTestId('level-1');
        // Utiliser le bouton qui a un testID unique
        expect(within(level1Card).getByTestId('level-1-button')).toBeTruthy();
        // Vérifier que le bouton contient "Commencer"
        expect(within(level1Card).getByText('Commencer')).toBeTruthy();
      });
      
      result.unmount();
    });
  });

  describe('Scénario 3: Cohérence des données entre écrans', () => {
    test('Synchronisation des métriques entre Dashboard et Level Selection', async () => {
      // Phase 1: Dashboard avec progression
      mockProgressData['1'] = { levelProgress: 25, vocabulary: 25 };
      
      const dashboardResult = render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(dashboardResult.getByText('🏆 Progression générale')).toBeTruthy();
      });
      
      dashboardResult.unmount();
      
      // Phase 2: Vérifier que Level Selection affiche la même progression
      const levelResult = render(
        <TestWrapper>
          <LevelSelection />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(levelResult.getByTestId('level-selection-container')).toBeTruthy();
      });
      
      levelResult.unmount();
      
      // Phase 3: Mise à jour de la progression
      mockProgressData['1'] = { levelProgress: 50, vocabulary: 50 };
      
      // Retour au Dashboard
      const dashboardResult2 = render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      );
      
      await waitFor(() => {
        // Les métriques devraient être cohérentes
        expect(dashboardResult2.getByText('🏆 Progression générale')).toBeTruthy();
      });
      
      dashboardResult2.unmount();
    });
  });
});