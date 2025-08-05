// __tests__/utils/timeUtils.test.js
import {
  isValidTimeInSeconds,
  sanitizeTimeStats,
  getElapsedSeconds,
  secondsToMinutes,
  minutesToSeconds,
  formatTime,
  formatTimeCompact,
  isValidStatsStructure,
  getTotalTimeFromStats,
  getSortedStatsByTime,
  hasMinimumTime
} from '../../src/utils/timeUtils';

describe('timeUtils', () => {
  describe('isValidTimeInSeconds', () => {
    it('devrait valider les temps corrects', () => {
      expect(isValidTimeInSeconds(0)).toBe(true);
      expect(isValidTimeInSeconds(60)).toBe(true);
      expect(isValidTimeInSeconds(3600)).toBe(true);
      expect(isValidTimeInSeconds(86400)).toBe(true); // 24h max
    });

    it('devrait rejeter les temps invalides', () => {
      expect(isValidTimeInSeconds(-1)).toBe(false);
      expect(isValidTimeInSeconds(86401)).toBe(false); // > 24h
      expect(isValidTimeInSeconds(NaN)).toBe(false);
      expect(isValidTimeInSeconds(Infinity)).toBe(false);
      expect(isValidTimeInSeconds('60')).toBe(false);
      expect(isValidTimeInSeconds(null)).toBe(false);
      expect(isValidTimeInSeconds(undefined)).toBe(false);
    });
  });

  describe('sanitizeTimeStats', () => {
    it('devrait sanitiser des stats valides', () => {
      const stats = {
        vocabulary: 120,
        grammar: 180,
        reading: 240,
        phrases: 60,
        conversations: 300,
        spelling: 90,
        errorCorrection: 150,
        wordGames: 75,
        assessment: 200
      };

      const result = sanitizeTimeStats(stats);

      expect(result).toEqual(stats);
    });

    it('devrait corriger les valeurs invalides', () => {
      const stats = {
        vocabulary: -10,
        grammar: 'invalid',
        reading: NaN,
        phrases: Infinity,
        conversations: 150.7,
        spelling: null,
        errorCorrection: undefined,
        wordGames: 86401, // > 24h
        assessment: 100
      };

      const result = sanitizeTimeStats(stats);

      expect(result.vocabulary).toBe(0);
      expect(result.grammar).toBe(0);
      expect(result.reading).toBe(0);
      expect(result.phrases).toBe(0);
      expect(result.conversations).toBe(150); // Arrondi
      expect(result.spelling).toBe(0);
      expect(result.errorCorrection).toBe(0);
      expect(result.wordGames).toBe(0);
      expect(result.assessment).toBe(100);
    });

    it('devrait retourner les valeurs par défaut pour des données nulles', () => {
      expect(sanitizeTimeStats(null)).toBeDefined();
      expect(sanitizeTimeStats(undefined)).toBeDefined();
      expect(sanitizeTimeStats({})).toBeDefined();
      expect(sanitizeTimeStats('invalid')).toBeDefined();
    });
  });

  describe('getElapsedSeconds', () => {
    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(1640995200000); // 2022-01-01 00:00:00
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('devrait calculer le temps écoulé correctement', () => {
      const startTime = 1640995200000 - 60000; // 1 minute avant
      const elapsed = getElapsedSeconds(startTime);

      expect(elapsed).toBe(60);
    });

    it('devrait retourner 0 pour des timestamps invalides', () => {
      expect(getElapsedSeconds(null)).toBe(0);
      expect(getElapsedSeconds(undefined)).toBe(0);
      expect(getElapsedSeconds('invalid')).toBe(0);
    });

    it('devrait retourner 0 pour des temps futurs', () => {
      const futureTime = 1640995200000 + 60000; // 1 minute dans le futur
      const elapsed = getElapsedSeconds(futureTime);

      expect(elapsed).toBe(0);
    });
  });

  describe('secondsToMinutes', () => {
    it('devrait convertir les secondes en minutes', () => {
      expect(secondsToMinutes(60)).toBe(1);
      expect(secondsToMinutes(120)).toBe(2);
      expect(secondsToMinutes(90)).toBe(1); // Arrondi vers le bas
      expect(secondsToMinutes(0)).toBe(0);
    });

    it('devrait gérer les valeurs invalides', () => {
      expect(secondsToMinutes(-60)).toBe(0);
      expect(secondsToMinutes(NaN)).toBe(0);
      expect(secondsToMinutes('60')).toBe(0);
      expect(secondsToMinutes(null)).toBe(0);
    });
  });

  describe('minutesToSeconds', () => {
    it('devrait convertir les minutes en secondes', () => {
      expect(minutesToSeconds(1)).toBe(60);
      expect(minutesToSeconds(2)).toBe(120);
      expect(minutesToSeconds(0.5)).toBe(30);
      expect(minutesToSeconds(0)).toBe(0);
    });

    it('devrait gérer les valeurs invalides', () => {
      expect(minutesToSeconds(-1)).toBe(0);
      expect(minutesToSeconds(NaN)).toBe(0);
      expect(minutesToSeconds('1')).toBe(0);
      expect(minutesToSeconds(null)).toBe(0);
    });
  });

  describe('formatTime', () => {
    it('devrait formater les temps courts', () => {
      expect(formatTime(0)).toBe('0s');
      expect(formatTime(30)).toBe('30s');
      expect(formatTime(59)).toBe('59s');
    });

    it('devrait formater les temps en minutes', () => {
      expect(formatTime(60)).toBe('1m');
      expect(formatTime(120)).toBe('2m');
      expect(formatTime(90)).toBe('1m 30s');
      expect(formatTime(150)).toBe('2m 30s');
    });

    it('devrait gérer les valeurs invalides', () => {
      expect(formatTime(-60)).toBe('0s');
      expect(formatTime(NaN)).toBe('0s');
      expect(formatTime('60')).toBe('0s');
      expect(formatTime(null)).toBe('0s');
    });
  });

  describe('formatTimeCompact', () => {
    it('devrait formater en format compact', () => {
      expect(formatTimeCompact(0)).toBe('0:00');
      expect(formatTimeCompact(30)).toBe('0:30');
      expect(formatTimeCompact(60)).toBe('1:00');
      expect(formatTimeCompact(90)).toBe('1:30');
      expect(formatTimeCompact(3661)).toBe('61:01'); // > 1h
    });

    it('devrait gérer les valeurs invalides', () => {
      expect(formatTimeCompact(-60)).toBe('0:00');
      expect(formatTimeCompact(NaN)).toBe('0:00');
      expect(formatTimeCompact(null)).toBe('0:00');
    });
  });

  describe('isValidStatsStructure', () => {
    it('devrait valider une structure correcte', () => {
      const validStats = {
        vocabulary: 120,
        grammar: 180,
        reading: 240,
        phrases: 60,
        conversations: 300,
        spelling: 90,
        errorCorrection: 150,
        wordGames: 75,
        assessment: 200
      };

      expect(isValidStatsStructure(validStats)).toBe(true);
    });

    it('devrait rejeter les structures invalides', () => {
      expect(isValidStatsStructure(null)).toBe(false);
      expect(isValidStatsStructure(undefined)).toBe(false);
      expect(isValidStatsStructure({})).toBe(false);
      expect(isValidStatsStructure({ vocabulary: 'invalid' })).toBe(false);
      expect(isValidStatsStructure({ vocabulary: 120 })).toBe(false); // Manque les autres
    });
  });

  describe('getTotalTimeFromStats', () => {
    it('devrait calculer le temps total', () => {
      const stats = {
        vocabulary: 120,
        grammar: 180,
        reading: 240,
        phrases: 60,
        conversations: 300,
        spelling: 90,
        errorCorrection: 150,
        wordGames: 75,
        assessment: 200
      };

      const total = getTotalTimeFromStats(stats);
      expect(total).toBe(1415); // Somme de tous les temps
    });

    it('devrait retourner 0 pour des stats invalides', () => {
      expect(getTotalTimeFromStats(null)).toBe(0);
      expect(getTotalTimeFromStats({})).toBe(0);
      expect(getTotalTimeFromStats({ vocabulary: 'invalid' })).toBe(0);
    });
  });

  describe('getSortedStatsByTime', () => {
    it('devrait trier les stats par temps décroissant', () => {
      const stats = {
        vocabulary: 120,
        grammar: 300,
        reading: 60,
        phrases: 180,
        conversations: 240,
        spelling: 90,
        errorCorrection: 150,
        wordGames: 75,
        assessment: 200
      };

      const sorted = getSortedStatsByTime(stats);

      expect(sorted[0]).toEqual({ exerciseType: 'grammar', time: 300 });
      expect(sorted[1]).toEqual({ exerciseType: 'conversations', time: 240 });
      expect(sorted[2]).toEqual({ exerciseType: 'assessment', time: 200 });
      expect(sorted[sorted.length - 1]).toEqual({ exerciseType: 'reading', time: 60 });
    });

    it('devrait retourner un tableau vide pour des stats invalides', () => {
      expect(getSortedStatsByTime(null)).toEqual([]);
      expect(getSortedStatsByTime({})).toEqual([]);
    });
  });

  describe('hasMinimumTime', () => {
    const validStats = {
      vocabulary: 120, // 2 minutes
      grammar: 180,    // 3 minutes
      reading: 30,     // 0.5 minutes
      phrases: 60,     // 1 minute
      conversations: 300,
      spelling: 90,
      errorCorrection: 150,
      wordGames: 75,
      assessment: 200
    };

    it('devrait vérifier le temps minimum correctement', () => {
      expect(hasMinimumTime(validStats, 'vocabulary', 1)).toBe(true);
      expect(hasMinimumTime(validStats, 'vocabulary', 2)).toBe(true);
      expect(hasMinimumTime(validStats, 'vocabulary', 3)).toBe(false);
      
      expect(hasMinimumTime(validStats, 'reading', 1)).toBe(false);
      expect(hasMinimumTime(validStats, 'phrases', 1)).toBe(true);
    });

    it('devrait utiliser 1 minute par défaut', () => {
      expect(hasMinimumTime(validStats, 'vocabulary')).toBe(true);
      expect(hasMinimumTime(validStats, 'reading')).toBe(false);
    });

    it('devrait retourner false pour des données invalides', () => {
      expect(hasMinimumTime(null, 'vocabulary')).toBe(false);
      expect(hasMinimumTime(validStats, 'invalidType')).toBe(false);
      expect(hasMinimumTime({}, 'vocabulary')).toBe(false);
    });
  });

  describe('Edge cases et performance', () => {
    it('devrait gérer les très grandes valeurs', () => {
      const largeValue = 86400; // 24h en secondes
      expect(isValidTimeInSeconds(largeValue)).toBe(true);
      expect(formatTime(largeValue)).toBe('1440m');
      expect(formatTimeCompact(largeValue)).toBe('1440:00');
    });

    it('devrait gérer les valeurs décimales', () => {
      expect(isValidTimeInSeconds(60.5)).toBe(true);
      expect(sanitizeTimeStats({ vocabulary: 60.7 }).vocabulary).toBe(60);
    });

    it('devrait être performant avec de gros objets', () => {
      const bigStats = {};
      for (let i = 0; i < 1000; i++) {
        bigStats[`exercise${i}`] = Math.floor(Math.random() * 1000);
      }

      const start = Date.now();
      getTotalTimeFromStats(bigStats);
      const end = Date.now();

      expect(end - start).toBeLessThan(100); // Moins de 100ms
    });
  });
});