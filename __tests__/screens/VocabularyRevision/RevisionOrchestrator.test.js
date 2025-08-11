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
        nextRevisionAt: 100, // La popup se déclenche à 100 mots
        questionsCount: 10,
        frequency: 50,
      },
      disableRevisions: jest.fn().mockResolvedValue(true),
      resetToNextTarget: jest.fn().mockResolvedValue(true),
      updatePreferences: jest.fn().mockResolvedValue(true),
    };
    RevisionSettingsHook.useRevisionSettings.mockReturnValue(mockUseRevisionSettings);

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
    // Le mock par défaut a 3 mots, le seuil est à 100
    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    // Attendre que les données soient chargées et le timer s'exécute
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(queryByTestId('revision-popup')).toBeNull();
  });

  it('montre la popup quand le nombre de mots atteint le seuil', async () => {
    // Configurer AsyncStorage pour retourner 120 mots
    const wordsData = createWordsData(120);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId, getByText } = render(<RevisionOrchestrator />);
    
    // Attendre que les données AsyncStorage soient chargées
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalled();
    });

    // Attendre que les données soient chargées et le timer s'exécute
    await act(async () => {
      jest.advanceTimersByTime(2000); // Dépasse le délai de 1000ms du setTimeout
    });

    // Attendre un peu plus pour que le state se mette à jour
    await waitFor(() => {
      expect(getByTestId('revision-popup')).toBeTruthy();
    }, { timeout: 3000 });

    expect(getByText('Words: 120')).toBeTruthy();
    expect(getByText('Questions: 10')).toBeTruthy();
  });

  it('appelle resetToNextTarget et navigue quand "now" est choisi', async () => {
    // Configurer AsyncStorage pour retourner 120 mots
    const wordsData = createWordsData(120);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId } = render(<RevisionOrchestrator currentLevel="A1" />);
    
    // Attendre que la popup apparaisse - approche plus simple
    await act(async () => {
      jest.advanceTimersByTime(3000); // Attendre plus longtemps
    });

    // Vérifier que la popup est visible
    const popup = getByTestId('revision-popup');
    expect(popup).toBeTruthy();

    const nowButton = getByTestId('popup-now');
    
    await act(async () => {
      fireEvent.press(nowButton);
    });

    // Vérifier les appels
    expect(mockUseRevisionSettings.resetToNextTarget).toHaveBeenCalledWith(120);
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
    const wordsData = createWordsData(120);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId } = render(<RevisionOrchestrator />);
    
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    // Vérifier que la popup est visible
    const popup = getByTestId('revision-popup');
    expect(popup).toBeTruthy();

    const laterButton = getByTestId('popup-later50');
    
    await act(async () => {
      fireEvent.press(laterButton);
    });

    // Vérifier l'appel
    expect(mockUseRevisionSettings.updatePreferences).toHaveBeenCalledWith({ 
      nextRevisionAt: 170 
    });
  });

  it('appelle disableRevisions quand "disable" est choisi', async () => {
    const wordsData = createWordsData(120);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId } = render(<RevisionOrchestrator />);
    
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    // Vérifier que la popup est visible
    const popup = getByTestId('revision-popup');
    expect(popup).toBeTruthy();

    const disableButton = getByTestId('popup-disable');
    
    await act(async () => {
      fireEvent.press(disableButton);
    });

    // Vérifier l'appel
    expect(mockUseRevisionSettings.disableRevisions).toHaveBeenCalled();
  });

  it('gère la fermeture (dismiss) en choisissant "later_50" par défaut', async () => {
    const wordsData = createWordsData(120);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { getByTestId } = render(<RevisionOrchestrator />);
    
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    // Vérifier que la popup est visible
    const popup = getByTestId('revision-popup');
    expect(popup).toBeTruthy();

    const dismissButton = getByTestId('popup-dismiss');
    
    await act(async () => {
      fireEvent.press(dismissButton);
    });

    // Vérifier l'appel
    expect(mockUseRevisionSettings.updatePreferences).toHaveBeenCalledWith({ 
      nextRevisionAt: 170 
    });
  });

  // Test de debugging pour comprendre le comportement
  it('debug - vérifie les conditions de la popup', async () => {
    const wordsData = createWordsData(120);
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

    console.log('Debug info:', {
      totalWords,
      isDisabled,
      threshold,
      shouldShow
    });

    expect(totalWords).toBe('120');
    expect(isDisabled).toBe('false');
    expect(threshold).toBe('100');
    expect(shouldShow).toBe('true');
  });

  // Test supplémentaire pour vérifier le comptage des mots
  it('compte correctement les mots depuis AsyncStorage', async () => {
    const wordsData = createWordsData(85);
    AsyncStorage.getItem.mockImplementation((key) => {
      return Promise.resolve(wordsData[key] || null);
    });

    const { queryByTestId } = render(<RevisionOrchestrator />);
    
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    // Avec 85 mots et un seuil à 100, la popup ne doit pas apparaître
    expect(queryByTestId('revision-popup')).toBeNull();
    
    // Vérifier que AsyncStorage a été appelé pour tous les niveaux/modes
    const expectedCalls = ['1', '2', '3', '4', '5', '6', 'bonus']
      .flatMap(level => ['classic', 'fast'].map(mode => `vocabulary_${level}_${mode}`));
    
    expectedCalls.forEach(key => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    });
  });
});
