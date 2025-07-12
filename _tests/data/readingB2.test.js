import readingB2 from '../../src/data/reading/4';

describe('readingB2 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingB2.texts)).toBe(true);
    expect(readingB2.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingB2.questions)).toBe(true);
    expect(readingB2.questions.length).toBeGreaterThan(0);
  });
});
