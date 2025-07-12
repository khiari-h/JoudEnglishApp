// Mock des hooks expo-router pour éviter l'erreur d'accès à isReady
jest.mock('expo-router', () => ({
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => '/'),
}));

// Mock du hook useActivityMetrics pour éviter undefined
jest.mock('../../src/hooks/useActivityMetrics', () => ({
  __esModule: true,
  default: () => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    updateStreak: jest.fn(),
  }),
}));
import { renderHook } from '@testing-library/react';
import useRouteActivityTracker from '../../src/hooks/useRouteActivityTracker';

describe('useRouteActivityTracker', () => {
  it('ne plante pas même sans contexte de navigation', () => {
    const { result, error } = renderHook(() => useRouteActivityTracker());
    expect(error).toBeUndefined();
    // On accepte que result.current soit undefined si le contexte n'est pas mocké
  });
});
