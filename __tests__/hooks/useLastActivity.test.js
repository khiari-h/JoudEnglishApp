// __tests__/hooks/useLastActivity.test.js
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLastActivity from '../../src/hooks/useLastActivity';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../../src/utils/constants', () => ({
  STORAGE_KEYS: {
    LAST_ACTIVITY: 'last_activity'
  }
}));

jest.mock('../../src/utils/eventBus', () => ({
  emit: jest.fn()
}));

describe('useLastActivity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(1640995200000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devrait initialiser avec null', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());
    
    expect(result.current.lastActivity).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it('devrait charger une activit�� existante', async () => {
    const mockActivity = {
      type: 'vocabulary',
      timestamp: 1640995200000 - 300000 // Il y a 5 minutes
    };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockActivity));
    const { result } = renderHook(() => useLastActivity());

    await waitFor(() => {
      expect(result.current.lastActivity).toBeDefined();
      expect(result.current.lastActivity.type).toBe('vocabulary');
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait sauvegarder une nouvelle activité', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const activityData = { type: 'grammar', score: 85 };

    await act(async () => {
      await result.current.saveActivity(activityData);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('devrait avoir toutes les fonctions nécessaires', () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const { result } = renderHook(() => useLastActivity());
    
    expect(typeof result.current.saveActivity).toBe('function');
    expect(typeof result.current.clearActivity).toBe('function');
    expect(typeof result.current.reload).toBe('function');
  });
});