import vocabularyBonus from '../../src/data/vocabulary/bonus';

describe('vocabularyBonus data', () => {
  it('doit avoir une propriété exercises qui est un tableau non vide', () => {
    expect(Array.isArray(vocabularyBonus.exercises)).toBe(true);
    expect(vocabularyBonus.exercises.length).toBeGreaterThan(0);
  });
  it('chaque catégorie doit avoir un tableau words non vide', () => {
    vocabularyBonus.exercises.forEach(cat => {
      expect(Array.isArray(cat.words)).toBe(true);
      expect(cat.words.length).toBeGreaterThan(0);
    });
  });
  it('chaque mot doit avoir les clés word et example, et au moins translation ou trending', () => {
    vocabularyBonus.exercises.forEach(cat => {
      cat.words.forEach(entry => {
        expect(entry).toHaveProperty('word');
        expect(entry).toHaveProperty('example');
        // Certains mots peuvent avoir trending au lieu de translation
        expect(entry).toEqual(
          expect.objectContaining({
            word: expect.any(String),
            example: expect.any(String),
          })
        );
        expect(entry.translation || entry.trending).toBeTruthy();
      });
    });
  });
});
