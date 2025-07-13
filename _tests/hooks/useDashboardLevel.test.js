import { renderHook, act } from '@testing-library/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDashboardLevel } from '../../src/screens/Dashboard/hooks/useDashboardLevel';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useDashboardLevel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retourne le niveau par défaut "1" et les fonctions nécessaires', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.currentLevel).toBe('1');
    expect(typeof result.current.handleChangeActiveLevel).toBe('function');
    expect(typeof result.current.levelColor).toBe('string');
    expect(typeof result.current.isLoaded).toBe('boolean');
  });

  it('retourne le niveau sauvegardé depuis AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue('3');
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.currentLevel).toBe('3');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user_active_level');
  });

  it('change le niveau actif et le sauvegarde', async () => {
    AsyncStorage.getItem.mockResolvedValue('1');
    AsyncStorage.setItem.mockResolvedValue();
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Changer le niveau
    await act(async () => {
      await result.current.handleChangeActiveLevel('4');
    });
    
    expect(result.current.currentLevel).toBe('4');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user_active_level', '4');
  });

  it('ignore les niveaux invalides', async () => {
    AsyncStorage.getItem.mockResolvedValue('1');
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Essayer de changer avec un niveau invalide
    await act(async () => {
      await result.current.handleChangeActiveLevel('invalid');
    });
    
    // Le niveau ne devrait pas changer
    expect(result.current.currentLevel).toBe('1');
  });

  it('gère les erreurs AsyncStorage gracieusement', async () => {
    AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Devrait retourner le niveau par défaut même en cas d'erreur
    expect(result.current.currentLevel).toBe('1');
  });

  it('retourne la couleur du niveau actuel', async () => {
    AsyncStorage.getItem.mockResolvedValue('2');
    
    const { result } = renderHook(() => useDashboardLevel({ progress: {} }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.levelColor).toBe('#8b5cf6'); // Couleur du niveau 2
  });

  it('utilise le niveau depuis progressData si pas de niveau sauvegardé', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    
    const { result } = renderHook(() => useDashboardLevel({ 
      progress: { currentLevel: '5' } 
    }));
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.currentLevel).toBe('5');
  });
}); 