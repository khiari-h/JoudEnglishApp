import * as data from '../../src/data';

describe('data (global)', () => {
  it('doit exposer des modules principaux attendus', () => {
    expect(data).toBeDefined();
    expect(typeof data).toBe('object');
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining([
        'vocabulary',
        'vocabularyA2',
        'vocabularyB1',
        'vocabularyB2',
        'vocabularyC1',
        'vocabularyC2',
        'vocabularyBonus',
      ])
    );
  });
  it('chaque module exporté doit être importable et non vide', () => {
    Object.values(data).forEach(mod => {
      expect(mod).toBeDefined();
      expect(typeof mod).toBe('object');
      expect(Object.keys(mod).length).toBeGreaterThan(0);
    });
  });
});
