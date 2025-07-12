import readingC2 from '../../src/data/reading/6';

describe('readingC2 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingC2.texts)).toBe(true);
    expect(readingC2.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingC2.questions)).toBe(true);
    expect(readingC2.questions.length).toBeGreaterThan(0);
  });
});
