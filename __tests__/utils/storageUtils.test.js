// __tests__/utils/storageUtils.test.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  isStorageAvailable,
  storeData,
  getData,
  removeData,
  getMultipleData,
  clearAllData,
  storageService
} from '../../src/utils/storageUtils';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiGet: jest.fn(),
  clear: jest.fn(),
}));

describe('storageUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isStorageAvailable', () => {
    it('devrait retourner true si AsyncStorage fonctionne', async () => {
      AsyncStorage.setItem.mockResolvedValue();
      AsyncStorage.removeItem.mockResolvedValue();

      const result = await isStorageAvailable();
      expect(result).toBe(true);
    });

    it('devrait retourner false si AsyncStorage échoue', async () => {
      AsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));

      const result = await isStorageAvailable();
      expect(result).toBe(false);
    });
  });

  describe('storeData', () => {
    it('devrait stocker des données avec succès', async () => {
      AsyncStorage.setItem.mockResolvedValue();

      const result = await storeData('test-key', { data: 'test' });

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('test-key', '{"data":"test"}');
    });

    it('devrait retourner false en cas d\'erreur', async () => {
      AsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));

      const result = await storeData('test-key', { data: 'test' });

      expect(result).toBe(false);
    });
  });

  describe('getData', () => {
    it('devrait récupérer des données stockées', async () => {
      AsyncStorage.getItem.mockResolvedValue('{"data":"test"}');

      const result = await getData('test-key');

      expect(result).toEqual({ data: 'test' });
    });

    it('devrait retourner null si aucune donnée', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const result = await getData('test-key');

      expect(result).toBeNull();
    });

    it('devrait retourner null en cas d\'erreur', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const result = await getData('test-key');

      expect(result).toBeNull();
    });
  });

  describe('removeData', () => {
    it('devrait supprimer des données avec succès', async () => {
      AsyncStorage.removeItem.mockResolvedValue();

      const result = await removeData('test-key');

      expect(result).toBe(true);
    });

    it('devrait retourner false en cas d\'erreur', async () => {
      AsyncStorage.removeItem.mockRejectedValue(new Error('Storage error'));

      const result = await removeData('test-key');

      expect(result).toBe(false);
    });
  });

  describe('getMultipleData', () => {
    it('devrait récupérer plusieurs données', async () => {
      AsyncStorage.multiGet.mockResolvedValue([
        ['key1', '{"data":"value1"}'],
        ['key2', '{"data":"value2"}'],
        ['key3', null]
      ]);

      const result = await getMultipleData(['key1', 'key2', 'key3']);

      expect(result).toEqual({
        key1: { data: 'value1' },
        key2: { data: 'value2' },
        key3: null
      });
    });

    it('devrait retourner un objet vide en cas d\'erreur', async () => {
      AsyncStorage.multiGet.mockRejectedValue(new Error('Storage error'));

      const result = await getMultipleData(['key1', 'key2']);

      expect(result).toEqual({});
    });
  });

  describe('clearAllData', () => {
    it('devrait effacer toutes les données', async () => {
      AsyncStorage.clear.mockResolvedValue();

      const result = await clearAllData();

      expect(result).toBe(true);
    });

    it('devrait retourner false en cas d\'erreur', async () => {
      AsyncStorage.clear.mockRejectedValue(new Error('Storage error'));

      const result = await clearAllData();

      expect(result).toBe(false);
    });
  });

  describe('storageService', () => {
    describe('saveProgress et getProgress', () => {
      it('devrait sauvegarder et récupérer la progression', async () => {
        AsyncStorage.setItem.mockResolvedValue();
        AsyncStorage.getItem.mockResolvedValue('{"level":2,"score":85}');

        const progressData = { level: 2, score: 85 };
        const saveResult = await storageService.saveProgress(progressData);
        const getResult = await storageService.getProgress();

        expect(saveResult).toBe(true);
        expect(getResult).toEqual(progressData);
      });
    });

    describe('saveSettings et getSettings', () => {
      it('devrait sauvegarder et récupérer les paramètres', async () => {
        AsyncStorage.setItem.mockResolvedValue();
        AsyncStorage.getItem.mockResolvedValue('{"theme":"dark","language":"fr"}');

        const settings = { theme: 'dark', language: 'fr' };
        const saveResult = await storageService.saveSettings(settings);
        const getResult = await storageService.getSettings();

        expect(saveResult).toBe(true);
        expect(getResult).toEqual(settings);
      });
    });

    describe('markExerciseCompleted et isExerciseCompleted', () => {
      it('devrait marquer un exercice comme complété', async () => {
        AsyncStorage.getItem.mockResolvedValue('{}');
        AsyncStorage.setItem.mockResolvedValue();

        const result = await storageService.markExerciseCompleted('vocab-1', 'level-1', 90);

        expect(result).toBe(true);
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });

      it('devrait vérifier si un exercice est complété', async () => {
        AsyncStorage.getItem.mockResolvedValue('{"vocab-1":{"level":"level-1","score":90}}');

        const result = await storageService.isExerciseCompleted('vocab-1');

        expect(result).toBe(true);
      });

      it('devrait retourner false pour un exercice non complété', async () => {
        AsyncStorage.getItem.mockResolvedValue('{}');

        const result = await storageService.isExerciseCompleted('vocab-2');

        expect(result).toBe(false);
      });
    });

    describe('getStreak', () => {
      it('devrait récupérer les données de streak existantes', async () => {
        AsyncStorage.getItem.mockResolvedValue('{"currentStreak":5,"maxStreak":10,"lastLoginDate":"2022-01-01"}');

        const result = await storageService.getStreak();

        expect(result.currentStreak).toBe(5);
        expect(result.maxStreak).toBe(10);
        expect(result.lastLoginDate).toBe("2022-01-01");
      });

      it('devrait avoir une structure de données cohérente', () => {
        // Test synchrone pour vérifier la structure
        expect(storageService.keys).toBeDefined();
        expect(storageService.keys.STREAK_DATA).toBe('streakData');
        expect(typeof storageService.getStreak).toBe('function');
      });
    });

    describe('resetAllData', () => {
      it('devrait réinitialiser toutes les données', async () => {
        AsyncStorage.clear.mockResolvedValue();

        const result = await storageService.resetAllData();

        expect(result).toBe(true);
        expect(AsyncStorage.clear).toHaveBeenCalled();
      });
    });

    describe('Structure du service', () => {
      it('devrait avoir toutes les clés de service définies', () => {
        expect(storageService.keys).toBeDefined();
        expect(storageService.keys.USER_PROGRESS).toBe('userProgress');
        expect(storageService.keys.USER_SETTINGS).toBe('userSettings');
        expect(storageService.keys.LAST_ACTIVITY).toBe('lastActivity');
        expect(storageService.keys.CURRENT_LEVEL).toBe('currentLevel');
        expect(storageService.keys.STREAK_DATA).toBe('streakData');
        expect(storageService.keys.COMPLETED_EXERCISES).toBe('completedExercises');
      });

      it('devrait avoir toutes les fonctions de service', () => {
        expect(typeof storageService.saveProgress).toBe('function');
        expect(typeof storageService.getProgress).toBe('function');
        expect(typeof storageService.saveSettings).toBe('function');
        expect(typeof storageService.getSettings).toBe('function');
        expect(typeof storageService.markExerciseCompleted).toBe('function');
        expect(typeof storageService.isExerciseCompleted).toBe('function');
        expect(typeof storageService.getStreak).toBe('function');
        expect(typeof storageService.resetAllData).toBe('function');
      });
    });
  });

  describe('Gestion des erreurs et edge cases', () => {
    it('devrait gérer les données null et undefined', async () => {
      AsyncStorage.setItem.mockResolvedValue();
      AsyncStorage.removeItem.mockResolvedValue();

      const result1 = await storeData('null-test', null);
      const result2 = await storeData('undefined-test', undefined);

      expect(result1).toBe(true);
      expect(result2).toBe(true);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(2);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('null-test');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('undefined-test');
    });

    it('devrait gérer les objets circulaires', async () => {
      const circularObj = { name: 'test' };
      circularObj.self = circularObj;

      const result = await storeData('circular', circularObj);

      expect(result).toBe(false); // JSON.stringify devrait échouer
    });
  });
});