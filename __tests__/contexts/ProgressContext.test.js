import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { ProgressProvider, useProgress } from '../../src/contexts/ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../src/utils/constants';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Helper component to consume the context
const TestComponent = () => {
  const {
    progress,
    isLoading,
    updateExerciseProgress,
    updateStats,
    calculateGlobalProgress,
    calculateLevelProgress,
    resetProgress,
  } = useProgress();

  if (isLoading) {
    return <Text testID="loading-status">Loading...</Text>;
  }

  return (
    <>
      <Text testID="global-progress">Global: {calculateGlobalProgress()}%</Text>
      <Text testID="level1-progress">Level 1: {calculateLevelProgress('1')}%</Text>
      <Text testID="vocab-level1-completed">
        Vocab Level 1 Completed: {progress.exercises.vocabulary['1']?.completed || 0}
      </Text>
      <Text testID="streak">Streak: {progress.stats.streak}</Text>

      <Button title="Update Vocab Level 1" onPress={() => updateExerciseProgress('vocabulary', '1', 50)} />
      <Button title="Update Streak" onPress={() => updateStats({ streak: 5 })} />
      <Button title="Reset Progress" onPress={resetProgress} />
    </>
  );
};

const ComponentWithoutProvider = () => {
  useProgress();
  return null;
};

describe('ProgressContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.removeItem.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('loads initial progress from AsyncStorage', async () => {
    const mockProgress = {
      levels: { '1': { completed: 25, total: 100 } },
      exercises: { vocabulary: { '1': { completed: 25, total: 100 } } },
      stats: { streak: 1 },
    };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));

    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    expect(screen.getByTestId('loading-status')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers(); // Ensure useEffect for loading runs
    });

    expect(screen.queryByTestId('loading-status')).toBeNull();

    const level1Text = screen.getByTestId('level1-progress').props.children;
    // children is an array like ['Level 1: ', 25, '%'], flatten it
    const level1ProgressText = Array.isArray(level1Text) ? level1Text.join('') : level1Text;
    expect(level1ProgressText).toBe('Level 1: 25%');

    const streakText = screen.getByTestId('streak').props.children;
    const streakDisplay = Array.isArray(streakText) ? streakText.join('') : streakText;
    expect(streakDisplay).toBe('Streak: 1');
  });

  it('updates exercise progress and recalculates level progress', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers(); // Finish initial load
    });

    let completedChildren = screen.getByTestId('vocab-level1-completed').props.children;
    let completedText = Array.isArray(completedChildren) ? completedChildren.join('') : completedChildren;
    expect(completedText).toBe('Vocab Level 1 Completed: 0');

    let level1Children = screen.getByTestId('level1-progress').props.children;
    let level1Text = Array.isArray(level1Children) ? level1Children.join('') : level1Children;
    expect(level1Text).toBe('Level 1: 0%');

    fireEvent.press(screen.getByText('Update Vocab Level 1'));

    completedChildren = screen.getByTestId('vocab-level1-completed').props.children;
    completedText = Array.isArray(completedChildren) ? completedChildren.join('') : completedChildren;
    expect(completedText).toBe('Vocab Level 1 Completed: 50');

    level1Children = screen.getByTestId('level1-progress').props.children;
    level1Text = Array.isArray(level1Children) ? level1Children.join('') : level1Children;
    expect(level1Text).toBe('Level 1: 50%');

    await act(async () => {
      jest.runAllTimers(); // Trigger debounced save
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
    expect(savedProgress.exercises.vocabulary['1'].completed).toBe(50);
    expect(savedProgress.levels['1'].completed).toBe(50);
  });

  it('updates stats and saves to AsyncStorage', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers(); // Finish initial load
    });

    let streakChildren = screen.getByTestId('streak').props.children;
    let streakText = Array.isArray(streakChildren) ? streakChildren.join('') : streakChildren;
    expect(streakText).toBe('Streak: 0');

    fireEvent.press(screen.getByText('Update Streak'));

    streakChildren = screen.getByTestId('streak').props.children;
    streakText = Array.isArray(streakChildren) ? streakChildren.join('') : streakChildren;
    expect(streakText).toBe('Streak: 5');

    await act(async () => {
      jest.runAllTimers(); // Trigger debounced save
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
    expect(savedProgress.stats.streak).toBe(5);
  });

  it('resets progress and removes from AsyncStorage', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers(); // Finish initial load
    });

    fireEvent.press(screen.getByText('Update Vocab Level 1'));
    fireEvent.press(screen.getByText('Update Streak'));

    await act(async () => {
      jest.runAllTimers(); // Trigger debounced save
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('Reset Progress'));

    await act(async () => {
      // wait for async resetProgress to complete
      await Promise.resolve();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_PROGRESS);

    const level1Children = screen.getByTestId('level1-progress').props.children;
    const level1Text = Array.isArray(level1Children) ? level1Children.join('') : level1Children;
    expect(level1Text).toBe('Level 1: 0%');

    const streakChildren = screen.getByTestId('streak').props.children;
    const streakText = Array.isArray(streakChildren) ? streakChildren.join('') : streakChildren;
    expect(streakText).toBe('Streak: 0');
  });

  it('throws an error if useProgress is used outside of ProgressProvider', () => {
    const originalError = console.error;
    console.error = jest.fn(); // suppress error output

    expect(() => render(<ComponentWithoutProvider />)).toThrow(
      'useProgress must be used within a ProgressProvider'
    );

    console.error = originalError; // restore error output
  });
});