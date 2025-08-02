import { renderHook, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import useErrorCorrection from '../src/screens/exercises/errorCorrection/hooks/useErrorCorrection';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Le mock d'AsyncStorage est déjà dans jest.setup.js, mais c'est une bonne pratique de l'avoir ici aussi pour la clarté.
jest.mock('@react-native-async-storage/async-storage');

// Données de test minimales pour le hook
const mockErrorCorrectionData = {
  categories: [
    { id: 1, name: 'Tenses' },
    { id: 2, name: 'Prepositions' },
  ],
  exercises: [
    { 
      id: 101, categoryId: 1, text: 'I has a car.', correctedText: 'I have a car.', errorPositions: [1] 
    },
    { 
      id: 102, categoryId: 1, text: 'She go to school.', correctedText: 'She goes to school.', errorPositions: [1], 
      choices: ['She go to school.', 'She goes to school.', 'She going to school.'], correctChoiceIndex: 1 
    },
    { 
      id: 201, categoryId: 2, text: 'He is good on math.', correctedText: 'He is good at math.', errorPositions: [3] 
    },
  ],
};

describe('useErrorCorrection Hook', () => {
  let alertSpy;

  beforeEach(() => {
    // S'assure que le stockage est vide avant chaque test
    AsyncStorage.clear();
    // Empêche Alert.alert de bloquer les tests et nettoie les appels précédents
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaure l'implémentation originale après chaque test
    alertSpy.mockRestore();
  });

  it('should initialize with the first category and exercise', async () => {
    // On "rend" le hook avec nos données de test
    const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));

    // On attend que le hook ait fini de charger ses données asynchrones
    await act(async () => {
      // Cette attente est nécessaire pour que les useEffect asynchrones se terminent
    });

    expect(result.current.loaded).toBe(true);
    expect(result.current.selectedCategory).toBe(1); // L'ID de la première catégorie
    expect(result.current.currentExercise.id).toBe(101); // L'ID du premier exercice de cette catégorie
  });

  describe('checkAnswer function', () => {
    it('should handle correct answer in "full" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      
      await act(async () => { /* wait for init */ });
      
      act(() => {
        result.current.startExercise('full');
        result.current.setUserCorrection('I have a car.');
      });

      act(() => {
        result.current.checkAnswer();
      });

      expect(result.current.isCorrect).toBe(true);
      expect(result.current.showFeedback).toBe(true);
      expect(result.current.score).toBe(1);
    });

    it('should handle incorrect answer in "full" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));

      await act(async () => { /* wait for init */ });

      act(() => {
        result.current.startExercise('full');
        result.current.setUserCorrection('I having a car.'); // Incorrect
      });

      act(() => {
        result.current.checkAnswer();
      });

      expect(result.current.isCorrect).toBe(false);
      expect(result.current.showFeedback).toBe(true);
      expect(result.current.score).toBe(0);
    });

    it('should handle correct answer in "identify" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      act(() => {
        result.current.startExercise('identify');
      });

      act(() => {
        // L'erreur dans l'exercice 101 est sur le mot à l'index 1 ("has")
        result.current.handleWordPress(1); 
      });

      act(() => {
        result.current.checkAnswer();
      });

      expect(result.current.isCorrect).toBe(true);
      expect(result.current.score).toBe(1);
    });

    it('should handle incorrect answer in "identify" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      act(() => {
        result.current.startExercise('identify');
      });

      act(() => {
        // L'utilisateur sélectionne le mauvais mot (index 0)
        result.current.handleWordPress(0); 
      });

      act(() => {
        result.current.checkAnswer();
      });

      expect(result.current.isCorrect).toBe(false);
      expect(result.current.score).toBe(0);
    });

    it('should handle correct answer in "multiple_choice" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      // On passe à l'exercice suivant qui a des choix multiples
      act(() => { result.current.handleNext(); });
      
      act(() => {
        result.current.startExercise('multiple_choice');
        // Le bon choix pour l'exercice 102 est à l'index 1
        result.current.handleChoiceSelect(1);
      });

      act(() => { result.current.checkAnswer(); });

      expect(result.current.isCorrect).toBe(true);
      expect(result.current.score).toBe(1);
    });

    it('should handle incorrect answer in "multiple_choice" mode', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      act(() => { result.current.handleNext(); });
      act(() => { result.current.startExercise('multiple_choice'); result.current.handleChoiceSelect(0); });
      act(() => { result.current.checkAnswer(); });

      expect(result.current.isCorrect).toBe(false);
      expect(result.current.score).toBe(0);
    });
  });

  describe('Navigation and Progress', () => {
    it('should navigate to the next exercise with handleNext and mark as complete', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      expect(result.current.currentExercise.id).toBe(101);

      act(() => {
        result.current.handleNext();
      });

      expect(result.current.currentExercise.id).toBe(102);
      // Vérifie que l'exercice précédent (index 0) est marqué comme complété pour la catégorie 1
      expect(result.current.completedExercises[1]).toContain(0);
    });

    it('should navigate to the previous exercise with handlePrevious', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      act(() => {
        result.current.handleNext();
      });

      expect(result.current.currentExercise.id).toBe(102);

      act(() => {
        result.current.handlePrevious();
      });

      expect(result.current.currentExercise.id).toBe(101);
    });

    it('should navigate to the next category when the current one is finished', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      // Passe le premier exercice
      act(() => { result.current.handleNext(); });
      // Passe le deuxième (et dernier) exercice de la catégorie 1
      act(() => { result.current.handleNext(); });

      // Doit maintenant être dans la catégorie 2, au premier exercice
      expect(result.current.selectedCategory).toBe(2);
      expect(result.current.currentExercise.id).toBe(201);
    });
  });

  describe('Persistence with AsyncStorage', () => {
    it('should save progress and restore it on re-initialization', async () => {
      const level = 'A1';
      
      // --- Première session ---
      // On simule un utilisateur qui commence l'exercice
      const { result, unmount } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, level));
      await act(async () => { /* wait for init */ });

      // L'utilisateur progresse : il passe à l'exercice suivant
      act(() => {
        result.current.handleNext();
      });

      // On vérifie que l'état a bien changé
      expect(result.current.currentExercise.id).toBe(102);
      expect(result.current.completedExercises[1]).toContain(0);

      // L'utilisateur quitte l'écran. Le hook est "démonté", ce qui doit déclencher la sauvegarde.
      unmount();

      // --- Deuxième session ---
      // L'utilisateur revient plus tard. On "remonte" un nouveau hook.
      const { result: result2 } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, level));
      
      // On attend que le hook se charge et lise les données depuis AsyncStorage.
      await act(async () => { /* wait for init and load */ });

      // On vérifie que la progression a été correctement restaurée.
      expect(result2.current.loaded).toBe(true);
      expect(result2.current.currentExercise.id).toBe(102); // Doit être sur le deuxième exercice
      expect(result2.current.completedExercises[1]).toContain(0); // Le premier exercice doit être marqué comme complété
      expect(result2.current.selectedCategory).toBe(1);
    });
  });

  describe('Completion and Category Selection', () => {
    it('should set isFinished to true when all exercises are completed', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      // Complete all exercises in category 1 (2 exercises)
      act(() => { result.current.handleNext(); });
      act(() => { result.current.handleNext(); });

      // Complete all exercises in category 2 (1 exercise)
      act(() => { result.current.handleNext(); });

      // After the last exercise, isFinished should be true
      expect(result.current.isFinished).toBe(true);
    });

    it('should switch to the correct category and exercise when changeCategory is called', async () => {
      const { result } = renderHook(() => useErrorCorrection(mockErrorCorrectionData, 'A1'));
      await act(async () => { /* wait for init */ });

      // Initially on category 1, exercise 101
      expect(result.current.selectedCategory).toBe(1);
      expect(result.current.currentExercise.id).toBe(101);

      // User selects category 2
      act(() => {
        result.current.changeCategory(2);
      });

      // The hook should now be on category 2, and its first exercise (201)
      expect(result.current.selectedCategory).toBe(2);
      expect(result.current.currentExercise.id).toBe(201);
    });
  });
});