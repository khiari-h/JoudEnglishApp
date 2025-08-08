// __tests__/screens/Dashboard/components/LearningProgress.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LearningProgress from '../../../../src/screens/Dashboard/components/LearningProgress';
import { ThemeContext } from '../../../../src/contexts/ThemeContext';

// Mock du composant Card
jest.mock('../../../../src/components/ui/Card', () => {
  const { View } = require('react-native');
  return ({ children, style, ...props }) => (
    <View style={style} {...props} testID="learning-progress-card">
      {children}
    </View>
  );
});

// Mock des constantes
jest.mock('../../../../src/utils/constants', () => ({
  LANGUAGE_LEVELS: {
    '1': { title: 'Débutant', color: '#10B981', icon: '🌱' },
    '2': { title: 'Élémentaire', color: '#3B82F6', icon: '📚' },
    '3': { title: 'Intermédiaire', color: '#8B5CF6', icon: '🎯' },
    'bonus': { title: 'Bonus', color: '#6366F1', icon: '🎁' }
  }
}));

describe('LearningProgress', () => {
  const mockTheme = {
    colors: {
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const mockLevels = [
    { id: '1', color: '#10B981', progress: 75 },
    { id: '2', color: '#3B82F6', progress: 50 },
    { id: '3', color: '#8B5CF6', progress: 25 }
  ];

  
    const defaultProps = {
      levels: mockLevels,
      currentLevel: '1',
      globalProgress: 75,
      primaryColor: '#10B981',
      onSelectLevel: jest.fn(),
      onChangeLevelVisual: jest.fn()
    };
  const renderComponent = (props = {}) => {

    const allProps = { ...defaultProps, ...props };
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <LearningProgress {...allProps} />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendu de base', () => {
    it('devrait rendre le composant sans erreur', () => {
      const { getByText } = renderComponent();
      expect(getByText('🏆 Progression générale')).toBeTruthy();
    });

    it('devrait afficher les informations du niveau courant', () => {
      const { getByText } = renderComponent();
      expect(getByText('Débutant')).toBeTruthy();
      expect(getByText('75%')).toBeTruthy();
    });

    it('devrait afficher la barre de progression', () => {
      const { getByText } = renderComponent();
      expect(getByText('Progression globale')).toBeTruthy();
    });

    it('devrait afficher le bouton d\'exploration', () => {
      const { getByText } = renderComponent();
      expect(getByText('Explorer le niveau 1')).toBeTruthy();
    });
  });

  describe('Gestion des niveaux', () => {
    it('devrait afficher tous les cercles de niveau', () => {
      const { getByText } = renderComponent();
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
    });

    it('devrait gérer le niveau bonus', () => {
      const levelsWithBonus = [...mockLevels, { id: 'bonus', color: '#6366F1', progress: 10 }];
      const { getByText } = renderComponent({ 
        levels: levelsWithBonus,
        currentLevel: 'bonus'
      });
      
      expect(getByText('B')).toBeTruthy();
      expect(getByText('Bonus')).toBeTruthy();
      expect(getByText('Explorer le niveau B')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('devrait appeler onChangeLevelVisual lors du clic sur un niveau', () => {
      const mockOnChangeLevelVisual = jest.fn();
      const { getByText } = renderComponent({ onChangeLevelVisual: mockOnChangeLevelVisual });
      
      fireEvent.press(getByText('2'));
      expect(mockOnChangeLevelVisual).toHaveBeenCalledWith('2');
    });

    it('devrait appeler onSelectLevel lors du clic sur explorer', () => {
      const mockOnSelectLevel = jest.fn();
      const { getByText } = renderComponent({ onSelectLevel: mockOnSelectLevel });
      
      fireEvent.press(getByText('Explorer le niveau 1'));
      expect(mockOnSelectLevel).toHaveBeenCalledWith('1');
    });
  });

  describe('Props par défaut', () => {
    it('devrait fonctionner avec les props par défaut', () => {
      const { getByText } = render(
        <ThemeContext.Provider value={mockTheme}>
          <LearningProgress />
        </ThemeContext.Provider>
      );
      
      expect(getByText('🏆 Progression générale')).toBeTruthy();
      expect(getByText('0%')).toBeTruthy();
    });

    it('devrait fonctionner sans contexte de thème', () => {
      const { getByText } = render(<LearningProgress {...defaultProps} />);
      expect(getByText('🏆 Progression générale')).toBeTruthy();
    });
  });

  describe('Cas limites', () => {
    it('devrait gérer une progression supérieure à 100%', () => {
      const { getByText } = renderComponent({ globalProgress: 150 });
      expect(getByText('150%')).toBeTruthy();
    });

    it('devrait gérer un niveau inexistant', () => {
      const { getByText } = renderComponent({ currentLevel: 'invalid' });
      expect(getByText('Débutant')).toBeTruthy(); // Fallback au niveau 1
    });

    it('devrait gérer des niveaux vides', () => {
      const { getByText } = renderComponent({ levels: [] });
      expect(getByText('🏆 Progression générale')).toBeTruthy();
    });
  });
});