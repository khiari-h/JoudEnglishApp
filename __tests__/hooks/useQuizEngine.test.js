// __tests__/hooks/useQuizEngine.test.js
import { renderHook, act } from '@testing-library/react-native';
import useQuizEngine from '../../src/hooks/useQuizEngine';

describe('useQuizEngine', () => {
  const mockQuestions = [
    {
      word: 'hello',
      choices: ['bonjour', 'au revoir', 'merci', 'salut'],
      correctAnswer: 'bonjour'
    },
    {
      word: 'goodbye',
      choices: ['au revoir', 'bonjour', 'merci', 'salut'],
      correctAnswer: 'au revoir'
    }
  ];

  it('devrait initialiser correctement', () => {
    const { result } = renderHook(() => useQuizEngine(mockQuestions));

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.selectedChoice).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
    expect(result.current.progress).toBe(0);
  });

  it('devrait gérer les questions vides', () => {
    const { result } = renderHook(() => useQuizEngine([]));

    expect(result.current.totalQuestions).toBe(0);
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.progress).toBe(0);
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

  it('devrait redémarrer le quiz', () => {
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
  });
});