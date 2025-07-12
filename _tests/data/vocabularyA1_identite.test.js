import { vocab as identiteVocab } from '../../src/data/vocabulary/1/categories/01_identite';

describe('vocabulaire identité (A1)', () => {
  it('doit avoir un tableau de mots non vide', () => {
    expect(Array.isArray(identiteVocab.words)).toBe(true);
    expect(identiteVocab.words.length).toBeGreaterThan(0);
  });
  it('chaque mot doit avoir les clés word, translation, example', () => {
    identiteVocab.words.forEach(entry => {
      expect(entry).toHaveProperty('word');
      expect(entry).toHaveProperty('translation');
      expect(entry).toHaveProperty('example');
    });
  });
});
