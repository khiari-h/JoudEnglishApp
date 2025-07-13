import { renderHook, act } from '@testing-library/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useVocabulary from '../../src/screens/exercises/vocabulary/hooks/useVocabulary';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useVocabulary', () => {
  const mockVocabularyData = {
    exercises: [
      {
        title: 'Test Category',
        words: [
          { word: 'test1', translation: 'test1' },
          { word: 'test2', translation: 'test2' },
          { word: 'test3', translation: 'test3' }
        ]
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  it('initialise avec des valeurs par défaut', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.categoryIndex).toBe(0);
    expect(result.current.wordIndex).toBe(0);
    expect(result.current.showTranslation).toBe(false);
    expect(result.current.loaded).toBe(true);
    // Le hook initialise automatiquement les catégories
    expect(result.current.completedWords).toEqual({ "0": [] });
  });

  it('charge les données sauvegardées depuis AsyncStorage', async () => {
    const savedData = {
      completedWords: {
        0: [{ wordIndex: 0, timestamp: Date.now() }]
      },
      lastPosition: {
        categoryIndex: 0,
        wordIndex: 1
      }
    };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(savedData));

    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.wordIndex).toBe(1);
    expect(result.current.completedWords).toEqual(savedData.completedWords);
  });

  it('calcule correctement les stats', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const stats = result.current.stats;
    expect(stats.totalWords).toBe(3);
    expect(stats.completedWordsCount).toBe(0);
    expect(stats.totalProgress).toBe(0);
    expect(stats.completedInCurrentCategory).toBe(0);
    expect(stats.totalInCurrentCategory).toBe(3);
  });

  it('calcule correctement les données d\'affichage', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const display = result.current.display;
    expect(display.wordCounter).toBe('1 / 3');
    expect(display.categories).toEqual(['Test Category']);
    expect(display.currentWord).toEqual({ word: 'test1', translation: 'test1' });
  });

  it('marque un mot comme complété', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Marquer le premier mot comme complété
    await act(async () => {
      result.current.handleNext();
    });

    expect(result.current.completedWords[0]).toHaveLength(1);
    expect(result.current.completedWords[0][0]).toHaveProperty('wordIndex', 0);
    expect(result.current.completedWords[0][0]).toHaveProperty('timestamp');
  });

  it('évite les doublons lors de la complétion', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Marquer le même mot deux fois
    await act(async () => {
      result.current.handleNext();
      result.current.handleNext();
    });

    // Ne doit y avoir qu'une seule entrée
    expect(result.current.completedWords[0]).toHaveLength(1);
  });

  it('navigue correctement entre les mots', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Aller au mot suivant
    await act(async () => {
      result.current.handleNext();
    });

    expect(result.current.wordIndex).toBe(1);
    expect(result.current.display.wordCounter).toBe('2 / 3');

    // Revenir au mot précédent
    await act(async () => {
      result.current.handlePrevious();
    });

    expect(result.current.wordIndex).toBe(0);
    expect(result.current.display.wordCounter).toBe('1 / 3');
  });

  it('gère la validation de navigation', async () => {
    const { result } = renderHook(() => 
      useVocabulary(mockVocabularyData, '1', 'fast')
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Au début, on ne peut pas aller en arrière
    expect(result.current.canGoToPrevious).toBe(false);

    // Aller au mot suivant
    await act(async () => {
      result.current.handleNext();
    });

    // Maintenant on peut aller en arrière
    expect(result.current.canGoToPrevious).toBe(true);

    // Aller au dernier mot (index 2) - il faut 2 handleNext() pour arriver à l'index 2
    await act(async () => {
      result.current.handleNext(); // Va à l'index 2
    });

    // Vérifier qu'on est au dernier mot (index 2 sur 3 mots = dernier)
    expect(result.current.wordIndex).toBe(2);
    expect(result.current.isLastWordInExercise).toBe(true);
  });
}); 