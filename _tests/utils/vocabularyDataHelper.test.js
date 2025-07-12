import * as helper from '../../src/utils/vocabulary/vocabularyDataHelper';

describe('vocabularyDataHelper', () => {
  it('retourne une liste de mots formatée', () => {
    const data = [
      { word: 'apple', translation: 'pomme' },
      { word: 'banana', translation: 'banane' }
    ];
    const result = helper.formatVocabularyList(data);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('word');
    expect(result[0]).toHaveProperty('translation');
  });

  // Ajouter d’autres tests selon les fonctions exportées
});
