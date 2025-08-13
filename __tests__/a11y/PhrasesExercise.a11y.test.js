import React from 'react';
import { render } from '@testing-library/react-native';
import PhrasesExercise from '../../src/screens/exercises/phrases';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/utils/phrases/phrasesDataHelper', () => ({
  getLevelColor: jest.fn(() => '#007AFF'),
  getPhrasesData: jest.fn(() => ({
    categories: [{ id: 0, name: 'Greetings' }],
    phrases: [{ categoryId: 0, text: 'Hello', translation: 'Bonjour' }]
  })),
  loadPhrasesData: jest.fn(async () => ({
    categories: [{ id: 0, name: 'Greetings' }],
    phrases: [{ categoryId: 0, text: 'Hello', translation: 'Bonjour' }]
  })),
}));

jest.mock('../../src/screens/exercises/phrases/hooks/usePhrases', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    categoryIndex: 0,
    phraseIndex: 0,
    showTranslation: false,
    completedPhrases: {},
    loaded: true,
    showDetailedProgress: false,
    currentPhrase: { text: 'Hello' },
    currentPhrases: [{ text: 'Hello' }],
    totalPhrasesInCategory: 1,
    hasValidData: true,
    changeCategory: jest.fn(),
    toggleTranslation: jest.fn(),
    toggleDetailedProgress: jest.fn(),
    handleNext: jest.fn(() => ({ completed: false })),
    handlePrevious: jest.fn(),
    canGoToPrevious: false,
    isLastPhraseInCategory: false,
    stats: { completionProgress: 0, completedPhrasesCount: 0 },
    display: { categories: ['Greetings'] },
  })),
}));

describe('PhrasesExercise accessibility', () => {
  it('should render navigation buttons as role button', () => {
    const params = { level: '1' };
    const { getAllByRole } = render(<PhrasesExercise route={{ params }} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});


