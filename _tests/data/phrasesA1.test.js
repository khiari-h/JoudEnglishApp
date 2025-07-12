import phrasesA1 from '../../src/data/phrases/1';

describe('phrasesA1 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesA1.categories)).toBe(true);
    expect(phrasesA1.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesA1.phrases)).toBe(true);
    expect(phrasesA1.phrases.length).toBeGreaterThan(0);
  });
});
