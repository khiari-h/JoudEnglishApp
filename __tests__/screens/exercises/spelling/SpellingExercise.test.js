// __tests__/screens/exercises/spelling/SpellingExercise.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import SpellingExercise from '../../../../src/screens/exercises/spelling';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock React Native components
jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    View: ReactNative.View,
    Text: ReactNative.Text,
    ActivityIndicator: (props) => (
      <ReactNative.ActivityIndicator 
        {...props} 
        testID={props.testID || 'activity-indicator'} 
      />
    ),
  };
});

// Mock Child Components
jest.mock('../../../../src/screens/exercises/spelling/SpellingHeader', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="SpellingHeader" {...props} />;
});
jest.mock('../../../../src/screens/exercises/spelling/SpellingProgress', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="SpellingProgress" {...props} />;
});
jest.mock('../../../../src/screens/exercises/spelling/SpellingCard', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="SpellingCard" {...props} />;
});
jest.mock('../../../../src/screens/exercises/spelling/SpellingActions', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="SpellingActions" {...props} />;
});

jest.mock('../../../../src/components/layout/Container', () => {
  const { View } = jest.requireActual('react-native');
  return ({ children, ...props }) => <View {...props}>{children}</View>;
});

// Mock Hooks and Utils
jest.mock('../../../../src/screens/exercises/spelling/hooks/useSpelling');
jest.mock('../../../../src/hooks/useLastActivity');
jest.mock('../../../../src/utils/spelling/spellingDataHelper', () => ({
  getSpellingData: jest.fn(() => ({
    exercises: [
      {
        id: 'ex1',
        wordToCorrect: 'crocodille',
        correctWord: 'crocodile',
        hint: 'Animal reptile',
        explanation: 'Un seul "l" dans crocodile'
      },
      {
        id: 'ex2',
        wordToCorrect: 'elefant',
        correctWord: 'éléphant',
        hint: 'Gros mammifère',
        explanation: 'Il faut des accents sur les "é"'
      }
    ]
  })),
  getLevelColor: jest.fn(() => '#007AFF'),
}));

// Import mocks after jest.mock calls
import useSpelling from '../../../../src/screens/exercises/spelling/hooks/useSpelling';
import useLastActivity from '../../../../src/hooks/useLastActivity';
import { getSpellingData } from '../../../../src/utils/spelling/spellingDataHelper';

