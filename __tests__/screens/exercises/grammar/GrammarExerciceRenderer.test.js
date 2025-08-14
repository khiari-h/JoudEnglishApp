import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GrammarExerciseRenderer from '../../../../src/screens/exercises/grammar/GrammarExerciceRenderer';

// Mock simple des composants externes
jest.mock('../../../../src/components/ui/HeroCard', () => 'HeroCard');
jest.mock('../../../../src/components/ui/ContentSection', () => 'ContentSection');

// Mock des styles
jest.mock('../../../../src/screens/exercises/grammar/GrammarExerciceRenderer/style', () => ({
  __esModule: true,
  default: () => ({
    container: { padding: 10 },
    optionsSection: { marginTop: 10 },
    optionContainer: { marginBottom: 5 },
    optionGradient: { borderRadius: 8 },
    optionInner: { padding: 10 },
    optionIconContainer: { marginRight: 10 },
    optionText: { fontSize: 16 },
    correctOptionText: { color: 'green' },
    incorrectOptionText: { color: 'red' },
    selectedOptionText: { color: 'blue' },
    inputSection: { marginTop: 10 },
    fillBlankInput: { borderWidth: 1 },
    transformationInput: { borderWidth: 1 },
    correctInput: { borderColor: 'green' },
    incorrectInput: { borderColor: 'red' },
    neutralInput: { borderColor: 'gray' },
  }),
}));

