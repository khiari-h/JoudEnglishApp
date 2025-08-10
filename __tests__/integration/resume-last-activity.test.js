// __tests__/integration/resume-last-activity.test.js  
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import Dashboard from '../../src/screens/Dashboard';
import * as LastActivity from '../../src/hooks/useLastActivity';
import { ProgressProvider } from '../../src/contexts/ProgressContext';
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

const useLastActivitySpy = jest.spyOn(LastActivity, 'default');

jest.mock('../../src/hooks/useRealTimeProgress', () => () => ({
  getLevelProgress: jest.fn(() => 50),
  refresh: jest.fn(),
}));

const mockLastActivityData = {
  type: 'grammar',
  level: 'A1',
  title: 'Grammaire de base',
  timestamp: Date.now(),
  metadata: {
    categoryIndex: 1,
    word: 5, // L'utilisateur a terminé le mot 5
    totalWords: 15,
  },
};

describe('Scénario 2: Reprise de la dernière activité', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLastActivitySpy.mockClear();
  });

  it('devrait afficher la section "Continuer" et naviguer correctement', async () => {
    useLastActivitySpy.mockReturnValue({
      lastActivity: mockLastActivityData,
      isLoading: false,
      saveActivity: jest.fn(),
      clearActivity: jest.fn(),
      reload: jest.fn(),
    });

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <Dashboard />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('hero-continue-section')).toBeTruthy();
    });

    expect(getByText('Grammaire de base')).toBeTruthy();
    expect(getByText(/Niv A1/)).toBeTruthy();
    // L'utilisateur a terminé le mot 5, donc on lui présente le mot 6.
    expect(getByText(/Mot 6\/15/)).toBeTruthy();

    const continueButton = getByTestId('continue-activity-button');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/grammarExercise',
        params: {
          level: 'A1',
        },
      });
    });
  });

  it('devrait afficher la section vide s\'il n\'y a pas de dernière activité', async () => {
    useLastActivitySpy.mockReturnValue({
      lastActivity: null,
      isLoading: false,
      saveActivity: jest.fn(),
      clearActivity: jest.fn(),
      reload: jest.fn(),
    });

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <Dashboard />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('hero-empty-section')).toBeTruthy();
    });

    expect(getByText("Commencer l'apprentissage")).toBeTruthy();

    const startButton = getByTestId('level-selection-button');
    fireEvent.press(startButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/tabs/levelSelection');
    });
  });
});