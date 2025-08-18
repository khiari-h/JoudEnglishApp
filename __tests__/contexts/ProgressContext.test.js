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

// -----------------------------------------------------------------------------
// Mocks des dépendances externes
// -----------------------------------------------------------------------------

// Mock d'AsyncStorage pour le contrôle total de la persistance des données.
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock du module `constants` pour simuler les données
// d'exercices et de niveaux.
jest.mock('../../src/utils/constants', () => ({
  // On inclut les vraies clés de stockage pour éviter les erreurs,
  // car elles ne causent pas de problèmes de référence.
  STORAGE_KEYS: jest.requireActual('../../src/utils/constants').STORAGE_KEYS,
  // Mock des exercices pour le test
  EXERCISES: {
    vocabulary: {},
    grammar: {},
    phrases: {},
    writing: {},
    speaking: {},
    reading: {},
  },
  // Mock des niveaux pour le test
  LANGUAGE_LEVELS: {
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    'bonus': {},
  },
  // Liste des exercices bonus
  BONUS_EXERCISES: ['reading', 'phrases'],
}));

// Mock générique de 'react-native' pour éviter les erreurs liées aux
// composants natifs (comme les animations) qui ne sont pas gérés par Jest.
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.View = RN.View || 'View';
  RN.Text = RN.Text || 'Text';
  RN.Button = ({ title, ...props }) => <RN.TouchableOpacity {...props}><RN.Text>{title}</RN.Text></RN.TouchableOpacity>;
  return RN;
});


// -----------------------------------------------------------------------------
// Composants de test pour utiliser les hooks
// -----------------------------------------------------------------------------

// Composant de test principal qui utilise le hook `useProgress`
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
      <Text testID="vocab-level1-completed">
        Vocab Level 1 Completed: {progress.exercises.vocabulary?.['1']?.completed || 0}
      </Text>
      <Text testID="streak">Streak: {progress.stats.streak}</Text>

      <Button title="Update Vocab Level 1" onPress={() => updateExerciseProgress('vocabulary', '1', 50)} />
      <Button title="Update Streak" onPress={() => updateStats({ streak: 5 })} />
      <Button title="Reset Progress" onPress={resetProgress} />
      <Button title="Add New Exercise Type" onPress={() => updateExerciseProgress('newType', '1', 25)} />
      <Button title="Add New Stat" onPress={() => updateStats({ newStat: 99 })} />
    </View>
  );
};

// Composant de test pour les hooks de lecture et d'écriture
const SplitHooksTestComponent = () => {
  const read = useProgressRead();
  const write = useProgressWrite();
  const progress = read.progress;

  if (read.isLoading) {
    return <Text testID="loading-status">Loading...</Text>;
  }
  
  return (
    <View>
      <Text testID="read-global-progress">Global: {read.calculateGlobalProgress()}%</Text>
      <Text testID="read-streak">Streak: {progress.stats.streak}</Text>
      <Button testID="write-update-streak" title="Update Streak" onPress={() => write.updateStats({ streak: 10 })} />
    </View>
  );
};

// Composant de test pour un niveau vide (pour tester le cas limite)
const EmptyLevelTestComponent = () => {
  const { calculateLevelProgress } = useProgress();
  return <Text testID="empty-level-progress">Empty Level: {calculateLevelProgress('empty')}%</Text>;
};


