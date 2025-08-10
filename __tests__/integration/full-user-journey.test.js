// __tests__/integration/full-user-journey.test.js
import React from 'react';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { router } from 'expo-router';

// Écrans
import LevelSelection from '../../src/screens/LevelSelection';
import ExerciseSelection from '../../src/screens/ExerciseSelection';
import VocabularyExercise from '../../src/screens/exercises/vocabulary';

// Mocks
// Mock de expo-router pour contrôler la navigation
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

// Mock des hooks de données et de contexte
const mockUpdateProgress = jest.fn();
let mockProgressData = {};

jest.mock('../../src/hooks/useRealTimeProgress', () => () => ({
  getLevelProgress: (level) => mockProgressData[level]?.levelProgress || 0,
  getExerciseProgress: (exercise, level) => mockProgressData[level]?.[exercise] || 0,
  hasProgress: (exercise, level) => (mockProgressData[level]?.[exercise] || 0) > 0,
  refresh: jest.fn(),
}));

jest.mock('../../src/contexts/ProgressContext', () => ({
  ...jest.requireActual('../../src/contexts/ProgressContext'),
  useProgress: () => ({
    updateProgress: mockUpdateProgress,
    // ... autres valeurs si nécessaire
  }),
}));

// Mock du hook de vocabulaire pour simplifier l'exercice
const mockUseVocabulary = jest.fn();
jest.mock('../../src/screens/exercises/vocabulary/hooks/useVocabulary', () => mockUseVocabulary);


describe('Parcours utilisateur complet', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    mockProgressData = {}; // Pas de progression au début
    
    // Configuration par défaut du mock useVocabulary
    mockUseVocabulary.mockReturnValue({
      loaded: true,
      currentWord: { word: 'Hello', translation: 'Bonjour' },
      wordIndex: 0,
      display: {
        wordCounter: '1 / 2',
        categories: [{ name: 'Basics', words: [{}, {}] }],
      },
      isLastWordInExercise: false,
      handleNext: jest.fn().mockReturnValue({ completed: false }),
      saveData: jest.fn().mockResolvedValue(undefined),
    });
  });

  test('la complétion d\'un exercice met à jour la progression sur l\'écran de sélection de niveau', async () => {
    const { getByTestId, rerender } = render(<LevelSelection />);
    
    const levelCard = getByTestId('level-1');

    // Chercher "0%" uniquement à l'intérieur de la carte du niveau 1
    expect(within(levelCard).getByText('0%')).toBeTruthy();

    // Phase 2: Simuler la complétion d'un exercice et la mise à jour de la progression
    mockProgressData['1'] = {
      levelProgress: 51, // La progression générale du niveau passe à 51%
      vocabulary: 100,   // L'exercice de vocabulaire est considéré comme terminé
    };

    mockUpdateProgress('1', 'vocabulary', 100);

    // Phase 3: Revenir à l'écran de sélection de niveau et vérifier la mise à jour
    rerender(<LevelSelection />);

    await waitFor(() => {
      const updatedLevelCard = getByTestId('level-1');
      // Il peut y avoir plusieurs éléments affichant le pourcentage, nous vérifions qu'au moins un est présent.
      const progressElements = within(updatedLevelCard).getAllByText(/51%/);
      expect(progressElements.length).toBeGreaterThan(0);
    });

    // Bonus: On vérifie que le texte du bouton est passé à "Continuer"
    const continueButton = getByTestId('level-1-button');
    expect(within(continueButton).getByText('Continuer')).toBeTruthy();
  });
});
