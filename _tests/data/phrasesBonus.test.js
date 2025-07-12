import phrasesBonus from '../../src/data/phrases/bonus';

describe('phrasesBonus data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesBonus.categories)).toBe(true);
    expect(phrasesBonus.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesBonus.phrases)).toBe(true);
    expect(phrasesBonus.phrases.length).toBeGreaterThan(0);
  });
});
