// __tests__/components/exercise-common/NavigationButtons.test.js
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Platform } from 'react-native';
import createStyles from '../../../src/components/exercise-common/NavigationButtons/style';
import NavigationButtons from '../../../src/components/exercise-common/NavigationButtons';

// Mock dependencies
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
  const onNextMock = jest.fn();
  const onPreviousMock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------
  // Rendering & functionality
  // ------------------------
  it('renders both previous and next buttons by default', () => {
    const { getByText } = render(
      <NavigationButtons onNext={onNextMock} onPrevious={onPreviousMock} />
    );
    expect(getByText('Précédent')).toBeTruthy();
    expect(getByText('Suivant')).toBeTruthy();
  });

  it('hides the previous button when disablePrevious is true', () => {
    const { queryByText } = render(<NavigationButtons disablePrevious={true} />);
    expect(queryByText('Précédent')).toBeNull();
  });

  it('calls onPrevious when the previous button is pressed', () => {
    const { getByText } = render(
      <NavigationButtons onPrevious={onPreviousMock} />
    );
    fireEvent.press(getByText('Précédent'));
    act(() => jest.runAllTimers());
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when the next button is pressed', () => {
    const { getByText } = render(<NavigationButtons onNext={onNextMock} />);
    fireEvent.press(getByText('Suivant'));
    act(() => jest.runAllTimers());
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onNext when the next button is disabled', () => {
    const { getByText } = render(
      <NavigationButtons onNext={onNextMock} disableNext={true} />
    );
    fireEvent.press(getByText('Suivant'));
    expect(onNextMock).not.toHaveBeenCalled();
  });

  it('displays "Terminer" and a checkmark icon on the next button when isLast is true', () => {
    const { getByText, getByTestId } = render(<NavigationButtons isLast={true} />);
    expect(getByText('Terminer')).toBeTruthy();
    expect(getByTestId('icon-checkmark')).toBeTruthy();
  });

  // ------------------------
  // Styles platform-specific
  // ------------------------
  it('applies iOS styles correctly', () => {
    // Force Platform.select to return iOS branch
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.ios);
    Platform.OS = 'ios';

    const styles = createStyles('#5E60CE');

    expect(styles.previousButton.shadowColor).toBe('#000');
    expect(styles.previousButton.shadowOpacity).toBe(0.08);
    expect(styles.previousButton).not.toHaveProperty('elevation');
  });

  it('applies Android styles correctly', () => {
    // Force Platform.select to return Android branch
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.android);
    Platform.OS = 'android';

    const styles = createStyles('#5E60CE');

    expect(styles.previousButton.elevation).toBe(3);
    expect(styles.previousButton).not.toHaveProperty('shadowOpacity');
  });
});
