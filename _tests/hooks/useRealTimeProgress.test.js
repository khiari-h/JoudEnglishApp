

import useRealTimeProgress from '../../src/hooks/useRealTimeProgress';

describe('useRealTimeProgress', () => {
  it('retourne des fonctions de progression', () => {
    const { result } = renderHook(() => useRealTimeProgress());
    expect(typeof result.current.getLevelProgress).toBe('function');
    expect(typeof result.current.getExerciseProgress).toBe('function');
    expect(typeof result.current.refresh).toBe('function');
  });

  // Ajouter des tests de logique métier selon l’implémentation réelle
});
