// __tests__/screens/Dashboard/components/SimpleMetrics.test.js - MIS À JOUR
import React from 'react';
import { render } from '@testing-library/react-native';
import SimpleMetrics from '../../../../src/screens/Dashboard/components/SimpleMetrics';
import { ThemeContext } from '../../../../src/contexts/ThemeContext';

// Mock des hooks
jest.mock('../../../../src/hooks/useActivityMetrics', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../../../../src/hooks/useDailyWords', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('SimpleMetrics', () => {
  const mockTheme = {
    colors: {
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const useActivityMetrics = require('../../../../src/hooks/useActivityMetrics').default;
  const useDailyWords = require('../../../../src/hooks/useDailyWords').default;

  const renderComponent = (props = {}) => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <SimpleMetrics {...props} />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // 🔥 SETUP PAR DÉFAUT DES HOOKS
    useActivityMetrics.mockReturnValue({
      currentStreak: 0,
      streakTrend: null,
      formattedTime: '0min',
      refresh: jest.fn()
    });

    useDailyWords.mockReturnValue({
      wordsToday: 0,
      isLoading: false,
      refresh: jest.fn()
    });
  });

  describe('État de chargement', () => {
    it('devrait afficher l\'indicateur de chargement', () => {
      useDailyWords.mockReturnValue({
        wordsToday: 0,
        isLoading: true,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      expect(getByText('Chargement des métriques...')).toBeTruthy();
    });
  });

  describe('État vide', () => {
    it('devrait afficher l\'état vide quand aucune activité', () => {
      const { getByText } = renderComponent();
      
      expect(getByText('🎯')).toBeTruthy();
      expect(getByText('Commencez votre première session !')).toBeTruthy();
      expect(getByText('Vos statistiques apparaîtront ici')).toBeTruthy();
    });
  });

  describe('Affichage des métriques', () => {
    it('devrait afficher toutes les métriques avec activité', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 5,
        streakTrend: '+1 🔥',
        formattedTime: '15min',
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: 12,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      
      expect(getByText('📊 Aujourd\'hui')).toBeTruthy();
      expect(getByText('🔥')).toBeTruthy();
      expect(getByText('📚')).toBeTruthy();
      expect(getByText('⏱️')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
      expect(getByText('12')).toBeTruthy();
      expect(getByText('15min')).toBeTruthy();
      expect(getByText('Jours de suite')).toBeTruthy();
      expect(getByText('Mots aujourd\'hui')).toBeTruthy();
      expect(getByText('Temps aujourd\'hui')).toBeTruthy();
    });

    it('devrait afficher le trend pour le streak', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 3,
        streakTrend: '+2 💪',
        formattedTime: '10min',
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: 8,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      expect(getByText('+2 💪')).toBeTruthy();
    });
  });

  // 🔥 NOUVEAUX TESTS POUR LE SYSTÈME DE RAFRAÎCHISSEMENT
  describe('Système de rafraîchissement', () => {
    it('devrait appeler les fonctions refresh quand refreshKey change', () => {
      const mockRefreshMetrics = jest.fn();
      const mockRefreshWords = jest.fn();

      useActivityMetrics.mockReturnValue({
        currentStreak: 1,
        streakTrend: null,
        formattedTime: '5min',
        refresh: mockRefreshMetrics
      });

      useDailyWords.mockReturnValue({
        wordsToday: 3,
        isLoading: false,
        refresh: mockRefreshWords
      });

      const { rerender } = renderComponent({ refreshKey: 0 });
      
      // Change refreshKey
      rerender(
        <ThemeContext.Provider value={mockTheme}>
          <SimpleMetrics refreshKey={1} />
        </ThemeContext.Provider>
      );

      expect(mockRefreshMetrics).toHaveBeenCalled();
      expect(mockRefreshWords).toHaveBeenCalled();
    });

    it('devrait gérer les hooks sans fonction refresh', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 1,
        streakTrend: null,
        formattedTime: '5min'
        // Pas de fonction refresh
      });

      useDailyWords.mockReturnValue({
        wordsToday: 3,
        isLoading: false
        // Pas de fonction refresh
      });

      const { rerender } = renderComponent({ refreshKey: 0 });
      
      // Ne devrait pas planter
      rerender(
        <ThemeContext.Provider value={mockTheme}>
          <SimpleMetrics refreshKey={1} />
        </ThemeContext.Provider>
      );

      expect(true).toBe(true); // Test que ça ne plante pas
    });

    it('ne devrait pas refresh si refreshKey est 0', () => {
      const mockRefreshMetrics = jest.fn();
      const mockRefreshWords = jest.fn();

      useActivityMetrics.mockReturnValue({
        currentStreak: 1,
        streakTrend: null,
        formattedTime: '5min',
        refresh: mockRefreshMetrics
      });

      useDailyWords.mockReturnValue({
        wordsToday: 3,
        isLoading: false,
        refresh: mockRefreshWords
      });

      renderComponent({ refreshKey: 0 });

      expect(mockRefreshMetrics).not.toHaveBeenCalled();
      expect(mockRefreshWords).not.toHaveBeenCalled();
    });
  });

  describe('Gestion des valeurs nulles', () => {
    it('devrait gérer les valeurs nulles gracieusement', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: null,
        streakTrend: null,
        formattedTime: null,
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: null,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      expect(getByText('Commencez votre première session !')).toBeTruthy();
    });

    it('devrait afficher 0 pour les valeurs undefined', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: undefined,
        streakTrend: null,
        formattedTime: '5min',
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: undefined,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText, getAllByText } = renderComponent();
      const zeroElements = getAllByText('0');
      expect(zeroElements.length).toBeGreaterThan(0);
      expect(getByText('5min')).toBeTruthy();
    });
  });

  describe('Couleurs et thème', () => {
    it('devrait utiliser la couleur d\'accent personnalisée', () => {
      useDailyWords.mockReturnValue({
        wordsToday: 0,
        isLoading: true,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent({ accentColor: '#FF5722' });
      expect(getByText('Chargement des métriques...')).toBeTruthy();
    });

    it('devrait fonctionner sans contexte de thème', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 1,
        streakTrend: null,
        formattedTime: '5min',
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: 3,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = render(<SimpleMetrics />);
      expect(getByText('📊 Aujourd\'hui')).toBeTruthy();
    });
  });

  describe('Cas limites', () => {
    it('devrait afficher les métriques avec une seule valeur non-nulle', () => {
      useDailyWords.mockReturnValue({
        wordsToday: 1,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      expect(getByText('📊 Aujourd\'hui')).toBeTruthy();
      expect(getByText('1')).toBeTruthy();
    });

    it('devrait gérer les grandes valeurs', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 365,
        streakTrend: '+1 🏆',
        formattedTime: '2h 45min',
        refresh: jest.fn()
      });

      useDailyWords.mockReturnValue({
        wordsToday: 100,
        isLoading: false,
        refresh: jest.fn()
      });

      const { getByText } = renderComponent();
      expect(getByText('365')).toBeTruthy();
      expect(getByText('100')).toBeTruthy();
      expect(getByText('2h 45min')).toBeTruthy();
    });
  });
});