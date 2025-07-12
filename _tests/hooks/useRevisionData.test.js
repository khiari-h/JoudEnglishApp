import { renderHook } from '@testing-library/react';
import useRevisionData from '../../src/hooks/useRevisionData';

describe('useRevisionData', () => {
  it('retourne les données de révision', () => {
    const { result } = renderHook(() => useRevisionData());
    expect(result.current).toBeDefined();
    // Ajouter des assertions selon la logique réelle
  });
});
