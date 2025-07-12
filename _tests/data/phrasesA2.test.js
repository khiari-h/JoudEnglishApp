import phrasesA2 from '../../src/data/phrases/2';

describe('phrasesA2 data', () => {
  it('should have categories', () => {
    expect(Array.isArray(phrasesA2.categories)).toBe(true);
    expect(phrasesA2.categories.length).toBeGreaterThan(0);
  });
  it('should have phrases', () => {
    expect(Array.isArray(phrasesA2.phrases)).toBe(true);
    expect(phrasesA2.phrases.length).toBeGreaterThan(0);
  });
});
