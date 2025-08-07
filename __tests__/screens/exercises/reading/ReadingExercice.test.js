// __tests__/screens/exercises/reading/ReadingExercise.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import ReadingExercise from '../../../../src/screens/exercises/reading';

// Mock dependencies
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock React Native components
jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    View: ReactNative.View,
    ActivityIndicator: (props) => (
      <ReactNative.ActivityIndicator 
        {...props} 
        testID={props.testID || 'activity-indicator'} 
      />
    ),
  };
});

// Mock Child Components
jest.mock('../../../../src/screens/exercises/reading/ReadingHeader', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingHeader" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/ReadingTextSelector', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingTextSelector" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/ReadingProgress', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingProgress" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/ReadingText', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingText" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/ReadingQuestionCard', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingQuestionCard" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/QuestionIndicators', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="QuestionIndicators" {...props} />;
});
jest.mock('../../../../src/screens/exercises/reading/ReadingNavigation', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ReadingNavigation" {...props} />;
});
jest.mock('../../../../src/components/exercise-common/ExerciseFeedback', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="ExerciseFeedback" {...props} />;
});
jest.mock('../../../../src/components/exercise-common/InstructionBox', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="InstructionBox" {...props} />;
});

jest.mock('../../../../src/components/layout/Container', () => {
  const { View } = jest.requireActual('react-native');
  return {
    CONTAINER_SAFE_EDGES: {
      ALL: 'mocked-all-edges',
      TOP: 'mocked-top-edge',
      BOTTOM: 'mocked-bottom-edge',
    },
    __esModule: true,
    default: ({ children, ...props }) => <View {...props}>{children}</View>,
  };
});

// Mock Hooks and Utils
jest.mock('../../../../src/screens/exercises/reading/hooks/useReading');
jest.mock('../../../../src/hooks/useLastActivity');
jest.mock('../../../../src/utils/reading/readingDataHelper', () => ({
  getReadingData: jest.fn(() => ({
    exercises: [
      {
        id: 'ex1',
        title: 'The Weather',
        text: 'Today is sunny.',
        questions: [
          { id: 'q1', question: 'What is the weather?', options: ['Sunny', 'Rainy'], correctAnswer: 0 }
        ]
      },
      {
        id: 'ex2',
        title: 'My Family',
        text: 'I have a sister.',
        questions: [
          { id: 'q2', question: 'Who do I have?', options: ['Brother', 'Sister'], correctAnswer: 1 }
        ]
      }
    ]
  })),
  getLevelColor: jest.fn(() => '#007AFF'),
}));

// Import mocks after jest.mock calls
import useReading from '../../../../src/screens/exercises/reading/hooks/useReading';
import useLastActivity from '../../../../src/hooks/useLastActivity';
import { getReadingData } from '../../../../src/utils/reading/readingDataHelper';

