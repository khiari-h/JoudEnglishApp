import React from 'react';
import { render } from '@testing-library/react-native';
import VocabularyProgress from '../../../src/screens/exercises/vocabulary/VocabularyProgress';

// Mock ProgressCard
jest.mock('../../../src/components/ui/ProgressCard', () => {
  return function MockProgressCard({ title, progress, completed, total, mode, overrideCompleted }) {
    return (
      <div testID="progress-card">
        <div testID="title">{title}</div>
        <div testID="progress">{progress}</div>
        <div testID="completed">{completed}</div>
        <div testID="total">{total}</div>
        <div testID="mode">{mode}</div>
        <div testID="override-completed">{overrideCompleted}</div>
      </div>
    );
  };
});

describe('VocabularyProgress', () => {
  const mockVocabularyData = {
    exercises: [
      {
        title: 'Test Category',
        words: [
          { word: 'test1', translation: 'test1' },
          { word: 'test2', translation: 'test2' },
          { word: 'test3', translation: 'test3' }
        ]
      }
    ]
  };

  const mockCompletedWords = {
    0: [
      { wordIndex: 0, timestamp: Date.now() },
      { wordIndex: 1, timestamp: Date.now() }
    ]
  };

  it('affiche la progression normale en mode classic', () => {
    const { getByTestId } = render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={mockCompletedWords}
        levelColor="#3b82f6"
        mode="classic"
      />
    );

    expect(getByTestId('title')).toHaveTextContent('Progression');
    expect(getByTestId('completed')).toHaveTextContent('2'); // 2 mots complétés
    expect(getByTestId('total')).toHaveTextContent('3'); // 3 mots total
    expect(getByTestId('mode')).toHaveTextContent('classic');
  });

  it('affiche la progression avec override en mode fast', () => {
    const { getByTestId } = render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={mockCompletedWords}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={1} // Premier mot (index 0 + 1)
      />
    );

    expect(getByTestId('title')).toHaveTextContent('Progression Fast');
    expect(getByTestId('completed')).toHaveTextContent('1'); // Mot courant (override)
    expect(getByTestId('total')).toHaveTextContent('3'); // 3 mots total
    expect(getByTestId('mode')).toHaveTextContent('fast');
    expect(getByTestId('override-completed')).toHaveTextContent('1');
  });

  it('calcule correctement le pourcentage avec override', () => {
    const { getByTestId } = render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={mockCompletedWords}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={2} // Deuxième mot (index 1 + 1)
      />
    );

    // 2/3 = 66.67% arrondi à 67%
    expect(getByTestId('progress')).toHaveTextContent('67');
    expect(getByTestId('completed')).toHaveTextContent('2');
    expect(getByTestId('total')).toHaveTextContent('3');
  });

  it('gère le cas où overrideCompleted est null', () => {
    const { getByTestId } = render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={mockCompletedWords}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={null}
      />
    );

    // Doit utiliser completedWordsCount normal (2)
    expect(getByTestId('completed')).toHaveTextContent('2');
    expect(getByTestId('total')).toHaveTextContent('3');
  });

  it('gère les données vides', () => {
    const { getByTestId } = render(
      <VocabularyProgress
        vocabularyData={{}}
        completedWords={{}}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={1}
      />
    );

    expect(getByTestId('completed')).toHaveTextContent('1');
    expect(getByTestId('total')).toHaveTextContent('0');
    expect(getByTestId('progress')).toHaveTextContent('0');
  });
}); 