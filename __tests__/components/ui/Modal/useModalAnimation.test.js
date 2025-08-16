import { renderHook, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import useModalAnimation from '../../../../src/components/ui/Modal/useModalAnimation';

// Créer des mocks réalistes
const mockAnimatedValue = {
  interpolate: jest.fn().mockReturnValue('mockedInterpolatedValue'),
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
  setValue: jest.fn(),
  _value: 0,
};

const mockStart = jest.fn();
const mockTiming = jest.fn().mockReturnValue({
  start: mockStart,
  stop: jest.fn(),
});

// Mock Animated
jest.spyOn(Animated, 'Value').mockImplementation(() => mockAnimatedValue);
jest.spyOn(Animated, 'timing').mockImplementation(mockTiming);

describe('useModalAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAnimatedValue.interpolate.mockReturnValue('mockedInterpolatedValue');
  });

  it('devrait démarrer l\'animation si visible devient vrai', () => {
    const { rerender } = renderHook(
      ({ visible, animationType, customAnimation }) => 
        useModalAnimation({ visible, animationType, customAnimation }), 
      {
        initialProps: { 
          visible: false, 
          animationType: 'custom', 
          customAnimation: true 
        },
      }
    );

    act(() => {
      rerender({ 
        visible: true, 
        animationType: 'custom', 
        customAnimation: true 
      });
    });

    // L'animation est appelée 2 fois : une fois pour le rendu initial (visible: false -> toValue: 0)
    // et une fois pour le changement (visible: true -> toValue: 1)
    expect(mockTiming).toHaveBeenCalledTimes(2);
    expect(mockStart).toHaveBeenCalledTimes(2);
  });

  it('devrait appeler Animated.timing avec les bonnes valeurs pour la position "top"', () => {
    const { rerender } = renderHook(
      ({ visible, animationType, customAnimation, position }) => 
        useModalAnimation({ visible, animationType, customAnimation, position }), 
      {
        initialProps: { 
          visible: false, 
          animationType: 'custom', 
          customAnimation: true,
          position: 'top' 
        },
      }
    );

    act(() => {
      rerender({ 
        visible: true, 
        animationType: 'custom', 
        customAnimation: true,
        position: 'top' 
      });
    });

    // Vérifier le dernier appel (visible: true)
    expect(mockTiming).toHaveBeenLastCalledWith(
      mockAnimatedValue,
      expect.objectContaining({
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    );
  });

  it('devrait retourner les styles de transformation corrects pour la position "top"', () => {
    const { result } = renderHook(() => 
      useModalAnimation({ 
        visible: true, 
        animationType: 'custom', 
        customAnimation: true,
        position: 'top' 
      })
    );
    
    // Vérifier que le hook retourne bien un style
    expect(result.current).toBeDefined();
    
    // Vérifier que interpolate a été appelé pour créer les transformations
    expect(mockAnimatedValue.interpolate).toHaveBeenCalledWith({
      inputRange: [0, 1],
      outputRange: [-300, 0]
    });
    
    // Vérifier la structure du style retourné
    expect(result.current).toHaveProperty('transform');
    expect(Array.isArray(result.current.transform)).toBe(true);
    expect(result.current.transform).toEqual([
      { translateY: 'mockedInterpolatedValue' }
    ]);
  });
});