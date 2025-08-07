// __tests__/screens/exercises/phrases/PhrasesExercise.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import PhrasesExercise from '../../../../src/screens/exercises/phrases';

// Mock all dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock React Native components that are used directly in PhrasesExercise
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
jest.mock('../../../../src/screens/exercises/phrases/PhrasesHeader', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="PhrasesHeader" {...props} />;
});
jest.mock('../../../../src/screens/exercises/phrases/PhrasesCategorySelector', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="PhrasesCategorySelector" {...props} />;
});
jest.mock('../../../../src/screens/exercises/phrases/PhrasesProgress', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="PhrasesProgress" {...props} />;
});
jest.mock('../../../../src/screens/exercises/phrases/PhraseCard', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="PhraseCard" {...props} />;
});
jest.mock('../../../../src/screens/exercises/phrases/PhrasesNavigation', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID="PhrasesNavigation" {...props} />;
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
jest.mock('../../../../src/screens/exercises/phrases/hooks/usePhrases');
jest.mock('../../../../src/hooks/useLastActivity');
jest.mock('../../../../src/utils/phrases/phrasesDataHelper', () => ({
  getPhrasesData: jest.fn(() => ({
    categories: [
      { id: 'cat1', name: 'Greetings', phrases: [{ id: 'p1', french: 'Bonjour', english: 'Hello' }] },
      { id: 'cat2', name: 'Travel', phrases: [{ id: 'p2', french: 'Merci', english: 'Thank you' }] }
    ]
  })),
  getLevelColor: jest.fn(() => '#007AFF'),
}));

// Import mocks after jest.mock calls
import usePhrases from '../../../../src/screens/exercises/phrases/hooks/usePhrases';
import useLastActivity from '../../../../src/hooks/useLastActivity';
import { getPhrasesData } from '../../../../src/utils/phrases/phrasesDataHelper';

describe('PhrasesExercise - Comprehensive Tests', () => {
  const mockSaveActivity = jest.fn();
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  const mockChangeCategory = jest.fn();
  const mockToggleTranslation = jest.fn();
  const mockToggleDetailedProgress = jest.fn();
  const mockHandleNext = jest.fn(() => ({ completed: false }));
  const mockHandlePrevious = jest.fn();

  const mockPhrasesData = {
    categories: [
      { 
        id: 'cat1', 
        name: 'Greetings', 
        phrases: [
          { id: 'p1', french: 'Bonjour', english: 'Hello' },
          { id: 'p2', french: 'Bonsoir', english: 'Good evening' }
        ] 
      },
      { 
        id: 'cat2', 
        name: 'Travel', 
        phrases: [
          { id: 'p3', french: 'Merci', english: 'Thank you' }
        ] 
      }
    ]
  };

  const setupMocks = (overrides = {}) => {
    const defaultUsePhrases = {
      categoryIndex: 0,
      phraseIndex: 0,
      showTranslation: false,
      completedPhrases: [],
      loaded: true,
      showDetailedProgress: false,
      currentPhrase: { id: 'p1', french: 'Bonjour', english: 'Hello' },
      currentPhrases: mockPhrasesData.categories[0].phrases,
      totalPhrasesInCategory: 2,
      hasValidData: true,
      changeCategory: mockChangeCategory,
      toggleTranslation: mockToggleTranslation,
      toggleDetailedProgress: mockToggleDetailedProgress,
      handleNext: mockHandleNext,
      handlePrevious: mockHandlePrevious,
      canGoToPrevious: false,
      isLastPhraseInCategory: false,
      stats: {
        completionProgress: 0.5,
        completedPhrasesCount: 1,
      },
      display: {
        categories: mockPhrasesData.categories.map((cat, index) => ({
          ...cat,
          isActive: index === 0
        })),
      },
      ...overrides,
    };

    usePhrases.mockReturnValue(defaultUsePhrases);
    useLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });
    useNavigation.mockReturnValue({ 
      navigate: mockNavigate,
      goBack: mockGoBack 
    });
    getPhrasesData.mockReturnValue(mockPhrasesData);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe('Core Functionality and Rendering', () => {
    it('should render the main phrases exercise view correctly', () => {
      render(<PhrasesExercise route={{ params: { level: 'A2' } }} />);

      // Check that main components are rendered
      expect(screen.getByTestId('PhrasesHeader')).toBeTruthy();
      expect(screen.getByTestId('PhrasesProgress')).toBeTruthy();
      expect(screen.getByTestId('PhrasesCategorySelector')).toBeTruthy();
      expect(screen.getByTestId('PhraseCard')).toBeTruthy();
      expect(screen.getByTestId('PhrasesNavigation')).toBeTruthy();
    });

    it('should call hooks with correct parameters', () => {
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      
      expect(usePhrases).toHaveBeenCalledWith(mockPhrasesData, 'B1');
      expect(useLastActivity).toHaveBeenCalled();
      expect(getPhrasesData).toHaveBeenCalledWith('B1');
    });

    it('should save activity on initial render', async () => {
      render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
    
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Expressions',
          level: 'A1',
          type: 'phrases',
          metadata: {
            phrase: 0,
            totalPhrases: 2,
            category: 'Greetings',
            categoryIndex: 0,
            totalCategories: 2
          },
        });
      });
    });
  });

  describe('States and Edge Cases', () => {
    it('should render loading state when not loaded', () => {
      setupMocks({ loaded: false, hasValidData: false });
      render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('PhraseCard')).toBeNull();
    });

    it('should render loading state when data is invalid', () => {
      setupMocks({ loaded: true, hasValidData: false });
      render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('PhraseCard')).toBeNull();
    });

    it('should render empty state when no phrases available', () => {
      setupMocks({ 
        loaded: true, 
        hasValidData: true, 
        currentPhrases: [] 
      });
      render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      expect(screen.getByTestId('PhrasesHeader')).toBeTruthy();
      expect(screen.getByTestId('activity-indicator')).toBeTruthy();
      expect(screen.queryByTestId('PhraseCard')).toBeNull();
    });

    it('should handle missing route params by using default level', () => {
      render(<PhrasesExercise route={{}} />);
      expect(getPhrasesData).toHaveBeenCalledWith('A1');
    });

    it('should not save activity when phraseIndex is too high (protection against infinite loop)', () => {
      setupMocks({ phraseIndex: 150 }); // > 100
      render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      expect(mockSaveActivity).not.toHaveBeenCalled();
    });
  });

  describe('Navigation and User Actions', () => {
    it('should navigate back to exercise selection on back press', () => {
      render(<PhrasesExercise route={{ params: { level: 'A2' } }} />);
      const header = screen.getByTestId('PhrasesHeader');
      
      const backButtonPress = header.props.onBackPress;
      backButtonPress();

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/tabs/exerciseSelection',
        params: { level: 'A2' },
      });
    });

    it('should call changeCategory when category is selected', () => {
      render(<PhrasesExercise route={{ params: { level: 'B2' } }} />);
      const categorySelector = screen.getByTestId('PhrasesCategorySelector');
      
      const onSelectCategory = categorySelector.props.onSelectCategory;
      onSelectCategory(1);

      expect(mockChangeCategory).toHaveBeenCalledWith(1);
    });

    it('should call toggleDetailedProgress when progress is toggled', () => {
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const progress = screen.getByTestId('PhrasesProgress');
      
      const onToggleExpand = progress.props.onToggleExpand;
      onToggleExpand();

      expect(mockToggleDetailedProgress).toHaveBeenCalled();
    });

    it('should call toggleTranslation when translation is toggled', () => {
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const phraseCard = screen.getByTestId('PhraseCard');
      
      const onToggleTranslation = phraseCard.props.onToggleTranslation;
      onToggleTranslation();

      expect(mockToggleTranslation).toHaveBeenCalled();
    });

    it('should call handleNext when next button is pressed', () => {
      render(<PhrasesExercise route={{ params: { level: 'B2' } }} />);
      const navigation = screen.getByTestId('PhrasesNavigation');
      
      const onNext = navigation.props.onNext;
      onNext();

      expect(mockHandleNext).toHaveBeenCalled();
    });

    it('should call handlePrevious when previous button is pressed', () => {
      setupMocks({ canGoToPrevious: true });
      render(<PhrasesExercise route={{ params: { level: 'B2' } }} />);
      const navigation = screen.getByTestId('PhrasesNavigation');
      
      const onPrevious = navigation.props.onPrevious;
      onPrevious();

      expect(mockHandlePrevious).toHaveBeenCalled();
    });

    it('should navigate back when exercise is completed', () => {
      const mockHandleNextCompletes = jest.fn(() => ({ completed: true }));
      setupMocks({ handleNext: mockHandleNextCompletes });

      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('PhrasesNavigation');
      
      const onNext = navigation.props.onNext;
      onNext();

      expect(mockHandleNextCompletes).toHaveBeenCalled();
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  describe('Activity Saving', () => {
    it('should save activity with correct metadata when phrase changes', async () => {
      const { rerender } = render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      // Change to next phrase
      setupMocks({ 
        phraseIndex: 1,
        currentPhrase: { id: 'p2', french: 'Bonsoir', english: 'Good evening' }
      });
      rerender(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Expressions',
          level: 'A1',
          type: 'phrases',
          metadata: {
            phrase: 1,
            totalPhrases: 2,
            category: 'Greetings',
            categoryIndex: 0,
            totalCategories: 2
          },
        });
      });
    });

    it('should save activity with correct metadata when category changes', async () => {
      const { rerender } = render(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      // Change to second category
      setupMocks({ 
        categoryIndex: 1,
        currentPhrase: { id: 'p3', french: 'Merci', english: 'Thank you' },
        currentPhrases: mockPhrasesData.categories[1].phrases,
        totalPhrasesInCategory: 1
      });
      rerender(<PhrasesExercise route={{ params: { level: 'A1' } }} />);
      
      await waitFor(() => {
        expect(mockSaveActivity).toHaveBeenCalledWith({
          title: 'Expressions',
          level: 'A1',
          type: 'phrases',
          metadata: {
            phrase: 0,
            totalPhrases: 1,
            category: 'Travel',
            categoryIndex: 1,
            totalCategories: 2
          },
        });
      });
    });
  });

  describe('Component Props Validation', () => {
    it('should pass correct props to PhrasesHeader', () => {
      render(<PhrasesExercise route={{ params: { level: 'C1' } }} />);
      const header = screen.getByTestId('PhrasesHeader');
      
      expect(header.props.level).toBe('C1');
      expect(typeof header.props.onBackPress).toBe('function');
    });

    it('should pass correct props to PhrasesProgress', () => {
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const progress = screen.getByTestId('PhrasesProgress');
      
      expect(progress.props.progress).toBe(0.5);
      expect(progress.props.currentPhrase).toBe(1); // phraseIndex + 1
      expect(progress.props.totalPhrases).toBe(2);
      expect(progress.props.completedCount).toBe(1);
      expect(progress.props.levelColor).toBe('#007AFF');
    });

    it('should pass correct props to PhraseCard', () => {
      const currentPhrase = { id: 'p1', french: 'Bonjour', english: 'Hello' };
      setupMocks({ currentPhrase, showTranslation: true });
      
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const phraseCard = screen.getByTestId('PhraseCard');
      
      expect(phraseCard.props.phraseData).toEqual(currentPhrase);
      expect(phraseCard.props.showTranslation).toBe(true);
      expect(phraseCard.props.levelColor).toBe('#007AFF');
    });

    it('should pass correct props to PhrasesNavigation', () => {
      setupMocks({ 
        canGoToPrevious: true, 
        isLastPhraseInCategory: true 
      });
      
      render(<PhrasesExercise route={{ params: { level: 'B1' } }} />);
      const navigation = screen.getByTestId('PhrasesNavigation');
      
      expect(navigation.props.disablePrevious).toBe(false);
      expect(navigation.props.disableNext).toBe(false);
      expect(navigation.props.isLast).toBe(true);
      expect(navigation.props.levelColor).toBe('#007AFF');
    });
  });
});