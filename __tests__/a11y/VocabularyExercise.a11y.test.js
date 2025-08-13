import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import VocabularyExercise from '../../src/screens/exercises/vocabulary';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/utils/vocabulary/vocabularyDataHelper', () => ({
  isBonusLevel: jest.fn(() => false),
  getLevelColor: jest.fn(() => '#007AFF'),
  getVocabularyData: jest.fn(() => ({ exercises: [{ title: 'Cat', words: [{ word: 'hello' }] }] })),
  loadVocabularyData: jest.fn(async () => ({ exercises: [{ title: 'Cat', words: [{ word: 'hello' }] }] })),
}));

describe('VocabularyExercise accessibility', () => {
  it('should render navigation buttons accessible', async () => {
    const params = { level: '1', mode: 'classic' };
    const { getAllByRole } = render(<VocabularyExercise route={{ params }} />);
    await waitFor(() => {
      const buttons = getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});


