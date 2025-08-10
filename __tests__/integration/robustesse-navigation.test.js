import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

// Screens to test
import ExerciseSelection from '../../src/screens/ExerciseSelection';
import VocabularyExercise from '../../src/screens/exercises/vocabulary';

// Mock expo-router
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

// Mock useCurrentLevel with different scenarios
const mockUseCurrentLevel = jest.fn();
jest.mock('../../src/contexts/CurrentLevelContext', () => ({
  useCurrentLevel: mockUseCurrentLevel,
}));

// Mock useVocabulary hook
jest.mock('../../src/screens/exercises/vocabulary/hooks/useVocabulary', () => {
  const actualUseVocabulary = jest.requireActual('../../src/screens/exercises/vocabulary/hooks/useVocabulary').default;
  return jest.fn((vocabularyData, level, mode) => {
    if (!vocabularyData) {
      return { loaded: false }; // Simulate loading state when no data
    }
    return {
      ...actualUseVocabulary(vocabularyData, level, mode),
      loaded: true,
      currentWord: vocabularyData.exercises[0].words[0],
      display: {
        wordCounter: '1 / 1',
        categories: vocabularyData.exercises.map(ex => ex.title), // ✅ CORRIGÉ : ex.title au lieu de { name: ex.title, words: ex.words }
      },
    };
  });
});

// Mock vocabularyDataHelper
jest.mock('../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  isBonusLevel: jest.fn(() => false),
  getLevelColor: jest.fn((level) => {
    if (!level) return 'gray'; // Default color for missing level
    return 'blue';
  }),
  getVocabularyData: jest.fn((level, mode) => {
    // Return null for invalid/missing levels
    if (!level || level === 'invalid' || level === undefined) {
      return null;
    }
    
    if (level === 'A1' || level === '1') {
      return {
        exercises: [{
          title: 'Identité & informations personnelles',
          words: [{ word: 'name', translation: 'nom', example: 'My name is Sarah.' }],
        }],
      };
    }
    
    return null; // For any other level
  }),
}));

// Mock other hooks
jest.mock('../../src/hooks/useLastActivity', () => jest.fn(() => ({
  saveActivity: jest.fn(),
})));

// Mock constants pour les niveaux de langue
const MOCK_LANGUAGE_LEVELS = {
  1: { title: 'Niveau Débutant A1', color: 'blue' },
  2: { title: 'Niveau Élémentaire A2', color: 'green' },
  3: { title: 'Niveau Intermédiaire B1', color: 'orange' },
};

describe('Test d\'intégration: Robustesse de la navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ExerciseSelection - Gestion des niveaux manquants', () => {
    test('Affiche un état contrôlé quand aucun niveau n\'est fourni', async () => {
      // Mock: pas de niveau courant
      mockUseCurrentLevel.mockReturnValue({
        currentLevel: undefined,
      });

      const { queryByText, getByText, toJSON } = render(<ExerciseSelection />);

      await waitFor(() => {
        // Vérifier que le composant ne rend rien (retourne null)
        expect(toJSON()).toBeNull();
      });
    });

    test('Affiche un état contrôlé avec un niveau invalide', async () => {
      mockUseCurrentLevel.mockReturnValue({
        currentLevel: 'invalid_level',
      });

      const { queryByText } = render(<ExerciseSelection />);

      await waitFor(() => {
        // Ne doit pas afficher d'exercices valides
        expect(queryByText('name')).toBeNull();
        expect(queryByText('rhetoric')).toBeNull();
      });
    });


  });

  describe('VocabularyExercise - Gestion des paramètres manquants', () => {
    test('Affiche un indicateur de chargement sans paramètre de niveau', async () => {
      const { getByTestId, queryByText } = render(
        <VocabularyExercise route={{ params: {} }} />
      );

      await waitFor(() => {
        // Vérifier que l'indicateur de chargement est affiché
        expect(getByTestId('activity-indicator')).toBeTruthy();
        
        // Vérifier qu'aucun contenu d'exercice n'est affiché
        expect(queryByText('name')).toBeNull();
        expect(queryByText('rhetoric')).toBeNull();
      });
    });

    test('Affiche un indicateur de chargement avec un niveau undefined', async () => {
      const { getByTestId, queryByText } = render(
        <VocabularyExercise route={{ params: { level: undefined, mode: 'classic' } }} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
        expect(queryByText('name')).toBeNull();
      });
    });

    test('Affiche un indicateur de chargement avec un niveau invalide', async () => {
      const { getByTestId, queryByText } = render(
        <VocabularyExercise route={{ params: { level: 'invalid_level', mode: 'classic' } }} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
        expect(queryByText('name')).toBeNull();
        expect(queryByText('rhetoric')).toBeNull();
      });
    });


    test('Gère correctement les paramètres de route malformés', async () => {
      // Test avec des paramètres complètement absents
      const { getByTestId } = render(
        <VocabularyExercise route={{}} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
      });
    });

    test('Fonctionne correctement avec des paramètres valides', async () => {
      const { getByText, queryByTestId } = render(
        <VocabularyExercise route={{ params: { level: '1', mode: 'classic' } }} />
      );

      await waitFor(() => {
        // Avec des paramètres valides, le contenu doit s'afficher
   expect(getByText('name')).toBeTruthy();
    expect(getByText('My name is Sarah.')).toBeTruthy();
        
        // Plus d'indicateur de chargement
        expect(queryByTestId('activity-indicator')).toBeNull();
      });
    });
  });

  describe('Cas limites et edge cases', () => {
    test('Gère les valeurs null dans les paramètres', async () => {
      const { getByTestId } = render(
        <VocabularyExercise route={{ params: { level: null, mode: null } }} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
      });
    });

    test('Gère les chaînes vides dans les paramètres', async () => {
      const { getByTestId } = render(
        <VocabularyExercise route={{ params: { level: '', mode: '' } }} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
      });
    });

    test('Gère les types de données inattendus', async () => {
      const { getByTestId } = render(
        <VocabularyExercise route={{ params: { level: 123, mode: {} } }} />
      );

      await waitFor(() => {
        expect(getByTestId('activity-indicator')).toBeTruthy();
      });
    });
  });
});