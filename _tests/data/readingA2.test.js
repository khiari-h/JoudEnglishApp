import readingA2 from '../../src/data/reading/2';

describe('readingA2 data', () => {
  it('should have texts', () => {
    expect(Array.isArray(readingA2.texts)).toBe(true);
    expect(readingA2.texts.length).toBeGreaterThan(0);
  });
  it('should have questions', () => {
    expect(Array.isArray(readingA2.questions)).toBe(true);
    expect(readingA2.questions.length).toBeGreaterThan(0);
  });
});
