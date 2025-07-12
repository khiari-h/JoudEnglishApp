import phrasesB2 from '../../src/data/phrases/4';

describe('phrasesB2 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesB2.categories)).toBe(true);
    expect(phrasesB2.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesB2.phrases)).toBe(true);
    expect(phrasesB2.phrases.length).toBeGreaterThan(0);
  });
});
