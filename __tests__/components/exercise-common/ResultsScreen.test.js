import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ResultsScreen from '../../../src/components/exercise-common/ResultsScreen';
import { Share } from 'react-native';

// Mock des dépendances
jest.mock('expo-linear-gradient', () => {
    const { View } = require('react-native');
    return {
        LinearGradient: (props) => <View {...props} />,
    };
});
jest.mock('@expo/vector-icons', () => {
    const { Text } = require('react-native');
    return {
        Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
    };
});

describe('ResultsScreen', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    // Assurez-vous que Share.share est un mock avant chaque test
    beforeEach(() => {
        Share.share = jest.fn();
    });

    const defaultProps = {
        totalQuestions: 10,
        correctAnswers: 8,
        incorrectAnswers: 1,
        skippedAnswers: 2,
        timeTaken: '01:30',
        exerciseType: 'Vocabulary',
        level: 'B1',
        levelColor: '#3B82F6',
        feedback: '',
        onRetry: jest.fn(),
        onContinue: jest.fn(),
        showDetailedResults: false,
        detailedResults: [],
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.runOnlyPendingTimers();
    });

    it('renders basic statistics correctly', () => {
        const { getByText } = render(<ResultsScreen {...defaultProps} />);
        expect(getByText('80%')).toBeTruthy();
        expect(getByText('8/10')).toBeTruthy();
        expect(getByText('Correctes')).toBeTruthy();
        expect(getByText('8')).toBeTruthy();
        expect(getByText('Incorrectes')).toBeTruthy();
        expect(getByText('1')).toBeTruthy();
        expect(getByText('Passées')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(getByText('Temps')).toBeTruthy();
        expect(getByText('01:30')).toBeTruthy();
    });

    it('displays feedback when provided', () => {
        const { getByText } = render(<ResultsScreen {...defaultProps} feedback="Great job!" />);
        expect(getByText('Conseils pour progresser')).toBeTruthy();
        expect(getByText('Great job!')).toBeTruthy();
    });

    it('does not display feedback when not provided', () => {
        const { queryByText } = render(<ResultsScreen {...defaultProps} feedback="" />);
        expect(queryByText('Conseils pour progresser')).toBeNull();
    });

    it('displays detailed results when showDetailedResults is true and data is present', () => {
        const detailedResults = [
            { question: 'Q1', userAnswer: 'A', correctAnswer: 'B', isCorrect: false, isSkipped: false },
        ];
        const { getByText } = render(
            <ResultsScreen {...defaultProps} showDetailedResults={true} detailedResults={detailedResults} />
        );
        expect(getByText('Détail des réponses')).toBeTruthy();
        expect(getByText('Question 1')).toBeTruthy();
        expect(getByText('Q1')).toBeTruthy();
        expect(getByText('Votre réponse:')).toBeTruthy();
        expect(getByText('A')).toBeTruthy();
        expect(getByText('Réponse correcte:')).toBeTruthy();
        expect(getByText('B')).toBeTruthy();
    });

    it('does not display detailed results when showDetailedResults is false', () => {
        const detailedResults = [
            { question: 'Q1', userAnswer: 'A', correctAnswer: 'B', isCorrect: false, isSkipped: false },
        ];
        const { queryByText } = render(
            <ResultsScreen {...defaultProps} showDetailedResults={false} detailedResults={detailedResults} />
        );
        expect(queryByText('Détail des réponses')).toBeNull();
    });

    it('shows "Excellent!" for >= 80% score', () => {
        const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={8} totalQuestions={10} />);
        expect(getByText('Excellent!')).toBeTruthy();
        expect(getByTestId('icon-trophy')).toBeTruthy();
    });

    it('shows "Bien joué!" for >= 60% score', () => {
        const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={6} totalQuestions={10} />);
        expect(getByText('Bien joué!')).toBeTruthy();
        expect(getByTestId('icon-thumbs-up')).toBeTruthy();
    });

    it('shows "Pas mal!" for >= 40% score', () => {
        const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={4} totalQuestions={10} />);
        expect(getByText('Pas mal!')).toBeTruthy();
        expect(getByTestId('icon-fitness')).toBeTruthy();
    });

    it('shows "Continuez vos efforts" for < 40% score', () => {
        const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={3} totalQuestions={10} />);
        expect(getByText('Continuez vos efforts')).toBeTruthy();
        expect(getByTestId('icon-school')).toBeTruthy();
    });

    it('calls onRetry when the retry button is pressed', () => {
        const { getByText } = render(<ResultsScreen {...defaultProps} />);
        fireEvent.press(getByText('Réessayer'));
        expect(defaultProps.onRetry).toHaveBeenCalledTimes(1);
    });

    it('calls onContinue when the continue button is pressed', () => {
        const { getByText } = render(<ResultsScreen {...defaultProps} />);
        fireEvent.press(getByText('Continuer'));
        expect(defaultProps.onContinue).toHaveBeenCalledTimes(1);
    });

    it('calls Share.share with correct data when share button is pressed', async () => {
        const { getByText } = render(<ResultsScreen {...defaultProps} />);
        fireEvent.press(getByText('Partager'));
        expect(Share.share).toHaveBeenCalledWith({
            message: 'J\'ai obtenu 8/10 (80%) dans mon exercice de Vocabulary niveau B1 sur l\'application JOUD English!',
            title: 'Mes résultats d\'apprentissage',
        });
    });

    it('handles share error gracefully without crashing', async () => {
        // Mock l'échec de la fonction Share.share
        const shareError = new Error('Share operation failed');
        Share.share.mockRejectedValue(shareError);

        // Espionne console.warn pour vérifier qu'elle est appelée
        const warnSpy = jest.spyOn(console, 'warn');
        const { getByText } = render(<ResultsScreen {...defaultProps} />);

        // Déclencher le partage
        await act(async () => {
            fireEvent.press(getByText('Partager'));
        });

        // Vérifier que le mock a été appelé
        expect(Share.share).toHaveBeenCalledTimes(1);
        // Vérifier que console.warn a été appelée avec le message d'erreur approprié
        expect(warnSpy).toHaveBeenCalledWith('Error sharing results:', shareError);

        warnSpy.mockRestore();
    });
