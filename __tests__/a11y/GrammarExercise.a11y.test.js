import React from 'react';
import { render } from '@testing-library/react-native';
import GrammarExercise from '../../src/screens/exercises/grammar';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/utils/grammar/grammarDataHelper', () => ({
  getLevelColor: jest.fn(() => '#007AFF'),
  getGrammarData: jest.fn(() => ([{ title: 'Rule', exercises: [{ type: 'fillInTheBlank', question: 'Q?', options: ['a','b'], answer: 'a' }] }])),
  loadGrammarData: jest.fn(async () => ([{ title: 'Rule', exercises: [{ type: 'fillInTheBlank', question: 'Q?', options: ['a','b'], answer: 'a' }] }])),
}));

jest.mock('../../src/screens/exercises/grammar/hooks/useGrammar', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ruleIndex: 0,
    exerciseIndex: 0,
    selectedOption: null,
    setSelectedOption: jest.fn(),
    inputText: '',
    setInputText: jest.fn(),
    showFeedback: false,
    isCorrect: false,
    attempts: 0,
    completedExercises: {},
    loaded: true,
    showDetailedProgress: false,
    currentRule: { title: 'Rule' },
    currentExercise: { type: 'fillInTheBlank', question: 'Q?', options: ['a','b'], answer: 'a' },
    canCheckAnswer: true,
    isFirstExercise: true,
    isLastExercise: false,
    changeRule: jest.fn(),
    submitAnswer: jest.fn(),
    nextExercise: jest.fn(),
    previousExercise: jest.fn(),
    retryExercise: jest.fn(),
    toggleDetailedProgress: jest.fn(),
  })),
}));

describe('GrammarExercise accessibility', () => {
  it('should render navigation check/next buttons with role button', () => {
    const params = { level: 'A1' };
    const { getAllByRole } = render(<GrammarExercise route={{ params }} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});


