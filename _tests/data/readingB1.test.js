import readingB1 from '../../src/data/reading/3';

describe('readingB1 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingB1.texts)).toBe(true);
    expect(readingB1.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingB1.questions)).toBe(true);
    expect(readingB1.questions.length).toBeGreaterThan(0);
  });
});