describe('GrammarExerciseRenderer', () => {
  const defaultProps = {
    exercise: {
      question: 'What is the correct form?',
      sentence: 'I ___ to school every day.',
      options: ['go', 'goes', 'going', 'went'],
      answer: 0, // Index numérique
      type: 'fillInTheBlank',
    },
    selectedOption: null,
    setSelectedOption: jest.fn(),
    inputText: '',
    setInputText: jest.fn(),
    showFeedback: false,
    isCorrect: false,
    exerciseIndex: 0,
    attempts: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendu de base', () => {
    it('devrait rendre null si pas d\'exercice', () => {
      const { UNSAFE_root } = render(<GrammarExerciseRenderer {...defaultProps} exercise={null} />);
      expect(UNSAFE_root.children).toHaveLength(0);
    });

    it('devrait rendre le composant avec les props de base', () => {
      const { getByText } = render(<GrammarExerciseRenderer {...defaultProps} />);
      expect(getByText('What is the correct form?')).toBeTruthy();
    });
  });

  describe('Exercice à choix multiples', () => {
    const multipleChoiceProps = {
      ...defaultProps,
      exercise: {
        ...defaultProps.exercise,
        type: 'fillInTheBlank',
        options: ['go', 'goes', 'going', 'went'],
        answer: 0,
      },
    };

    it('devrait rendre un exercice à choix multiples', () => {
      const { getByText } = render(<GrammarExerciseRenderer {...multipleChoiceProps} />);
      expect(getByText('What is the correct form?')).toBeTruthy();
      expect(getByText('Complete the sentence')).toBeTruthy();
    });

    it('devrait gérer la sélection d\'option', () => {
      const setSelectedOption = jest.fn();
      const { getByText } = render(
        <GrammarExerciseRenderer {...multipleChoiceProps} setSelectedOption={setSelectedOption} />
      );

      fireEvent.press(getByText('go'));
      expect(setSelectedOption).toHaveBeenCalledWith(0);
    });

    it('devrait désactiver les options après feedback correct', () => {
      const { getByText } = render(
        <GrammarExerciseRenderer {...multipleChoiceProps} showFeedback={true} isCorrect={true} />
      );

      const option = getByText('go');
      expect(option.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Exercice à remplir les blancs', () => {
    const fillBlankProps = {
      ...defaultProps,
      exercise: {
        ...defaultProps.exercise,
        type: 'fillInTheBlank',
        options: undefined, // Pas d'options pour fill-in-the-blank
        answer: 'go', // String pour ce type d'exercice
      },
    };

    it('devrait rendre un exercice à remplir les blancs', () => {
      const { getByText, getByPlaceholderText } = render(
        <GrammarExerciseRenderer {...fillBlankProps} />
      );
      
      expect(getByText('What is the correct form?')).toBeTruthy();
      expect(getByText('Complete the sentence')).toBeTruthy();
      expect(getByPlaceholderText('Type your answer...')).toBeTruthy();
    });

    it('devrait gérer la saisie de texte', () => {
      const setInputText = jest.fn();
      const { getByPlaceholderText } = render(
        <GrammarExerciseRenderer {...fillBlankProps} setInputText={setInputText} />
      );

      const input = getByPlaceholderText('Type your answer...');
      fireEvent.changeText(input, 'go');
      expect(setInputText).toHaveBeenCalledWith('go');
    });

    it('devrait désactiver l\'input après feedback correct', () => {
      const { getByPlaceholderText } = render(
        <GrammarExerciseRenderer {...fillBlankProps} showFeedback={true} isCorrect={true} />
      );

      const input = getByPlaceholderText('Type your answer...');
      expect(input.props.editable).toBe(false);
    });
  });

  describe('Exercice de transformation', () => {
    const transformationProps = {
      ...defaultProps,
      exercise: {
        ...defaultProps.exercise,
        type: 'transformation',
        sentence: 'I go to school.',
        answer: 'I went to school.', // String pour ce type d'exercice
      },
    };

    it('devrait rendre un exercice de transformation', () => {
      const { getByText, getByPlaceholderText } = render(
        <GrammarExerciseRenderer {...transformationProps} />
      );
      
      expect(getByText('What is the correct form?')).toBeTruthy();
      expect(getByText('Transform this sentence')).toBeTruthy();
      expect(getByPlaceholderText('Write your transformed sentence...')).toBeTruthy();
    });

    it('devrait gérer la saisie de texte multiligne', () => {
      const setInputText = jest.fn();
      const { getByPlaceholderText } = render(
        <GrammarExerciseRenderer {...transformationProps} setInputText={setInputText} />
      );

      const input = getByPlaceholderText('Write your transformed sentence...');
      fireEvent.changeText(input, 'I went to school.');
      expect(setInputText).toHaveBeenCalledWith('I went to school.');
    });
  });

  describe('Gestion des états et feedback', () => {
    it('devrait appliquer les styles corrects pour les réponses correctes', () => {
      const { getByText } = render(
        <GrammarExerciseRenderer 
          {...defaultProps} 
          showFeedback={true} 
          selectedOption={0} 
        />
      );

      const option = getByText('go');
      expect(option).toBeTruthy();
    });

    it('devrait appliquer les styles corrects pour les réponses incorrectes', () => {
      const { getByText } = render(
        <GrammarExerciseRenderer 
          {...defaultProps} 
          showFeedback={true} 
          selectedOption={1} 
        />
      );

      const option = getByText('goes');
      expect(option).toBeTruthy();
    });
  });

  describe('Gestion des clés uniques', () => {
    it('devrait générer des clés uniques pour les inputs', () => {
      const fillBlankProps = {
        ...defaultProps,
        exercise: {
          ...defaultProps.exercise,
          type: 'fillInTheBlank',
          options: undefined,
          answer: 'go',
        },
      };

      const { getByPlaceholderText } = render(
        <GrammarExerciseRenderer 
          {...fillBlankProps} 
          exerciseIndex={5} 
          attempts={3} 
        />
      );

      const input = getByPlaceholderText('Type your answer...');
      expect(input.props.key).toContain('fill-blank-input-5-3');
    });
  });

  describe('Composants extraits', () => {
    it('devrait utiliser ExerciseContent pour le contenu commun', () => {
      const { getByText } = render(<GrammarExerciseRenderer {...defaultProps} />);
      
      expect(getByText('What is the correct form?')).toBeTruthy();
      expect(getByText('Complete the sentence')).toBeTruthy();
    });

    it('devrait utiliser OptionItem pour les options', () => {
      const { getByText } = render(<GrammarExerciseRenderer {...defaultProps} />);
      
      // Vérifier que toutes les options sont rendues
      expect(getByText('go')).toBeTruthy();
      expect(getByText('goes')).toBeTruthy();
      expect(getByText('going')).toBeTruthy();
      expect(getByText('went')).toBeTruthy();
    });
  });

  describe('Gestion des erreurs et cas limites', () => {
    it('devrait gérer les exercices sans phrase', () => {
      const propsWithoutSentence = {
        ...defaultProps,
        exercise: {
          ...defaultProps.exercise,
          sentence: undefined,
        },
      };

      const { getByText } = render(<GrammarExerciseRenderer {...propsWithoutSentence} />);
      expect(getByText('What is the correct form?')).toBeTruthy();
    });

    it('devrait gérer les exercices avec type inconnu', () => {
      const propsWithUnknownType = {
        ...defaultProps,
        exercise: {
          ...defaultProps.exercise,
          type: 'unknownType',
        },
      };

      const { UNSAFE_root } = render(<GrammarExerciseRenderer {...propsWithUnknownType} />);
      expect(UNSAFE_root.children).toHaveLength(0);
    });
  });
});
