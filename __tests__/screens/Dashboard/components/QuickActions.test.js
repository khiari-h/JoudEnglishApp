// __tests__/screens/Dashboard/components/QuickActions.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuickActions from '../../../../src/screens/Dashboard/components/QuickActions';
import { ThemeContext } from '../../../../src/contexts/ThemeContext';

// Mock des dépendances
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../../../../src/utils/constants', () => ({
  EXERCISES: {
    vocabulary: {
      route: '/tabs/vocabulary',
      icon: '📚',
      title: 'Vocabulaire',
      color: '#3B82F6'
    },
    assessment: {
      route: '/tabs/assessment',
      icon: '📝',
      title: 'Test',
      color: '#EF4444'
    }
  }
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const { router } = require('expo-router');

describe('QuickActions', () => {
  const mockThemeContext = {
    colors: {
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const renderWithTheme = (component, themeValue = mockThemeContext) => {
    return render(
      <ThemeContext.Provider value={themeValue}>
        {component}
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
    Alert.alert.mockClear();
    router.push.mockClear();
  });

  describe('État de chargement', () => {
    it('devrait afficher l\'état de chargement initialement', () => {
      const { getByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      expect(getByText('⚡ Actions rapides')).toBeTruthy();
      expect(getByText('Chargement...')).toBeTruthy();
    });
  });

  describe('Affichage des actions', () => {
    beforeEach(() => {
      // Mock avec quelques mots pour afficher les actions
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key === 'vocabulary_1_classic') {
          return Promise.resolve(JSON.stringify({
            completedWords: {
              category1: ['word1', 'word2', 'word3'],
              category2: ['word4', 'word5']
            }
          }));
        }
        return Promise.resolve(null);
      });
    });

    it('devrait afficher toutes les actions après le chargement', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('⚡ Actions rapides')).toBeTruthy();
      expect(getByText('Vocabulaire')).toBeTruthy();
      expect(getByText('Révision')).toBeTruthy();
      expect(getByText('Test')).toBeTruthy();
    });

    it('devrait afficher les sous-titres corrects', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('Apprendre de nouveaux mots')).toBeTruthy();
      expect(getByText('Évaluer vos connaissances')).toBeTruthy();
    });

    it('devrait afficher les icônes des exercices', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('📚')).toBeTruthy();
      expect(getByText('🔄')).toBeTruthy();
      expect(getByText('📝')).toBeTruthy();
    });
  });

  describe('Navigation vers vocabulaire', () => {
    it('devrait naviguer vers vocabulaire avec les bons paramètres', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="2" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      const vocabularyButton = getByText('Vocabulaire');
      fireEvent.press(vocabularyButton);

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/vocabulary',
        params: { level: '2', mode: 'classic' }
      });
    });
  });

  describe('Navigation vers test', () => {
    it('devrait naviguer vers test avec le bon niveau', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="3" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      const testButton = getByText('Test');
      fireEvent.press(testButton);

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/assessment',
        params: { level: '3' }
      });
    });
  });

  describe('Révision avec mots suffisants', () => {
    beforeEach(() => {
      // Mock avec 15 mots appris - le composant compte TOUS les niveaux et modes
      // 7 niveaux × 2 modes = 14 appels, chacun retournant 15 mots = 210 mots total
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key.includes('vocabulary')) {
          return Promise.resolve(JSON.stringify({
            completedWords: {
              category1: ['word1', 'word2', 'word3', 'word4', 'word5'],
              category2: ['word6', 'word7', 'word8', 'word9', 'word10'],
              category3: ['word11', 'word12', 'word13', 'word14', 'word15']
            }
          }));
        }
        return Promise.resolve(null);
      });
    });

    it('devrait afficher le nombre de mots disponibles', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // Le composant compte tous les niveaux et modes: 7 niveaux × 2 modes × 15 mots = 210 mots
      expect(getByText('210 mots disponibles')).toBeTruthy();
    });

    it('devrait naviguer vers révision avec les bons paramètres', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      const revisionButton = getByText('Révision');
      fireEvent.press(revisionButton);

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/vocabularyRevision',
        params: {
          level: '1',
          questionsCount: 10,
          source: 'manual'
        }
      });
    });
  });

  describe('Révision avec mots insuffisants', () => {
    beforeEach(() => {
      // Mock avec seulement 5 mots appris au total (tous niveaux confondus)
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key === 'vocabulary_1_classic') {
          return Promise.resolve(JSON.stringify({
            completedWords: {
              category1: ['word1', 'word2', 'word3', 'word4', 'word5']
            }
          }));
        }
        // Tous les autres retournent null pour avoir un total < 10
        return Promise.resolve(null);
      });
    });

    it('devrait afficher le message d\'encouragement', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('Apprenez plus de mots')).toBeTruthy();
    });

    it('devrait avoir le bouton révision désactivé avec moins de 10 mots', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // Le bouton devrait être présent mais désactivé
      expect(getByText('Révision')).toBeTruthy();
      expect(getByText('Apprenez plus de mots')).toBeTruthy();
      
      // Vérifier que l'alerte ne se déclenche pas car le bouton est disabled
      const revisionButton = getByText('Révision');
      fireEvent.press(revisionButton);

      // Pas d'alerte car le bouton est disabled
      expect(Alert.alert).not.toHaveBeenCalled();
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  describe('Comptage des mots', () => {
    it('devrait compter les mots de tous les niveaux et modes', async () => {
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key === 'vocabulary_1_classic') {
          return Promise.resolve(JSON.stringify({
            completedWords: { cat1: ['w1', 'w2'] }
          }));
        }
        if (key === 'vocabulary_2_fast') {
          return Promise.resolve(JSON.stringify({
            completedWords: { cat1: ['w3', 'w4', 'w5'] }
          }));
        }
        return Promise.resolve(null);
      });

      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // Devrait avoir compté 5 mots au total (2 + 3) mais < 10 donc "Apprenez plus de mots"
      expect(getByText('Apprenez plus de mots')).toBeTruthy();
    });

    it('devrait gérer les erreurs de lecture AsyncStorage', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // Devrait afficher 0 mots en cas d'erreur
      expect(getByText('Apprenez plus de mots')).toBeTruthy();
    });

    it('devrait gérer les données corrompues', async () => {
      AsyncStorage.getItem.mockResolvedValue('invalid json');

      const { getByText, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('Apprenez plus de mots')).toBeTruthy();
    });
  });

  describe('Thème et couleurs', () => {
    it('devrait fonctionner sans contexte de thème', async () => {
      const { getByText, queryByText } = render(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('⚡ Actions rapides')).toBeTruthy();
      expect(getByText('Vocabulaire')).toBeTruthy();
    });

    it('devrait utiliser les couleurs du thème', async () => {
      const customTheme = {
        colors: {
          surface: '#000000',
          text: '#FFFFFF',
          textSecondary: '#CCCCCC'
        }
      };

      const { getByText, queryByText } = renderWithTheme(
        <QuickActions currentLevel="1" />,
        customTheme
      );
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      expect(getByText('⚡ Actions rapides')).toBeTruthy();
    });
  });

  describe('Niveaux différents', () => {
    it('devrait utiliser le niveau par défaut si non spécifié', async () => {
      const { getByText, queryByText } = renderWithTheme(<QuickActions />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // Cliquer sur vocabulaire devrait utiliser le niveau "1" par défaut
      const vocabularyButton = getByText('Vocabulaire');
      fireEvent.press(vocabularyButton);
      
      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/vocabulary',
        params: { level: '1', mode: 'classic' }
      });
    });

    it('devrait recalculer les mots quand le niveau change', async () => {
      const { rerender, queryByText } = renderWithTheme(<QuickActions currentLevel="1" />);
      
      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      const initialCallCount = AsyncStorage.getItem.mock.calls.length;

      // Changer le niveau devrait déclencher un nouveau calcul
      rerender(
        <ThemeContext.Provider value={mockThemeContext}>
          <QuickActions currentLevel="2" />
        </ThemeContext.Provider>
      );

      await waitFor(() => {
        expect(queryByText('Chargement...')).toBeNull();
      });

      // AsyncStorage devrait être appelé à nouveau (14 appels supplémentaires)
      expect(AsyncStorage.getItem.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });
});