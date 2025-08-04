// __tests__/components/exercise-common/OptionsList.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OptionsList from '../../../src/components/exercise-common/OptionsList';

// Mock des icônes
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
  };
});

describe('OptionsList', () => {
  const options = [
    { id: '1', text: 'Apple' },
    { id: '2', text: 'Banana' },
    { id: '3', text: 'Cherry' },
  ];
  const onSelectOptionMock = jest.fn();

  afterEach(() => {
    onSelectOptionMock.mockClear();
  });

  it('renders all options correctly', () => {
    const { getByText } = render(<OptionsList options={options} />);
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

  it('calls onSelectOption with the correct id when an option is pressed', () => {
    const { getByText } = render(
      <OptionsList options={options} onSelectOption={onSelectOptionMock} />
    );
    fireEvent.press(getByText('Banana'));
    expect(onSelectOptionMock).toHaveBeenCalledWith('2');
  });

  it('does not call onSelectOption when disabled', () => {
    const { getByText } = render(
      <OptionsList options={options} onSelectOption={onSelectOptionMock} disabled={true} />
    );
    fireEvent.press(getByText('Banana'));
    expect(onSelectOptionMock).not.toHaveBeenCalled();
  });

  it('shows no correctness icons when an option is just selected', () => {
    const { queryAllByTestId } = render(
      <OptionsList options={options} selectedOptionId={'1'} />
    );
    // When an option is just selected (not yet validated), no correctness icons should be visible.
    expect(queryAllByTestId('icon-checkmark-circle').length).toBe(0);
    expect(queryAllByTestId('icon-close-circle').length).toBe(0);
  });

  describe('when showing correct answer', () => {
    it('shows a checkmark for the correct answer', () => {
      const { getByTestId } = render(
        <OptionsList
          options={options}
          selectedOptionId={'2'}
          correctOptionId={'2'}
          showCorrectAnswer={true}
        />
      );
      expect(getByTestId('icon-checkmark-circle')).toBeTruthy();
    });

    it('shows a cross for the incorrect selection and a checkmark for the correct answer', () => {
      const { getByTestId } = render(
        <OptionsList
          options={options}
          selectedOptionId={'1'} // L'utilisateur a choisi Apple
          correctOptionId={'2'} // La bonne réponse est Banana
          showCorrectAnswer={true}
        />
      );
      // L'icône de croix est sur l'option 1
      expect(getByTestId('icon-close-circle')).toBeTruthy();
      // L'icône de coche est sur l'option 2
      expect(getByTestId('icon-checkmark-circle')).toBeTruthy();
    });
  });
});