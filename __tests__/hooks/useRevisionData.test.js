// __tests__/hooks/useRevisionData.test.js
import { renderHook, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRevisionData from '../../src/hooks/useRevisionData';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  getVocabularyData: jest.fn()
}));

describe('useRevisionData', () => {
  const mockOriginalData = {
    exercises: [
      {
        words: [
          { word: 'hello', translation: 'bonjour', definition: 'greeting' },
          { word: 'goodbye', translation: 'au revoir', definition: 'farewell' }
        ]
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { getVocabularyData } = require('../../src/utils/vocabulary/vocabularyDataHelper');
    getVocabularyData.mockReturnValue(mockOriginalData);
  });

  it('devrait initialiser avec les bonnes valeurs', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.allLearnedWords).toEqual([]);
    expect(result.current.revisionQuestions).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('devrait accepter des paramètres personnalisés', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionData('2', 15));

    expect(result.current.isLoading).toBe(true);
  });

  it('devrait récupérer les mots appris', async () => {
    const mockStorageData = {
      completedWords: {
        '0': [
          { wordIndex: 0, timestamp: 1640995200000 },
          { wordIndex: 1, timestamp: 1640995300000 }
        ]
      }
    };

    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'vocabulary_1_classic') {
        return Promise.resolve(JSON.stringify(mockStorageData));
      }
      return Promise.resolve(null);
    });

    const { result } = renderHook(() => useRevisionData('1'));

    await waitFor(() => {
      expect(result.current.allLearnedWords.length).toBeGreaterThan(0);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait avoir les propriétés utilitaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionData());

    expect(result.current.stats).toBeDefined();
    expect(typeof result.current.hasEnoughWords).toBe('boolean');
    expect(typeof result.current.canGenerateQuestions).toBe('boolean');
  });
});