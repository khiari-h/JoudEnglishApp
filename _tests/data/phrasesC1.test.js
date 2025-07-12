import phrasesC1 from '../../src/data/phrases/5';

describe('phrasesC1 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesC1.categories)).toBe(true);
    expect(phrasesC1.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesC1.phrases)).toBe(true);
    expect(phrasesC1.phrases.length).toBeGreaterThan(0);
  });
});
