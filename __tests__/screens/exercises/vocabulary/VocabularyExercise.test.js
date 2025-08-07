import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import VocabularyExercise from '../../../../src/screens/exercises/vocabulary';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../../../../src/screens/exercises/vocabulary/hooks/useVocabulary', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../../src/hooks/useLastActivity', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    saveActivity: jest.fn(),
  })),
}));

jest.mock('../../../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  isBonusLevel: jest.fn(() => false),
  getLevelColor: jest.fn(() => '#007AFF'),
  getVocabularyData: jest.fn(() => ({
    categories: [
      { 
        name: 'Greetings', 
        words: [{ word: 'hello' }, { word: 'world' }] 
      }
    ]
  }))
}));

jest.mock('../../../../src/screens/exercises/vocabulary/style', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { flexGrow: 1 }
  }))
}));

// Mock child components to simplify testing and avoid deep rendering issues
jest.mock('../../../../src/components/layout/Container', () => {
  const { View } = require('react-native');
  
  // Mock CONTAINER_SAFE_EDGES constant
  const CONTAINER_SAFE_EDGES = {
    ALL: ['top', 'bottom', 'left', 'right'],
    NO_BOTTOM: ['top', 'left', 'right'],
    NO_TOP: ['bottom', 'left', 'right'],
    HORIZONTAL: ['left', 'right'],
    NONE: []
  };

  const Container = ({ children, safeAreaEdges, ...props }) => (
    <View testID="Container" {...props}>
      {children}
    </View>
  );

  Container.CONTAINER_SAFE_EDGES = CONTAINER_SAFE_EDGES;

  return {
    __esModule: true,
    default: Container,
    CONTAINER_SAFE_EDGES
  };
});

jest.mock('../../../../src/screens/exercises/vocabulary/VocabularyHeader', () => {
  const { View } = require('react-native');
  return (props) => <View testID="VocabularyHeader" {...props} />;
});

jest.mock('../../../../src/screens/exercises/vocabulary/VocabularyCategorySelector', () => {
  const { View } = require('react-native');
  return (props) => <View testID="VocabularyCategorySelector" {...props} />;
});

jest.mock('../../../../src/screens/exercises/vocabulary/VocabularyProgress', () => {
  const { View } = require('react-native');
  return (props) => <View testID="VocabularyProgress" {...props} />;
});

jest.mock('../../../../src/screens/exercises/vocabulary/VocabularyWordSection', () => {
  const { View } = require('react-native');
  return (props) => <View testID="VocabularyWordSection" {...props} />;
});

jest.mock('../../../../src/screens/exercises/vocabulary/VocabularyNavigation', () => {
  const { View } = require('react-native');
  return (props) => <View testID="VocabularyNavigation" {...props} />;
});

const mockUseVocabulary = require('../../../../src/screens/exercises/vocabulary/hooks/useVocabulary').default;
const mockUseLastActivity = require('../../../../src/hooks/useLastActivity').default;

