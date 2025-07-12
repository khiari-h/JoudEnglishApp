import conversationA1 from '../../src/data/conversation/A1';

describe('conversationA1 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationA1)).toBe(true);
    expect(conversationA1.length).toBeGreaterThan(0);
  });
});
