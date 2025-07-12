import conversationB2 from '../../src/data/conversation/B2';

describe('conversationB2 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationB2)).toBe(true);
    expect(conversationB2.length).toBeGreaterThan(0);
  });
});
