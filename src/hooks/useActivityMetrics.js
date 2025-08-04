/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useActivityMetrics from '../../src/hooks/useActivityMetrics';

// Mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('useActivityMetrics', () => {
  const MOCK_DATE = new Date('2025-01-01T12:00:00.000Z');
  const TODAY = MOCK_DATE.toDateString();
  const YESTERDAY = new Date(MOCK_DATE.getTime() - 86400000).toDateString();
  const TWO_DAYS_AGO = new Date(MOCK_DATE.getTime() - 2 * 86400000).toDateString();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('loads metrics and initializes default state', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({ someMetric: 123 }));

    const { result } = renderHook(() => useActivityMetrics());

    await waitFor(() => !result.current.isLoading);

    expect(result.current.metrics).toEqual({ someMetric: 123 });
    expect(result.current.todayMinutes).toBe(0);
    expect(result.current.formattedTime).toBe('0min');
    expect(result.current.currentStreak).toBe(0);
  });

  it('calculates session duration and saves it', async () => {
    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => result.current.startSession());
    act(() => jest.advanceTimersByTime(2 * 60000));

    await act(async () => {
      await result.current.endSession();
    });

    expect(result.current.todayMinutes).toBe(2);
    expect(result.current.formattedTime).toBe('2min');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('today_minutes', '2');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('last_time_date', TODAY);
  });

  it('increments streak if yesterday was last activity', async () => {
    AsyncStorage.getItem
      .mockResolvedValueOnce(JSON.stringify({ someMetric: 123 })) // metrics
      .mockResolvedValueOnce(YESTERDAY); // last_activity_date

    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => result.current.updateStreak());

    await waitFor(() => expect(result.current.currentStreak).toBe(1));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('current_streak', '1');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('last_activity_date', TODAY);
  });

  it('resets streak if last activity was 2 days ago', async () => {
    AsyncStorage.getItem
      .mockResolvedValueOnce(JSON.stringify({ someMetric: 123 })) // metrics
      .mockResolvedValueOnce(TWO_DAYS_AGO); // last_activity_date

    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => result.current.updateStreak());

    await waitFor(() => expect(result.current.currentStreak).toBe(1));
  });

  it('keeps streak unchanged if already updated today', async () => {
    AsyncStorage.getItem
      .mockResolvedValueOnce(JSON.stringify({ someMetric: 123 })) // metrics
      .mockResolvedValueOnce(TODAY); // last_activity_date

    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => result.current.updateStreak());

    await waitFor(() => expect(result.current.currentStreak).toBe(0));
    expect(AsyncStorage.setItem).not.toHaveBeenCalledWith('current_streak', expect.any(String));
  });

  it('returns correct streak trend', async () => {
    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => { result.current.currentStreak = 1; });
    expect(result.current.streakTrend).toBe('🔥 Continue!');

    act(() => { result.current.currentStreak = 3; });
    expect(result.current.streakTrend).toBe('💪 En forme!');

    act(() => { result.current.currentStreak = 7; });
    expect(result.current.streakTrend).toBe('🏆 Incroyable!');

    act(() => { result.current.currentStreak = 0; });
    expect(result.current.streakTrend).toBeNull();
  });

  it('returns correct formatted time across multiple sessions', async () => {
    const { result } = renderHook(() => useActivityMetrics());
    await waitFor(() => !result.current.isLoading);

    act(() => result.current.startSession());
    act(() => jest.advanceTimersByTime(30 * 60000));
    await act(async () => result.current.endSession());
    expect(result.current.formattedTime).toBe('30min');

    act(() => result.current.startSession());
    act(() => jest.advanceTimersByTime(60 * 60000));
    await act(async () => result.current.endSession());
    expect(result.current.formattedTime).toBe('1h');

    act(() => result.current.startSession());
    act(() => jest.advanceTimersByTime(75 * 60000));
    await act(async () => result.current.endSession());
    expect(result.current.formattedTime).toBe('2h15min');
  });
});