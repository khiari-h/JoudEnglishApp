import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react-native';
import { Dimensions, View, Text } from 'react-native';

// Screen to test
import VocabularyRevision from '../../../src/screens/VocabularyRevision';

// Mock custom hooks
const mockMarkRevisionCompleted = jest.fn();
jest.mock('../../../src/hooks/useRevisionManager', () => ({
  __esModule: true,
  default: () => ({
    markRevisionCompleted: mockMarkRevisionCompleted,
  }),
}));

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

// Mocks pour les hooks
const mockUseRevisionData = jest.fn();
jest.mock('../../../src/hooks/useRevisionData', () => () => mockUseRevisionData());

const mockUseQuizEngine = jest.fn();
jest.mock('../../../src/hooks/useQuizEngine', () => () => mockUseQuizEngine());


// Mock ThemeContext
jest.mock('../../../src/contexts/ThemeContext', () => ({
  ThemeContext: {
    Consumer: ({ children }) => children({
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        primary: "#3B82F6"
      }
    }),
    useContext: () => ({
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        primary: "#3B82F6"
      }
    }),
  },
}));

// Mock Dimensions pour Animated values
jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 300, height: 600 });

// Mock Animated.timing pour qu'il se termine immédiatement
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = (value, config) => ({
    start: (callback) => {
      value.setValue(config.toValue);
      callback && callback();
    },
  });
  return RN;
});

