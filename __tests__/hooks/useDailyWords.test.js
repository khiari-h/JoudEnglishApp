// __tests__/hooks/useDailyWords.test.js
import { renderHook, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDailyWords from '../../src/hooks/useDailyWords';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('useDailyWords', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(1640995200000);
    jest.spyOn(Date.prototype, 'toDateString').mockReturnValue('Sat Jan 01 2022');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devrait initialiser avec 0 mots', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useDailyWords());
    
    expect(result.current.wordsToday).toBe(0);
    expect(result.current.isLoading).toBe(true);
  });

  it('devrait compter les mots d\'aujourd\'hui', async () => {
    const mockData = {
      completedWords: {
        '0': [
          { word: 'hello', timestamp: 1640995200000 },
          { word: 'world', timestamp: 1640995200000 }
        ]
      }
    };

    AsyncStorage.getItem.mockImplementation((key) => {
      if (key.includes('vocabulary_') && key.includes('_classic')) {
        return Promise.resolve(JSON.stringify(mockData));
      }
      return Promise.resolve(null);
    });

    const { result } = renderHook(() => useDailyWords());

    await waitFor(() => {
      expect(result.current.wordsToday).toBeGreaterThan(0);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait avoir une fonction refresh', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useDailyWords());
    
    expect(typeof result.current.refresh).toBe('function');
  });
});