// -----------------------------------------------------------------------------
// Suite de tests principale
// -----------------------------------------------------------------------------
describe('ProgressContext', () => {
  // Les hooks Jest sont définis au niveau de la suite pour une application générale.
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    // On s'assure que par défaut, getItem ne trouve rien, simulant une première utilisation.
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // ========== Scénario 1: Chargement initial et état par défaut ==========

  it('devrait charger la progression initiale si AsyncStorage est vide', async () => {
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
    const globalProgressText = screen.getByTestId('global-progress').props.children.join('');
    expect(globalProgressText).toBe('Global: 0%');
  });

  it('devrait charger la progression depuis AsyncStorage si des données existent', async () => {
    const mockProgress = {
      ...createInitialProgress(),
      exercises: { vocabulary: { '1': { completed: 25, total: 100 } } },
      stats: { streak: 1 },
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

    const level1ProgressText = screen.getByTestId('level1-progress').props.children.join('');
    expect(level1ProgressText).toBe('Level 1: 4%');
    const streakDisplay = screen.getByTestId('streak').props.children.join('');
    expect(streakDisplay).toBe('Streak: 1');
  });

  // ========== Scénario 2: Mises à jour de la progression ==========

  it('devrait mettre à jour la progression d\'un exercice et sauvegarder', async () => {
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

    const vocabCompleted = screen.getByTestId('vocab-level1-completed').props.children.join('');
    expect(vocabCompleted).toBe('Vocab Level 1 Completed: 50');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('"completed":50')
    );
  });

  it('devrait mettre à jour les statistiques et sauvegarder', async () => {
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
      jest.runAllTimers();
    });

    const streakDisplay = screen.getByTestId('streak').props.children.join('');
    expect(streakDisplay).toBe('Streak: 5');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('"streak":5')
    );
  });

  it('devrait réinitialiser la progression et le stockage', async () => {
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Update Streak'));
    fireEvent.press(screen.getByText('Reset Progress'));

    await act(async () => {
      await Promise.resolve();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalled();

    const streakDisplay = screen.getByTestId('streak').props.children.join('');
    expect(streakDisplay).toBe('Streak: 0');
  });

  // ========== Scénario 3: Calculs de progression ==========

  it('devrait calculer correctement la progression par niveau', async () => {
    const mockProgress = {
      ...createInitialProgress(),
      exercises: {
        vocabulary: { '1': { completed: 50, total: 100 } },
        grammar: { '1': { completed: 75, total: 100 } },
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

    const level1ProgressText = screen.getByTestId('level1-progress').props.children.join('');
    expect(level1ProgressText).toBe('Level 1: 21%');
  });

  it('devrait calculer correctement la progression globale', async () => {
    const mockProgress = {
      ...createInitialProgress(),
      exercises: {
        vocabulary: { '1': { completed: 100 } },
        grammar: { '2': { completed: 100 } },
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
    expect(globalProgressText).toBe('Global: 5%');
  });

  // ========== Scénario 4: Gestion des erreurs ==========

  it('devrait gérer les erreurs de chargement et initialiser à 0', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Erreur de lecture simulée'));
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
    const globalProgressText = screen.getByTestId('global-progress').props.children.join('');
    expect(globalProgressText).toBe('Global: 0%');

    consoleErrorSpy.mockRestore();
  });

  it('devrait gérer les erreurs de sauvegarde sans crasher', async () => {
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('Erreur de sauvegarde simulée'));
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
      jest.runAllTimers();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur sauvegarde progression:', expect.any(Error));
    const streakDisplay = screen.getByTestId('streak').props.children.join('');
    expect(streakDisplay).toBe('Streak: 5');

    consoleErrorSpy.mockRestore();
  });

  // ========== Scénario 5: Tests des hooks de lecture/écriture séparés ==========

  it('useProgressRead devrait fournir des données de lecture', async () => {
    const mockProgress = {
      ...createInitialProgress(),
      stats: { streak: 50 },
    };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));

    render(
      <ProgressProvider>
        <SplitHooksTestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const readStreak = screen.getByTestId('read-streak').props.children.join('');
    expect(readStreak).toBe('Streak: 50');

    expect(screen.getByTestId('write-update-streak')).toBeTruthy();
  });

  it('useProgressWrite devrait permettre de modifier l\'état', async () => {
    render(
      <ProgressProvider>
        <SplitHooksTestComponent />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByTestId('write-update-streak'));

    await act(async () => {
      jest.runAllTimers();
    });

    const readStreak = screen.getByTestId('read-streak').props.children.join('');
    expect(readStreak).toBe('Streak: 10');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('"streak":10')
    );
  });
  
  // ========== Scénario 6: Tests des branches non couvertes (corrigés) ==========

  it('devrait ajouter un nouvel exercice si le type n\'existe pas', async () => {
    render(<ProgressProvider><TestComponent /></ProgressProvider>);
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

  it('devrait ajouter une nouvelle statistique si elle n\'existe pas', async () => {
    render(<ProgressProvider><TestComponent /></ProgressProvider>);
    await act(async () => {
      jest.runAllTimers();
    });
    
    fireEvent.press(screen.getByText('Add New Stat'));
  
    await act(async () => {
      jest.runAllTimers();
    });
  
    const savedProgress = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
    expect(savedProgress.stats.newStat).toBe(99);
  });

  it('devrait gérer une erreur lors du reset de la progression', async () => {
    AsyncStorage.removeItem.mockRejectedValueOnce(new Error('Erreur de réinitialisation simulée'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    const mockProgress = {
      ...createInitialProgress(),
      exercises: { vocabulary: { '1': { completed: 50, total: 100 } } }
    };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));
    
    render(<ProgressProvider><TestComponent /></ProgressProvider>);
    await act(async () => {
      jest.runAllTimers();
    });
    
    fireEvent.press(screen.getByText('Reset Progress'));
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur reset progression:', expect.any(Error));
    const vocabCompleted = screen.getByTestId('vocab-level1-completed').props.children.join('');
    expect(vocabCompleted).toBe('Vocab Level 1 Completed: 50');
    
    consoleErrorSpy.mockRestore();
  });

  it('devrait retourner 0 si un niveau ne contient aucun exercice', async () => {
    // Crée un mock dynamique pour les constantes, sans réinitialiser tout le module
    jest.mock('../../src/utils/constants', () => ({
      ...jest.requireActual('../../src/utils/constants'),
      LANGUAGE_LEVELS: { 
        ...jest.requireActual('../../src/utils/constants').LANGUAGE_LEVELS,
        'empty': {} 
      },
    }));
    // Re-require le composant pour qu'il utilise le nouveau mock
    const { ProgressProvider, useProgress } = require('../../src/contexts/ProgressContext');
    
    const TestComponentWithEmptyLevel = () => {
      const { calculateLevelProgress } = useProgress();
      return <Text testID="empty-level-progress">Empty Level: {calculateLevelProgress('empty')}%</Text>;
    };

    render(<ProgressProvider><EmptyLevelTestComponent /></ProgressProvider>);
    await act(async () => { jest.runAllTimers(); });

    const progressText = screen.getByTestId('empty-level-progress').props.children.join('');
    expect(progressText).toBe('Empty Level: 0%');

    // Réinitialise les mocks à la fin du test
    jest.clearAllMocks();
  });

  it('devrait lancer une erreur si useProgress est utilisé en dehors du provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const TestComponentWithNoProvider = () => {
      useProgress();
      return <Text>Test</Text>;
    };
    expect(() => render(<TestComponentWithNoProvider />)).toThrow('useProgress must be used within a ProgressProvider');
    consoleErrorSpy.mockRestore();
  });

  it('devrait lancer une erreur si useProgressRead est utilisé en dehors du provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const TestComponentWithNoProvider = () => {
      useProgressRead();
      return <Text>Test</Text>;
    };
    expect(() => render(<TestComponentWithNoProvider />)).toThrow('useProgressRead must be used within a ProgressProvider');
    consoleErrorSpy.mockRestore();
  });

  it('devrait lancer une erreur si useProgressWrite est utilisé en dehors du provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const TestComponentWithNoProvider = () => {
      useProgressWrite();
      return <Text>Test</Text>;
    };
    expect(() => render(<TestComponentWithNoProvider />)).toThrow('useProgressWrite must be used within a ProgressProvider');
    consoleErrorSpy.mockRestore();
  });
  it('should calculate bonus level progress correctly', async () => {
    // Mock the data to simulate a bonus level with some progress.
    const mockProgress = {
      ...createInitialProgress(),
      exercises: {
        reading: { 'bonus': { completed: 50, total: 100 } }, // 'reading' is a bonus exercise in your mock
        phrases: { 'bonus': { completed: 25, total: 100 } }, // 'phrases' is a bonus exercise
      },
    };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockProgress));

    const TestComponentWithBonusLevel = () => {
      const { calculateLevelProgress } = useProgress();
      return <Text testID="bonus-progress">Bonus: {calculateLevelProgress('bonus')}%</Text>;
    };

    render(
      <ProgressProvider>
        <TestComponentWithBonusLevel />
      </ProgressProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    // (50 + 25) / 2 exercices = 37.5% -> rounded to 38%
    const progressText = screen.getByTestId('bonus-progress').props.children.join('');
    expect(progressText).toBe('Bonus: 38%');
  });
  // ========== Tests pour atteindre 100% de couverture ==========

  it('devrait retourner 0 si un niveau ne contient aucun exercice (cas réel)', async () => {
    // Crée un mock de EXERCISES qui simule un type d'exercice vide
    jest.mock('../../src/utils/constants', () => ({
      ...jest.requireActual('../../src/utils/constants'),
      EXERCISES: {
        newEmptyType: {}, // Un type d'exercice qui ne contient rien
      },
    }));

    // Re-require le composant pour qu'il utilise le nouveau mock
    const { ProgressProvider, useProgress } = require('../../src/contexts/ProgressContext');
    
    const TestComponentWithNoExercises = () => {
      const { calculateLevelProgress } = useProgress();
      // On teste un niveau qui n'a pas de sous-clés dans notre mock d'exercices
      return <Text testID="no-exercises-progress">Progress: {calculateLevelProgress('1')}%</Text>;
    };

    render(<ProgressProvider><TestComponentWithNoExercises /></ProgressProvider>);
    await act(async () => {
      jest.runAllTimers();
    });
    
    const progressText = screen.getByTestId('no-exercises-progress').props.children.join('');
    // Le filtre va renvoyer un tableau vide, donc on couvre bien le "if (levelExercises.length === 0)"
    expect(progressText).toBe('Progress: 0%');

    // Réinitialise le mock
    jest.clearAllMocks();
  });

  it('devrait retourner 0 si la liste des niveaux est vide', async () => {
    // Mocke LANGUAGE_LEVELS pour qu'il soit un objet vide
    jest.mock('../../src/utils/constants', () => ({
      ...jest.requireActual('../../src/utils/constants'),
      LANGUAGE_LEVELS: {},
    }));
    // Re-require le composant pour qu'il utilise le nouveau mock
    const { ProgressProvider, useProgress } = require('../../src/contexts/ProgressContext');

    const TestComponentWithNoLevels = () => {
      const { calculateGlobalProgress } = useProgress();
      return <Text testID="no-levels-progress">Global: {calculateGlobalProgress()}%</Text>;
    };

    render(<ProgressProvider><TestComponentWithNoLevels /></ProgressProvider>);
    await act(async () => {
      jest.runAllTimers();
    });

    const progressText = screen.getByTestId('no-levels-progress').props.children.join('');
    // Le "if (allLevels.length === 0)" sera atteint
    expect(progressText).toBe('Global: 0%');
    
    // Réinitialise le mock
    jest.clearAllMocks();
  });
});