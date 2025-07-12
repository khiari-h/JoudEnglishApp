import readingA1 from '../../src/data/reading/1';

describe('readingA1 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingA1.texts)).toBe(true);
    expect(readingA1.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingA1.questions)).toBe(true);
    expect(readingA1.questions.length).toBeGreaterThan(0);
  });
});
