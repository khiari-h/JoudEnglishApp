import * as data from '../../src/data';

describe('data index', () => {
  it('doit exporter les modules principaux attendus', () => {
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
  it('chaque module doit être importable', () => {
    Object.values(data).forEach(mod => {
      expect(mod).toBeDefined();
    });
  });
});
