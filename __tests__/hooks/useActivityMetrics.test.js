// __tests__/hooks/useActivityMetrics.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useActivityMetrics from '../../src/hooks/useActivityMetrics';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useActivityMetrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(1640995200000);
    jest.spyOn(Date.prototype, 'toDateString').mockReturnValue('Sat Jan 01 2022');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Chargement initial', () => {
    it('devrait charger les métriques depuis AsyncStorage', async () => {
      AsyncStorage.getItem
        .mockResolvedValueOnce('5')
        .mockResolvedValueOnce('30')
        .mockResolvedValueOnce('Sat Jan 01 2022');

      const { result } = renderHook(() => useActivityMetrics());

      await waitFor(() => {
        expect(result.current.currentStreak).toBe(5);
        expect(result.current.todayMinutes).toBe(30);
        expect(result.current.formattedTime).toBe('30min');
      });
    });

    it('devrait utiliser des valeurs par défaut si aucune donnée', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const { result } = renderHook(() => useActivityMetrics());

      await waitFor(() => {
        expect(result.current.currentStreak).toBe(0);
        expect(result.current.todayMinutes).toBe(0);
        expect(result.current.formattedTime).toBe('0min');
      });
    });
  });

  describe('Gestion des sessions', () => {
    it('devrait démarrer et terminer une session', async () => {
      AsyncStorage.getItem.mockResolvedValue('0');
      const { result } = renderHook(() => useActivityMetrics());

      await waitFor(() => {
        expect(result.current.todayMinutes).toBe(0);
      });

      act(() => {
        result.current.startSession('vocabulary');
      });

      jest.spyOn(Date, 'now').mockReturnValue(1640995200000 + 120000);

      await act(async () => {
        await result.current.endSession();
      });

      expect(result.current.todayMinutes).toBe(2);
    });
  });

  describe('Formatage du temps', () => {
    it('devrait formater correctement les minutes', () => {
      AsyncStorage.getItem.mockResolvedValue(null);
      
      const testCases = [
        { minutes: 0, expected: '0min' },
        { minutes: 30, expected: '30min' },
        { minutes: 60, expected: '1h' },
        { minutes: 90, expected: '1h30min' }
      ];

      testCases.forEach(({ minutes, expected }) => {
        AsyncStorage.getItem
          .mockResolvedValueOnce('0')
          .mockResolvedValueOnce(minutes.toString())
          .mockResolvedValueOnce('Sat Jan 01 2022');

        const { result } = renderHook(() => useActivityMetrics());
        
        waitFor(() => {
          expect(result.current.formattedTime).toBe(expected);
        });
      });
    });
  });

  describe('Tendances de streak', () => {
    it('devrait retourner les bonnes tendances', () => {
      const testCases = [
        { streak: 0, expected: null },
        { streak: 1, expected: '🔥 Continue!' },
        { streak: 3, expected: '💪 En forme!' },
        { streak: 7, expected: '🏆 Incroyable!' }
      ];

      testCases.forEach(({ streak, expected }) => {
        AsyncStorage.getItem
          .mockResolvedValueOnce(streak.toString())
          .mockResolvedValueOnce('0')
          .mockResolvedValueOnce('Sat Jan 01 2022');

        const { result } = renderHook(() => useActivityMetrics());
        
        waitFor(() => {
          expect(result.current.streakTrend).toBe(expected);
        });
      });
    });
  });
});