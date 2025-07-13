import React from 'react';
import { render } from '@testing-library/react-native';
import VocabularyProgress from '../../src/screens/exercises/vocabulary/VocabularyProgress';

// Mock ProgressCard pour capturer les props
let capturedProgressProps = {};
jest.mock('../../src/components/ui/ProgressCard', () => {
  return function MockProgressCard(props) {
    capturedProgressProps = props;
    return (
      <div testID="progress-card">
        <div testID="progress-title">{props.title}</div>
        <div testID="progress-completed">{props.completed}</div>
        <div testID="progress-total">{props.total}</div>
        <div testID="progress-percentage">{props.progress}</div>
        <div testID="progress-override">{props.overrideCompleted}</div>
      </div>
    );
  };
});

describe('VocabularyProgress Synchronization', () => {
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

  beforeEach(() => {
    capturedProgressProps = {};
  });

  it('synchronise la barre de progression avec le compteur central en mode fast', () => {
    render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={{}}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={1} // Premier mot (index 0 + 1)
      />
    );

    // Vérifier que overrideCompleted est passé et calculé correctement
    expect(capturedProgressProps.overrideCompleted).toBe(1); // Premier mot (index 0 + 1)
    expect(capturedProgressProps.completed).toBe(1); // Doit utiliser overrideCompleted
    expect(capturedProgressProps.total).toBe(3); // Total des mots
    expect(capturedProgressProps.progress).toBe(33); // 1/3 = 33%
    expect(capturedProgressProps.title).toBe('Progression Fast');
  });

  it('utilise la progression normale en mode classic', () => {
    render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={{}}
        levelColor="#3b82f6"
        mode="classic"
        overrideCompleted={null}
      />
    );

    // En mode classic, pas d'override
    expect(capturedProgressProps.overrideCompleted).toBeNull();
    expect(capturedProgressProps.completed).toBe(0); // Aucun mot complété au début
    expect(capturedProgressProps.total).toBe(3);
    expect(capturedProgressProps.progress).toBe(0); // 0%
    expect(capturedProgressProps.title).toBe('Progression '); // ✅ CORRIGÉ : espace en fin
  });

  it('calcule correctement overrideCompleted basé sur wordIndex', () => {
    render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={{}}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={2} // Deuxième mot (index 1 + 1)
      />
    );

    // overrideCompleted doit être wordIndex + 1 = 2
    expect(capturedProgressProps.overrideCompleted).toBe(2);
    expect(capturedProgressProps.completed).toBe(2);
    expect(capturedProgressProps.progress).toBe(67); // 2/3 = 67%
  });

  it('gère les mots complétés avec override', () => {
    const mockCompletedWords = {
      0: [
        { wordIndex: 0, timestamp: Date.now() },
        { wordIndex: 1, timestamp: Date.now() }
      ]
    };

    render(
      <VocabularyProgress
        vocabularyData={mockVocabularyData}
        completedWords={mockCompletedWords}
        levelColor="#3b82f6"
        mode="fast"
        overrideCompleted={3} // Troisième mot (index 2 + 1)
      />
    );

    // Même avec des mots complétés, overrideCompleted doit être prioritaire
    expect(capturedProgressProps.overrideCompleted).toBe(3);
    expect(capturedProgressProps.completed).toBe(3); // Utilise overrideCompleted
    expect(capturedProgressProps.progress).toBe(100); // 3/3 = 100%
  });
}); 