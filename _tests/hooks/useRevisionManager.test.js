import { renderHook } from '@testing-library/react';
import useRevisionManager from '../../src/hooks/useRevisionManager';

describe('useRevisionManager', () => {
  it('retourne le manager de révision', () => {
    const { result } = renderHook(() => useRevisionManager());
    expect(result.current).toBeDefined();
    // Ajouter des assertions selon la logique réelle
  });
});