describe('VocabularyExercise', () => {
  const mockRouteParams = { level: 'A1', mode: 'classic' };
  const mockNavigationGoBack = jest.fn();
  const mockRouterPush = jest.fn();
  const mockSaveActivity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('@react-navigation/native').useNavigation.mockReturnValue({ goBack: mockNavigationGoBack });
    require('expo-router').router.push.mockImplementation(mockRouterPush);
    mockUseLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });

    // Default mock for useVocabulary
    mockUseVocabulary.mockReturnValue({
      categoryIndex: 0,
      wordIndex: 0,
      showTranslation: false,
      completedWords: [],
      loaded: true,
      showDetailedProgress: false,
      currentWord: { word: 'hello', translation: 'bonjour' },
      currentCategory: { name: 'Greetings' },
      changeCategory: jest.fn(),
      toggleTranslation: jest.fn(),
      toggleDetailedProgress: jest.fn(),
      handleNext: jest.fn(() => ({ completed: false })),
      handlePrevious: jest.fn(),
      canGoToPrevious: false,
      isLastWordInExercise: false,
      display: {
        categories: [{ name: 'Greetings' }],
        wordCounter: '1/10',
      },
      saveData: jest.fn(),
    });
  });

  it('should render loading state when not loaded', () => {
    mockUseVocabulary.mockReturnValueOnce({ loaded: false });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('Container')).toBeTruthy();
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render main components when loaded', () => {
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('VocabularyHeader')).toBeTruthy();
    expect(screen.getByTestId('VocabularyProgress')).toBeTruthy();
    expect(screen.getByTestId('VocabularyCategorySelector')).toBeTruthy();
    expect(screen.getByTestId('VocabularyWordSection')).toBeTruthy();
    expect(screen.getByTestId('VocabularyNavigation')).toBeTruthy();
  });

  it('should call useVocabulary with correct parameters', () => {
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    expect(mockUseVocabulary).toHaveBeenCalledWith(expect.any(Object), mockRouteParams.level, mockRouteParams.mode);
  });

  it('should save activity on wordIndex change', async () => {
    const mockHandleNext = jest.fn(() => ({ completed: false }));

    mockUseVocabulary.mockReturnValue({
      categoryIndex: 0,
      wordIndex: 0,
      showTranslation: false,
      completedWords: [],
      loaded: true,
      showDetailedProgress: false,
      currentWord: { word: 'hello', translation: 'bonjour' },
      currentCategory: { name: 'Greetings' },
      changeCategory: jest.fn(),
      toggleTranslation: jest.fn(),
      toggleDetailedProgress: jest.fn(),
      handleNext: mockHandleNext,
      handlePrevious: jest.fn(),
      canGoToPrevious: false,
      isLastWordInExercise: false,
      display: {
        categories: [{ name: 'Greetings', words: [{ word: 'hello' }, { word: 'world' }] }],
        wordCounter: '1/2',
      },
      saveData: jest.fn(),
    });

    const { rerender } = render(<VocabularyExercise route={{ params: mockRouteParams }} />);

    // Initial render should save activity - just check that it was called
    await waitFor(() => {
      expect(mockSaveActivity).toHaveBeenCalledWith(expect.objectContaining({
        level: 'A1',
        type: 'vocabulary',
        mode: 'classic',
        metadata: expect.objectContaining({
          word: 0,
          category: 'Greetings',
          categoryIndex: 0,
          wordIndex: 0,
        }),
      }));
    });

    // Simulate wordIndex change
    mockUseVocabulary.mockReturnValue({
      categoryIndex: 0,
      wordIndex: 1, // Changed wordIndex
      showTranslation: false,
      completedWords: [],
      loaded: true,
      showDetailedProgress: false,
      currentWord: { word: 'world', translation: 'monde' },
      currentCategory: { name: 'Greetings' },
      changeCategory: jest.fn(),
      toggleTranslation: jest.fn(),
      toggleDetailedProgress: jest.fn(),
      handleNext: mockHandleNext,
      handlePrevious: jest.fn(),
      canGoToPrevious: false,
      isLastWordInExercise: false,
      display: {
        categories: [{ name: 'Greetings', words: [{ word: 'hello' }, { word: 'world' }] }],
        wordCounter: '2/2',
      },
      saveData: jest.fn(),
    });
    rerender(<VocabularyExercise route={{ params: mockRouteParams }} />);

    await waitFor(() => {
      expect(mockSaveActivity).toHaveBeenCalledWith(expect.objectContaining({
        metadata: expect.objectContaining({
          word: 1,
          wordIndex: 1,
        }),
      }));
    });
  });

  it('should navigate back to exercise selection on back press', () => {
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const header = screen.getByTestId('VocabularyHeader');
    fireEvent(header, 'onBackPress');
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/tabs/exerciseSelection',
      params: { level: 'A1' },
    });
  });

  it('should call changeCategory when category is selected', () => {
    const mockChangeCategory = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      changeCategory: mockChangeCategory,
      display: { categories: [{ name: 'Cat1' }, { name: 'Cat2' }] },
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const categorySelector = screen.getByTestId('VocabularyCategorySelector');
    fireEvent(categorySelector, 'onSelectCategory', 1);
    expect(mockChangeCategory).toHaveBeenCalledWith(1);
  });

  it('should call toggleDetailedProgress when progress is toggled', () => {
    const mockToggleDetailedProgress = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      toggleDetailedProgress: mockToggleDetailedProgress,
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const progress = screen.getByTestId('VocabularyProgress');
    fireEvent(progress, 'onToggleExpand');
    expect(mockToggleDetailedProgress).toHaveBeenCalled();
  });

  it('should call toggleTranslation when translation is toggled', () => {
    const mockToggleTranslation = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      toggleTranslation: mockToggleTranslation,
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const wordSection = screen.getByTestId('VocabularyWordSection');
    fireEvent(wordSection, 'onToggleTranslation');
    expect(mockToggleTranslation).toHaveBeenCalled();
  });

  it('should call handleNextWord and saveData on next button press', async () => {
    const mockHandleNext = jest.fn(() => ({ completed: false }));
    const mockSaveData = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      handleNext: mockHandleNext,
      saveData: mockSaveData,
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('VocabularyNavigation');
    fireEvent(navigation, 'onNext');
    expect(mockHandleNext).toHaveBeenCalled();
    await waitFor(() => expect(mockSaveData).toHaveBeenCalled());
  });

  it('should navigate back when handleNext indicates completion', async () => {
    const mockHandleNext = jest.fn(() => ({ completed: true }));
    const mockSaveData = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      handleNext: mockHandleNext,
      saveData: mockSaveData,
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('VocabularyNavigation');
    fireEvent(navigation, 'onNext');
    expect(mockHandleNext).toHaveBeenCalled();
    await waitFor(() => expect(mockSaveData).toHaveBeenCalled());
    await waitFor(() => expect(mockNavigationGoBack).toHaveBeenCalled());
  });

  it('should call handlePreviousWord on previous button press', () => {
    const mockHandlePrevious = jest.fn();
    mockUseVocabulary.mockReturnValueOnce({
      ...mockUseVocabulary(),
      handlePrevious: mockHandlePrevious,
    });
    render(<VocabularyExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('VocabularyNavigation');
    fireEvent(navigation, 'onPrevious');
    expect(mockHandlePrevious).toHaveBeenCalled();
  });
});