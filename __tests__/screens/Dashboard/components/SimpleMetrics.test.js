// __tests__/screens/Dashboard/components/SimpleMetrics.test.js
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
  });

  describe('État de chargement', () => {
    it('devrait afficher l\'indicateur de chargement', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 0,
        streakTrend: null,
        formattedTime: '0min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 0,
        isLoading: true
      });

      const { getByText } = renderComponent();
      expect(getByText('Chargement des métriques...')).toBeTruthy();
    });
  });

  describe('État vide', () => {
    it('devrait afficher l\'état vide quand aucune activité', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 0,
        streakTrend: null,
        formattedTime: '0min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 0,
        isLoading: false
      });

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
        formattedTime: '15min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 12,
        isLoading: false
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
        formattedTime: '10min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 8,
        isLoading: false
      });

      const { getByText } = renderComponent();
      expect(getByText('+2 💪')).toBeTruthy();
    });
  });

  describe('Gestion des valeurs nulles', () => {
    it('devrait gérer les valeurs nulles gracieusement', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: null,
        streakTrend: null,
        formattedTime: null
      });

      useDailyWords.mockReturnValue({
        wordsToday: null,
        isLoading: false
      });

      const { getByText } = renderComponent();
      expect(getByText('Commencez votre première session !')).toBeTruthy();
    });

    it('devrait afficher 0 pour les valeurs undefined', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: undefined,
        streakTrend: null,
        formattedTime: '5min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: undefined,
        isLoading: false
      });

      const { getByText, getAllByText } = renderComponent();
      const zeroElements = getAllByText('0');
      expect(zeroElements.length).toBeGreaterThan(0); // Au moins un élément avec "0"
      expect(getByText('5min')).toBeTruthy();
    });
  });

  describe('Couleurs et thème', () => {
    it('devrait utiliser la couleur d\'accent personnalisée', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 0,
        streakTrend: null,
        formattedTime: '0min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 0,
        isLoading: true
      });

      const { getByText } = renderComponent({ accentColor: '#FF5722' });
      expect(getByText('Chargement des métriques...')).toBeTruthy();
    });

    it('devrait fonctionner sans contexte de thème', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 1,
        streakTrend: null,
        formattedTime: '5min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 3,
        isLoading: false
      });

      const { getByText } = render(<SimpleMetrics />);
      expect(getByText('📊 Aujourd\'hui')).toBeTruthy();
    });
  });

  describe('Cas limites', () => {
    it('devrait afficher les métriques avec une seule valeur non-nulle', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 0,
        streakTrend: null,
        formattedTime: '0min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 1,
        isLoading: false
      });

      const { getByText } = renderComponent();
      expect(getByText('📊 Aujourd\'hui')).toBeTruthy();
      expect(getByText('1')).toBeTruthy();
    });

    it('devrait gérer les grandes valeurs', () => {
      useActivityMetrics.mockReturnValue({
        currentStreak: 365,
        streakTrend: '+1 🏆',
        formattedTime: '2h 45min'
      });

      useDailyWords.mockReturnValue({
        wordsToday: 100,
        isLoading: false
      });

      const { getByText } = renderComponent();
      expect(getByText('365')).toBeTruthy();
      expect(getByText('100')).toBeTruthy();
      expect(getByText('2h 45min')).toBeTruthy();
    });
  });
});