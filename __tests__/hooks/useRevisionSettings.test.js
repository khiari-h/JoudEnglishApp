// __tests__/hooks/useRevisionSettings.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRevisionSettings } from '../../src/hooks/useRevisionSettings';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../../src/utils/eventBus', () => ({
  emit: jest.fn()
}));

describe('useRevisionSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait initialiser avec les préférences par défaut', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionSettings());

    expect(result.current.isLoading).toBe(true);
  });

  it('devrait charger les préférences sauvegardées', async () => {
    const mockPreferences = {
      isDisabled: true,
      nextRevisionAt: 100,
      frequency: 75,
      questionsCount: 15
    };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockPreferences));
    const { result } = renderHook(() => useRevisionSettings());

    await waitFor(() => {
      expect(result.current.preferences.isDisabled).toBe(true);
      expect(result.current.preferences.nextRevisionAt).toBe(100);
      expect(result.current.preferences.frequency).toBe(75);
      expect(result.current.preferences.questionsCount).toBe(15);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait mettre à jour les préférences', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionSettings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newPrefs = { frequency: 100 };

    await act(async () => {
      const success = await result.current.updatePreferences(newPrefs);
      expect(success).toBe(true);
    });

    expect(result.current.preferences.frequency).toBe(100);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('devrait avoir toutes les fonctions nécessaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionSettings());

    expect(typeof result.current.enableRevisions).toBe('function');
    expect(typeof result.current.disableRevisions).toBe('function');
    expect(typeof result.current.updateFrequency).toBe('function');
    expect(typeof result.current.updatePreferences).toBe('function');
    expect(typeof result.current.resetToNextTarget).toBe('function');
  });

  it('devrait activer les révisions', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionSettings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const success = await result.current.enableRevisions(75, 12);
      expect(success).toBe(true);
    });

    expect(result.current.preferences.isDisabled).toBe(false);
    expect(result.current.preferences.frequency).toBe(75);
    expect(result.current.preferences.questionsCount).toBe(12);
  });

  it('devrait désactiver les révisions', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useRevisionSettings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const success = await result.current.disableRevisions();
      expect(success).toBe(true);
    });

    expect(result.current.preferences.isDisabled).toBe(true);
  });
});