import vocabularyB1 from '../../src/data/vocabulary/3';

describe('vocabularyB1 data', () => {
  it('doit avoir une propriété exercises qui est un tableau non vide', () => {
    expect(Array.isArray(vocabularyB1.exercises)).toBe(true);
    expect(vocabularyB1.exercises.length).toBeGreaterThan(0);
  });
  it('chaque catégorie doit avoir un tableau words non vide', () => {
    vocabularyB1.exercises.forEach(cat => {
      expect(Array.isArray(cat.words)).toBe(true);
      expect(cat.words.length).toBeGreaterThan(0);
    });
  });
  it('chaque mot doit avoir les clés word, translation, example', () => {
    vocabularyB1.exercises.forEach(cat => {
      cat.words.forEach(entry => {
        expect(entry).toHaveProperty('word');
        expect(entry).toHaveProperty('translation');
        expect(entry).toHaveProperty('example');
      });
    });
  });
});
