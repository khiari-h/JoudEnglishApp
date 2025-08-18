// __tests__/hooks/useQuizEngine.test.js
import { renderHook, act } from '@testing-library/react-native';
import useQuizEngine from '../../src/hooks/useQuizEngine';

describe('useQuizEngine', () => {
  const mockQuestions = [
    {
      word: 'hello',
      choices: ['bonjour', 'au revoir', 'merci', 'salut'],
      correctAnswer: 'bonjour',
    },
    {
      word: 'goodbye',
      choices: ['au revoir', 'bonjour', 'merci', 'salut'],
      correctAnswer: 'au revoir',
    },
  ];

  it('devrait initialiser correctement avec des questions', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.selectedChoice).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
    expect(result.current.progress).toBe(0);
    expect(result.current.userAnswers).toEqual([]);
  });

  it('devrait gérer correctement un quiz vide', () => {
    const { result } = renderHook(() => useQuizEngine([]));
    expect(result.current.totalQuestions).toBe(0);
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.progress).toBe(0);
    expect(result.current.isFinished).toBe(false);
  });

  it('devrait traiter une réponse correcte', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      const isCorrect = result.current.handleAnswer('bonjour');
      expect(isCorrect).toBe(true);
    });
    expect(result.current.score).toBe(1);
    expect(result.current.selectedChoice).toBe('bonjour');
    expect(result.current.showResult).toBe(true);
    expect(result.current.userAnswers).toHaveLength(1);
    expect(result.current.userAnswers[0].isCorrect).toBe(true);
  });

  it('devrait traiter une réponse incorrecte', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      const isCorrect = result.current.handleAnswer('au revoir');
      expect(isCorrect).toBe(false);
    });
    expect(result.current.score).toBe(0);
    expect(result.current.selectedChoice).toBe('au revoir');
    expect(result.current.showResult).toBe(true);
    expect(result.current.userAnswers).toHaveLength(1);
    expect(result.current.userAnswers[0].isCorrect).toBe(false);
  });

  it('devrait passer à la question suivante', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      result.current.handleAnswer('bonjour');
      result.current.goToNextQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.currentQuestion).toEqual(mockQuestions[1]);
    expect(result.current.selectedChoice).toBeNull();
    expect(result.current.showResult).toBe(false);
  });

  // ✅ TEST CORRIGÉ
  it('devrait marquer le quiz comme terminé après la dernière question', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    
    // Répondre à la première question et passer à la suivante
    act(() => {
      result.current.handleAnswer('bonjour');
      result.current.goToNextQuestion();
    });

    // Répondre à la dernière question et passer à la fin du quiz
    act(() => {
      result.current.handleAnswer('au revoir');
      result.current.goToNextQuestion();
    });

    expect(result.current.isFinished).toBe(true);
    expect(result.current.currentQuestion).toBeNull();
  });

  it('devrait retourner false si handleAnswer est appelé avec un quiz vide', () => {
    const { result } = renderHook(() => useQuizEngine([]));
    const isCorrect = result.current.handleAnswer('bonjour');
    expect(isCorrect).toBe(false);
  });

  it('devrait retourner false si handleAnswer est appelé après la dernière question', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      result.current.handleAnswer('bonjour');
      result.current.goToNextQuestion();
      result.current.handleAnswer('au revoir');
      result.current.goToNextQuestion(); // Fin du quiz
    });
    const isCorrect = result.current.handleAnswer('merci');
    expect(isCorrect).toBe(false);
  });

  it('devrait redémarrer le quiz correctement', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      result.current.handleAnswer('bonjour');
      result.current.goToNextQuestion();
      result.current.handleRestart();
    });
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.selectedChoice).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.userAnswers).toEqual([]);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
  });

  it('devrait empêcher les réponses multiples sur la même question', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));
    act(() => {
      result.current.handleAnswer('bonjour'); // Première réponse
    });
    expect(result.current.showResult).toBe(true);
    act(() => {
      const secondAttempt = result.current.handleAnswer('salut');
      expect(secondAttempt).toBe(false);
    });
    expect(result.current.userAnswers).toHaveLength(1);
    expect(result.current.score).toBe(1);
  });
  // Test pour un quiz avec des questions nulles ou indéfinies
it('devrait gérer correctement un quiz avec des questions nulles ou indéfinies', () => {
  const { result: nullResult } = renderHook(() => useQuizEngine(null));
  expect(nullResult.current.totalQuestions).toBe(0);
  expect(nullResult.current.currentQuestion).toBeNull();
  expect(nullResult.current.progress).toBe(0);

  const { result: undefinedResult } = renderHook(() => useQuizEngine(undefined));
  expect(undefinedResult.current.totalQuestions).toBe(0);
  expect(undefinedResult.current.currentQuestion).toBeNull();
  expect(undefinedResult.current.progress).toBe(0);
});
});