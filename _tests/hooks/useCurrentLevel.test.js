import { renderHook, act } from '@testing-library/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCurrentLevel } from '../../src/hooks/useCurrentLevel';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useCurrentLevel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retourne le niveau par défaut "1" quand aucun niveau sauvegardé', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    
    const { result } = renderHook(() => useCurrentLevel());
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current).toBe('1');
  });

  it('retourne le niveau sauvegardé depuis AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue('3');
    
    const { result } = renderHook(() => useCurrentLevel());
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current).toBe('3');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('user_active_level');
  });

  it('gère les erreurs AsyncStorage gracieusement', async () => {
    AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
    
    const { result } = renderHook(() => useCurrentLevel());
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Devrait retourner le niveau par défaut même en cas d'erreur
    expect(result.current).toBe('1');
  });

  it('retourne le niveau bonus correctement', async () => {
    AsyncStorage.getItem.mockResolvedValue('bonus');
    
    const { result } = renderHook(() => useCurrentLevel());
    
    // Attendre que le hook se charge
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current).toBe('bonus');
  });
}); 