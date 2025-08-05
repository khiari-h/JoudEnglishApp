// __tests__/hooks/useRealTimeProgress.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRealTimeProgress from '../../src/hooks/useRealTimeProgress';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  getVocabularyData: jest.fn()
}));

describe('useRealTimeProgress', () => {
  const mockVocabularyData = {
    exercises: [
      { words: [{ word: 'hello' }, { word: 'world' }] },
      { words: [{ word: 'test' }] }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { getVocabularyData } = require('../../src/utils/vocabulary/vocabularyDataHelper');
    getVocabularyData.mockReturnValue(mockVocabularyData);
  });

  it('devrait initialiser avec les bonnes valeurs', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRealTimeProgress());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.levelProgress).toBeDefined();
    expect(result.current.exerciseProgress).toBeDefined();
  });

  it('devrait calculer la progression vocabulaire', async () => {
    const mockStorageData = {
      completedWords: {
        '0': ['word1', 'word2'],
        '1': ['word3']
      }
    };

    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'vocabulary_1_classic') {
        return Promise.resolve(JSON.stringify(mockStorageData));
      }
      return Promise.resolve(null);
    });

    const { result } = renderHook(() => useRealTimeProgress());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.getExerciseProgress('vocabulary', '1')).toBeGreaterThan(0);
    });
  });

  it('devrait avoir toutes les fonctions utilitaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRealTimeProgress());

    expect(typeof result.current.getLevelProgress).toBe('function');
    expect(typeof result.current.getExerciseProgress).toBe('function');
    expect(typeof result.current.hasProgress).toBe('function');
    expect(typeof result.current.hasVocabularyStarted).toBe('function');
    expect(typeof result.current.hasVocabularyFastStarted).toBe('function');
    expect(typeof result.current.refresh).toBe('function');
  });

  it('devrait permettre de refresh', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRealTimeProgress());

    await act(async () => {
      result.current.refresh();
    });

    expect(typeof result.current.refresh).toBe('function');
  });
});