// Tests à ajouter à ton fichier ResultsScreen.test.js

describe('Detailed Results - Edge Cases', () => {
it('displays skipped questions correctly', () => {
  const detailedResults = [
    { 
      question: 'What is 2+2?', 
      userAnswer: '', 
      correctAnswer: '4', 
      isCorrect: false, 
      isSkipped: true
    },
  ];
  const { getByText, getAllByTestId } = render(
    <ResultsScreen 
      {...defaultProps} 
      showDetailedResults={true} 
      detailedResults={detailedResults} 
    />
  );
  
  // Vérifier l'icône pour question passée (peut apparaître plusieurs fois)
  expect(getAllByTestId('icon-play-skip-forward').length).toBeGreaterThan(0);
  
  // Vérifier le texte "Passée"
  expect(getByText('Passée')).toBeTruthy();
  
  // Vérifier qu'on ne montre PAS la réponse correcte pour les questions passées
  expect(() => getByText('Réponse correcte:')).toThrow();
});


it('displays correct questions without showing correct answer section', () => {
  const detailedResults = [
    { 
      question: 'What is 3+3?', 
      userAnswer: '6', 
      correctAnswer: '6', 
      isCorrect: true, 
      isSkipped: false
    },
  ];
  const { getByText, getAllByTestId, queryByText } = render(
    <ResultsScreen 
      {...defaultProps} 
      showDetailedResults={true} 
      detailedResults={detailedResults} 
    />
  );
  
  // Vérifier l'icône pour réponse correcte (peut apparaître plusieurs fois)
  expect(getAllByTestId('icon-checkmark-circle').length).toBeGreaterThan(0);
  
  // Vérifier la réponse utilisateur
  expect(getByText('6')).toBeTruthy();
  
  // Vérifier qu'on ne montre PAS la section "Réponse correcte" pour les bonnes réponses
  expect(queryByText('Réponse correcte:')).toBeNull();
});

it('displays mixed types of detailed results (correct, incorrect, skipped)', () => {
  const detailedResults = [
    { 
      question: 'Question 1 - Correct', 
      userAnswer: 'A', 
      correctAnswer: 'A', 
      isCorrect: true, 
      isSkipped: false 
    },
    { 
      question: 'Question 2 - Incorrect', 
      userAnswer: 'B', 
      correctAnswer: 'C', 
      isCorrect: false, 
      isSkipped: false 
    },
    { 
      question: 'Question 3 - Skipped', 
      userAnswer: '', 
      correctAnswer: 'D', 
      isCorrect: false, 
      isSkipped: true 
    },
  ];
  
  const { getByText, getAllByTestId } = render(
    <ResultsScreen 
      {...defaultProps} 
      showDetailedResults={true} 
      detailedResults={detailedResults} 
    />
  );
  
  // Question 1 - Correcte
  expect(getAllByTestId('icon-checkmark-circle').length).toBeGreaterThan(0);
  expect(getByText('Question 1 - Correct')).toBeTruthy();
  
  // Question 2 - Incorrecte  
  expect(getAllByTestId('icon-close-circle').length).toBeGreaterThan(0);
  expect(getByText('Question 2 - Incorrect')).toBeTruthy();
  expect(getByText('B')).toBeTruthy(); // Réponse utilisateur
  expect(getByText('C')).toBeTruthy(); // Bonne réponse
  
  // Question 3 - Passée
  expect(getAllByTestId('icon-play-skip-forward').length).toBeGreaterThan(0);
  expect(getByText('Question 3 - Skipped')).toBeTruthy();
  expect(getByText('Passée')).toBeTruthy();
});

  it('does not display detailed results when array is empty', () => {
    const { queryByText } = render(
      <ResultsScreen 
        {...defaultProps} 
        showDetailedResults={true} 
        detailedResults={[]} // ← Tableau vide
      />
    );
    
    expect(queryByText('Détail des réponses')).toBeNull();
  });

  it('does not display detailed results when showDetailedResults is false even with data', () => {
    const detailedResults = [
      { 
        question: 'Hidden question', 
        userAnswer: 'A', 
        correctAnswer: 'B', 
        isCorrect: false, 
        isSkipped: false 
      },
    ];
    
    const { queryByText } = render(
      <ResultsScreen 
        {...defaultProps} 
        showDetailedResults={false} // ← Explicitement false
        detailedResults={detailedResults} 
      />
    );
    
    expect(queryByText('Détail des réponses')).toBeNull();
    expect(queryByText('Hidden question')).toBeNull();
  });
});

