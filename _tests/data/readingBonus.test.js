import readingBonus from '../../src/data/reading/bonus';

describe('readingBonus data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingBonus.texts)).toBe(true);
    expect(readingBonus.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingBonus.questions)).toBe(true);
    expect(readingBonus.questions.length).toBeGreaterThan(0);
  });
});
