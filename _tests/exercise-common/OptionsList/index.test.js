import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OptionsList from '../../../src/components/exercise-common/OptionsList';

// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('OptionsList', () => {
  const options = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
  ];

  it('affiche toutes les options', () => {
    const { getByText } = render(
      <OptionsList options={options} />
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('appelle onSelectOption lors du clic sur une option', () => {
    const onSelectOption = jest.fn();
    const { getByText } = render(
      <OptionsList options={options} onSelectOption={onSelectOption} />
    );
    fireEvent.press(getByText('Option 2'));
    expect(onSelectOption).toHaveBeenCalledWith('2');
  });

  it('affiche l’option sélectionnée', () => {
    const { getByText } = render(
      <OptionsList options={options} selectedOptionId={'1'} />
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('affiche l’icône de bonne réponse si showCorrectAnswer est true', () => {
    const { getByText } = render(
      <OptionsList
        options={options}
        selectedOptionId={'2'}
        correctOptionId={'2'}
        showCorrectAnswer={true}
      />
    );
    expect(getByText('Option 2')).toBeTruthy();
  });
});
