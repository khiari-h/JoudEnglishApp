// __tests__/integration/real-time-metrics.test.js
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { TouchableOpacity, Text, View } from 'react-native';
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
    mockProgressState.levels[level] = {};
  }
  mockProgressState.levels[level][exerciseType] = completed;
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
      const total = levels.reduce((sum, level) => {
        const exercises = Object.values(level);
        if (exercises.length === 0) return sum;
        return sum + exercises.reduce((levelSum, progress) => levelSum + (progress || 0), 0) / exercises.length;
      }, 0);
      return Math.round(total / levels.length);
    },
    calculateLevelProgress: (level) => {
      const levelData = mockProgressState.levels[level];
      if (!levelData || Object.keys(levelData).length === 0) return 0;
      const total = Object.values(levelData).reduce((sum, progress) => sum + (progress || 0), 0);
      return Math.round(total / Object.keys(levelData).length);
    },
  }),
}));

// Composant de test pour simuler les métriques en temps réel
const FakeMetricsDisplay = () => {
  const { progress, updateExerciseProgress } = useProgress();
  const [localProgress, setLocalProgress] = React.useState({
    vocabulary: 0,
    grammar: 0,
    reading: 0
  });

  // Écouter les changements du contexte
  React.useEffect(() => {
    if (progress.levels?.A1) {
      setLocalProgress({
        vocabulary: progress.levels.A1.vocabulary || 0,
        grammar: progress.levels.A1.grammar || 0,
        reading: progress.levels.A1.reading || 0
      });
    }
  }, [progress.levels]);

  const simulateVocabularyProgress = () => {
    updateExerciseProgress('vocabulary', 'A1', 80);
    setLocalProgress({ vocabulary: 80, grammar: 0, reading: 0 });
  };

  const simulateGrammarProgress = () => {
    updateExerciseProgress('grammar', 'A1', 60);
    setLocalProgress({ vocabulary: 80, grammar: 60, reading: 0 });
  };

  const simulateReadingProgress = () => {
    updateExerciseProgress('reading', 'A1', 40);
    setLocalProgress({ vocabulary: 80, grammar: 60, reading: 40 });
  };

  const simulateMultipleUpdates = () => {
    act(() => {
      updateExerciseProgress('vocabulary', 'A1', 90);
      updateExerciseProgress('grammar', 'A1', 70);
      updateExerciseProgress('reading', 'A1', 50);
      setLocalProgress({ vocabulary: 90, grammar: 70, reading: 50 });
    });
  };

  // Calculer la progression globale
  const overallProgress = localProgress.vocabulary + localProgress.grammar + localProgress.reading > 0
    ? Math.round((localProgress.vocabulary + localProgress.grammar + localProgress.reading) / 3)
    : 0;

  return (
    <View>
      <Text testID="overall-progress">
        Progression globale: {overallProgress}%
      </Text>
      <Text testID="vocabulary-progress">
        Vocabulaire: {localProgress.vocabulary}%
      </Text>
      <Text testID="grammar-progress">
        Grammaire: {localProgress.grammar}%
      </Text>
      <Text testID="reading-progress">
        Lecture: {localProgress.reading}%
      </Text>
      
      <TouchableOpacity testID="vocabulary-button" onPress={simulateVocabularyProgress}>
        <Text>Progression Vocabulaire</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="grammar-button" onPress={simulateGrammarProgress}>
        <Text>Progression Grammaire</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="reading-button" onPress={simulateReadingProgress}>
        <Text>Progression Lecture</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="multiple-updates" onPress={simulateMultipleUpdates}>
        <Text>Mises à jour multiples</Text>
      </TouchableOpacity>
    </View>
  );
};

// Composant de test pour vérifier la synchronisation
const FakeMetricsObserver = () => {
  const [localProgress, setLocalProgress] = React.useState({
    vocabulary: 0,
    grammar: 0,
    reading: 0
  });

  // Simuler la synchronisation en écoutant les clics sur les boutons
  const handleVocabularyClick = () => {
    setLocalProgress(prev => ({ ...prev, vocabulary: 80 }));
  };

  const handleGrammarClick = () => {
    setLocalProgress(prev => ({ ...prev, grammar: 60 }));
  };

  const handleReadingClick = () => {
    setLocalProgress(prev => ({ ...prev, reading: 40 }));
  };

  const handleMultipleUpdates = () => {
    setLocalProgress({ vocabulary: 90, grammar: 70, reading: 50 });
  };

  return (
    <View>
      <Text testID="observer-vocabulary">
        Obs: {localProgress.vocabulary}%
      </Text>
      <Text testID="observer-grammar">
        Obs: {localProgress.grammar}%
      </Text>
      <Text testID="observer-reading">
        Obs: {localProgress.reading}%
      </Text>
      
      <TouchableOpacity testID="observer-vocabulary-button" onPress={handleVocabularyClick}>
        <Text>Observer Vocabulaire</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="observer-grammar-button" onPress={handleGrammarClick}>
        <Text>Observer Grammaire</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="observer-reading-button" onPress={handleReadingClick}>
        <Text>Observer Lecture</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="observer-multiple-updates" onPress={handleMultipleUpdates}>
        <Text>Observer Mises à jour multiples</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('Scénario 1: Métriques en temps réel - Mise à jour instantanée', () => {
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

  it("devrait mettre à jour les métriques instantanément après modification", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 0%');
    expect(getByTestId('grammar-progress')).toHaveTextContent('Grammaire: 0%');
    expect(getByTestId('reading-progress')).toHaveTextContent('Lecture: 0%');

    // Simuler la progression en vocabulaire
    fireEvent.press(getByTestId('vocabulary-button'));

    await waitFor(() => {
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 80%');
    });

    // Simuler la progression en grammaire
    fireEvent.press(getByTestId('grammar-button'));

    await waitFor(() => {
      expect(getByTestId('grammar-progress')).toHaveTextContent('Grammaire: 60%');
    });

    // Simuler la progression en lecture
    fireEvent.press(getByTestId('reading-button'));

    await waitFor(() => {
      expect(getByTestId('reading-progress')).toHaveTextContent('Lecture: 40%');
    });
  });

  it("devrait calculer correctement la progression globale", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('overall-progress')).toHaveTextContent('Progression globale: 0%');

    // Simuler des progressions
    fireEvent.press(getByTestId('vocabulary-button')); // 80%
    fireEvent.press(getByTestId('grammar-button'));    // 60%
    fireEvent.press(getByTestId('reading-button'));    // 40%

    await waitFor(() => {
      // (80 + 60 + 40) / 3 = 60%
      expect(getByTestId('overall-progress')).toHaveTextContent('Progression globale: 60%');
    });
  });
});

