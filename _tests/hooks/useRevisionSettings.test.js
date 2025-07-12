import { renderHook } from '@testing-library/react';
import { useRevisionSettings } from '../../src/hooks/useRevisionSettings';

describe('useRevisionSettings', () => {
  it('retourne les paramètres de révision', () => {
    const { result } = renderHook(() => useRevisionSettings());
    expect(result.current).toBeDefined();
    // Ajouter des assertions selon la logique réelle
  });
});
