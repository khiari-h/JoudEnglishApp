import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import RevisionOrchestrator from '../../../src/screens/VocabularyRevision/RevisionOrchestrator';
import * as RevisionSettingsHook from '../../../src/hooks/useRevisionSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Mocking dependencies
jest.mock('../../../src/hooks/useRevisionSettings');
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock du ThemeContext
jest.mock('../../../src/contexts/ThemeContext', () => ({
  ThemeContext: {
    Consumer: ({ children }) => children({
      colors: {
        surface: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        primary: "#10B981",
        accent: "#3B82F6",
        warning: "#F59E0B",
      }
    }),
    Provider: ({ children, value }) => children,
  },
  useTheme: () => ({
    colors: {
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      primary: "#10B981",
      accent: "#3B82F6",
      warning: "#F59E0B",
    }
  }),
}));

// Mock simple de RevisionPopup pour éviter les animations
jest.mock('../../../src/screens/Dashboard/components/popup/RevisionPopup', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  
  return ({ visible, onChoice, onDismiss, totalWordsLearned, questionsCount }) => {
    if (!visible) return null;
    
    return (
      <View testID="revision-popup">
        <Text testID="popup-words">Words: {totalWordsLearned}</Text>
        <Text testID="popup-questions">Questions: {questionsCount}</Text>
        <TouchableOpacity testID="popup-now" onPress={() => onChoice('now')}>
          <Text>Now</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="popup-later50" onPress={() => onChoice('later_50')}>
          <Text>Later 50</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="popup-disable" onPress={() => onChoice('disable')}>
          <Text>Disable</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="popup-dismiss" onPress={onDismiss}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

describe('RevisionOrchestrator', () => {
  let mockUseRevisionSettings;

  // Helper pour créer des données de mots appris
  const createWordsData = (wordCount) => {
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const modes = ['classic', 'fast'];
    const result = {};
    
    let totalCreated = 0;
    for (const level of levels) {
      for (const mode of modes) {
        if (totalCreated >= wordCount) break;
        
        const wordsForThisSection = Math.min(wordCount - totalCreated, Math.ceil(wordCount / (levels.length * modes.length)));
        result[`vocabulary_${level}_${mode}`] = JSON.stringify({
          completedWords: {
            unit1: Array.from({ length: wordsForThisSection }, (_, i) => `word_${level}_${mode}_${i}`)
          }
        });
        totalCreated += wordsForThisSection;
        
        if (totalCreated >= wordCount) break;
      }
      if (totalCreated >= wordCount) break;
    }
    
    return result;
  };

  beforeEach(() => {
    // Réinitialiser tous les mocks avant chaque test
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Mock par défaut pour le hook useRevisionSettings
    mockUseRevisionSettings = {
      preferences: {
        isDisabled: false,
        nextRevisionAt: 50,
        questionsCount: 10,
        frequency: 50,
      },
      disableRevisions: jest.fn().mockResolvedValue(true),
      resetToNextTarget: jest.fn().mockResolvedValue(true),
      updatePreferences: jest.fn().mockResolvedValue(true),
    };
    RevisionSettingsHook.useRevisionSettings.mockReturnValue(mockUseRevisionSettings);

    // Réinitialisation complète d'AsyncStorage
    AsyncStorage.getItem.mockReset();
    
    // Mock par défaut pour AsyncStorage (peu de mots)
    const defaultWordsData = createWordsData(3);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(defaultWordsData[key] || null);
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('ne rend rien si les révisions sont désactivées', async () => {
    mockUseRevisionSettings.preferences.isDisabled = true;
    RevisionSettingsHook.useRevisionSettings.mockReturnValue(mockUseRevisionSettings);

    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre que les données soient chargées
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(queryByTestId('revision-popup')).toBeNull();
  });

  it('ne montre pas la popup si le nombre de mots est inférieur au seuil', async () => {
    // Le mock par défaut a 3 mots, le seuil est maintenant à 50
    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre que les données soient chargées et le timer s'exécute
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(queryByTestId('revision-popup')).toBeNull();
  });

  it('montre la popup quand le nombre de mots atteint le seuil', async () => {
    // Configurer AsyncStorage pour retourner 60 mots (≥ 50)
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, getByText, queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre que les données AsyncStorage soient chargées et processées
    await act(async () => {
      jest.advanceTimersByTime(100); // Laisser le temps aux promises AsyncStorage
    });

    // Attendre que le setTimeout de 1000ms s'exécute
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Attendre que la popup soit rendue
    await waitFor(() => {
      expect(queryByTestId('revision-popup')).toBeTruthy();
    });

    expect(getByText('Words: 60')).toBeTruthy();
    expect(getByText('Questions: 10')).toBeTruthy();
  });

  it('appelle resetToNextTarget et navigue quand "now" est choisi', async () => {
    // Configurer AsyncStorage pour retourner 60 mots
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, queryByTestId } = render(<RevisionOrchestrator currentLevel="A1" />);
    
    // Attendre le chargement des données et l'affichage de la popup
    await act(async () => {
      jest.advanceTimersByTime(100); // AsyncStorage
    });

    await act(async () => {
      jest.advanceTimersByTime(1000); // setTimeout pour afficher la popup
    });

    // Attendre que la popup soit rendue
    await waitFor(() => {
      expect(queryByTestId('revision-popup')).toBeTruthy();
    });

    const nowButton = getByTestId('popup-now');
    
    await act(async () => {
      fireEvent.press(nowButton);
    });

    // Vérifier les appels
    expect(mockUseRevisionSettings.resetToNextTarget).toHaveBeenCalledWith(60);
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/tabs/vocabularyRevision",
      params: {
        level: "A1",
        questionsCount: 10,
        source: 'popup_trigger',
      },
    });
  });

  it('appelle updatePreferences quand "later_50" est choisi', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre le chargement des données et l'affichage de la popup
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Attendre que la popup soit rendue
    await waitFor(() => {
      expect(queryByTestId('revision-popup')).toBeTruthy();
    });

    const laterButton = getByTestId('popup-later50');
    
    await act(async () => {
      fireEvent.press(laterButton);
    });

    // Vérifier l'appel - 60 mots + 50 = 110
    expect(mockUseRevisionSettings.updatePreferences).toHaveBeenCalledWith({ 
      nextRevisionAt: 110 
    });
  });

  it('appelle disableRevisions quand "disable" est choisi', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre le chargement des données et l'affichage de la popup
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Attendre que la popup soit rendue
    await waitFor(() => {
      expect(queryByTestId('revision-popup')).toBeTruthy();
    });

    const disableButton = getByTestId('popup-disable');
    
    await act(async () => {
      fireEvent.press(disableButton);
    });

    // Vérifier l'appel
    expect(mockUseRevisionSettings.disableRevisions).toHaveBeenCalled();
  });

  it('gère la fermeture (dismiss) en choisissant "later_50" par défaut', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre le chargement des données et l'affichage de la popup
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Attendre que la popup soit rendue
    await waitFor(() => {
      expect(queryByTestId('revision-popup')).toBeTruthy();
    });

    const dismissButton = getByTestId('popup-dismiss');
    
    await act(async () => {
      fireEvent.press(dismissButton);
    });

    // Vérifier l'appel - 60 mots + 50 = 110
    expect(mockUseRevisionSettings.updatePreferences).toHaveBeenCalledWith({ 
      nextRevisionAt: 110 
    });
  });

  // Test de debugging pour comprendre le comportement
  it('debug - vérifie les conditions de la popup', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    // Espionner les appels AsyncStorage
    const getItemSpy = jest.spyOn(AsyncStorage, 'getItem');

    const TestComponent = () => {
      const [debugInfo, setDebugInfo] = React.useState({});
      const { preferences } = RevisionSettingsHook.useRevisionSettings();
      
      React.useEffect(() => {
        const countWords = async () => {
          let total = 0;
          const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
          const modes = ['classic', 'fast'];

          for (const level of levels) {
            for (const mode of modes) {
              const stored = await AsyncStorage.getItem(`vocabulary_${level}_${mode}`);
              if (stored) {
                const data = JSON.parse(stored);
                const completedWords = data.completedWords || {};
                total += Object.values(completedWords).reduce((acc, words) => {
                  if (Array.isArray(words)) {
                    return acc + words.length;
                  }
                  return acc;
                }, 0);
              }
            }
          }
          
          setDebugInfo({
            totalWords: total,
            isDisabled: preferences.isDisabled,
            nextRevisionAt: preferences.nextRevisionAt,
            shouldShow: !preferences.isDisabled && total >= preferences.nextRevisionAt && total > 0
          });
        };

        countWords();
      }, [preferences]);

      return (
        <View testID="debug-info">
          <Text testID="debug-total">{debugInfo.totalWords}</Text>
          <Text testID="debug-disabled">{String(debugInfo.isDisabled)}</Text>
          <Text testID="debug-threshold">{debugInfo.nextRevisionAt}</Text>
          <Text testID="debug-should-show">{String(debugInfo.shouldShow)}</Text>
        </View>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    
    await waitFor(() => {
      expect(getItemSpy).toHaveBeenCalled();
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    const totalWords = getByTestId('debug-total').children[0];
    const isDisabled = getByTestId('debug-disabled').children[0];
    const threshold = getByTestId('debug-threshold').children[0];
    const shouldShow = getByTestId('debug-should-show').children[0];

    expect(totalWords).toBe('60');
    expect(isDisabled).toBe('false');
    expect(threshold).toBe('50');
    expect(shouldShow).toBe('true');
  });

  // Test supplémentaire pour vérifier le comptage des mots
  it('compte correctement les mots depuis AsyncStorage', async () => {
    const wordsData = createWordsData(35);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    // Avec 35 mots et un seuil à 50, la popup ne doit pas apparaître
    expect(queryByTestId('revision-popup')).toBeNull();
    
    // Vérifier que AsyncStorage a été appelé pour tous les niveaux/modes
    const expectedCalls = ['1', '2', '3', '4', '5', '6', 'bonus']
      .flatMap(level => ['classic', 'fast'].map(mode => `vocabulary_${level}_${mode}`));
    
    expectedCalls.forEach(key => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    });
  });

  // Test de debug pour vérifier l'état du composant RevisionOrchestrator
  it('debug - vérifie l\'état du composant RevisionOrchestrator', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre que les données soient chargées
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(queryByTestId('revision-popup')).toBeNull();

    // Attendre que la popup apparaisse après le setTimeout
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Vérifier que la popup est visible
    const popup = queryByTestId('revision-popup');
    expect(popup).toBeTruthy();
  });

  // Test pour vérifier le mock AsyncStorage
  it('debug - vérifie le mock AsyncStorage', async () => {
    const wordsData = createWordsData(60);
    
    AsyncStorage.getItem.mockImplementation((key) => {
      const result = wordsData[key] || null;
      return Promise.resolve(result);
    });

    // Simuler les appels
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const modes = ['classic', 'fast'];
    
    let total = 0;
    for (const level of levels) {
      for (const mode of modes) {
        const key = `vocabulary_${level}_${mode}`;
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          const completedWords = data.completedWords || {};
          const count = Object.values(completedWords).reduce((acc, words) => {
            if (Array.isArray(words)) {
              return acc + words.length;
            }
            return acc;
          }, 0);
          total += count;
        }
      }
    }
    
    expect(total).toBe(60);
  });

  // Nouveau test pour vérifier le timing exact
  it('respecte le délai de 1000ms avant d\'afficher la popup', async () => {
    const wordsData = createWordsData(60);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre le chargement des données AsyncStorage
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    // À ce moment, la popup ne doit pas encore être visible
    expect(queryByTestId('revision-popup')).toBeNull();

    // Avancer de 999ms - popup toujours pas visible
    await act(async () => {
      jest.advanceTimersByTime(999);
    });
    expect(queryByTestId('revision-popup')).toBeNull();

    // Avancer de 1ms supplémentaire - maintenant la popup doit être visible
    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(queryByTestId('revision-popup')).toBeTruthy();
  });
});