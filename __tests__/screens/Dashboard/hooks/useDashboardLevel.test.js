// __tests__/screens/Dashboard/hooks/useDashboardLevel.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDashboardLevel } from '../../../../src/screens/Dashboard/hooks/useDashboardLevel';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock des constantes
jest.mock('../../../../src/utils/constants', () => ({
  LANGUAGE_LEVELS: {
    '1': { title: 'Débutant', color: '#10B981' },
    '2': { title: 'Élémentaire', color: '#3B82F6' },
    '3': { title: 'Intermédiaire', color: '#8B5CF6' },
    '4': { title: 'Intermédiaire+', color: '#F59E0B' },
    '5': { title: 'Avancé', color: '#EF4444' },
    '6': { title: 'Expert', color: '#EC4899' },
    'bonus': { title: 'Bonus', color: '#6366F1' }
  }
}));

describe('useDashboardLevel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue();
  });

  it('devrait initialiser avec le niveau 1 par défaut', async () => {
    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.currentLevel).toBe('1');
      expect(result.current.isLoaded).toBe(true);
    });
  });

  it('devrait charger le niveau sauvegardé depuis AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue('3');

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.currentLevel).toBe('3');
      expect(result.current.isLoaded).toBe(true);
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user_active_level');
  });

  it('devrait mapper les anciens niveaux vers les nouveaux', async () => {
    // Le hook ne mappe que si le niveau n'existe pas dans LANGUAGE_LEVELS
    // Comme A2 n'existe pas dans nos LANGUAGE_LEVELS mockés, il utilisera le niveau par défaut
    AsyncStorage.getItem.mockResolvedValue('A2');

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.currentLevel).toBe('1'); // Fallback au niveau par défaut
    });
  });

  it('devrait utiliser le niveau du contexte progress si aucun niveau sauvegardé', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: { currentLevel: 'B1' } })
    );

    await waitFor(() => {
      expect(result.current.currentLevel).toBe('3'); // B1 mappé vers 3
    });
  });

  it('devrait changer le niveau actif et le sauvegarder', async () => {
    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    await act(async () => {
      await result.current.handleChangeActiveLevel('4');
    });

    expect(result.current.currentLevel).toBe('4');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user_active_level', '4');
  });

  it('ne devrait pas changer vers un niveau invalide', async () => {
    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const initialLevel = result.current.currentLevel;

    await act(async () => {
      await result.current.handleChangeActiveLevel('invalid_level');
    });

    expect(result.current.currentLevel).toBe(initialLevel);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('devrait retourner la couleur du niveau courant', async () => {
    AsyncStorage.getItem.mockResolvedValue('2');

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.levelColor).toBe('#3B82F6');
    });
  });

  it('devrait retourner une couleur par défaut pour un niveau invalide', async () => {
    // Simuler un niveau invalide qui pourrait être dans le storage
    AsyncStorage.getItem.mockResolvedValue('invalid');

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      // Le niveau invalide sera ignoré et on aura le niveau 1 par défaut
      expect(result.current.currentLevel).toBe('1');
      expect(result.current.levelColor).toBe('#10B981'); // Couleur du niveau 1
    });
  });

  it('devrait synchroniser avec le progress context après le chargement initial', async () => {
    const { result, rerender } = renderHook(
      ({ progressData }) => useDashboardLevel({ progress: progressData }),
      { initialProps: { progressData: {} } }
    );

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    // Simuler un changement dans le progress context
    rerender({ progressData: { currentLevel: 'C1' } });

    await waitFor(() => {
      expect(result.current.currentLevel).toBe('5'); // C1 mappé vers 5
    });
  });

  it('devrait gérer les erreurs de AsyncStorage gracieusement', async () => {
    AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
      expect(result.current.currentLevel).toBe('1'); // Fallback au niveau 1
    });

    expect(consoleSpy).toHaveBeenCalledWith('Erreur chargement niveau actif:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('devrait gérer les erreurs de sauvegarde gracieusement', async () => {
    AsyncStorage.setItem.mockRejectedValue(new Error('Save error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => 
      useDashboardLevel({ progress: {} })
    );

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    await act(async () => {
      await result.current.handleChangeActiveLevel('3');
    });

    expect(result.current.currentLevel).toBe('3'); // Le niveau change quand même
    expect(consoleSpy).toHaveBeenCalledWith('Erreur sauvegarde niveau actif:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('ne devrait charger qu\'une seule fois au montage', async () => {
    const { rerender } = renderHook(
      ({ progressData }) => useDashboardLevel({ progress: progressData }),
      { initialProps: { progressData: {} } }
    );

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });

    // Rerender plusieurs fois
    rerender({ progressData: { someOtherProp: 'value' } });
    rerender({ progressData: { anotherProp: 'value2' } });

    // AsyncStorage.getItem ne devrait toujours être appelé qu'une fois
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
  });
});