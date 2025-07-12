import phrasesC2 from '../../src/data/phrases/6';

describe('phrasesC2 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesC2.categories)).toBe(true);
    expect(phrasesC2.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesC2.phrases)).toBe(true);
    expect(phrasesC2.phrases.length).toBeGreaterThan(0);
  });
});
