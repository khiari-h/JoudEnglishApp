// __tests__/screens/exercises/word-games/WordGamesResults.test.js
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WordGamesResults from '../../../../src/screens/exercises/word-games/WordGamesResults';

// Mock des composants enfants
jest.mock('../../../../src/components/ui/ContentSection', () => {
  return function MockContentSection({ title, content, children }) {
    return (
      <div testID={`ContentSection-${title}`}>
        <div testID="ContentSection-title">{title}</div>
        <div testID="ContentSection-content">{content}</div>
        {children}
      </div>
    );
  };
});

jest.mock('../../../../src/components/ui/PerformanceCard', () => {
  return function MockPerformanceCard({ content, levelColor, backgroundColor, icon }) {
    return (
      <div testID="PerformanceCard">
        <div testID="PerformanceCard-content">{content}</div>
        <div testID="PerformanceCard-color">{levelColor}</div>
        <div testID="PerformanceCard-bg">{backgroundColor}</div>
        <div testID="PerformanceCard-icon">{icon}</div>
      </div>
    );
  };
});

jest.mock('../../../../src/components/exercise-common/NavigationButtons', () => {
  return function MockNavigationButtons({ onNext, buttonLabels, primaryColor, isLast }) {
    return (
      <button testID="NavigationButtons" onClick={onNext}>
        {buttonLabels?.next || 'Next'}
      </button>
    );
  };
});

