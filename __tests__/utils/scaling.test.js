// __tests__/utils/scaling.test.js
import {
  scale,
  verticalScale,
  moderateScale,
  pixelRound
} from '../../src/utils/scaling';

describe('scaling', () => {
  describe('Fonctions de base', () => {
    it('devrait exporter toutes les fonctions nécessaires', () => {
      expect(typeof scale).toBe('function');
      expect(typeof verticalScale).toBe('function');
      expect(typeof moderateScale).toBe('function');
      expect(typeof pixelRound).toBe('function');
    });

    it('devrait retourner des nombres pour scale', () => {
      const result = scale(10);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('devrait retourner des nombres pour verticalScale', () => {
      const result = verticalScale(10);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('devrait retourner des nombres pour moderateScale', () => {
      const result = moderateScale(10);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('devrait retourner des nombres pour pixelRound', () => {
      const result = pixelRound(10.5);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Gestion des valeurs spéciales', () => {
    it('devrait gérer la valeur 0', () => {
      expect(scale(0)).toBe(0);
      expect(verticalScale(0)).toBe(0);
      expect(moderateScale(0)).toBe(0);
      expect(pixelRound(0)).toBe(0);
    });

    it('devrait gérer les valeurs négatives', () => {
      const negativeResult = scale(-10);
      expect(typeof negativeResult).toBe('number');
      expect(isFinite(negativeResult)).toBe(true);
    });

    it('devrait gérer les valeurs décimales', () => {
      const decimalResult = scale(10.5);
      expect(typeof decimalResult).toBe('number');
      expect(isFinite(decimalResult)).toBe(true);
    });
  });

  describe('moderateScale avec facteurs', () => {
    it('devrait accepter un facteur personnalisé', () => {
      const result1 = moderateScale(20, 0);
      const result2 = moderateScale(20, 1);
      const result3 = moderateScale(20, 0.5);

      expect(typeof result1).toBe('number');
      expect(typeof result2).toBe('number');
      expect(typeof result3).toBe('number');
    });

    it('devrait utiliser le facteur par défaut', () => {
      const result = moderateScale(20);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Robustesse', () => {
    it('devrait gérer les très grandes valeurs', () => {
      const largeValue = 10000;

      expect(typeof scale(largeValue)).toBe('number');
      expect(typeof verticalScale(largeValue)).toBe('number');
      expect(typeof moderateScale(largeValue)).toBe('number');
      expect(isFinite(scale(largeValue))).toBe(true);
    });

    it('devrait gérer les très petites valeurs', () => {
      const smallValue = 0.1;

      expect(typeof scale(smallValue)).toBe('number');
      expect(typeof verticalScale(smallValue)).toBe('number');
      expect(typeof moderateScale(smallValue)).toBe('number');
      expect(isFinite(scale(smallValue))).toBe(true);
    });

    it('devrait être cohérent entre les appels', () => {
      const size = 15;

      const result1 = scale(size);
      const result2 = scale(size);

      expect(result1).toBe(result2);
    });
  });

  describe('Performance', () => {
    it('devrait être rapide pour de nombreux calculs', () => {
      const iterations = 100;
      const start = Date.now();

      for (let i = 0; i < iterations; i++) {
        scale(10 + i);
        verticalScale(10 + i);
        moderateScale(10 + i);
        pixelRound(10 + i);
      }

      const end = Date.now();
      const duration = end - start;

      expect(duration).toBeLessThan(1000); // Moins de 1 seconde
    });
  });

  describe('Cas d\'usage réels', () => {
    it('devrait produire des résultats utilisables pour l\'UI', () => {
      // Tailles typiques d'UI
      const fontSize = scale(16);
      const padding = moderateScale(20);
      const iconSize = pixelRound(24.5);

      expect(fontSize).toBeGreaterThan(0);
      expect(padding).toBeGreaterThan(0);
      expect(iconSize).toBeGreaterThan(0);

      // Vérifier que ce sont des nombres utilisables
      expect(Number.isInteger(Math.round(fontSize))).toBe(true);
      expect(Number.isInteger(Math.round(padding))).toBe(true);
      expect(Number.isInteger(Math.round(iconSize))).toBe(true);
    });
  });
});