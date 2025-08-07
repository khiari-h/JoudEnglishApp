// __tests__/screens/exercises/level-assessment/LevelAssessment.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import LevelAssessment from '../../../../src/screens/exercises/level-assessment';

// Mock all dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock React Native components that are used directly in LevelAssessment
jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    View: ReactNative.View,
    ActivityIndicator: (props) => <ReactNative.ActivityIndicator {...props} testID="activity-indicator" />,
  };
});

// Mock Child Components
jest.mock('../../../../src/screens/exercises/level-assessment/AssessmentHeader', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="AssessmentHeader" {...props} />;
});
jest.mock('../../../../src/screens/exercises/level-assessment/AssessmentProgress', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="AssessmentProgress" {...props} />;
});
jest.mock('../../../../src/screens/exercises/level-assessment/AssessmentQuestion', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="AssessmentQuestion" {...props} />;
});
jest.mock('../../../../src/screens/exercises/level-assessment/AssessmentNavigation', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="AssessmentNavigation" {...props} />;
});
jest.mock('../../../../src/screens/exercises/level-assessment/AssessmentResults', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="AssessmentResults" {...props} />;
});

jest.mock('../../../../src/components/layout/Container', () => {
  const { View } = jest.requireActual('react-native');
  return {
    CONTAINER_SAFE_EDGES: {
      ALL: 'mocked-all-edges',
      TOP: 'mocked-top-edge',
      BOTTOM: 'mocked-bottom-edge',
      // Add other edges if they are used in the component
    },
    __esModule: true, // This is important for default exports
    default: ({ children, ...props }) => <View {...props}>{children}</View>,
  };
});


// Mock Hooks and Utils
jest.mock('../../../../src/screens/exercises/level-assessment/hooks/useAssessment');
jest.mock('../../../../src/hooks/useLastActivity');
jest.mock('../../../../src/utils/assessment/assessmentDataHelper', () => ({
  getLevelColor: jest.fn(() => '#007AFF'),
}));

// Import mocks after jest.mock calls
import useAssessment from '../../../../src/screens/exercises/level-assessment/hooks/useAssessment';
import useLastActivity from '../../../../src/hooks/useLastActivity';

