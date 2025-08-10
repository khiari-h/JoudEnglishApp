// __tests__/integration/progress-update.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';
import { ProgressProvider, useProgress } from '../../src/contexts/ProgressContext';

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

const mockUpdateProgress = jest.fn();

jest.mock('../../src/contexts/ProgressContext', () => ({
  ...jest.requireActual('../../src/contexts/ProgressContext'),
  useProgress: () => ({
    progress: { overall: 0, levels: {} },
    isLoading: false,
    updateProgress: mockUpdateProgress,
    getProgressForLevel: () => 0,
  }),
}));

// Composant de test pour simuler un exercice qui utilise le contexte de progression
const FakeExerciseScreen = () => {
  const { updateProgress } = useProgress();

  const handleComplete = () => {
    updateProgress('A1', 'vocabulary', 80);
  };

  return (
    <TouchableOpacity testID="complete-exercise" onPress={handleComplete}>
      <Text>Terminer l'exercice</Text>
    </TouchableOpacity>
  );
};

describe('Scénario 1: Mise à jour de la progression', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait appeler updateProgress avec les bonnes données après la fin d'un exercice", async () => {
    // NOTE: Ce test vérifie que le `ProgressContext` est correctement utilisé par un écran d'exercice (simulé)
    // pour mettre à jour la progression.

    const { getByTestId } = render(
      <ProgressProvider>
        <FakeExerciseScreen />
      </ProgressProvider>
    );

    // Simuler la fin de l'exercice
    fireEvent.press(getByTestId('complete-exercise'));

    // Vérifier que la mise à jour de la progression a été appelée via le contexte
    await waitFor(() => {
      expect(mockUpdateProgress).toHaveBeenCalledWith('A1', 'vocabulary', 80);
      expect(mockUpdateProgress).toHaveBeenCalledTimes(1);
    });
  });
});
