import vocabularyB2 from '../../src/data/vocabulary/4';

describe('vocabularyB2 data', () => {
  it('doit avoir une propriété exercises qui est un tableau non vide', () => {
    expect(Array.isArray(vocabularyB2.exercises)).toBe(true);
    expect(vocabularyB2.exercises.length).toBeGreaterThan(0);
  });
  it('chaque catégorie doit avoir un tableau words non vide', () => {
    vocabularyB2.exercises.forEach(cat => {
      expect(Array.isArray(cat.words)).toBe(true);
      expect(cat.words.length).toBeGreaterThan(0);
    });
  });
  it('chaque mot doit avoir les clés word, translation, example', () => {
    vocabularyB2.exercises.forEach(cat => {
      cat.words.forEach(entry => {
        expect(entry).toHaveProperty('word');
        expect(entry).toHaveProperty('translation');
        expect(entry).toHaveProperty('example');
      });
    });
  });
});
