// __tests__/screens/Dashboard/hooks/useDashboardState.test.js
import { renderHook, act } from '@testing-library/react-native';
import { useDashboardState } from '../../../../src/screens/Dashboard/hooks/useDashboardState';

describe('useDashboardState', () => {
  const mockLoadLastActivities = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadLastActivities.mockResolvedValue();
  });

  it('devrait initialiser avec les valeurs par défaut', () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    expect(result.current.showLevelProgress).toBe(false);
    expect(result.current.refreshing).toBe(false);
    expect(result.current.activeTab).toBe('home');
  });

  it('devrait ouvrir et fermer la modal de progression', () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    // Ouvrir la modal
    act(() => {
      result.current.openLevelProgressModal();
    });

    expect(result.current.showLevelProgress).toBe(true);

    // Fermer la modal
    act(() => {
      result.current.closeLevelProgressModal();
    });

    expect(result.current.showLevelProgress).toBe(false);
  });

  it('devrait changer l\'état de la modal directement', () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    act(() => {
      result.current.setShowLevelProgress(true);
    });

    expect(result.current.showLevelProgress).toBe(true);

    act(() => {
      result.current.setShowLevelProgress(false);
    });

    expect(result.current.showLevelProgress).toBe(false);
  });

  it('devrait changer l\'onglet actif', () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    act(() => {
      result.current.setActiveTab('progress');
    });

    expect(result.current.activeTab).toBe('progress');

    act(() => {
      result.current.setActiveTab('settings');
    });

    expect(result.current.activeTab).toBe('settings');
  });

  it('devrait gérer le pull-to-refresh avec succès', async () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    expect(result.current.refreshing).toBe(false);

    await act(async () => {
      await result.current.onRefresh();
    });

    // Après le refresh
    expect(result.current.refreshing).toBe(false);
    expect(mockLoadLastActivities).toHaveBeenCalledTimes(1);
  });

  it('devrait gérer les erreurs de refresh gracieusement', async () => {
    mockLoadLastActivities.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    await act(async () => {
      await result.current.onRefresh();
    });

    // Le refreshing devrait être remis à false même en cas d'erreur
    expect(result.current.refreshing).toBe(false);
    expect(mockLoadLastActivities).toHaveBeenCalledTimes(1);
  });

  it('devrait mémoriser la fonction onRefresh', () => {
    const { result, rerender } = renderHook(
      ({ loadFn }) => useDashboardState(loadFn),
      { initialProps: { loadFn: mockLoadLastActivities } }
    );

    const initialOnRefresh = result.current.onRefresh;

    // Rerender avec la même fonction
    rerender({ loadFn: mockLoadLastActivities });
    expect(result.current.onRefresh).toBe(initialOnRefresh);

    // Rerender avec une fonction différente
    const newMockFn = jest.fn();
    rerender({ loadFn: newMockFn });
    expect(result.current.onRefresh).not.toBe(initialOnRefresh);
  });

  it('devrait mémoriser les fonctions de modal', () => {
    const { result, rerender } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    const initialOpenModal = result.current.openLevelProgressModal;
    const initialCloseModal = result.current.closeLevelProgressModal;

    // Rerender - les fonctions devraient rester les mêmes
    rerender();
    expect(result.current.openLevelProgressModal).toBe(initialOpenModal);
    expect(result.current.closeLevelProgressModal).toBe(initialCloseModal);
  });

  it('devrait gérer les refresh multiples', async () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    // Exécuter deux refresh séquentiellement
    await act(async () => {
      await result.current.onRefresh();
    });

    await act(async () => {
      await result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(false);
    expect(mockLoadLastActivities).toHaveBeenCalledTimes(2);
  });

  it('devrait exposer toutes les fonctions et états nécessaires', () => {
    const { result } = renderHook(() => 
      useDashboardState(mockLoadLastActivities)
    );

    // États
    expect(typeof result.current.showLevelProgress).toBe('boolean');
    expect(typeof result.current.refreshing).toBe('boolean');
    expect(typeof result.current.activeTab).toBe('string');

    // Fonctions
    expect(typeof result.current.setShowLevelProgress).toBe('function');
    expect(typeof result.current.openLevelProgressModal).toBe('function');
    expect(typeof result.current.closeLevelProgressModal).toBe('function');
    expect(typeof result.current.setActiveTab).toBe('function');
    expect(typeof result.current.onRefresh).toBe('function');
  });
});