import React from 'react';
import { render } from '@testing-library/react-native';
import ReadingExercise from '../../src/screens/exercises/reading';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/utils/reading/readingDataHelper', () => ({
  getLevelColor: jest.fn(() => '#007AFF'),
  getReadingData: jest.fn(() => ({
    exercises: [{ id: 't1', title: 'The Weather', questions: [ { text: 'Q1', options: ['a','b'], correctAnswer: 0 } ] }]
  })),
  loadReadingData: jest.fn(async () => ({
    exercises: [{ id: 't1', title: 'The Weather', questions: [ { text: 'Q1', options: ['a','b'], correctAnswer: 0 } ] }]
  })),
}));

jest.mock('../../src/screens/exercises/reading/hooks/useReading', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    selectedExerciseIndex: 0,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    textExpanded: false,
    attempts: 0,
    completedQuestions: {},
    loaded: true,
    showDetailedProgress: false,
    currentExercise: { title: 'The Weather', questions: [{ text: 'Q1', options: ['a','b'], correctAnswer: 0 }] },
    currentQuestion: { text: 'Q1', options: ['a','b'], correctAnswer: 0 },
    totalQuestions: 1,
    isCorrect: false,
    changeExercise: jest.fn(),
    changeQuestion: jest.fn(),
    selectAnswer: jest.fn(),
    submitAnswer: jest.fn(),
    nextQuestion: jest.fn(),
    previousQuestion: jest.fn(),
    retryQuestion: jest.fn(),
    toggleTextExpansion: jest.fn(),
    toggleDetailedProgress: jest.fn(),
    scrollViewRef: { current: null },
    textsScrollViewRef: { current: null },
    fadeAnim: {},
    slideAnim: {},
  })),
}));

describe('ReadingExercise accessibility', () => {
  it('should render navigation buttons with role button', () => {
    const params = { level: '1' };
    const { getAllByRole } = render(<ReadingExercise route={{ params }} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});


