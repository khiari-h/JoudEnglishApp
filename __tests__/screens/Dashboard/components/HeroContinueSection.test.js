// __tests__/screens/Dashboard/components/HeroContinueSection.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HeroContinueSection from '../../../../src/screens/Dashboard/components/HeroContinueSection';
import { ThemeContext } from '../../../../src/contexts/ThemeContext';

// Mock du composant Card
jest.mock('../../../../src/components/ui/Card', () => {
  const { View } = require('react-native');
  return ({ children, style, ...props }) => (
    <View style={style} {...props} testID="hero-card">
      {children}
    </View>
  );
});

describe('HeroContinueSection', () => {
  const mockTheme = {
    colors: {
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const mockLastActivity = {
    title: 'Vocabulaire Animaux',
    level: '2',
    type: 'vocabulary',
    metadata: {
      word: 4,
      totalWords: 15,
      categoryIndex: 1
    }
  };

  const defaultProps = {
    onPress: jest.fn(),
    accentColor: '#3B82F6',
    isLoading: false
  };

  const renderComponent = (props = {}) => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <HeroContinueSection {...defaultProps} {...props} />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('État de chargement', () => {
    it('devrait afficher l\'indicateur de chargement', () => {
      const { getByText } = renderComponent({ isLoading: true });
      expect(getByText('Chargement...')).toBeTruthy();
    });
  });

  describe('État vide (première utilisation)', () => {
    it('devrait afficher le message de démarrage', () => {
      const { getByText } = renderComponent({ lastActivity: null });
      
      expect(getByText('🚀')).toBeTruthy();
      expect(getByText('Commencer l\'apprentissage')).toBeTruthy();
      expect(getByText('Choisissez votre premier exercice')).toBeTruthy();
      expect(getByText('Commencer >')).toBeTruthy();
    });

    it('devrait appeler onPress avec "levelSelection"', () => {
      const mockOnPress = jest.fn();
      const { getByText } = renderComponent({ 
        lastActivity: null, 
        onPress: mockOnPress 
      });
      
      fireEvent.press(getByText('Commencer >'));
      expect(mockOnPress).toHaveBeenCalledWith('levelSelection');
    });
  });

  describe('État avec activité existante', () => {
    it('devrait afficher les informations de l\'activité', () => {
      const { getByText } = renderComponent({ lastActivity: mockLastActivity });
      
      expect(getByText('📚')).toBeTruthy();
      expect(getByText('Reprendre')).toBeTruthy();
      expect(getByText('Vocabulaire Animaux')).toBeTruthy();
      expect(getByText('Continuer ▶️')).toBeTruthy();
    });

    it('devrait calculer le pourcentage correct', () => {
      const { getByText } = renderComponent({ lastActivity: mockLastActivity });
      // (4+1)/15 * 100 = 33%
      expect(getByText('33%')).toBeTruthy();
    });

    it('devrait appeler onPress avec l\'activité', () => {
      const mockOnPress = jest.fn();
      const { getByText } = renderComponent({ 
        lastActivity: mockLastActivity,
        onPress: mockOnPress 
      });
      
      fireEvent.press(getByText('Continuer ▶️'));
      expect(mockOnPress).toHaveBeenCalledWith(mockLastActivity);
    });

    it('devrait gérer une activité sans métadonnées', () => {
      const activityWithoutMetadata = {
        title: 'Grammaire Simple',
        level: '1',
        type: 'grammar'
      };

      const { getByText } = renderComponent({ lastActivity: activityWithoutMetadata });
      
      expect(getByText('Grammaire Simple')).toBeTruthy();
      expect(getByText('7%')).toBeTruthy(); // 1/15 * 100 = 7%
    });
  });

  describe('Gestion des couleurs', () => {
    it('devrait utiliser la couleur d\'accent personnalisée', () => {
      const { getByText } = renderComponent({ 
        lastActivity: mockLastActivity,
        accentColor: '#8B5CF6'
      });
      
      expect(getByText('33%')).toBeTruthy();
    });

    it('devrait fonctionner sans contexte de thème', () => {
      const { getByText } = render(
        <HeroContinueSection 
          lastActivity={mockLastActivity}
          onPress={jest.fn()}
        />
      );
      
      expect(getByText('Vocabulaire Animaux')).toBeTruthy();
    });
  });

  describe('Gestion des callbacks', () => {
    it('ne devrait pas planter si onPress n\'est pas fourni', () => {
      const { getByText } = renderComponent({ 
        lastActivity: null,
        onPress: undefined 
      });
      
      expect(() => fireEvent.press(getByText('Commencer >'))).not.toThrow();
    });
  });

  describe('Cas limites', () => {
    it('devrait gérer un niveau manquant', () => {
      const activityWithoutLevel = {
        title: 'Test Activity',
        type: 'vocabulary'
      };

      const { getByText } = renderComponent({ lastActivity: activityWithoutLevel });
      expect(getByText('Test Activity')).toBeTruthy();
    });

    it('devrait limiter le pourcentage à 100% maximum', () => {
      const completedActivity = {
        ...mockLastActivity,
        metadata: {
          word: 20,
          totalWords: 15
        }
      };

      const { getByText } = renderComponent({ lastActivity: completedActivity });
      // (20+1)/15 * 100 = 140% mais limité à 100%
      expect(getByText('100%')).toBeTruthy();
    });
  });
});