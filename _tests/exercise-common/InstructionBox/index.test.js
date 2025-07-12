import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InstructionBox from '../../../src/components/exercise-common/InstructionBox';

// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('InstructionBox', () => {
  it('affiche le titre et les instructions', () => {
    const { getByText } = render(
      <InstructionBox title="Consignes" instructions="Lisez attentivement." />
    );
    expect(getByText('Consignes')).toBeTruthy();
    expect(getByText('Lisez attentivement.')).toBeTruthy();
  });

  it('affiche les exemples et astuces', () => {
    const { getByText } = render(
      <InstructionBox
        instructions="Test"
        examples={["Exemple 1", "Exemple 2"]}
        tips={["Astuce 1"]}
      />
    );
    expect(getByText('Exemples:')).toBeTruthy();
    expect(getByText('Exemple 1')).toBeTruthy();
    expect(getByText('Astuce 1')).toBeTruthy();
  });

  it('toggle l’expansion au clic sur l’en-tête', () => {
    const { getByText, queryByText } = render(
      <InstructionBox
        title="Titre"
        instructions="Instruction à cacher"
        initiallyExpanded={true}
      />
    );
    // L’instruction est visible au départ
    expect(getByText('Instruction à cacher')).toBeTruthy();
    // Clique sur l’en-tête pour replier
    fireEvent.press(getByText('Titre'));
    // L’instruction ne doit plus être visible
    expect(queryByText('Instruction à cacher')).toBeNull();
  });
});
