import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

// Screen to test
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

// Mock useVocabulary hook
jest.mock('../../src/screens/exercises/vocabulary/hooks/useVocabulary', () => {
  const actualUseVocabulary = jest.requireActual('../../src/screens/exercises/vocabulary/hooks/useVocabulary').default;
  return jest.fn((vocabularyData, level, mode) => {
    if (!vocabularyData) {
      return { loaded: false };
    }
    return {
      ...actualUseVocabulary(vocabularyData, level, mode),
      loaded: true,
      currentWord: vocabularyData.exercises[0].words[0],
      showTranslation: false, // Par défaut, la traduction n'est pas affichée
      toggleTranslation: jest.fn(), // Mock de la fonction toggle
      display: {
        wordCounter: '1 / ' + vocabularyData.exercises[0].words.length,
        categories: vocabularyData.exercises.map(ex => ex.title),
        currentWord: vocabularyData.exercises[0].words[0],
        currentCategory: vocabularyData.exercises[0]
      },
      isLastWordInExercise: true,
      handleNext: jest.fn().mockReturnValue({ completed: true }),
      saveData: jest.fn().mockResolvedValue(undefined),
    };
  });
});

// Mock vocabularyDataHelper
jest.mock('../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  isBonusLevel: jest.fn(() => false),
  getLevelColor: jest.fn(() => 'blue'),
  getVocabularyData: jest.fn((level, mode) => {
    if (level === 'A1' || level === '1') {
      return {
        exercises: [{
          title: 'Identité & informations personnelles',
          words: [
            { word: 'name', translation: 'nom', example: 'My name is Sarah.' },
            { word: 'hello', translation: 'bonjour', example: 'Hello, how are you?' }
          ],
        }],
      };
    }
    if (level === 'B1' || level === '3') {
      return {
        exercises: [{
          title: 'Expression & Communication Avancée',
          words: [
            { word: 'rhetoric', translation: 'rhétorique', example: 'His rhetoric was powerful enough to convince the entire audience.' },
            { word: 'sophisticated', translation: 'sophistiqué', example: 'She has a sophisticated understanding of the topic.' }
          ],
        }],
      };
    }
    if (level === 'C1' || level === '5') {
      return {
        exercises: [{
          title: 'Maîtrise Linguistique Avancée',
          words: [
            { word: 'ubiquitous', translation: 'omniprésent', example: 'Smartphones have become ubiquitous in modern society.' },
            { word: 'paradigm', translation: 'paradigme', example: 'This discovery represents a new paradigm in science.' }
          ],
        }],
      };
    }
    return {
      exercises: [{
        title: 'Default Category',
        words: [
          { word: 'default', translation: 'défaut', example: 'This is a default word.' }
        ],
      }]
    };
  }),
}));

// Mock other hooks
jest.mock('../../src/hooks/useLastActivity', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    saveActivity: jest.fn(),
    lastActivity: null,
    isLoading: false,
    clearActivity: jest.fn(),
    reload: jest.fn(),
  })),
}));

describe('Test d\'intégration: Chargement des données par niveau', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('VocabularyExercise charge les données du niveau A1 correctement', async () => {
    const { getByText } = render(
      <VocabularyExercise route={{ params: { level: 'A1', mode: 'classic' } }} />
    );

    await waitFor(() => {
      // Vérifier que le mot de niveau A1 est affiché
      expect(getByText('name')).toBeTruthy();
      // Vérifier que la catégorie est correcte pour A1
      expect(getByText('Identité & informations personnelles')).toBeTruthy();
      // Vérifier que le bouton pour révéler la traduction est présent
      expect(getByText('Reveal Translation')).toBeTruthy();
    });

    // Cliquer sur le bouton pour révéler la traduction
    const revealButton = getByText('Reveal Translation');
    fireEvent.press(revealButton);
  });

  test('VocabularyExercise charge les données du niveau B1 correctement', async () => {
    const { getByText } = render(
      <VocabularyExercise route={{ params: { level: 'B1', mode: 'classic' } }} />
    );

    await waitFor(() => {
      // Vérifier que le mot de niveau B1 est affiché
      expect(getByText('rhetoric')).toBeTruthy();
      // Vérifier que la catégorie est correcte pour B1
      expect(getByText('Expression & Communication Avancée')).toBeTruthy();
      // Vérifier que le bouton pour révéler la traduction est présent
      expect(getByText('Reveal Translation')).toBeTruthy();
    });
  });

  test('VocabularyExercise charge les données du niveau C1 correctement', async () => {
    const { getByText } = render(
      <VocabularyExercise route={{ params: { level: 'C1', mode: 'classic' } }} />
    );

    await waitFor(() => {
      // Vérifier que le mot de niveau C1 est affiché
      expect(getByText('ubiquitous')).toBeTruthy();
      // Vérifier que la catégorie est correcte pour C1
      expect(getByText('Maîtrise Linguistique Avancée')).toBeTruthy();
      // Vérifier que le bouton pour révéler la traduction est présent
      expect(getByText('Reveal Translation')).toBeTruthy();
    });
  });

  test('Vérification que les mots sont bien différents selon les niveaux', async () => {
    // Test avec A1
    const { getByText: getByTextA1, queryByText: queryByTextA1, rerender } = render(
      <VocabularyExercise route={{ params: { level: 'A1', mode: 'classic' } }} />
    );

    await waitFor(() => {
      expect(getByTextA1('name')).toBeTruthy();
      // Vérifier qu'on n'a pas les mots des autres niveaux
      expect(queryByTextA1('rhetoric')).toBeNull();
      expect(queryByTextA1('ubiquitous')).toBeNull();
    });

    // Changer pour B1
    rerender(<VocabularyExercise route={{ params: { level: 'B1', mode: 'classic' } }} />);

    await waitFor(() => {
      expect(getByTextA1('rhetoric')).toBeTruthy();
      // Vérifier qu'on n'a plus les mots A1
      expect(queryByTextA1('name')).toBeNull();
      expect(queryByTextA1('ubiquitous')).toBeNull();
    });
  });

  test('Le mode d\'exercice est correctement pris en compte', async () => {
    const { getByText } = render(
      <VocabularyExercise route={{ params: { level: 'A1', mode: 'reverse' } }} />
    );

    await waitFor(() => {
      // Même avec le mode reverse, on doit avoir les bonnes données de niveau
      expect(getByText('name')).toBeTruthy();
      // Vérifier que la catégorie est correcte
      expect(getByText('Identité & informations personnelles')).toBeTruthy();
      // Le mode est pris en compte si les données sont chargées
      expect(getByText('Reveal Translation')).toBeTruthy();
    });
  });
});