import conversationC2 from '../../src/data/conversation/C2';

describe('conversationC2 data', () => {
  it('should be an array', () => {
    expect(Array.isArray(conversationC2)).toBe(true);
    expect(conversationC2.length).toBeGreaterThan(0);
  });
});
