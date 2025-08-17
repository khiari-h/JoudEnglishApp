import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button, View } from 'react-native';
import {
  ProgressProvider,
  createInitialProgress,
  useProgress,
  useProgressRead,
  useProgressWrite,
} from '../../src/contexts/ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, LANGUAGE_LEVELS, EXERCISES, BONUS_EXERCISES } from '../../src/utils/constants';

// Mock d'AsyncStorage et des constantes en haut du fichier pour qu'ils soient disponibles pour tous les tests
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock du module de constantes
const mockConstants = jest.requireActual('../../src/utils/constants');
jest.mock('../../src/utils/constants', () => ({
  ...mockConstants,
  // La valeur par défaut pour BONUS_EXERCISES
  BONUS_EXERCISES: ['reading', 'vocabulary', 'phrases'],
}));


// Un composant de test pour consommer le contexte
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
    <View>
      <Text testID="global-progress">Global: {calculateGlobalProgress()}%</Text>
      <Text testID="level1-progress">Level 1: {calculateLevelProgress('1')}%</Text>
      <Text testID="level-bonus-progress">Level Bonus: {calculateLevelProgress('bonus')}%</Text>
      <Text testID="vocab-level1-completed">
        Vocab Level 1 Completed: {progress.exercises.vocabulary?.['1']?.completed || 0}
      </Text>
      <Text testID="streak">Streak: {progress.stats.streak}</Text>

      <Button title="Update Vocab Level 1" onPress={() => updateExerciseProgress('vocabulary', '1', 50)} />
      <Button title="Update Streak" onPress={() => updateStats({ streak: 5 })} />
      <Button title="Reset Progress" onPress={resetProgress} />
      <Button title="Update Vocab Bonus" onPress={() => updateExerciseProgress('vocabulary', 'bonus', 75)} />
      <Button title="Update Grammar Bonus" onPress={() => updateExerciseProgress('grammar', 'bonus', 50)} />
      <Button title="Add New Exercise Type" onPress={() => updateExerciseProgress('newType', '1', 25)} />
    </View>
  );
};

// Composants de test pour les hooks en dehors du provider
const ComponentWithoutUseProgress = () => {
  useProgress();
  return null;
};

const ComponentWithoutUseProgressRead = () => {
  useProgressRead();
  return null;
};

const ComponentWithoutUseProgressWrite = () => {
  useProgressWrite();
  return null;
};

// Composants de test pour utiliser les hooks AVEC le provider (cas de succès)
const ComponentWithUseProgressRead = () => {
  const { calculateGlobalProgress } = useProgressRead();
  return (
    <Text testID="read-hook-test">
      Global from read hook: {calculateGlobalProgress()}%
    </Text>
  );
};

const ComponentWithUseProgressWrite = () => {
  const { updateStats } = useProgressWrite();
  return (
    <Button 
      testID="write-hook-test" 
      title="Update from write hook" 
      onPress={() => updateStats({ streak: 10 })} 
    />
  );
};


