import conversationB1 from '../../src/data/conversation/B1';

describe('conversationB1 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationB1)).toBe(true);
    expect(conversationB1.length).toBeGreaterThan(0);
  });
});
