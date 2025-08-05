// __tests__/hooks/useRouteActivityTracker.test.js
import { renderHook } from '@testing-library/react-native';
import useRouteActivityTracker from '../../src/hooks/useRouteActivityTracker';

jest.mock('expo-router', () => ({
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('../../src/hooks/useActivityMetrics', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    updateStreak: jest.fn(),
  })),
}));

describe('useRouteActivityTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait s\'initialiser sans erreur', () => {
    const { useSegments, usePathname } = require('expo-router');
    useSegments.mockReturnValue(['home']);
    usePathname.mockReturnValue('/home');

    expect(() => {
      renderHook(() => useRouteActivityTracker());
    }).not.toThrow();
  });

  it('devrait détecter un exercice de vocabulaire', () => {
    const mockStartSession = jest.fn();
    const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
    useActivityMetrics.mockReturnValue({
      startSession: mockStartSession,
      endSession: jest.fn(),
      updateStreak: jest.fn(),
    });

    const { useSegments, usePathname } = require('expo-router');
    useSegments.mockReturnValue(['level', 'VocabularyExercise']);
    usePathname.mockReturnValue('/level/VocabularyExercise');

    renderHook(() => useRouteActivityTracker());

    expect(mockStartSession).toHaveBeenCalledWith('VocabularyExercise');
  });

  it('devrait détecter un assessment', () => {
    const mockStartSession = jest.fn();
    const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
    useActivityMetrics.mockReturnValue({
      startSession: mockStartSession,
      endSession: jest.fn(),
      updateStreak: jest.fn(),
    });

    const { useSegments, usePathname } = require('expo-router');
    useSegments.mockReturnValue(['level', 'Assessment']);
    usePathname.mockReturnValue('/level/Assessment');

    renderHook(() => useRouteActivityTracker());

    expect(mockStartSession).toHaveBeenCalledWith('Assessment');
  });

  it('ne devrait pas démarrer de session pour une page normale', () => {
    const mockStartSession = jest.fn();
    const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
    useActivityMetrics.mockReturnValue({
      startSession: mockStartSession,
      endSession: jest.fn(),
      updateStreak: jest.fn(),
    });

    const { useSegments, usePathname } = require('expo-router');
    useSegments.mockReturnValue(['home', 'dashboard']);
    usePathname.mockReturnValue('/home/dashboard');

    renderHook(() => useRouteActivityTracker());

    expect(mockStartSession).not.toHaveBeenCalled();
  });

  it('devrait gérer les segments vides', () => {
    const mockStartSession = jest.fn();
    const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
    useActivityMetrics.mockReturnValue({
      startSession: mockStartSession,
      endSession: jest.fn(),
      updateStreak: jest.fn(),
    });

    const { useSegments, usePathname } = require('expo-router');
    useSegments.mockReturnValue([]);
    usePathname.mockReturnValue('/');

    expect(() => {
      renderHook(() => useRouteActivityTracker());
    }).not.toThrow();

    expect(mockStartSession).not.toHaveBeenCalled();
  });
});