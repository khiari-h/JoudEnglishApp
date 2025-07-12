import vocabularyC1 from '../../src/data/vocabulary/5';

describe('vocabularyC1 data', () => {
  it('doit avoir une propriété exercises qui est un tableau non vide', () => {
    expect(Array.isArray(vocabularyC1.exercises)).toBe(true);
    expect(vocabularyC1.exercises.length).toBeGreaterThan(0);
  });
  it('chaque catégorie doit avoir un tableau words non vide', () => {
    vocabularyC1.exercises.forEach(cat => {
      expect(Array.isArray(cat.words)).toBe(true);
      expect(cat.words.length).toBeGreaterThan(0);
    });
  });
  it('chaque mot doit avoir les clés word, translation, example', () => {
    vocabularyC1.exercises.forEach(cat => {
      cat.words.forEach(entry => {
        expect(entry).toHaveProperty('word');
        expect(entry).toHaveProperty('translation');
        expect(entry).toHaveProperty('example');
      });
    });
  });
});
