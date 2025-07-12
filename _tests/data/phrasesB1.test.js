import phrasesB1 from '../../src/data/phrases/3';

describe('phrasesB1 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesB1.categories)).toBe(true);
    expect(phrasesB1.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesB1.phrases)).toBe(true);
    expect(phrasesB1.phrases.length).toBeGreaterThan(0);
  });
});
