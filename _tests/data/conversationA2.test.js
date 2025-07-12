import conversationA2 from '../../src/data/conversation/A2';

describe('conversationA2 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationA2)).toBe(true);
    expect(conversationA2.length).toBeGreaterThan(0);
  });
});
