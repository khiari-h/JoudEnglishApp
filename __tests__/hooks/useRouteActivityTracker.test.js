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

  describe('Fonctions utilitaires extraites', () => {
    it('devrait détecter correctement les exercices', () => {
      const mockStartSession = jest.fn();
      const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
      useActivityMetrics.mockReturnValue({
        startSession: mockStartSession,
        endSession: jest.fn(),
        updateStreak: jest.fn(),
      });

      const { useSegments } = require('expo-router');
      
      // Test avec différents types d'exercices
      useSegments.mockReturnValue(['level', 'VocabularyExercise']);
      renderHook(() => useRouteActivityTracker());
      expect(mockStartSession).toHaveBeenCalledWith('VocabularyExercise');

      jest.clearAllMocks();
      
      useSegments.mockReturnValue(['level', 'GrammarExercise']);
      renderHook(() => useRouteActivityTracker());
      expect(mockStartSession).toHaveBeenCalledWith('GrammarExercise');

      jest.clearAllMocks();
      
      useSegments.mockReturnValue(['level', 'Assessment']);
      renderHook(() => useRouteActivityTracker());
      expect(mockStartSession).toHaveBeenCalledWith('Assessment');
    });

    it('devrait gérer les transitions entre exercices', () => {
      const mockStartSession = jest.fn();
      const mockEndSession = jest.fn();
      const mockUpdateStreak = jest.fn();
      
      const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
      useActivityMetrics.mockReturnValue({
        startSession: mockStartSession,
        endSession: mockEndSession,
        updateStreak: mockUpdateStreak,
      });

      const { useSegments, usePathname } = require('expo-router');
      
      // Premier exercice
      useSegments.mockReturnValue(['level', 'VocabularyExercise']);
      usePathname.mockReturnValue('/level/VocabularyExercise');
      renderHook(() => useRouteActivityTracker());
      
      expect(mockStartSession).toHaveBeenCalledWith('VocabularyExercise');
      expect(mockStartSession).toHaveBeenCalledTimes(1);

      // Nettoyer les mocks pour le test suivant
      jest.clearAllMocks();
      
      // Deuxième exercice (nouveau hook, nouvelle instance)
      useSegments.mockReturnValue(['level', 'GrammarExercise']);
      usePathname.mockReturnValue('/level/GrammarExercise');
      renderHook(() => useRouteActivityTracker());
      
      expect(mockStartSession).toHaveBeenCalledWith('GrammarExercise');
      expect(mockStartSession).toHaveBeenCalledTimes(1);
    });

    it('devrait gérer les erreurs de session gracieusement', () => {
      const mockStartSession = jest.fn().mockImplementation(() => {
        throw new Error('Erreur de session');
      });
      const mockEndSession = jest.fn();
      const mockUpdateStreak = jest.fn();
      
      const useActivityMetrics = require('../../src/hooks/useActivityMetrics').default;
      useActivityMetrics.mockReturnValue({
        startSession: mockStartSession,
        endSession: mockEndSession,
        updateStreak: mockUpdateStreak,
      });

      const { useSegments, usePathname } = require('expo-router');
      useSegments.mockReturnValue(['level', 'VocabularyExercise']);
      usePathname.mockReturnValue('/level/VocabularyExercise');

      // Ne devrait pas planter malgré l'erreur
      expect(() => {
        renderHook(() => useRouteActivityTracker());
      }).not.toThrow();
    });

    it('devrait éviter les re-déclenchements inutiles', () => {
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

      // Premier rendu
      const hook = renderHook(() => useRouteActivityTracker());
      expect(mockStartSession).toHaveBeenCalledTimes(1);

      // Même pathname, ne devrait pas redémarrer (même instance)
      // Simuler un changement de segments mais même pathname
      useSegments.mockReturnValue(['level', 'VocabularyExercise']);
      usePathname.mockReturnValue('/level/VocabularyExercise');
      
      // Forcer un re-render
      hook.rerender();
      
      // Devrait toujours être 1 car même pathname
      expect(mockStartSession).toHaveBeenCalledTimes(1);
    });


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