describe('Edge Cases - Props handling', () => {
  it('handles zero totalQuestions gracefully', () => {
    const { getByText } = render(
      <ResultsScreen 
        {...defaultProps} 
        totalQuestions={0} 
        correctAnswers={0} 
      />
    );
    
    // Devrait afficher 0% sans crasher
    expect(getByText('0%')).toBeTruthy();
    expect(getByText('0/0')).toBeTruthy();
  });

  it('handles missing onRetry and onContinue props gracefully', () => {
    const propsWithoutCallbacks = {
      ...defaultProps,
      onRetry: undefined,
      onContinue: undefined,
    };
    
    const { getByText } = render(<ResultsScreen {...propsWithoutCallbacks} />);
    
    // Les boutons doivent être présents mais ne pas crasher quand cliqués
    expect(() => {
      fireEvent.press(getByText('Réessayer'));
      fireEvent.press(getByText('Continuer'));
    }).not.toThrow();
  });

  it('handles empty feedback prop correctly', () => {
    const { queryByText } = render(
      <ResultsScreen 
        {...defaultProps} 
        feedback={null} // ← null au lieu de string vide
      />
    );
    
    expect(queryByText('Conseils pour progresser')).toBeNull();
  });
});

describe('Performance Data Edge Cases', () => {
  it('handles fractional percentages correctly', () => {
    // 1/3 = 33.33% → devrait arrondir à 33%
    const { getByText } = render(
      <ResultsScreen 
        {...defaultProps} 
        correctAnswers={1} 
        totalQuestions={3} 
      />
    );
    
    expect(getByText('33%')).toBeTruthy();
    expect(getByText('1/3')).toBeTruthy();
  });

  it('displays all performance tiers correctly', () => {
    // Test des différents seuils de performance (déjà fait mais pour être sûr)
    const testCases = [
      { score: 9, total: 10, expected: 'Excellent!' },    // 90%
      { score: 7, total: 10, expected: 'Bien joué!' },    // 70% 
      { score: 5, total: 10, expected: 'Pas mal!' },      // 50%
      { score: 2, total: 10, expected: 'Continuez vos efforts' }, // 20%
    ];

    testCases.forEach(({ score, total, expected }) => {
      const { getByText, unmount } = render(
        <ResultsScreen 
          {...defaultProps} 
          correctAnswers={score} 
          totalQuestions={total} 
        />
      );
      
      expect(getByText(expected)).toBeTruthy();
      unmount(); // Nettoyer entre les tests
    });
  });
});

});