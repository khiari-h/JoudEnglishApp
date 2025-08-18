import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useActivityMetrics from '../../src/hooks/useActivityMetrics';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useActivityMetrics - Refactorisé', () => {
  const FIXED_DATE = new Date('2022-01-01T12:00:00');
  const YESTERDAY = new Date('2021-12-31T12:00:00');
  const TWO_DAYS_AGO = new Date('2021-12-30T12:00:00');

  const setupMocks = (initialData = {}) => {
    AsyncStorage.getItem.mockImplementation((key) => {
      const data = {
        current_streak: '0',
        today_minutes: '0',
        last_time_date: FIXED_DATE.toDateString(),
        last_activity_date: null,
        ...initialData,
      };
      return Promise.resolve(data[key] || null);
    });
    AsyncStorage.setItem.mockResolvedValue(null);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_DATE);
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    setupMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  // =================== CHARGEMENT INITIAL ===================
  describe('Chargement initial', () => {
    it('devrait charger les métriques existantes correctement', async () => {
      setupMocks({
        current_streak: '5',
        today_minutes: '30',
        last_time_date: FIXED_DATE.toDateString(),
      });

      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.currentStreak).toBe(5);
      expect(result.current.todayMinutes).toBe(30);
    });

    it('devrait réinitialiser les minutes pour un nouveau jour', async () => {
      setupMocks({
        today_minutes: '45',
        last_time_date: YESTERDAY.toDateString(),
      });

      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.todayMinutes).toBe(0);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('today_minutes', '0');
    });

    it('devrait réinitialiser le streak si la dernière activité est trop ancienne', async () => {
      setupMocks({
        current_streak: '10',
        last_activity_date: TWO_DAYS_AGO.toDateString(),
      });

      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.currentStreak).toBe(0);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('current_streak', '0');
    });
  });

  // =================== GESTION DES SESSIONS ===================
  describe('Gestion des sessions', () => {
    it('devrait démarrer et terminer une session avec succès', async () => {
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      act(() => {
        result.current.startSession('vocabulary');
      });

      act(() => {
        jest.advanceTimersByTime(119000);
      });

      let sessionResult;
      await act(async () => {
        sessionResult = await result.current.endSession();
      });

      expect(sessionResult.success).toBe(true);
      expect(sessionResult.sessionMinutes).toBe(1);
      expect(result.current.todayMinutes).toBe(1);
    });

    it('devrait fournir le statut de session en temps réel', async () => {
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      act(() => {
        result.current.startSession('test');
      });

      act(() => {
        jest.advanceTimersByTime(65000);
      });

      await waitFor(() => {
        expect(result.current.todayInfo.session.formattedTime).toBe('1:05');
      });
    });
  });

  // =================== GESTION DU STREAK ===================
  describe('Gestion du streak', () => {
    it('devrait incrémenter le streak si activité hier', async () => {
      setupMocks({
        current_streak: '5',
        last_activity_date: YESTERDAY.toDateString(),
        today_minutes: '1',
      });
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let streakResult;
      await act(async () => {
        streakResult = await result.current.updateStreak();
      });

      expect(streakResult.success).toBe(true);
      expect(streakResult.streak).toBe(6);
      expect(result.current.currentStreak).toBe(6);
    });

    it('devrait réinitialiser le streak si pas d\'activité hier', async () => {
      setupMocks({
        current_streak: '5',
        last_activity_date: TWO_DAYS_AGO.toDateString(),
        today_minutes: '1',
      });
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let streakResult;
      await act(async () => {
        streakResult = await result.current.updateStreak();
      });

      expect(streakResult.success).toBe(true);
      expect(streakResult.streak).toBe(1);
      expect(result.current.currentStreak).toBe(1);
    });
  });

  // =================== TESTS DE FORMATAGE ET API ===================
  describe('Formatage et APIs enrichies', () => {
    it('devrait formater correctement différentes durées', async () => {
      setupMocks({ today_minutes: '30' });
      const { result: result1 } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result1.current.isLoading).toBe(false));
      expect(result1.current.formattedTime).toBe('30min');

      setupMocks({ today_minutes: '90' });
      const { result: result2 } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result2.current.isLoading).toBe(false));
      expect(result2.current.formattedTime).toBe('1h30min');

      setupMocks({ today_minutes: '60' });
      const { result: result3 } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result3.current.isLoading).toBe(false));
      expect(result3.current.formattedTime).toBe('1h');
    });

    it('devrait retourner les bonnes tendances de streak', async () => {
      setupMocks({ current_streak: '7' });
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.streakTrend).toBe('🏆 Incroyable!');
    });
  });

  // =================== TESTS D'INTÉGRATION ===================
  describe('Intégration complète', () => {
    it('devrait gérer un flow complet d\'activité', async () => {
      setupMocks({
        current_streak: '2',
        last_activity_date: YESTERDAY.toDateString(),
        today_minutes: '0',
      });

      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.currentStreak).toBe(2);
      expect(result.current.todayMinutes).toBe(0);

      act(() => {
        result.current.startSession('vocabulary');
      });

      act(() => {
        jest.advanceTimersByTime(300000);
      });
      
      await act(async () => {
        await result.current.endSession();
      });

      await waitFor(() => {
        expect(result.current.todayMinutes).toBe(5);
      });

      await act(async () => {
        await result.current.updateStreak();
      });

      expect(result.current.currentStreak).toBe(3);
      expect(result.current.streakTrend).toBe('💪 En forme!');
    });
  });

  // =================== GESTION DES ERREURS ===================
  describe('Gestion des erreurs', () => {
    // 1. Test mis à jour pour couvrir le catch de loadMetrics (lignes 93-95)
    it('devrait gérer une erreur de lecture lors du chargement initial', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Erreur de lecture simulée'));
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.currentStreak).toBe(0);
      expect(result.current.todayMinutes).toBe(0);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('getItem'), expect.any(Error));
    });

    // 2. Test mis à jour pour couvrir le catch de endSession (lignes 138-141)
    it('devrait gérer une erreur de sauvegarde lors de la fin de session', async () => {
      setupMocks({ today_minutes: '5' });
      // Simuler l'échec de setMultipleStorageValues
      AsyncStorage.setItem.mockRejectedValueOnce(new Error('Erreur de sauvegarde simulée'));
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      act(() => {
        result.current.startSession();
        jest.advanceTimersByTime(60000);
      });

      const sessionResult = await act(async () => {
        return await result.current.endSession();
      });

      expect(sessionResult.success).toBe(false);
      expect(result.current.todayMinutes).toBe(6);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('setMultipleItems'), expect.any(Error));
    });

    // 3. Test mis à jour pour couvrir le catch initial et le catch imbriqué de updateStreak (lignes 190-208)
    it('devrait gérer une erreur de sauvegarde lors de la mise à jour du streak', async () => {
      setupMocks({
        today_minutes: '10',
        current_streak: '5',
        last_activity_date: TWO_DAYS_AGO.toDateString()
      });

      // Simuler le premier échec
      AsyncStorage.setItem.mockRejectedValueOnce(new Error('Erreur de sauvegarde initiale simulée'));
      // Simuler le second échec
      AsyncStorage.setItem.mockRejectedValueOnce(new Error('Erreur de sauvegarde de secours simulée'));

      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const streakResult = await act(async () => {
        return await result.current.updateStreak();
      });
      
      expect(streakResult.success).toBe(false);
      expect(streakResult.streak).toBe(1);
      expect(result.current.currentStreak).toBe(1);
      expect(console.warn).toHaveBeenCalledTimes(2);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('setMultipleItems'), expect.any(Error));
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('setMultipleItems'), expect.any(Error));
    });
  });
  
  // =================== GESTION DES CAS LIMITES ===================
  describe('Gestion des cas limites', () => {
    it('devrait retourner une erreur si endSession est appelé sans session active', async () => {
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const sessionResult = await act(async () => {
        return await result.current.endSession();
      });

      expect(sessionResult.success).toBe(false);
      expect(sessionResult.reason).toBe('No active session');
      expect(result.current.todayMinutes).toBe(0);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('devrait ignorer une session trop courte (moins d\'une minute)', async () => {
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      act(() => {
        result.current.startSession();
        jest.advanceTimersByTime(59000);
      });
      
      const sessionResult = await act(async () => {
        return await result.current.endSession();
      });

      expect(sessionResult.success).toBe(false);
      expect(sessionResult.reason).toBe('Session too short');
      expect(result.current.todayMinutes).toBe(0);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('devrait ignorer une session de 0 minute', async () => {
        const { result } = renderHook(() => useActivityMetrics());
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        
        act(() => {
            result.current.startSession();
        });
        
        const sessionResult = await act(async () => {
            return await result.current.endSession();
        });
        
        expect(sessionResult.success).toBe(false);
        expect(sessionResult.reason).toBe('Session too short');
        expect(result.current.todayMinutes).toBe(0);
    });

    it('devrait réinitialiser le streak si la dernière activité est nulle', async () => {
        setupMocks({
            current_streak: '5',
            last_activity_date: null,
            today_minutes: '1'
        });

        const { result } = renderHook(() => useActivityMetrics());
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.updateStreak();
        });
        
        expect(result.current.currentStreak).toBe(1);
    });
  });

  // =================== AUTRES TESTS DE LOGIQUE ===================
  describe('Autres tests de logique', () => {
    // Test mis à jour pour couvrir toutes les branches de getStreakTrend
    it('devrait retourner les bonnes tendances de streak pour toutes les catégories', async () => {
      const testCases = [
        { streak: '0', trend: null },
        { streak: '1', trend: '🔥 Continue!' },
        { streak: '2', trend: '🔥 Continue!' },
        { streak: '3', trend: '💪 En forme!' },
        { streak: '6', trend: '💪 En forme!' },
        { streak: '7', trend: '🏆 Incroyable!' },
        { streak: '13', trend: '🏆 Incroyable!' },
        { streak: '14', trend: '💎 Exceptionnel!' },
        { streak: '29', trend: '💎 Exceptionnel!' },
        { streak: '30', trend: '🏆 Légendaire!' },
        { streak: '100', trend: '🏆 Légendaire!' },
      ];

      for (const { streak, trend } of testCases) {
        setupMocks({ current_streak: streak });
        const { result } = renderHook(() => useActivityMetrics());
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.streakTrend).toBe(trend);
      }
    });

    it('devrait formater 0 minute en "0min"', async () => {
      setupMocks({ today_minutes: '0' });
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.formattedTime).toBe('0min');
    });

    it('devrait ne pas mettre a jour le streak si 0 minutes d activite aujourd hui', async () => {
      setupMocks({
        today_minutes: '0',
        last_activity_date: YESTERDAY.toDateString(),
      });
      const { result } = renderHook(() => useActivityMetrics());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const streakResult = await act(async () => {
        return await result.current.updateStreak();
      });
      
      expect(streakResult.success).toBe(true);
      expect(streakResult.reason).toBe('No activity today to update streak');
      expect(result.current.currentStreak).toBe(0);
      expect(AsyncStorage.setItem).not.toHaveBeenCalledWith('current_streak', expect.any(String));
    });
  });
});