describe('ProgressContext', () => {
  // Hooks Jest en dehors des blocs `it`
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks(); 
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // On doit restaurer le mock à la fin de chaque test pour les mocks statiques
    jest.resetModules();
  });

  // ========== Base Tests ==========

  it('loads initial progress from AsyncStorage', async () => {
    const mockProgress = {
      ...createInitialProgress(),
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
      jest.runAllTimers();
    });

    expect(screen.queryByTestId('loading-status')).toBeNull();
    const level1ProgressText = screen.getByTestId('level1-progress').props.children.join('');
    expect(level1ProgressText).toBe('Level 1: 25%');
    const streakDisplay = screen.getByTestId('streak').props.children.join('');
    expect(streakDisplay).toBe('Streak: 1');
  });

  it('updates exercise progress and recalculates level progress', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Update Vocab Level 1'));
    await act(async () => {
      jest.runAllTimers();
    });

    const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
    expect(savedProgress.exercises.vocabulary['1'].completed).toBe(50);
    expect(savedProgress.levels['1'].completed).toBe(6);
  });

  it('updates progress for a new exercise type and calculates average', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );
    
    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Add New Exercise Type'));
    
    const level1Text = screen.getByTestId('level1-progress').props.children.join('');
    expect(level1Text).toBe('Level 1: 3%');
    
    await act(async () => {
      jest.runAllTimers();
    });
    
    const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
    expect(savedProgress.exercises.newType['1'].completed).toBe(25);
  });

  it('updates stats and saves to AsyncStorage', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    let streakChildren = screen.getByTestId('streak').props.children;
    let streakText = Array.isArray(streakChildren) ? streakChildren.join('') : streakChildren;
    expect(streakText).toBe('Streak: 0');

    fireEvent.press(screen.getByText('Update Streak'));

    streakChildren = screen.getByTestId('streak').props.children;
    streakText = Array.isArray(streakChildren) ? streakChildren.join('') : streakChildren;
    expect(streakText).toBe('Streak: 5');

    await act(async () => {
      jest.runAllTimers();
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
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Update Vocab Level 1'));
    fireEvent.press(screen.getByText('Update Streak'));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('Reset Progress'));

    await act(async () => {
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

  // ========== New Tests for Coverage ==========

  it('calculates level progress correctly when there are no exercises for a level', async () => {
    const mockInitialProgress = createInitialProgress();
    mockInitialProgress.exercises = {}; 
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockInitialProgress));

    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const level1Text = screen.getByTestId('level1-progress').props.children.join('');
    expect(level1Text).toBe('Level 1: 0%');
  });

  it('handles errors during initial loading', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Mock AsyncStorage Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur chargement progression:', expect.any(Error));
    expect(screen.queryByTestId('loading-status')).toBeNull();
    const globalProgressText = screen.getByTestId('global-progress').props.children.join('');
    expect(globalProgressText).toBe('Global: 0%');
    consoleErrorSpy.mockRestore();
  });

  it('handles errors during saving progress gracefully', async () => {
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('Mock AsyncStorage Save Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Update Streak'));

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur sauvegarde progression:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('handles error during progress reset gracefully', async () => {
    AsyncStorage.removeItem.mockRejectedValueOnce(new Error('Mock AsyncStorage removeItem Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');
    
    const mockProgress = {
      ...createInitialProgress(),
      stats: { streak: 1 },
      levels: { '1': { completed: 50, total: 100 } }
    };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));
    
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('streak').props.children.join('')).toBe('Streak: 1');

    fireEvent.press(screen.getByText('Reset Progress'));

    await act(async () => {
      await Promise.resolve();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur reset progression:', expect.any(Error));
    
    const streakText = screen.getByTestId('streak').props.children.join('');
    expect(streakText).toBe('Streak: 1');

    consoleErrorSpy.mockRestore();
  });

  // ========== Tests pour les branches manquantes (102, 132, 160) ==========
  describe('Additional Coverage Tests for ProgressContext', () => {
    it('should correctly calculate global progress when there are no bonus exercises', async () => {
      // Mock spécifique au test pour vider le tableau BONUS_EXERCISES
      jest.resetModules();
      jest.mock('../../src/utils/constants', () => ({
        ...jest.requireActual('../../src/utils/constants'),
        BONUS_EXERCISES: [],
      }));

      const { ProgressProvider } = require('../../src/contexts/ProgressContext');
      const { render, screen, act } = require('@testing-library/react-native');

      const mockProgress = {
        ...createInitialProgress(),
        levels: {
          '1': { completed: 50, total: 100 },
        },
      };
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));
  
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );
  
      await act(async () => {
        jest.runAllTimers();
      });
  
      const globalProgressText = screen.getByTestId('global-progress').props.children.join('');
      // 6 niveaux standards.
      // Calcul : (50 + 0 * 5) / 6 niveaux = 8.33 -> 8%
      expect(globalProgressText).toBe('Global: 8%');
    });

    it('should handle undefined levels gracefully in global progress calculation', async () => {
      // S'assurer que le mock par défaut est en place
      jest.resetModules();
      const { ProgressProvider } = require('../../src/contexts/ProgressContext');
      const { render, screen, act } = require('@testing-library/react-native');

      const mockProgressWithUndefinedLevel = {
        ...createInitialProgress(),
        levels: {
          '1': { completed: 50, total: 100 },
        },
      };
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgressWithUndefinedLevel));
  
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );
  
      await act(async () => {
        jest.runAllTimers();
      });
      
      const globalProgressText = screen.getByTestId('global-progress').props.children.join('');
      // Calcul : (50 + 0 + ... + 0) / 7 niveaux (6 standards + 1 bonus) = 7.14 -> 7%
      expect(globalProgressText).toBe('Global: 7%');
    });

    it('should handle a new exercise type with a non-existent level entry', async () => {
      const mockProgress = {
        ...createInitialProgress(),
        exercises: {},
      };
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );
      
      await act(async () => {
        jest.runAllTimers();
      });

      fireEvent.press(screen.getByText('Add New Exercise Type'));
      
      await act(async () => {
        jest.runAllTimers();
      });
      
      const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
      expect(savedProgress.exercises.newType['1'].completed).toBe(25);
    });
  });
});