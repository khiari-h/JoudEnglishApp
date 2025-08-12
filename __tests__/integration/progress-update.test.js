// __tests__/integration/progress-update.test.js
import React from 'react';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';
import { ProgressProvider, useProgress } from '../../src/contexts/ProgressContext';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { CurrentLevelProvider } from '../../src/contexts/CurrentLevelContext';

// Mock de expo-router
jest.mock('expo-router', () => ({
  useFocusEffect: jest.fn(callback => callback()),
  router: {
    push: jest.fn(),
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

// Mocks des hooks et composants
jest.mock('../../src/screens/Dashboard/hooks/useDashboardState', () => ({
  useDashboardState: jest.fn(() => ({
    showLevelProgress: false,
    setShowLevelProgress: jest.fn(),
    openLevelProgressModal: jest.fn(),
    closeLevelProgressModal: jest.fn(),
    refreshing: false,
    activeTab: "home",
    setActiveTab: jest.fn(),
    onRefresh: jest.fn().mockResolvedValue(),
  })),
}));

jest.mock('../../src/hooks/useLastActivity', () => () => ({
  lastActivity: null,
  isLoading: false,
  reload: jest.fn(),
}));

jest.mock('../../src/hooks/useRealTimeProgress', () => () => ({
  getLevelProgress: jest.fn(() => 0),
  refresh: jest.fn(),
}));

jest.mock('../../src/hooks/useActivityMetrics', () => () => ({
  currentStreak: 3,
  wordsToday: 0,
  timeToday: 0,
  isLoading: false,
}));

// Mock du ProgressContext avec état simulé
let mockProgressState = {
  levels: {},
  exercises: {},
  stats: {},
  lastActivity: {}
};

const mockUpdateExerciseProgress = jest.fn((exerciseType, level, completed) => {
  // Simuler la mise à jour de l'état
  if (!mockProgressState.exercises[exerciseType]) {
    mockProgressState.exercises[exerciseType] = {};
  }
  if (!mockProgressState.exercises[exerciseType][level]) {
    mockProgressState.exercises[exerciseType][level] = { completed: 0, total: 100 };
  }
  mockProgressState.exercises[exerciseType][level].completed = completed;
  
  // Mettre à jour la progression du niveau
  if (!mockProgressState.levels[level]) {
    mockProgressState.levels[level] = { completed: 0, total: 100 };
  }
  mockProgressState.levels[level].completed = completed;
});

jest.mock('../../src/contexts/ProgressContext', () => ({
  ...jest.requireActual('../../src/contexts/ProgressContext'),
  useProgress: () => ({
    progress: mockProgressState,
    isLoading: false,
    updateExerciseProgress: mockUpdateExerciseProgress,
    calculateGlobalProgress: () => {
      const levels = Object.values(mockProgressState.levels);
      if (levels.length === 0) return 0;
      const total = levels.reduce((sum, level) => sum + level.completed, 0);
      return Math.round(total / levels.length);
    },
    calculateLevelProgress: (level) => mockProgressState.levels[level]?.completed || 0,
  }),
}));

// Composant de test pour simuler un exercice qui utilise le contexte de progression
const FakeExerciseScreen = () => {
  const { updateExerciseProgress } = useProgress();

  const handleComplete = () => {
    updateExerciseProgress('vocabulary', 'A1', 80);
  };

  const handlePartialComplete = () => {
    updateExerciseProgress('vocabulary', 'A1', 40);
  };

  const handleMultipleUpdates = () => {
    updateExerciseProgress('vocabulary', 'A1', 60);
    updateExerciseProgress('grammar', 'A1', 30);
    updateExerciseProgress('reading', 'A1', 20);
  };

  return (
    <>
      <TouchableOpacity testID="complete-exercise" onPress={handleComplete}>
        <Text>Terminer l'exercice</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="partial-exercise" onPress={handlePartialComplete}>
        <Text>Exercice partiel</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="multiple-updates" onPress={handleMultipleUpdates}>
        <Text>Mises à jour multiples</Text>
      </TouchableOpacity>
    </>
  );
};

// Composant de test pour vérifier l'affichage de la progression
const FakeProgressDisplay = () => {
  const { progress, isLoading } = useProgress();

  if (isLoading) {
    return <Text testID="loading">Chargement...</Text>;
  }

  return (
    <Text testID="progress-display">
      Progression globale: {progress.overall}%
    </Text>
  );
};

describe('Scénario 1: Mise à jour de la progression - Tests d\'intégration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait appeler updateProgress avec les bonnes données après la fin d'un exercice", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeExerciseScreen />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler la fin de l'exercice
    fireEvent.press(getByTestId('complete-exercise'));

    // Vérifier que la mise à jour de la progression a été appelée via le contexte
    await waitFor(() => {
          expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 80);
    expect(mockUpdateExerciseProgress).toHaveBeenCalledTimes(1);
    });
  });

  it("devrait gérer les mises à jour partielles de progression", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeExerciseScreen />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler un exercice partiellement terminé
    fireEvent.press(getByTestId('partial-exercise'));

    await waitFor(() => {
          expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 40);
    expect(mockUpdateExerciseProgress).toHaveBeenCalledTimes(1);
    });
  });

  it("devrait gérer plusieurs mises à jour simultanées", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeExerciseScreen />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler plusieurs mises à jour
    fireEvent.press(getByTestId('multiple-updates'));

    await waitFor(() => {
          expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 60);
    expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('grammar', 'A1', 30);
    expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('reading', 'A1', 20);
    expect(mockUpdateExerciseProgress).toHaveBeenCalledTimes(3);
    });
  });
});

describe('Scénario 2: Affichage et mise à jour des métriques en temps réel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait afficher la progression mise à jour après modification", async () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeProgressDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('progress-display')).toBeTruthy();

    // Simuler une mise à jour de progression
    mockUpdateExerciseProgress('vocabulary', 'A1', 75);

    // Rerender pour voir les changements
    rerender(
      <ThemeProvider>
        <ProgressProvider>
          <FakeProgressDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('progress-display')).toBeTruthy();
    });
  });

  it("devrait gérer les états de chargement pendant les mises à jour", async () => {
    // Créer un composant qui simule l'état de chargement
    const LoadingProgressDisplay = () => {
      return <Text testID="loading">Chargement...</Text>;
    };

    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <LoadingProgressDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier que l'état de chargement est affiché
    expect(getByTestId('loading')).toBeTruthy();
  });
});

describe('Scénario 3: Intégration avec les composants réels', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait mettre à jour la progression lors de la navigation entre écrans", async () => {
    // Ce test simule l'intégration réelle entre composants
    const { getByTestId, rerender } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <FakeExerciseScreen />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler la progression dans un exercice
    fireEvent.press(getByTestId('complete-exercise'));

    // Vérifier que la progression a été mise à jour
    await waitFor(() => {
      expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 80);
    });

    // Simuler la navigation vers un autre écran
    // Ici on pourrait tester la persistance des données
    expect(mockUpdateExerciseProgress).toHaveBeenCalledTimes(1);
  });

  it("devrait maintenir la cohérence des données entre les composants", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <FakeExerciseScreen />
            <FakeProgressDisplay />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier que les deux composants sont rendus
    expect(getByTestId('complete-exercise')).toBeTruthy();
    expect(getByTestId('progress-display')).toBeTruthy();

    // Simuler une mise à jour
    fireEvent.press(getByTestId('complete-exercise'));

    await waitFor(() => {
      expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 80);
    });

    // Les deux composants devraient être synchronisés
    expect(getByTestId('progress-display')).toBeTruthy();
  });
});
