import { shuffleArray, shuffleAndTake, shuffleWithFallback, shuffleInPlace } from '../../src/utils/arrayUtils';

// Mock Math.random pour des tests déterministes
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('arrayUtils', () => {
  beforeEach(() => {
    // Reset Math.random mock
    mockMath.random = () => 0.5;
  });

  describe('shuffleArray', () => {
    it('devrait retourner une copie de l\'array pour un array vide', () => {
      const input = [];
      const result = shuffleArray(input);
      
      expect(result).toEqual([]);
      expect(result).not.toBe(input); // Nouvelle référence
    });

    it('devrait retourner une copie de l\'array pour un array avec un seul élément', () => {
      const input = [1];
      const result = shuffleArray(input);
      
      expect(result).toEqual([1]);
      expect(result).not.toBe(input); // Nouvelle référence
    });

    it('devrait mélanger un array avec plusieurs éléments', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      
      expect(result).toHaveLength(5);
      expect(result).not.toBe(input); // Nouvelle référence
      expect(result.sort()).toEqual(input.sort()); // Même contenu
    });

    it('devrait gérer les arrays avec des éléments de différents types', () => {
      const input = [1, 'hello', { key: 'value' }, [1, 2, 3]];
      const result = shuffleArray(input);
      
      expect(result).toHaveLength(4);
      expect(result).not.toBe(input); // Nouvelle référence
      expect(result.sort()).toEqual(input.sort()); // Même contenu
    });

    it('devrait retourner un array vide pour des entrées invalides', () => {
      expect(shuffleArray(null)).toEqual([]);
      expect(shuffleArray(undefined)).toEqual([]);
      expect(shuffleArray('not an array')).toEqual([]);
      expect(shuffleArray(123)).toEqual([]);
    });
  });

  describe('shuffleAndTake', () => {
    it('devrait retourner un array vide pour un array vide', () => {
      const result = shuffleAndTake([], 5);
      expect(result).toEqual([]);
    });

    it('devrait retourner tous les éléments si count est supérieur à la taille', () => {
      const input = [1, 2, 3];
      const result = shuffleAndTake(input, 5);
      
      expect(result).toHaveLength(3);
      expect(result.sort()).toEqual(input.sort());
    });

    it('devrait retourner exactement count éléments', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleAndTake(input, 3);
      
      expect(result).toHaveLength(3);
      expect(result.sort()).toEqual([1, 2, 3, 4, 5].slice(0, 3).sort());
    });

    it('devrait gérer count = 0', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleAndTake(input, 0);
      
      expect(result).toEqual([]);
    });

    it('devrait gérer count négatif', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleAndTake(input, -1);
      
      expect(result).toEqual([]);
    });
  });

  describe('shuffleWithFallback', () => {
    it('devrait utiliser l\'array principal s\'il a assez d\'éléments', () => {
      const mainArray = [1, 2, 3, 4, 5];
      const fallbackArray = [10, 20, 30];
      const result = shuffleWithFallback(mainArray, fallbackArray, 3);
      
      expect(result).toHaveLength(3);
      expect(result.every(item => mainArray.includes(item))).toBe(true);
    });

    it('devrait utiliser le fallback si l\'array principal est vide', () => {
      const mainArray = [];
      const fallbackArray = [10, 20, 30];
      const result = shuffleWithFallback(mainArray, fallbackArray, 2);
      
      expect(result).toHaveLength(2);
      expect(result.every(item => fallbackArray.includes(item))).toBe(true);
    });

    it('devrait combiner les deux arrays si nécessaire', () => {
      const mainArray = [1, 2];
      const fallbackArray = [10, 20, 30];
      const result = shuffleWithFallback(mainArray, fallbackArray, 4);
      
      expect(result).toHaveLength(4);
      expect(result.every(item => [...mainArray, ...fallbackArray].includes(item))).toBe(true);
    });

    it('devrait gérer les arrays vides', () => {
      const result = shuffleWithFallback([], [], 5);
      expect(result).toEqual([]);
    });
  });

  describe('shuffleInPlace', () => {
    it('devrait modifier l\'array original', () => {
      const input = [1, 2, 3, 4, 5];
      const originalReference = input;
      const result = shuffleInPlace(input);
      
      expect(result).toBe(originalReference); // Même référence
      expect(result).toHaveLength(5);
    });

    it('devrait retourner l\'array original pour un array vide', () => {
      const input = [];
      const result = shuffleInPlace(input);
      
      expect(result).toBe(input);
      expect(result).toEqual([]);
    });

    it('devrait retourner l\'array original pour un array avec un seul élément', () => {
      const input = [1];
      const result = shuffleInPlace(input);
      
      expect(result).toBe(input);
      expect(result).toEqual([1]);
    });

    it('devrait gérer les arrays avec des objets', () => {
      const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = shuffleInPlace(input);
      
      expect(result).toBe(input);
      expect(result).toHaveLength(3);
    });
  });

  describe('Intégration - Utilisation réelle', () => {
    it('devrait simuler l\'utilisation dans useRevisionData', () => {
      const learnedWords = [
        { id: 1, word: 'hello', translation: 'bonjour' },
        { id: 2, word: 'world', translation: 'monde' },
        { id: 3, word: 'test', translation: 'test' },
        { id: 4, word: 'example', translation: 'exemple' },
        { id: 5, word: 'sample', translation: 'échantillon' },
      ];

      // Simuler la sélection de mots pour les révisions
      const shuffledWords = shuffleArray(learnedWords);
      const selectedWords = shuffleAndTake(shuffledWords, 3);
      
      expect(selectedWords).toHaveLength(3);
      expect(selectedWords.every(word => learnedWords.includes(word))).toBe(true);
    });

    it('devrait simuler l\'utilisation dans useWordGames', () => {
      const gameWords = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      
      // Simuler le mélange des options de jeu
      const shuffledOptions = shuffleArray(gameWords);
      
      expect(shuffledOptions).toHaveLength(5);
      expect(shuffledOptions.sort()).toEqual(gameWords.sort());
    });

    it('devrait simuler l\'utilisation dans useRevisionManager', () => {
      const oldWords = [{ id: 1, word: 'old1' }, { id: 2, word: 'old2' }];
      const newWords = [{ id: 3, word: 'new1' }, { id: 4, word: 'new2' }, { id: 5, word: 'new3' }];
      
      // Simuler la sélection et le mélange final
      const randomNewWords = shuffleAndTake(newWords, 2);
      const finalSelection = shuffleArray([...oldWords, ...randomNewWords]);
      
      expect(finalSelection).toHaveLength(4);
      expect(finalSelection.every(word => [...oldWords, ...newWords].includes(word))).toBe(true);
    });
  });

  describe('Performance et stabilité', () => {
    it('devrait gérer les grands arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const result = shuffleArray(largeArray);
      
      expect(result).toHaveLength(1000);
      expect(result).not.toBe(largeArray);
      expect(result.sort()).toEqual(largeArray.sort());
    });

    it('devrait être déterministe avec le même seed Math.random', () => {
      mockMath.random = () => 0.1;
      const input = [1, 2, 3, 4, 5];
      const result1 = shuffleArray(input);
      
      mockMath.random = () => 0.1;
      const result2 = shuffleArray(input);
      
      expect(result1).toEqual(result2);
    });
  });
});
