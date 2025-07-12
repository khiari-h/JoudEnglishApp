import * as stats from '../../src/utils/assessment/assessmentStats';

describe('assessmentStats', () => {
  it('calcule correctement le score moyen', () => {
    const data = [
      { score: 80 },
      { score: 100 },
      { score: 60 }
    ];
    const result = stats.calculateAverageScore(data);
    expect(result).toBeCloseTo(80);
  });

  // Ajouter d’autres tests selon les fonctions exportées
});
