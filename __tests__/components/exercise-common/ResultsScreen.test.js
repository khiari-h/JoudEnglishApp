

// __tests__/components/exercise-common/ResultsScreen.test.js
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
    skippedAnswers: 2, // Modifié pour être unique
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
    act(() => {
      jest.runAllTimers(); // Assure que toutes les animations sont terminées
    });
  });

  it('renders basic statistics correctly', () => {
    const { getByText } = render(<ResultsScreen {...defaultProps} />);
    act(() => { jest.runAllTimers(); });

    expect(getByText('80%')).toBeTruthy(); // 8/10
    expect(getByText('8/10')).toBeTruthy();
    expect(getByText('Correctes')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
    expect(getByText('Incorrectes')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('Passées')).toBeTruthy();
    expect(getByText('2')).toBeTruthy(); // Vérifie la nouvelle valeur
    expect(getByText('Temps')).toBeTruthy();
    expect(getByText('01:30')).toBeTruthy();
  });

  it('displays feedback when provided', () => {
    const { getByText } = render(<ResultsScreen {...defaultProps} feedback="Great job!" />);
    act(() => { jest.runAllTimers(); });
    expect(getByText('Conseils pour progresser')).toBeTruthy();
    expect(getByText('Great job!')).toBeTruthy();
  });

  it('does not display feedback when not provided', () => {
    const { queryByText } = render(<ResultsScreen {...defaultProps} feedback="" />);
    act(() => { jest.runAllTimers(); });
    expect(queryByText('Conseils pour progresser')).toBeNull();
  });

  it('displays detailed results when showDetailedResults is true and data is present', () => {
    const detailedResults = [
      { question: 'Q1', userAnswer: 'A', correctAnswer: 'B', isCorrect: false, isSkipped: false },
    ];
    const { getByText } = render(
      <ResultsScreen {...defaultProps} showDetailedResults={true} detailedResults={detailedResults} />
    );
    act(() => { jest.runAllTimers(); });
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
    act(() => { jest.runAllTimers(); });
    expect(queryByText('Détail des réponses')).toBeNull();
  });

  it('shows "Excellent!" for >= 80% score', () => {
    const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={8} totalQuestions={10} />);
    act(() => { jest.runAllTimers(); });
    expect(getByText('Excellent!')).toBeTruthy();
    expect(getByTestId('icon-trophy')).toBeTruthy();
  });

  it('shows "Bien joué!" for >= 60% score', () => {
    const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={6} totalQuestions={10} />);
    act(() => { jest.runAllTimers(); });
    expect(getByText('Bien joué!')).toBeTruthy();
    expect(getByTestId('icon-thumbs-up')).toBeTruthy();
  });

  it('shows "Pas mal!" for >= 40% score', () => {
    const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={4} totalQuestions={10} />);
    act(() => { jest.runAllTimers(); });
    expect(getByText('Pas mal!')).toBeTruthy();
    expect(getByTestId('icon-fitness')).toBeTruthy();
  });

  it('shows "Continuez vos efforts" for < 40% score', () => {
    const { getByText, getByTestId } = render(<ResultsScreen {...defaultProps} correctAnswers={3} totalQuestions={10} />);
    act(() => { jest.runAllTimers(); });
    expect(getByText('Continuez vos efforts')).toBeTruthy();
    expect(getByTestId('icon-school')).toBeTruthy();
  });

  it('calls onRetry when the retry button is pressed', () => {
    const { getByText } = render(<ResultsScreen {...defaultProps} />);
    act(() => { jest.runAllTimers(); });
    fireEvent.press(getByText('Réessayer'));
    expect(defaultProps.onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onContinue when the continue button is pressed', () => {
    const { getByText } = render(<ResultsScreen {...defaultProps} />);
    act(() => { jest.runAllTimers(); });
    fireEvent.press(getByText('Continuer'));
    expect(defaultProps.onContinue).toHaveBeenCalledTimes(1);
  });

  it('calls Share.share with correct data when share button is pressed', async () => {
    const { getByText } = render(<ResultsScreen {...defaultProps} />);
    act(() => { jest.runAllTimers(); });
    fireEvent.press(getByText('Partager'));

    expect(Share.share).toHaveBeenCalledWith({
      message: 'J\'ai obtenu 8/10 (80%) dans mon exercice de Vocabulary niveau B1 sur l\'application JOUD English!',
      title: 'Mes résultats d\'apprentissage',
    });
  });
});
