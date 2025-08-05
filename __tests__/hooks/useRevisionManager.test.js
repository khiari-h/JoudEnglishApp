// __tests__/hooks/useRevisionManager.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRevisionManager from '../../src/hooks/useRevisionManager';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useRevisionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('devrait initialiser avec les valeurs par défaut', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionManager());

    expect(result.current.totalWordsLearned).toBe(0);
    expect(result.current.nextRevisionAt).toBe(50);
    expect(result.current.shouldShowRevision).toBe(false);
    expect(result.current.isRevisionDisabled).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('devrait charger les données sauvegardées', async () => {
    const mockSavedData = {
      nextRevisionAt: 100,
      lastRevisionWords: [{ word: 'test' }],
      revisionHistory: [{ timestamp: 123456789 }],
      isRevisionDisabled: true
    };

    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'revision_manager_data') {
        return Promise.resolve(JSON.stringify(mockSavedData));
      }
      return Promise.resolve(null);
    });

    const { result } = renderHook(() => useRevisionManager());

    await waitFor(() => {
      expect(result.current.nextRevisionAt).toBe(100);
      expect(result.current.isRevisionDisabled).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait gérer les choix de révision', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionManager());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const response = await result.current.handleRevisionChoice('disable');
      expect(response.action).toBe('disabled');
    });

    expect(result.current.isRevisionDisabled).toBe(true);
  });

  it('devrait avoir toutes les fonctions nécessaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionManager());

    expect(typeof result.current.handleRevisionChoice).toBe('function');
    expect(typeof result.current.markRevisionCompleted).toBe('function');
    expect(typeof result.current.enableRevisions).toBe('function');
    expect(typeof result.current.calculateTotalWords).toBe('function');
    expect(typeof result.current.selectRevisionWords).toBe('function');
    expect(typeof result.current.getRevisionStats).toBe('function');
    expect(result.current.config).toBeDefined();
  });

  it('devrait calculer les statistiques', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionManager());

    const stats = result.current.getRevisionStats();

    expect(stats.totalRevisions).toBe(0);
    expect(stats.averageScore).toBe(0);
    expect(stats.lastRevision).toBeNull();
    expect(stats.streak).toBe(0);
  });
});