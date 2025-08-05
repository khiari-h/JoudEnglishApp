import React from 'react';
import { render, screen } from '@testing-library/react-native';
import VocabularyRevision from '../../../src/screens/VocabularyRevision';
import { ThemeContext } from '../../../src/contexts/ThemeContext';

// Mock custom hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));
jest.mock('../../../src/hooks/useRevisionManager', () => ({
  __esModule: true,
  default: () => ({
    markRevisionCompleted: jest.fn(),
  }),
}));
jest.mock('../../../src/hooks/useRevisionData', () => ({
  __esModule: true,
  default: () => ({
    revisionQuestions: [],
    isLoading: false,
    error: null,
    stats: { totalLearned: 0 },
    hasEnoughWords: false,
    canGenerateQuestions: false,
  }),
}));
jest.mock('../../../src/hooks/useQuizEngine', () => ({
  __esModule: true,
  default: () => ({
    isFinished: false,
    score: 0,
    totalQuestions: 0,
    goToNextQuestion: jest.fn(),
    handleAnswer: jest.fn(),
    handleRestart: jest.fn(),
    showResult: false,
  }),
}));

// Mock sub-components to render identifiable text
jest.mock('../../../src/screens/VocabularyRevision/components/EmptyState', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ type, message }) => <Text>EmptyState Mock: {type} {message}</Text>,
  };
});
jest.mock('../../../src/screens/VocabularyRevision/components/QuizScreen', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: () => <Text>QuizScreen Mock</Text>,
  };
});
jest.mock('../../../src/screens/VocabularyRevision/components/ResultScreen', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: () => <Text>ResultScreen Mock</Text>,
  };
});

describe('VocabularyRevision', () => {
  const mockTheme = {
    colors: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      primary: "#3B82F6"
    },
  };

  it('should render EmptyState when not enough words', () => {
    render(
      <ThemeContext.Provider value={mockTheme}>
        <VocabularyRevision route={{ params: {} }} />
      </ThemeContext.Provider>
    );
    expect(screen.getByText(/EmptyState Mock: locked/)).toBeTruthy();
  });
});