describe('VocabularyRevision Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  // Helper pour réinitialiser les mocks entre chaque test
  const setupMocks = (revisionData, quizEngine) => {
    mockUseRevisionData.mockReturnValue(revisionData);
    mockUseQuizEngine.mockReturnValue(quizEngine);
  };

  test('renders loading state initially', async () => {
    setupMocks(
      { isLoading: true, error: null, hasEnoughWords: false, canGenerateQuestions: false },
      {}
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByText('Récupération de vos mots appris')).toBeTruthy();
    });
  });

  test('renders error state', async () => {
    setupMocks(
      { isLoading: false, error: 'Failed to load data', hasEnoughWords: false, canGenerateQuestions: false },
      {}
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load data')).toBeTruthy();
    });
  });

  test('renders locked state when not enough words', async () => {
    setupMocks(
      { 
        isLoading: false, 
        error: null, 
        stats: { totalLearned: 30 }, 
        hasEnoughWords: false, 
        canGenerateQuestions: false 
      },
      {}
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByText(/Apprenez 50 mots pour débloquer le mode révision et tester vos connaissances !/i)).toBeTruthy();
      expect(screen.getByText('30 / 50')).toBeTruthy();
    });
  });

  test('renders noWords state when enough words but cannot generate questions', async () => {
    setupMocks(
      { 
        isLoading: false, 
        error: null, 
        revisionQuestions: [], 
        stats: { totalLearned: 60 }, 
        hasEnoughWords: true, 
        canGenerateQuestions: false 
      },
      {}
    );

    render(<VocabularyRevision route={{ params: { questionsCount: 10 } }} />);
    await waitFor(() => {
      expect(screen.getByText(/Continuez d'apprendre pour diversifier les questions !/i)).toBeTruthy();
      expect(screen.getByText(/Un quiz de 10 questions ne peut pas être généré pour ce niveau./i)).toBeTruthy();
    });
  });

// CORRECTION FINALE POUR LE TEST EN ÉCHEC
test('renders QuizScreen and handles answer and continue', async () => {
  const mockQuestions = [
    { id: 'q1', word: 'Word 1', choices: ['A', 'B', 'C'], correctAnswer: 'A' },
    { id: 'q2', word: 'Word 2', choices: ['D', 'E', 'F'], correctAnswer: 'D' },
  ];

  const mockGoToNextQuestion = jest.fn();
  const mockHandleAnswer = jest.fn();

  // État 1: QuizScreen avec la première question
  mockUseRevisionData.mockReturnValue({
    revisionQuestions: mockQuestions,
    isLoading: false,
    hasEnoughWords: true,
    canGenerateQuestions: true,
  });
  
  mockUseQuizEngine.mockReturnValue({
    currentQuestion: mockQuestions[0],
    currentQuestionIndex: 0,
    totalQuestions: mockQuestions.length,
    score: 0,
    isFinished: false,
    showResult: false,
    handleAnswer: mockHandleAnswer,
    goToNextQuestion: mockGoToNextQuestion,
    handleRestart: jest.fn(),
  });
  
  const { rerender } = render(<VocabularyRevision />);

  // Étape 1 : Répondre à la question
  fireEvent.press(screen.getByText('A'));
  expect(mockHandleAnswer).toHaveBeenCalledWith('A');

  // État 2: L'état `showResult` passe à `true`
  mockUseQuizEngine.mockReturnValue({
    currentQuestion: mockQuestions[0],
    currentQuestionIndex: 0,
    totalQuestions: mockQuestions.length,
    score: 1, 
    isFinished: false,
    showResult: true,
    handleAnswer: mockHandleAnswer,
    goToNextQuestion: mockGoToNextQuestion,
    handleRestart: jest.fn(),
  });
  rerender(<VocabularyRevision />);

  // Attendre l'apparition du bouton 'Continuer'
  await waitFor(() => {
    expect(screen.getByText('Continuer')).toBeTruthy();
  });

  // Étape 2 : Cliquer sur 'Continuer'
  fireEvent.press(screen.getByText('Continuer'));

  // Forcer l'exécution de tous les timers (cela inclut le callback de l'animation)
  jest.runAllTimers();

  // Vérifier que la fonction goToNextQuestion a bien été appelée
  expect(mockGoToNextQuestion).toHaveBeenCalled();
});


// CORRECTION POUR CE TEST
test('renders ResultScreen when quiz is finished', async () => {
  const mockQuestions = [
    { id: 'q1', word: 'Word 1', choices: ['A', 'B', 'C'], correctAnswer: 'A' },
  ];

  setupMocks(
    {
      revisionQuestions: mockQuestions,
      isLoading: false,
      hasEnoughWords: true,
      canGenerateQuestions: true
    },
    {
      currentQuestion: null,
      currentQuestionIndex: 1,
      totalQuestions: mockQuestions.length,
      score: 0, 
      isFinished: true,
      showResult: true,
      handleAnswer: jest.fn(),
      goToNextQuestion: jest.fn(),
      handleRestart: jest.fn(),
    }
  );

  const { findByText } = render(<VocabularyRevision />);
  
  // Correction : On cherche les deux éléments de texte séparément
  await findByText('0');
  expect(screen.getByText('/1')).toBeTruthy();
  expect(screen.getByText('Rejouer')).toBeTruthy();
  expect(screen.getByText('Terminer')).toBeTruthy();
});


  test('handles restart from ResultScreen', async () => {
    const mockQuestions = [{ id: 'q1', word: 'Word 1', choices: ['A', 'B', 'C'], correctAnswer: 'A' }];
    const mockHandleRestart = jest.fn();

    setupMocks(
      {
        revisionQuestions: mockQuestions,
        isLoading: false,
        hasEnoughWords: true,
        canGenerateQuestions: true
      },
      {
        currentQuestion: null,
        currentQuestionIndex: 1,
        totalQuestions: mockQuestions.length,
        score: 1,
        isFinished: true,
        showResult: true,
        handleAnswer: jest.fn(),
        goToNextQuestion: jest.fn(),
        handleRestart: mockHandleRestart,
      }
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByText('Rejouer')).toBeTruthy();
    });
    fireEvent.press(screen.getByText('Rejouer'));
    expect(mockHandleRestart).toHaveBeenCalled();
  });

  test('handles finish from ResultScreen', async () => {
    const mockQuestions = [{ id: 'q1', word: 'Word 1', choices: ['A', 'B', 'C'], correctAnswer: 'A' }];

    setupMocks(
      {
        revisionQuestions: mockQuestions,
        isLoading: false,
        hasEnoughWords: true,
        canGenerateQuestions: true
      },
      {
        currentQuestion: null,
        currentQuestionIndex: 1,
        totalQuestions: mockQuestions.length,
        score: 1,
        isFinished: true,
        showResult: true,
        handleAnswer: jest.fn(),
        goToNextQuestion: jest.fn(),
        handleRestart: jest.fn(),
      }
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByText('Terminer')).toBeTruthy();
    });
    fireEvent.press(screen.getByText('Terminer'));
    await waitFor(() => {
      expect(mockMarkRevisionCompleted).toHaveBeenCalledWith(mockQuestions, 1, 1);
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  test('handleGoBack is called when back button is pressed in QuizScreen', async () => {
    const mockQuestions = [{ id: 'q1', word: 'Word 1', choices: ['A', 'B', 'C'], correctAnswer: 'A' }];
    
    setupMocks(
      {
        revisionQuestions: mockQuestions,
        isLoading: false,
        hasEnoughWords: true,
        canGenerateQuestions: true
      },
      {
        currentQuestion: mockQuestions[0],
        currentQuestionIndex: 0,
        totalQuestions: mockQuestions.length,
        score: 0,
        isFinished: false,
        showResult: false,
        handleAnswer: jest.fn(),
        goToNextQuestion: jest.fn(),
        handleRestart: jest.fn(),
      }
    );

    render(<VocabularyRevision />);
    await waitFor(() => {
      expect(screen.getByLabelText('Retour')).toBeTruthy();
    });
    fireEvent.press(screen.getByLabelText('Retour'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});