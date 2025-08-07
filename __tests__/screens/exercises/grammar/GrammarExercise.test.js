import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import GrammarExercise from '../../../../src/screens/exercises/grammar';

// Mock des dépendances
jest.mock('../../../../src/screens/exercises/grammar/hooks/useGrammar', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock ciblé de GrammarNavigation pour espionner les props
const mockGrammarNavigation = jest.fn();
jest.mock('../../../../src/screens/exercises/grammar/GrammarNavigation', () => (props) => {
  // On stocke les props pour pouvoir les inspecter dans le test
  mockGrammarNavigation(props);
  // On rend un composant simple avec le testID pour le retrouver
  const { View } = require('react-native');
  return <View testID="mock-grammar-navigation" />;
});


const mockUseGrammar = require('../../../../src/screens/exercises/grammar/hooks/useGrammar').default;

describe('GrammarExercise', () => {
  const mockRoute = {
    params: {
      level: 'A1',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockUseGrammar.mockReturnValue({
      loaded: false,
      grammarData: [],
    });

    render(<GrammarExercise route={mockRoute} />);
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render the main components when loaded', async () => {
    mockUseGrammar.mockReturnValue({
      loaded: true,
      grammarData: [{ title: 'Le verbe \'être\' (to be)', exercises: [{ type: 'fillInTheBlank', question: 'I ___ a student.' }] }],
      ruleIndex: 0,
      exerciseIndex: 0,
      currentRule: { title: 'Le verbe \'être\' (to be)', content: 'Content 1' },
      currentExercise: { type: 'fillInTheBlank', question: 'I ___ a student.', options: ['am', 'is', 'are'], answer: 'am' },
      completedExercises: {},
      showDetailedProgress: false,
      canCheckAnswer: true,
      isFirstExercise: true,
      isLastExercise: false,
      showFeedback: false,
      attempts: 0,
    });

    render(<GrammarExercise route={mockRoute} />);

    expect(screen.getAllByText('Le verbe \'être\' (to be)').length).toBeGreaterThan(0);
    const question = await screen.findByText('I ___ a student.');
    expect(question).toBeTruthy();
  });

  it('should call changeRule when a rule is selected', () => {
    const changeRule = jest.fn();
    mockUseGrammar.mockReturnValue({
      loaded: true,
      grammarData: [{ title: 'Le verbe \'être\' (to be)' }, { title: 'Le présent simple' }],
      ruleIndex: 0,
      completedExercises: {},
      changeRule,
      currentExercise: { type: 'fillInTheBlank', question: 'Question', options: ['a','b']}
    });

    render(<GrammarExercise route={mockRoute} />);
    fireEvent.press(screen.getByText('Le présent simple'));
    expect(changeRule).toHaveBeenCalledWith(1);
  });

  it('should call submitAnswer when check answer is triggered', () => {
    const submitAnswer = jest.fn();
    mockUseGrammar.mockReturnValue({
      loaded: true,
      grammarData: [{ title: 'Le verbe \'être\' (to be)' }],
      currentExercise: { type: 'fillInTheBlank', question: 'I ___ a student.', options: ['am', 'is', 'are'], answer: 'am' },
      canCheckAnswer: true,
      completedExercises: {},
      submitAnswer,
      showFeedback: false,
      // ...tous les autres états nécessaires pour le rendu
      ruleIndex: 0,
      exerciseIndex: 0,
      currentRule: { title: 'Le verbe \'être\' (to be)', content: 'Content 1' },
    });

    render(<GrammarExercise route={mockRoute} />);
    
    // On récupère la dernière version des props passées à notre mock
    const lastCallProps = mockGrammarNavigation.mock.calls[mockGrammarNavigation.mock.calls.length - 1][0];
    
    // On appelle la fonction directement
    lastCallProps.onCheckAnswer();

    expect(submitAnswer).toHaveBeenCalled();
  });
});
