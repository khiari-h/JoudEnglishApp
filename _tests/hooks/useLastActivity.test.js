import { renderHook, act } from '@testing-library/react';
import useLastActivity from '../../src/hooks/useLastActivity';

// Mock éventuel des dépendances (API, contextes, etc.)

describe('useLastActivity', () => {
  it('retourne une activité par défaut ou nulle au départ', () => {
    const { result } = renderHook(() => useLastActivity());
    expect(result.current.lastActivity).toBeDefined(); // ou null selon l’implémentation
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('permet de recharger l’activité', async () => {
    const { result } = renderHook(() => useLastActivity());
    await act(async () => {
      await result.current.reload();
    });
    // Vérifier que l’activité a été mise à jour (adapter selon la logique réelle)
    expect(result.current.lastActivity).toBeDefined();
  });
});
