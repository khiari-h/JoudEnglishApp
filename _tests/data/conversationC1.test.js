import conversationC1 from '../../src/data/conversation/C1';

describe('conversationC1 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationC1)).toBe(true);
    expect(conversationC1.length).toBeGreaterThan(0);
  });
});
