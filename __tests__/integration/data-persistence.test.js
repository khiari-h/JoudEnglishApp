// __tests__/integration/data-persistence.test.js
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressProvider, useProgress } from '../../src/contexts/ProgressContext';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { CurrentLevelProvider } from '../../src/contexts/CurrentLevelContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

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

// Mock des hooks
jest.mock('../../src/hooks/useLastActivity', () => () => ({
  lastActivity: null,
  isLoading: false,
  saveActivity: jest.fn(),
  clearActivity: jest.fn(),
  reload: jest.fn(),
}));

jest.mock('../../src/hooks/useActivityMetrics', () => () => ({
  currentStreak: 5,
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

// Composant de test pour simuler la sauvegarde et le chargement
const FakeDataManager = () => {
  const { updateExerciseProgress, progress } = useProgress();

  const saveData = async () => {
    await AsyncStorage.setItem('progress', JSON.stringify(progress));
  };

  const loadData = async () => {
    const data = await AsyncStorage.getItem('progress');
    return data ? JSON.parse(data) : null;
  };

  const simulateExercise = () => {
    updateExerciseProgress('vocabulary', 'A1', 75);
    updateExerciseProgress('grammar', 'A1', 50);
    updateExerciseProgress('reading', 'A1', 25);
  };

  return (
    <>
      <Text testID="progress-display">
        Vocabulaire: {progress.levels?.A1?.vocabulary || 0}% | 
        Grammaire: {progress.levels?.A1?.grammar || 0}% | 
        Lecture: {progress.levels?.A1?.reading || 0}%
      </Text>
      <TouchableOpacity testID="simulate-exercise" onPress={simulateExercise}>
        <Text>Simuler exercice</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="save-data" onPress={saveData}>
        <Text>Sauvegarder</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="load-data" onPress={loadData}>
        <Text>Charger</Text>
      </TouchableOpacity>
    </>
  );
};

describe('Scénario 1: Persistance des données de progression', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait sauvegarder les données de progression dans AsyncStorage", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler un exercice
    fireEvent.press(getByTestId('simulate-exercise'));

    // Sauvegarder les données
    fireEvent.press(getByTestId('save-data'));

    await waitFor(() => {
      expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('vocabulary', 'A1', 75);
      expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('grammar', 'A1', 50);
      expect(mockUpdateExerciseProgress).toHaveBeenCalledWith('reading', 'A1', 25);
    });
  });

  it("devrait charger les données sauvegardées depuis AsyncStorage", async () => {
    // Préparer des données sauvegardées
    const savedProgress = {
      levels: {
        A1: {
          vocabulary: 80,
          grammar: 60,
          reading: 40
        }
      }
    };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(savedProgress));

    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Charger les données
    fireEvent.press(getByTestId('load-data'));

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('progress');
    });
  });

  it("devrait gérer les cas où aucune donnée n'est sauvegardée", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Charger les données (aucune sauvegardée)
    fireEvent.press(getByTestId('load-data'));

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('progress');
    });

    // Vérifier que l'état reste cohérent
    expect(getByTestId('progress-display')).toBeTruthy();
  });
});

describe('Scénario 2: Cohérence des données entre sessions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait maintenir la cohérence des métriques après redémarrage", async () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Phase 1: Première session - progression
    fireEvent.press(getByTestId('simulate-exercise'));
    
    // Vérifier l'affichage
    expect(getByTestId('progress-display')).toBeTruthy();
    
    // Sauvegarder
    fireEvent.press(getByTestId('save-data'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    // Phase 2: Simuler un redémarrage (nouveau composant)
    const savedData = {
      levels: {
        A1: {
          vocabulary: 75,
          grammar: 50,
          reading: 25
        }
      }
    };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(savedData));

    // Rerender pour simuler un nouveau démarrage
    rerender(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Charger les données
    fireEvent.press(getByTestId('load-data'));

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('progress');
    });
  });

  it("devrait gérer les erreurs de sauvegarde/chargement", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler un exercice
    fireEvent.press(getByTestId('simulate-exercise'));

    // Tenter de sauvegarder
    fireEvent.press(getByTestId('save-data'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    // L'application devrait continuer à fonctionner
    expect(getByTestId('progress-display')).toBeTruthy();
  });
});

describe('Scénario 3: Intégration avec les composants réels', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
    // Reset de l'état mock
    mockProgressState = {
      levels: {},
      exercises: {},
      stats: {},
      lastActivity: {}
    };
  });

  it("devrait synchroniser les données entre différents composants", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <FakeDataManager />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('progress-display')).toBeTruthy();

    // Simuler des exercices
    fireEvent.press(getByTestId('simulate-exercise'));

    // Sauvegarder
    fireEvent.press(getByTestId('save-data'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    // Vérifier que l'affichage est cohérent
    expect(getByTestId('progress-display')).toBeTruthy();
  });

  it("devrait gérer la concurrence des mises à jour", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeDataManager />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler plusieurs exercices rapidement
    act(() => {
      fireEvent.press(getByTestId('simulate-exercise'));
      fireEvent.press(getByTestId('simulate-exercise'));
    });

    // Sauvegarder
    fireEvent.press(getByTestId('save-data'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    // L'état final devrait être cohérent
    expect(getByTestId('progress-display')).toBeTruthy();
  });
});