describe('ReadingExercise - Comprehensive Tests', () => {
  const mockSaveActivity = jest.fn();
  const mockChangeExercise = jest.fn();
  const mockChangeQuestion = jest.fn();
  const mockSelectAnswer = jest.fn();
  const mockSubmitAnswer = jest.fn();
  const mockNextQuestion = jest.fn();
  const mockPreviousQuestion = jest.fn();
  const mockRetryQuestion = jest.fn();
  const mockToggleTextExpansion = jest.fn();
  const mockToggleDetailedProgress = jest.fn();

  const mockReadingData = {
    exercises: [
      {
        id: 'ex1',
        title: 'The Weather',
        text: 'Today is sunny.',
        questions: [
          { 
            id: 'q1', 
            question: 'What is the weather?', 
            options: ['Sunny', 'Rainy'], 
            correctAnswer: 0,
            explanation: 'The text says "Today is sunny"'
          }
        ]
      },
      {
        id: 'ex2',
        title: 'My Family',
        text: 'I have a sister.',
        questions: [
          { 
            id: 'q2', 
            question: 'Who do I have?', 
            options: ['Brother', 'Sister'], 
            correctAnswer: 1,
            explanation: 'The text mentions "I have a sister"'
          }
        ]
      }
    ]
  };

  const setupMocks = (overrides = {}) => {
    const defaultUseReading = {
      selectedExerciseIndex: 0,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      textExpanded: false,
      attempts: 1,
      completedQuestions: { 0: [], 1: [] },
      loaded: true,
      showDetailedProgress: false,
      currentExercise: mockReadingData.exercises[0],
      currentQuestion: mockReadingData.exercises[0].questions[0],
      totalQuestions: 1,
      isCorrect: false,
      changeExercise: mockChangeExercise,
      changeQuestion: mockChangeQuestion,
      selectAnswer: mockSelectAnswer,
      submitAnswer: mockSubmitAnswer,
      nextQuestion: mockNextQuestion,
      previousQuestion: mockPreviousQuestion,
      retryQuestion: mockRetryQuestion,
      toggleTextExpansion: mockToggleTextExpansion,
      toggleDetailedProgress: mockToggleDetailedProgress,
      scrollViewRef: { current: null },
      textsScrollViewRef: { current: null },
      fadeAnim: { current: null },
      slideAnim: { current: null },
      ...overrides,
    };

    useReading.mockReturnValue(defaultUseReading);
    useLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });
    getReadingData.mockReturnValue(mockReadingData);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe('Core Functionality and Rendering', () => {
    it('should render the main reading exercise view correctly', () => {
      render(<ReadingExercise route={{ params: { level: 'A2' } }} />);

      // Check that main components are rendered
      expect(screen.getByTestId('ReadingHeader')).toBeTruthy();
      expect(screen.getByTestId('ReadingProgress')).toBeTruthy();
      expect(screen.getByTestId('ReadingTextSelector')).toBeTruthy();
      expect(screen.getByTestId('InstructionBox')).toBeTruthy();
      expect(screen.getByTestId('ReadingText')).toBeTruthy();
      expect(screen.getByTestId('ReadingQuestionCard')).toBeTruthy();
      expect(screen.getByTestId('QuestionIndicators')).toBeTruthy();
      expect(screen.getByTestId('ReadingNavigation')).toBeTruthy();
    });

    it('should call hooks with correct parameters', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      
      expect(useReading).toHaveBeenCalledWith(mockReadingData.exercises, 'B1');
      expect(useLastActivity).toHaveBeenCalled();
      expect(getReadingData).toHaveBeenCalledWith('B1');
    });

    it('should save activity on initial render', async () => {
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
    
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Lecture',
          level: 'A1',
          type: 'reading',
          metadata: {
            word: 0,
            totalWords: 2,
            exercise: 0,
            question: 0,
            totalQuestions: 1,
            exerciseTitle: 'The Weather',
            totalExercises: 2
          },
        });
      });
    });
  });

  describe('States and Edge Cases', () => {
    it('should render loading state when not loaded', () => {
      setupMocks({ loaded: false });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('ReadingQuestionCard')).toBeNull();
    });

    it('should render loading state when no exercises available', () => {
      getReadingData.mockReturnValue({ exercises: [] });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('ReadingQuestionCard')).toBeNull();
    });

    it('should handle missing route params by using default level', () => {
      render(<ReadingExercise route={{}} />);
      expect(getReadingData).toHaveBeenCalledWith('A1');
    });

    it('should render feedback when showFeedback is true and isCorrect is true', () => {
      setupMocks({ 
        showFeedback: true, 
        isCorrect: true,
        selectedAnswer: 0
      });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('ExerciseFeedback')).toBeTruthy();
    });

    it('should not render question card when currentQuestion is null', () => {
      setupMocks({ currentQuestion: null });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.queryByTestId('ReadingQuestionCard')).toBeNull();
      expect(screen.queryByTestId('ExerciseFeedback')).toBeNull();
    });
  });

  describe('Navigation and User Actions', () => {
    it('should navigate back to exercise selection on back press', () => {
      render(<ReadingExercise route={{ params: { level: 'A2' } }} />);
      const header = screen.getByTestId('ReadingHeader');
      
      const backButtonPress = header.props.onBackPress;
      backButtonPress();

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/exerciseSelection',
        params: { level: 'A2' },
      });
    });

    it('should call changeExercise when exercise is selected', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const textSelector = screen.getByTestId('ReadingTextSelector');
      
      const onSelectExercise = textSelector.props.onSelectExercise;
      onSelectExercise(1);

      expect(mockChangeExercise).toHaveBeenCalledWith(1);
    });

    it('should call toggleDetailedProgress when progress is toggled', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const progress = screen.getByTestId('ReadingProgress');
      
      const onToggleExpand = progress.props.onToggleExpand;
      onToggleExpand();

      expect(mockToggleDetailedProgress).toHaveBeenCalled();
    });

    it('should call changeExercise when exercise is pressed in progress', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const progress = screen.getByTestId('ReadingProgress');
      
      const onExercisePress = progress.props.onExercisePress;
      onExercisePress(1);

      expect(mockChangeExercise).toHaveBeenCalledWith(1);
    });

    it('should call toggleTextExpansion when text expand is toggled', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const readingText = screen.getByTestId('ReadingText');
      
      const onToggleExpand = readingText.props.onToggleExpand;
      onToggleExpand();

      expect(mockToggleTextExpansion).toHaveBeenCalled();
    });

    it('should call selectAnswer when answer is selected', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const questionCard = screen.getByTestId('ReadingQuestionCard');
      
      const onSelectAnswer = questionCard.props.onSelectAnswer;
      onSelectAnswer(1);

      expect(mockSelectAnswer).toHaveBeenCalledWith(1);
    });

    it('should call changeQuestion when question indicator is pressed', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const indicators = screen.getByTestId('QuestionIndicators');
      
      const onSelectQuestion = indicators.props.onSelectQuestion;
      onSelectQuestion(0);

      expect(mockChangeQuestion).toHaveBeenCalledWith(0);
    });
  });

  describe('Navigation Buttons', () => {
    it('should call submitAnswer when next is pressed and no feedback shown', () => {
      setupMocks({ showFeedback: false, selectedAnswer: 0 });
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('ReadingNavigation');
      
      const onNext = navigation.props.onNext;
      onNext();

      expect(mockSubmitAnswer).toHaveBeenCalled();
    });

    it('should call nextQuestion when next is pressed and feedback is shown', () => {
      setupMocks({ showFeedback: true, isCorrect: true });
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('ReadingNavigation');
      
      const onNext = navigation.props.onNext;
      onNext();

      expect(mockNextQuestion).toHaveBeenCalled();
    });

    it('should call previousQuestion when previous is pressed', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('ReadingNavigation');
      
      const onPrevious = navigation.props.onPrevious;
      onPrevious();

      expect(mockPreviousQuestion).toHaveBeenCalled();
    });

    it('should call retryQuestion when retry is pressed', () => {
      setupMocks({ showFeedback: true, isCorrect: false, attempts: 2 });
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('ReadingNavigation');
      
      const onRetry = navigation.props.onRetry;
      onRetry();

      expect(mockRetryQuestion).toHaveBeenCalled();
    });
  });

  describe('Activity Saving', () => {
    it('should save activity when exercise changes', async () => {
      const { rerender } = render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      // Change exercise
      setupMocks({ 
        selectedExerciseIndex: 1,
        currentExercise: mockReadingData.exercises[1],
        currentQuestion: mockReadingData.exercises[1].questions[0]
      });
      rerender(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Lecture',
          level: 'A1',
          type: 'reading',
          metadata: {
            word: 1,
            totalWords: 2,
            exercise: 1,
            question: 0,
            totalQuestions: 1,
            exerciseTitle: 'My Family',
            totalExercises: 2
          },
        });
      });
    });

    it('should save activity when question changes', async () => {
      const { rerender } = render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      // Mock exercise with multiple questions
      const exerciseWithMultipleQuestions = {
        ...mockReadingData.exercises[0],
        questions: [
          mockReadingData.exercises[0].questions[0],
          { id: 'q1b', question: 'Second question?', options: ['A', 'B'], correctAnswer: 0 }
        ]
      };
      
      setupMocks({ 
        currentQuestionIndex: 1,
        currentExercise: exerciseWithMultipleQuestions,
        currentQuestion: exerciseWithMultipleQuestions.questions[1],
        totalQuestions: 2
      });
      rerender(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Lecture',
          level: 'A1',
          type: 'reading',
          metadata: {
            word: 0,
            totalWords: 2,
            exercise: 0,
            question: 1,
            totalQuestions: 2,
            exerciseTitle: 'The Weather',
            totalExercises: 2
          },
        });
      });
    });

    it('should not save activity when not loaded', () => {
      setupMocks({ loaded: false });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });

    it('should not save activity when no exercises', () => {
      getReadingData.mockReturnValue({ exercises: [] });
      render(<ReadingExercise route={{ params: { level: 'A1' } }} />);
      
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });
  });

  describe('Component Props Validation', () => {
    it('should pass correct props to ReadingHeader', () => {
      render(<ReadingExercise route={{ params: { level: 'C1' } }} />);
      const header = screen.getByTestId('ReadingHeader');
      
      expect(header.props.level).toBe('C1');
      expect(typeof header.props.onBackPress).toBe('function');
    });

    it('should pass correct props to ReadingProgress', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const progress = screen.getByTestId('ReadingProgress');
      
      expect(progress.props.readingData).toEqual(mockReadingData);
      expect(progress.props.completedQuestions).toEqual({ 0: [], 1: [] });
      expect(progress.props.levelColor).toBe('#007AFF');
      expect(progress.props.expanded).toBe(false);
    });

    it('should pass correct props to ReadingText', () => {
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const readingText = screen.getByTestId('ReadingText');
      
      expect(readingText.props.exercise).toEqual(mockReadingData.exercises[0]);
      expect(readingText.props.textExpanded).toBe(false);
      expect(readingText.props.levelColor).toBe('#007AFF');
    });

    it('should pass correct props to ReadingQuestionCard', () => {
      const currentQuestion = mockReadingData.exercises[0].questions[0];
      setupMocks({ 
        currentQuestion,
        selectedAnswer: 1,
        showFeedback: true
      });
      
      render(<ReadingExercise route={{ params: { level: 'B1' } }} />);
      const questionCard = screen.getByTestId('ReadingQuestionCard');
      
      expect(questionCard.props.question).toEqual(currentQuestion);
      expect(questionCard.props.questionIndex).toBe(0);
      expect(questionCard.props.selectedAnswer).toBe(1);
      expect(questionCard.props.showFeedback).toBe(true);
      expect(questionCard.props.levelColor).toBe('#007AFF');
    });
  });
});