// __tests__/hooks/useLastActivity.test.js

import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/utils/eventBus', () => ({
  ...jest.requireActual('../../src/utils/eventBus'),
  emit: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../../src/utils/constants', () => ({
  STORAGE_KEYS: {
    LAST_ACTIVITY: 'last_activity'
  }
}));

import useLastActivity from '../../src/hooks/useLastActivity';
import eventBus from '../../src/utils/eventBus';

// ---

describe('useLastActivity', () => {
  const FIXED_NOW_TIMESTAMP = 1640995200000;
  
  let errorSpy;
  let warnSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(FIXED_NOW_TIMESTAMP);
    
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // =================== TESTS DE CHARGEMENT ===================

  it('devrait initialiser avec null si aucune donnée n\'est trouvée', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lastActivity).toBeNull();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('last_activity');
  });

  it('devrait charger une activit existante', async () => {
    const mockActivity = { type: 'vocabulary', timestamp: FIXED_NOW_TIMESTAMP - 300000 };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockActivity));

    const { result } = renderHook(() => useLastActivity());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.lastActivity).toBeDefined();
      expect(result.current.lastActivity.type).toBe('vocabulary');
      expect(result.current.lastActivity.timeElapsed).toBe('Il y a 5 min');
    });
  });

  it('devrait réinitialiser l\'activité en cas d\'erreur de chargement', async () => {
    AsyncStorage.getItem.mockRejectedValue(new Error('Erreur de lecture'));
    const { result } = renderHook(() => useLastActivity());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lastActivity).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      'Erreur chargement dernière activité:',
      expect.any(Error)
    );
  });

  // =================== TESTS DE LOGIQUE DE TEMPS ÉCOULÉ ===================

  it('devrait afficher "À l\'instant" si l\'activité a lieu maintenant', async () => {
    const mockActivity = { type: 'vocabulary', timestamp: FIXED_NOW_TIMESTAMP };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockActivity));

    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lastActivity.timeElapsed).toBe("À l'instant");
  });

  it('devrait afficher le temps en heures', async () => {
    const mockActivity = { type: 'vocabulary', timestamp: FIXED_NOW_TIMESTAMP - (90 * 60 * 1000) };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockActivity));

    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lastActivity.timeElapsed).toBe('Il y a 1h');
  });

  it('devrait afficher le temps en jours', async () => {
    const mockActivity = { type: 'vocabulary', timestamp: FIXED_NOW_TIMESTAMP - (1500 * 60 * 1000) };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockActivity));

    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lastActivity.timeElapsed).toBe('Il y a 1j');
  });

  // =================== TESTS DE SAUVEGARDE ET SUPPRESSION ===================

  it('devrait sauvegarder une nouvelle activité et mettre à jour l\'état local', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.saveActivity({ type: 'grammar', score: 85 });
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'last_activity',
      JSON.stringify({ type: 'grammar', score: 85, timestamp: FIXED_NOW_TIMESTAMP })
    );
    expect(result.current.lastActivity.timeElapsed).toBe("À l'instant");
    expect(eventBus.emit).toHaveBeenCalledWith('progress-updated', expect.any(Object));
  });

  it('devrait gérer les erreurs de sauvegarde sans planter', async () => {
    AsyncStorage.setItem.mockRejectedValue(new Error('Erreur de sauvegarde'));
    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.saveActivity({ type: 'test' });
    });

    expect(errorSpy).toHaveBeenCalledWith('Erreur sauvegarde activité:', expect.any(Error));
  });

it('devrait gérer les erreurs de bus d\'événements sans planter', async () => {
  AsyncStorage.getItem.mockResolvedValue(null);
  AsyncStorage.setItem.mockResolvedValue(); // <-- Important : pas d'erreur ici
  const { result } = renderHook(() => useLastActivity());
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Mock l'erreur uniquement sur eventBus.emit
  eventBus.emit.mockImplementationOnce(() => { throw new Error('Erreur bus'); });

  await act(async () => {
    await result.current.saveActivity({ type: 'test' });
  });

  expect(warnSpy).toHaveBeenCalledWith('Event bus error (non-critical):', expect.any(Error));
  expect(result.current.lastActivity.type).toBe('test');
});


  it('devrait supprimer une activité', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({ type: 'existing', timestamp: 123 }));
    AsyncStorage.removeItem.mockResolvedValue();
    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.lastActivity).not.toBeNull();

    await act(async () => {
      await result.current.clearActivity();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('last_activity');
    expect(result.current.lastActivity).toBeNull();
  });

  it('devrait gérer les erreurs de suppression sans planter', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({ type: 'existing', timestamp: 123 }));
    AsyncStorage.removeItem.mockRejectedValue(new Error('Erreur de suppression'));
    const { result } = renderHook(() => useLastActivity());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.clearActivity();
    });

    expect(errorSpy).toHaveBeenCalledWith('Erreur suppression activité:', expect.any(Error));
    expect(result.current.lastActivity).not.toBeNull();
  });

  // =================== AUTRES TESTS ===================

  it('devrait avoir toutes les fonctions nécessaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());

    expect(typeof result.current.saveActivity).toBe('function');
    expect(typeof result.current.clearActivity).toBe('function');
    expect(typeof result.current.reload).toBe('function');
  });
});