describe('SpellingExercise - Comprehensive Tests', () => {
  const mockSaveActivity = jest.fn();
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  const mockSetUserInput = jest.fn();
  const mockToggleHint = jest.fn();
  const mockCheckAnswer = jest.fn();
  const mockHandleNext = jest.fn();
  const mockRetryExercise = jest.fn();

  const mockSpellingData = {
    exercises: [
      {
        id: 'ex1',
        wordToCorrect: 'crocodille',
        correctWord: 'crocodile',
        hint: 'Animal reptile',
        explanation: 'Un seul "l" dans crocodile'
      },
      {
        id: 'ex2',
        wordToCorrect: 'elefant',
        correctWord: 'éléphant',
        hint: 'Gros mammifère',
        explanation: 'Il faut des accents sur les "é"'
      }
    ]
  };

  const setupMocks = (overrides = {}) => {
    const defaultUseSpelling = {
      currentExerciseIndex: 0,
      userInput: '',
      showHint: false,
      showFeedback: false,
      isCorrect: false,
      loaded: true,
      currentExercise: mockSpellingData.exercises[0],
      totalExercises: 2,
      setUserInput: mockSetUserInput,
      toggleHint: mockToggleHint,
      checkAnswer: mockCheckAnswer,
      handleNext: mockHandleNext,
      retryExercise: mockRetryExercise,
      isLastExercise: false,
      hasValidData: true,
      ...overrides,
    };

    useSpelling.mockReturnValue(defaultUseSpelling);
    useLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });
    useNavigation.mockReturnValue({ 
      navigate: mockNavigate,
      goBack: mockGoBack 
    });
    getSpellingData.mockReturnValue(mockSpellingData);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe('Core Functionality and Rendering', () => {
    it('should render the main spelling exercise view correctly', () => {
      render(<SpellingExercise route={{ params: { level: '2', exerciseType: 'correction' } }} />);

      // Check that main components are rendered
      expect(screen.getByTestId('SpellingHeader')).toBeTruthy();
      expect(screen.getByTestId('SpellingProgress')).toBeTruthy();
      expect(screen.getByTestId('SpellingCard')).toBeTruthy();
      expect(screen.getByTestId('SpellingActions')).toBeTruthy();
    });

    it('should call hooks with correct parameters', () => {
      render(<SpellingExercise route={{ params: { level: '3', exerciseType: 'rules' } }} />);
      
      expect(useSpelling).toHaveBeenCalledWith(mockSpellingData, '3', 'rules');
      expect(useLastActivity).toHaveBeenCalled();
      expect(getSpellingData).toHaveBeenCalledWith('3', 'rules');
    });

    it('should save activity on initial render', async () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
    
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Orthographe Correction',
          level: '1',
          type: 'spelling',
          metadata: {
            word: 0,
            totalWords: 2,
            exerciseType: 'correction',
            content: 'crocodille'
          },
        });
      });
    });

    it('should handle different exercise types correctly', () => {
      // Test correction type
      const { rerender } = render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      expect(screen.getByTestId('SpellingHeader')).toBeTruthy();

      // Test rules type
      rerender(<SpellingExercise route={{ params: { level: '1', exerciseType: 'rules' } }} />);
      expect(useSpelling).toHaveBeenCalledWith(mockSpellingData, '1', 'rules');

      // Test homophones type
      rerender(<SpellingExercise route={{ params: { level: '1', exerciseType: 'homophones' } }} />);
      expect(useSpelling).toHaveBeenCalledWith(mockSpellingData, '1', 'homophones');
    });
  });

  describe('States and Edge Cases', () => {
    it('should render loading state when not loaded', () => {
      setupMocks({ loaded: false });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.getByText('Chargement des exercices...')).toBeTruthy();
      expect(screen.queryByTestId('SpellingCard')).toBeNull();
    });

    it('should render error state when no valid data', () => {
      setupMocks({ loaded: true, hasValidData: false });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      expect(screen.getByText('Aucune donnée trouvée pour ce niveau.')).toBeTruthy();
      expect(screen.getByText('Veuillez réessayer plus tard.')).toBeTruthy();
      expect(screen.queryByTestId('SpellingCard')).toBeNull();
    });

    it('should handle missing route params by using defaults', () => {
      render(<SpellingExercise route={{}} />);
      expect(getSpellingData).toHaveBeenCalledWith('1', 'correction');
    });

    it('should handle getSpellingData throwing error', () => {
      getSpellingData.mockImplementation(() => {
        throw new Error('Data loading failed');
      });
      
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      // Should not crash and should handle gracefully
      expect(screen.getByTestId('SpellingHeader')).toBeTruthy();
    });

    it('should render correctly when it is the last exercise', () => {
      setupMocks({ 
        currentExerciseIndex: 1, 
        isLastExercise: true,
        currentExercise: mockSpellingData.exercises[1]
      });
      
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      const spellingCard = screen.getByTestId('SpellingCard');
      expect(spellingCard.props.isLastExercise).toBe(true);
    });
  });

  describe('Navigation and User Actions', () => {
    it('should navigate back when back button is pressed', () => {
      render(<SpellingExercise route={{ params: { level: '2', exerciseType: 'correction' } }} />);
      const header = screen.getByTestId('SpellingHeader');
      
      const onBack = header.props.onBack;
      onBack();

      expect(mockGoBack).toHaveBeenCalled();
    });

    it('should call setUserInput when user input changes', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      const onUserInputChange = spellingCard.props.onUserInputChange;
      onUserInputChange('crocodile');

      expect(mockSetUserInput).toHaveBeenCalledWith('crocodile');
    });

    it('should call toggleHint when hint button is pressed', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      const onHintToggle = spellingCard.props.onHintToggle;
      onHintToggle();

      expect(mockToggleHint).toHaveBeenCalled();
    });

    it('should call checkAnswer when check answer button is pressed', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      const onCheckAnswer = spellingCard.props.onCheckAnswer;
      onCheckAnswer();

      expect(mockCheckAnswer).toHaveBeenCalled();
    });

    it('should call handleNext when next button is pressed', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      const onNext = spellingCard.props.onNext;
      onNext();

      expect(mockHandleNext).toHaveBeenCalled();
    });

    it('should call handleNext from SpellingActions when next button is pressed', () => {
      setupMocks({ isCorrect: true, showFeedback: true });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingActions = screen.getByTestId('SpellingActions');
      
      const onNext = spellingActions.props.onNext;
      onNext();

      expect(mockHandleNext).toHaveBeenCalled();
    });

    it('should call retryExercise when retry button is pressed', () => {
      setupMocks({ isCorrect: false, showFeedback: true });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      const onRetry = spellingCard.props.onRetry;
      onRetry();

      expect(mockRetryExercise).toHaveBeenCalled();
    });
  });

  describe('Activity Saving', () => {
    it('should save activity when exercise changes', async () => {
      const { rerender } = render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      // Change exercise
      setupMocks({ 
        currentExerciseIndex: 1,
        currentExercise: mockSpellingData.exercises[1]
      });
      rerender(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Orthographe Correction',
          level: '1',
          type: 'spelling',
          metadata: {
            word: 1,
            totalWords: 2,
            exerciseType: 'correction',
            content: 'elefant'
          },
        });
      });
    });

    it('should save activity with correct title for different exercise types', async () => {
      // Test rules type
      const { rerender } = render(<SpellingExercise route={{ params: { level: '2', exerciseType: 'rules' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Orthographe Règles',
          level: '2',
          type: 'spelling',
          metadata: {
            word: 0,
            totalWords: 2,
            exerciseType: 'rules',
            content: 'crocodille'
          },
        });
      });

      // Test homophones type
      rerender(<SpellingExercise route={{ params: { level: '3', exerciseType: 'homophones' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Orthographe Homophones',
          level: '3',
          type: 'spelling',
          metadata: {
            word: 0,
            totalWords: 2,
            exerciseType: 'homophones',
            content: 'crocodille'
          },
        });
      });
    });

    it('should not save activity when not loaded', () => {
      setupMocks({ loaded: false });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });

    it('should not save activity when no valid data', () => {
      setupMocks({ loaded: true, hasValidData: false });
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });

    it('should handle saveActivity error gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockSaveActivity.mockImplementation(() => {
        throw new Error('Save failed');
      });
      
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error saving activity:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Component Props Validation', () => {
    it('should pass correct props to SpellingHeader', () => {
      render(<SpellingExercise route={{ params: { level: '3', exerciseType: 'rules' } }} />);
      const header = screen.getByTestId('SpellingHeader');
      
      expect(header.props.title).toBe('Orthographe Règles');
      expect(header.props.level).toBe('3');
      expect(header.props.levelColor).toBe('#007AFF');
      expect(typeof header.props.onBack).toBe('function');
    });

    it('should pass correct props to SpellingProgress', () => {
      setupMocks({ currentExerciseIndex: 1, totalExercises: 3 });
      render(<SpellingExercise route={{ params: { level: '2', exerciseType: 'correction' } }} />);
      const progress = screen.getByTestId('SpellingProgress');
      
      expect(progress.props.currentExerciseIndex).toBe(2); // currentExerciseIndex + 1
      expect(progress.props.totalExercises).toBe(3);
      expect(progress.props.levelColor).toBe('#007AFF');
    });

    it('should pass correct props to SpellingCard', () => {
      setupMocks({ 
        userInput: 'crocodile',
        showHint: true,
        showFeedback: true,
        isCorrect: true,
        isLastExercise: false
      });
      
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingCard = screen.getByTestId('SpellingCard');
      
      expect(spellingCard.props.currentExercise).toEqual(mockSpellingData.exercises[0]);
      expect(spellingCard.props.userInput).toBe('crocodile');
      expect(spellingCard.props.showHint).toBe(true);
      expect(spellingCard.props.showFeedback).toBe(true);
      expect(spellingCard.props.isCorrect).toBe(true);
      expect(spellingCard.props.isLastExercise).toBe(false);
      expect(spellingCard.props.levelColor).toBe('#007AFF');
    });

    it('should pass correct props to SpellingActions', () => {
      setupMocks({ 
        isCorrect: false,
        isLastExercise: true
      });
      
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const spellingActions = screen.getByTestId('SpellingActions');
      
      expect(spellingActions.props.isCorrect).toBe(false);
      expect(spellingActions.props.isLastExercise).toBe(true);
      expect(spellingActions.props.levelColor).toBe('#007AFF');
      expect(typeof spellingActions.props.onNext).toBe('function');
      expect(typeof spellingActions.props.onRetry).toBe('function');
    });
  });

  describe('Exercise Type Names', () => {
    it('should display correct title for correction exercises', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'correction' } }} />);
      const header = screen.getByTestId('SpellingHeader');
      expect(header.props.title).toBe('Orthographe Correction');
    });

    it('should display correct title for rules exercises', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'rules' } }} />);
      const header = screen.getByTestId('SpellingHeader');
      expect(header.props.title).toBe('Orthographe Règles');
    });

    it('should display correct title for homophones exercises', () => {
      render(<SpellingExercise route={{ params: { level: '1', exerciseType: 'homophones' } }} />);
      const header = screen.getByTestId('SpellingHeader');
      expect(header.props.title).toBe('Orthographe Homophones');
    });
  });
});