describe('WordGamesResults', () => {
  const defaultProps = {
    games: [
      { type: 'vocabulary', id: 'vocab-1' },
      { type: 'spelling', id: 'spell-1' }
    ],
    gameResults: [
      { score: 8, maxScore: 10 },
      { score: 7, maxScore: 10 }
    ],
    finalScore: {
      score: 15,
      percentage: 75,
      totalMaxScore: 20
    },
    levelColor: '#3b82f6',
    onContinue: jest.fn(),
    performance: {
      message: '🎯 Good Job!',
      description: 'You did well!',
      color: '#10b981'
    },
    gameTypeStats: [
      { type: 'vocabulary', percentage: 80, completedCount: 8, gamesCount: 10 },
      { type: 'spelling', percentage: 70, completedCount: 7, gamesCount: 10 }
    ],
    feedbackMessage: 'Keep practicing to improve!'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendu de base', () => {
    it('devrait afficher le composant avec toutes les sections', () => {
      render(<WordGamesResults {...defaultProps} />);
      
      expect(screen.getByTestId('PerformanceCard')).toBeTruthy();
      expect(screen.getByTestId('ContentSection-Games Review')).toBeTruthy();
      expect(screen.getByTestId('ContentSection-Performance by Game Type')).toBeTruthy();
      expect(screen.getByTestId('ContentSection-Feedback')).toBeTruthy();
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait afficher les statistiques des jeux', () => {
      render(<WordGamesResults {...defaultProps} />);
      
      const gamesReview = screen.getByTestId('ContentSection-Games Review');
      expect(gamesReview).toBeTruthy();
    });

    it('devrait afficher l\'analyse par type de jeu', () => {
      render(<WordGamesResults {...defaultProps} />);
      
      const gameTypeStats = screen.getByTestId('ContentSection-Performance by Game Type');
      expect(gameTypeStats).toBeTruthy();
    });
  });

  describe('Bouton Play Again - Logique Boolean(onPlayAgain)', () => {
    it('devrait afficher le bouton Play Again quand onPlayAgain est défini ET score < 80%', () => {
      const propsWithPlayAgain = {
        ...defaultProps,
        onPlayAgain: jest.fn(),
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithPlayAgain} />);
      
      // Le bouton Play Again devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait NE PAS afficher le bouton Play Again quand onPlayAgain est undefined', () => {
      const propsWithoutPlayAgain = {
        ...defaultProps,
        onPlayAgain: undefined,
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithoutPlayAgain} />);
      
      // Seul le bouton Continue devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait NE PAS afficher le bouton Play Again quand onPlayAgain est null', () => {
      const propsWithNullPlayAgain = {
        ...defaultProps,
        onPlayAgain: null,
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithNullPlayAgain} />);
      
      // Seul le bouton Continue devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait NE PAS afficher le bouton Play Again quand score >= 80%', () => {
      const propsWithHighScore = {
        ...defaultProps,
        onPlayAgain: jest.fn(),
        finalScore: { ...defaultProps.finalScore, percentage: 85 }
      };
      
      render(<WordGamesResults {...propsWithHighScore} />);
      
      // Seul le bouton Continue devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait NE PAS afficher le bouton Play Again quand onPlayAgain est une chaîne vide', () => {
      const propsWithEmptyString = {
        ...defaultProps,
        onPlayAgain: '',
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithEmptyString} />);
      
      // Seul le bouton Continue devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait NE PAS afficher le bouton Play Again quand onPlayAgain est 0', () => {
      const propsWithZero = {
        ...defaultProps,
        onPlayAgain: 0,
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithZero} />);
      
      // Seul le bouton Continue devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });

    it('devrait afficher le bouton Play Again quand onPlayAgain est une fonction ET score < 80%', () => {
      const mockFunction = jest.fn();
      const propsWithFunction = {
        ...defaultProps,
        onPlayAgain: mockFunction,
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...propsWithFunction} />);
      
      // Le bouton Play Again devrait être présent
      expect(screen.getByTestId('NavigationButtons')).toBeTruthy();
    });
  });

  describe('Gestion des props manquantes', () => {
    it('devrait gérer les jeux vides', () => {
      const propsWithoutGames = {
        ...defaultProps,
        games: []
      };
      
      render(<WordGamesResults {...propsWithoutGames} />);
      
      // La section Games Review ne devrait pas être affichée
      expect(screen.queryByTestId('ContentSection-Games Review')).toBeFalsy();
    });

    it('devrait gérer les statistiques de type de jeu insuffisantes', () => {
      const propsWithSingleGameType = {
        ...defaultProps,
        gameTypeStats: [{ type: 'vocabulary', percentage: 80, completedCount: 8, gamesCount: 10 }]
      };
      
      render(<WordGamesResults {...propsWithoutGames} />);
      
      // La section Performance by Game Type ne devrait pas être affichée
      expect(screen.queryByTestId('ContentSection-Performance by Game Type')).toBeFalsy();
    });

    it('devrait gérer l\'absence de message de feedback', () => {
      const propsWithoutFeedback = {
        ...defaultProps,
        feedbackMessage: null
      };
      
      render(<WordGamesResults {...propsWithoutFeedback} />);
      
      // La section Feedback ne devrait pas être affichée
      expect(screen.queryByTestId('ContentSection-Feedback')).toBeFalsy();
    });
  });

  describe('Navigation et callbacks', () => {
    it('devrait appeler onContinue quand le bouton Continue est cliqué', () => {
      const mockOnContinue = jest.fn();
      const props = {
        ...defaultProps,
        onContinue: mockOnContinue
      };
      
      render(<WordGamesResults {...props} />);
      
      const continueButton = screen.getByTestId('NavigationButtons');
      continueButton.click();
      
      expect(mockOnContinue).toHaveBeenCalledTimes(1);
    });

    it('devrait appeler onPlayAgain quand le bouton Play Again est cliqué', () => {
      const mockOnPlayAgain = jest.fn();
      const props = {
        ...defaultProps,
        onPlayAgain: mockOnPlayAgain,
        finalScore: { ...defaultProps.finalScore, percentage: 75 }
      };
      
      render(<WordGamesResults {...props} />);
      
      const playAgainButton = screen.getByTestId('NavigationButtons');
      playAgainButton.click();
      
      expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validation des props', () => {
    it('devrait avoir des PropTypes valides', () => {
      expect(WordGamesResults.propTypes).toBeDefined();
      expect(WordGamesResults.propTypes.games).toBeDefined();
      expect(WordGamesResults.propTypes.gameResults).toBeDefined();
      expect(WordGamesResults.propTypes.finalScore).toBeDefined();
      expect(WordGamesResults.propTypes.levelColor).toBeDefined();
      expect(WordGamesResults.propTypes.onPlayAgain).toBeDefined();
      expect(WordGamesResults.propTypes.onContinue).toBeDefined();
    });
  });
});
