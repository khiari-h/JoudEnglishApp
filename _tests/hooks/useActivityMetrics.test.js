import { renderHook } from '@testing-library/react';
import useActivityMetrics from '../../src/hooks/useActivityMetrics';

describe('useActivityMetrics', () => {
  it('retourne des métriques d’activité', () => {
    const { result } = renderHook(() => useActivityMetrics());
    expect(result.current).toBeDefined();
    // Ajouter des assertions selon la logique réelle
  });
});
