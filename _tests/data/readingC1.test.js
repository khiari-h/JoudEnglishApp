import readingC1 from '../../src/data/reading/5';

describe('readingC1 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingC1.texts)).toBe(true);
    expect(readingC1.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingC1.questions)).toBe(true);
    expect(readingC1.questions.length).toBeGreaterThan(0);
  });
});