describe('LevelAssessment - Comprehensive Tests', () => {
  const mockSaveActivity = jest.fn();
  const mockNavigate = jest.fn();
  const mockHandleNext = jest.fn(() => ({ completed: false }));
  const mockSaveAssessmentResults = jest.fn();
  const mockResetAssessment = jest.fn();

  const setupMocks = (overrides = {}) => {
    const defaultUseAssessment = {
      loaded: true,
      testCompleted: false,
      currentQuestion: { id: 'q1', text: 'Question 1?' },
      currentSection: { id: 's1', title: 'Section 1' },
      totalQuestionsInSection: 10,
      currentQuestionIndex: 0,
      totalSections: 3,
      display: {
        currentSectionIndex: 0,
        sectionTitle: 'Section 1',
        questionNumber: 1,
      },
      stats: {
        answeredInCurrentSection: 0,
        totalSections: 3,
      },
      handleNext: mockHandleNext,
      saveAssessmentResults: mockSaveAssessmentResults,
      resetAssessment: mockResetAssessment,
      ...overrides,
    };

    useAssessment.mockReturnValue(defaultUseAssessment);
    useLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe('Core Functionality and Rendering', () => {
    it('should render the main assessment view correctly', () => {
      render(<LevelAssessment route={{ params: { level: 'A2' } }} />);

      // Check that main components are rendered
      expect(screen.getByTestId('AssessmentHeader')).toBeTruthy();
      expect(screen.getByTestId('AssessmentProgress')).toBeTruthy();
      expect(screen.getByTestId('AssessmentQuestion')).toBeTruthy();
      expect(screen.getByTestId('AssessmentNavigation')).toBeTruthy();
    });

    it('should call hooks with correct parameters', () => {
      render(<LevelAssessment route={{ params: { level: 'B1' } }} />);
      
      expect(useAssessment).toHaveBeenCalledWith('B1');
      expect(useLastActivity).toHaveBeenCalled();
    });

    it('should save activity on initial render', async () => {
        render(<LevelAssessment route={{ params: { level: 'A1' } }} />);
      
        await waitFor(() => {
          expect(mockSaveActivity).toHaveBeenCalledWith({
            title: 'Évaluation',
            level: 'A1',
            type: 'assessment',
            metadata: {
                section: 0,
                question: 0,
                totalQuestions: 10,
                sectionTitle: 'Section 1',
                totalSections: 3
            },
          });
        });
      });
  });

  describe('States and Edge Cases', () => {
    it('should render loading state when not loaded', () => {
      setupMocks({ loaded: false, currentQuestion: null });
      render(<LevelAssessment route={{ params: { level: 'A1' } }} />);
      
      // Ensure ActivityIndicator is rendered with the testID
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('AssessmentQuestion')).toBeNull();
    });

    it('should render results view when test is completed', () => {
      setupMocks({ testCompleted: true });
      render(<LevelAssessment route={{ params: { level: 'C1' } }} />);

      expect(screen.getByTestId('AssessmentResults')).toBeTruthy();
      expect(screen.queryByTestId('AssessmentQuestion')).toBeNull();
    });

    it('should handle missing route params by using a default level', () => {
        render(<LevelAssessment route={{}} />);
        expect(useAssessment).toHaveBeenCalledWith('A1');
    });
  });

  describe('Navigation and User Actions', () => {
    it('should navigate back to exercise selection on back press', () => {
        const { getByTestId } = render(<LevelAssessment route={{ params: { level: 'A2' } }} />);
        const header = screen.getByTestId('AssessmentHeader');
        
        // We need to simulate the onBackPress prop being called on the mocked component
        // This is a limitation of mocking, so we find the prop and call it manually.
        const backButtonPress = header.props.onBackPress;
        backButtonPress();

        expect(router.push).toHaveBeenCalledWith({
            pathname: '/tabs/exerciseSelection',
            params: { level: 'A2' },
        });
    });

    it('should call handleNext when the next button is pressed', () => {
        render(<LevelAssessment route={{ params: { level: 'B2' } }} />);
        const navigation = screen.getByTestId('AssessmentNavigation');
        
        const onNextPress = navigation.props.onNext;
        onNextPress();

        expect(mockHandleNext).toHaveBeenCalled();
    });

    it('should save results when the test is completed on the final "next" action', () => {
        // Setup the mock for handleNext to return a completed state
        const mockHandleNextCompletes = jest.fn(() => ({ completed: true }));
        setupMocks({ handleNext: mockHandleNextCompletes });

        render(<LevelAssessment route={{ params: { level: 'B1' } }} />);
        const navigation = screen.getByTestId('AssessmentNavigation');
        
        const onNextPress = navigation.props.onNext;
        onNextPress();

        expect(mockHandleNextCompletes).toHaveBeenCalled();
        expect(mockSaveAssessmentResults).toHaveBeenCalled();
    });

    it('should navigate to Dashboard on continue from results', () => {
        setupMocks({ testCompleted: true });
        render(<LevelAssessment route={{ params: { level: 'A1' } }} />);
        const results = screen.getByTestId('AssessmentResults');

        const onContinuePress = results.props.onContinue;
        onContinuePress();

        expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
    });

    it('should call resetAssessment on retry from results', async () => {
        setupMocks({ testCompleted: true });
        render(<LevelAssessment route={{ params: { level: 'A1' } }} />);
        const results = screen.getByTestId('AssessmentResults');

        const onRetryPress = results.props.onRetry;
        await onRetryPress();

        expect(mockResetAssessment).toHaveBeenCalled();
    });
  });
});