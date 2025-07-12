
import { renderHook, act } from '@testing-library/react';
import useDailyWords from '../../src/hooks/useDailyWords';

describe('useDailyWords', () => {
  it('retourne le nombre de mots appris aujourd\'hui', () => {
    const { result } = renderHook(() => useDailyWords());
    expect(typeof result.current.wordsToday).toBe('number');
  });

  it('permet de rafraîchir le nombre de mots du jour', async () => {
    const { result } = renderHook(() => useDailyWords());
    await act(async () => {
      await result.current.refresh();
    });
    expect(typeof result.current.wordsToday).toBe('number');
  });
});
