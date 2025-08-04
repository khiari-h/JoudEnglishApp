
// __tests__/components/exercise-common/NavigationButtons.test.js
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import NavigationButtons from '../../../src/components/exercise-common/NavigationButtons';

// Mock des dépendances
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: (props) => <View {...props} />,
  };
});
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
  };
});

describe('NavigationButtons', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const onNextMock = jest.fn();
  const onPreviousMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders both previous and next buttons by default', () => {
    const { getByText } = render(<NavigationButtons />);
    expect(getByText('Précédent')).toBeTruthy();
    expect(getByText('Suivant')).toBeTruthy();
  });

  it('hides the previous button when disablePrevious is true', () => {
    const { queryByText } = render(<NavigationButtons disablePrevious={true} />);
    expect(queryByText('Précédent')).toBeNull();
  });

  it('calls onPrevious when the previous button is pressed', () => {
    const { getByText } = render(<NavigationButtons onPrevious={onPreviousMock} />);
    fireEvent.press(getByText('Précédent'));
    act(() => jest.runAllTimers()); // Pour le setTimeout de 60ms
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when the next button is pressed', () => {
    const { getByText } = render(<NavigationButtons onNext={onNextMock} />);
    fireEvent.press(getByText('Suivant'));
    act(() => jest.runAllTimers());
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onNext when the next button is disabled', () => {
    const { getByText } = render(<NavigationButtons onNext={onNextMock} disableNext={true} />);
    fireEvent.press(getByText('Suivant'));
    expect(onNextMock).not.toHaveBeenCalled();
  });

  it('displays "Terminer" and a checkmark icon on the next button when isLast is true', () => {
    const { getByText, getByTestId } = render(<NavigationButtons isLast={true} />);
    expect(getByText('Terminer')).toBeTruthy();
    expect(getByTestId('icon-checkmark')).toBeTruthy();
  });
});