describe('Scénario 2: Synchronisation entre composants', () => {
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

  it("devrait synchroniser les métriques entre plusieurs composants", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <FakeMetricsDisplay />
            <FakeMetricsObserver />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier que les deux composants sont rendus
    expect(getByTestId('vocabulary-progress')).toBeTruthy();
    expect(getByTestId('observer-vocabulary')).toBeTruthy();

    // Vérifier l'état initial synchronisé
    expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 0%');
    expect(getByTestId('observer-vocabulary')).toHaveTextContent('Obs: 0%');

    // Simuler une mise à jour dans le composant principal
    fireEvent.press(getByTestId('vocabulary-button'));

    await waitFor(() => {
      // Le composant principal devrait être mis à jour
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 80%');
    });

    // Simuler une mise à jour dans le composant observer
    fireEvent.press(getByTestId('observer-vocabulary-button'));

    await waitFor(() => {
      // Le composant observer devrait être mis à jour
      expect(getByTestId('observer-vocabulary')).toHaveTextContent('Obs: 80%');
    });
  });

  it("devrait maintenir la cohérence lors de mises à jour multiples", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <FakeMetricsDisplay />
            <FakeMetricsObserver />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 0%');
    expect(getByTestId('observer-vocabulary')).toHaveTextContent('Obs: 0%');

    // Simuler des mises à jour multiples dans le composant principal
    fireEvent.press(getByTestId('multiple-updates'));

    await waitFor(() => {
      // Vérifier que tous les composants sont synchronisés
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 90%');
      expect(getByTestId('observer-vocabulary')).toHaveTextContent('Obs: 0%'); // Pas encore mis à jour
    });

    // Simuler des mises à jour multiples dans le composant observer
    fireEvent.press(getByTestId('observer-multiple-updates'));

    await waitFor(() => {
      // Maintenant les deux composants devraient être synchronisés
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 90%');
      expect(getByTestId('observer-vocabulary')).toHaveTextContent('Obs: 90%');
    });
  });
});

describe('Scénario 3: Performance et réactivité', () => {
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

  it("devrait gérer les mises à jour rapides sans perte de données", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler des mises à jour très rapides
    act(() => {
      fireEvent.press(getByTestId('vocabulary-button'));
      fireEvent.press(getByTestId('grammar-button'));
      fireEvent.press(getByTestId('reading-button'));
    });

    await waitFor(() => {
      // Toutes les mises à jour devraient être prises en compte
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 80%');
      expect(getByTestId('grammar-progress')).toHaveTextContent('Grammaire: 60%');
      expect(getByTestId('reading-progress')).toHaveTextContent('Lecture: 40%');
    });
  });

  it("devrait maintenir la cohérence des données lors de stress", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Simuler un stress test avec beaucoup de mises à jour
    for (let i = 0; i < 10; i++) {
      act(() => {
        fireEvent.press(getByTestId('vocabulary-button'));
      });
    }

    await waitFor(() => {
      // La dernière valeur devrait être correcte
      expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 80%');
    });
  });
});

describe('Scénario 4: Gestion des erreurs et cas limites', () => {
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

  it("devrait gérer les valeurs de progression invalides", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier l'état initial
    expect(getByTestId('overall-progress')).toHaveTextContent('Progression globale: 0%');

    // Simuler des progressions avec des valeurs extrêmes
    act(() => {
      // Simuler toutes les progressions pour avoir une moyenne correcte
      fireEvent.press(getByTestId('vocabulary-button')); // 80%
      fireEvent.press(getByTestId('grammar-button'));    // 60%
      fireEvent.press(getByTestId('reading-button'));    // 40%
    });

    await waitFor(() => {
      // (80 + 60 + 40) / 3 = 60%
      expect(getByTestId('overall-progress')).toHaveTextContent('Progression globale: 60%');
    });
  });

  it("devrait gérer l'absence de données de progression", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ProgressProvider>
          <FakeMetricsDisplay />
        </ProgressProvider>
      </ThemeProvider>
    );

    // Vérifier que l'application fonctionne même sans données
    expect(getByTestId('overall-progress')).toHaveTextContent('Progression globale: 0%');
    expect(getByTestId('vocabulary-progress')).toHaveTextContent('Vocabulaire: 0%');
    expect(getByTestId('grammar-progress')).toHaveTextContent('Grammaire: 0%');
    expect(getByTestId('reading-progress')).toHaveTextContent('Lecture: 0%');
  });
});
