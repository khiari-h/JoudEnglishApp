import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import WordGamesExercise from '../../../../src/screens/exercises/word-games';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../../../../src/screens/exercises/word-games/hooks/useWordGames', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../../src/hooks/useLastActivity', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    saveActivity: jest.fn(),
  })),
}));

jest.mock('../../../../src/utils/wordGames/wordGamesDataHelper', () => ({
  getWordGamesData: jest.fn(() => ({
    games: [
      {
        id: 1,
        type: 'matching',
        title: 'Match Words',
        pairs: [
          { word: 'hello', match: 'bonjour' },
          { word: 'goodbye', match: 'au revoir' }
        ]
      },
      {
        id: 2,
        type: 'categorization',
        title: 'Categorize Words',
        categories: ['Animals', 'Colors'],
        words: ['cat', 'red', 'dog', 'blue']
      }
    ]
  })),
  getLevelColor: jest.fn(() => '#007AFF'),
}));

jest.mock('../../../../src/screens/exercises/word-games/style', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
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

jest.mock('../../../../src/screens/exercises/word-games/WordGamesHeader', () => {
  const { View } = require('react-native');
  return (props) => <View testID="WordGamesHeader" {...props} />;
});

jest.mock('../../../../src/screens/exercises/word-games/WordGamesProgress', () => {
  const { View } = require('react-native');
  return (props) => <View testID="WordGamesProgress" {...props} />;
});

jest.mock('../../../../src/screens/exercises/word-games/WordGamesCard', () => {
  const { View } = require('react-native');
  return (props) => <View testID="WordGamesCard" {...props} />;
});

jest.mock('../../../../src/screens/exercises/word-games/WordGamesNavigation', () => {
  const { View } = require('react-native');
  return (props) => <View testID="WordGamesNavigation" {...props} />;
});

jest.mock('../../../../src/screens/exercises/word-games/WordGamesResults', () => {
  const { View } = require('react-native');
  return (props) => <View testID="WordGamesResults" {...props} />;
});

const mockUseWordGames = require('../../../../src/screens/exercises/word-games/hooks/useWordGames').default;
const mockUseLastActivity = require('../../../../src/hooks/useLastActivity').default;

describe('WordGamesExercise', () => {
  const mockRouteParams = { level: 'A1' };
  const mockNavigationGoBack = jest.fn();
  const mockRouterPush = jest.fn();
  const mockSaveActivity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('@react-navigation/native').useNavigation.mockReturnValue({ goBack: mockNavigationGoBack });
    require('expo-router').router.push.mockImplementation(mockRouterPush);
    mockUseLastActivity.mockReturnValue({ saveActivity: mockSaveActivity });

    // Default mock for useWordGames
    mockUseWordGames.mockReturnValue({
      currentGameIndex: 0,
      selectedItems: [],
      matchedItems: [],
      showFeedback: false,
      isCorrect: false,
      showResults: false,
      gameResults: [
        { score: 0, maxScore: 10, completed: false },
        { score: 0, maxScore: 8, completed: false }
      ],
      shuffledOptions: ['hello', 'bonjour', 'goodbye', 'au revoir'],
      loaded: true,
      games: [
        {
          id: 1,
          type: 'matching',
          title: 'Match Words',
          pairs: [
            { word: 'hello', match: 'bonjour' },
            { word: 'goodbye', match: 'au revoir' }
          ]
        }
      ],
      currentGame: {
        id: 1,
        type: 'matching',
        title: 'Match Words',
        pairs: [
          { word: 'hello', match: 'bonjour' },
          { word: 'goodbye', match: 'au revoir' }
        ]
      },
      totalGames: 2,
      fadeAnim: { value: 1 },
      bounceAnim: { value: 1 },
      handleSelectItem: jest.fn(),
      checkAnswer: jest.fn(),
      handleNext: jest.fn(() => ({ completed: false })),
      handlePrevious: jest.fn(),
      resetGames: jest.fn(),
      canGoToPrevious: false,
      isLastGame: false,
      stats: {
        totalGames: 2,
        completedGamesCount: 0,
        totalProgress: 0,
        currentProgress: 50,
        score: 0,
        totalMaxScore: 18,
        percentage: 0
      },
      display: {
        gameCounter: '1/2',
        gameTitle: 'Match Words',
        currentGame: {
          id: 1,
          type: 'matching',
          title: 'Match Words'
        },
        currentGameIndex: 1
      }
    });
  });

  it('should render loading state when not loaded', () => {
    mockUseWordGames.mockReturnValueOnce({ 
      loaded: false,
      currentGame: null,
      games: []
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('Container')).toBeTruthy();
    expect(screen.getByTestId('WordGamesHeader')).toBeTruthy();
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render empty state when no games available', () => {
    mockUseWordGames.mockReturnValueOnce({
      loaded: true,
      currentGame: null,
      games: []
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('Container')).toBeTruthy();
    expect(screen.getByTestId('WordGamesHeader')).toBeTruthy();
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render results state when showResults is true', () => {
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      showResults: true
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('Container')).toBeTruthy();
    expect(screen.getByTestId('WordGamesResults')).toBeTruthy();
  });

  it('should render main game components when loaded and has games', () => {
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    expect(screen.getByTestId('WordGamesHeader')).toBeTruthy();
    expect(screen.getByTestId('WordGamesProgress')).toBeTruthy();
    expect(screen.getByTestId('WordGamesCard')).toBeTruthy();
    expect(screen.getByTestId('WordGamesNavigation')).toBeTruthy();
  });

  it('should call useWordGames with correct parameters', () => {
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    expect(mockUseWordGames).toHaveBeenCalledWith(expect.any(Object), mockRouteParams.level);
  });

  it('should save activity when component loads', async () => {
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    
    await waitFor(() => {
      expect(mockSaveActivity).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Jeux de mots',
        level: 'A1',
        type: 'wordGames',
        metadata: expect.objectContaining({
          game: 0,
          totalGames: 2,
          gameType: 'matching',
          gameTitle: 'Match Words',
          score: 0
        })
      }));
    });
  });

  it('should navigate back to exercise selection on back press', () => {
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const header = screen.getByTestId('WordGamesHeader');
    fireEvent(header, 'onBackPress');
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/tabs/exerciseSelection',
      params: { level: 'A1' }
    });
  });

  it('should call handleSelectItem when item is selected', () => {
    const mockHandleSelectItem = jest.fn();
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      handleSelectItem: mockHandleSelectItem
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const gameCard = screen.getByTestId('WordGamesCard');
    fireEvent(gameCard, 'onSelectItem', 'hello');
    expect(mockHandleSelectItem).toHaveBeenCalledWith('hello');
  });

  it('should call checkAnswer when check answer is triggered', () => {
    const mockCheckAnswer = jest.fn();
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      checkAnswer: mockCheckAnswer
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('WordGamesNavigation');
    fireEvent(navigation, 'onCheckAnswer');
    expect(mockCheckAnswer).toHaveBeenCalled();
  });

  it('should call handleNext when next game is triggered', () => {
    const mockHandleNext = jest.fn(() => ({ completed: false }));
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      handleNext: mockHandleNext
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('WordGamesNavigation');
    fireEvent(navigation, 'onNext');
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it('should call handlePrevious when previous game is triggered', () => {
    const mockHandlePrevious = jest.fn();
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      handlePrevious: mockHandlePrevious,
      canGoToPrevious: true
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const navigation = screen.getByTestId('WordGamesNavigation');
    fireEvent(navigation, 'onPrevious');
    expect(mockHandlePrevious).toHaveBeenCalled();
  });

  it('should call resetGames when play again is triggered from results', () => {
    const mockResetGames = jest.fn();
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      showResults: true,
      resetGames: mockResetGames
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const results = screen.getByTestId('WordGamesResults');
    fireEvent(results, 'onPlayAgain');
    expect(mockResetGames).toHaveBeenCalled();
  });

  it('should navigate back when continue is triggered from results', () => {
    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      showResults: true
    });
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const results = screen.getByTestId('WordGamesResults');
    fireEvent(results, 'onContinue');
    expect(mockNavigationGoBack).toHaveBeenCalled();
  });

  it('should handle route params with default level', () => {
    render(<WordGamesExercise route={{}} />);
    expect(mockUseWordGames).toHaveBeenCalledWith(expect.any(Object), 'A1');
  });

  it('should not save activity when showResults is true', async () => {
    mockUseWordGames.mockReturnValue({
      ...mockUseWordGames(),
      showResults: true
    });
    
    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    
    // Wait a bit to ensure no activity is saved
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockSaveActivity).not.toHaveBeenCalled();
  });

  it('should pass correct props to WordGamesProgress', () => {
    const mockStats = {
      totalGames: 2,
      completedGamesCount: 1,
      totalProgress: 50,
      currentProgress: 50,
      score: 5,
      totalMaxScore: 18,
      percentage: 28
    };

    const mockDisplay = {
      gameCounter: '1/2',
      gameTitle: 'Match Words',
      currentGameIndex: 1
    };

    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      stats: mockStats,
      display: mockDisplay
    });

    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const progress = screen.getByTestId('WordGamesProgress');
    
    expect(progress.props.currentGame).toBe(1);
    expect(progress.props.totalGames).toBe(2);
    expect(progress.props.gameTitle).toBe('Match Words');
    expect(progress.props.completedGames).toBe(1);
  });

  it('should pass correct props to WordGamesCard', () => {
    const mockCurrentGame = {
      id: 1,
      type: 'matching',
      title: 'Match Words',
      pairs: [{ word: 'hello', match: 'bonjour' }]
    };

    mockUseWordGames.mockReturnValueOnce({
      ...mockUseWordGames(),
      currentGame: mockCurrentGame,
      selectedItems: ['hello'],
      matchedItems: ['hello', 'bonjour'],
      shuffledOptions: ['hello', 'bonjour', 'goodbye', 'au revoir'],
      showFeedback: true,
      isCorrect: true
    });

    render(<WordGamesExercise route={{ params: mockRouteParams }} />);
    const gameCard = screen.getByTestId('WordGamesCard');
    
    expect(gameCard.props.currentGame).toEqual(mockCurrentGame);
    expect(gameCard.props.selectedItems).toEqual(['hello']);
    expect(gameCard.props.matchedItems).toEqual(['hello', 'bonjour']);
    expect(gameCard.props.showFeedback).toBe(true);
    expect(gameCard.props.isCorrect).toBe(true);
  });
});