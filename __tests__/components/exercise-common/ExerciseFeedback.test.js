// __tests__/components/exercise-common/ExerciseFeedback.test.js
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import ExerciseFeedback from '../../../src/components/exercise-common/ExerciseFeedback';

// Mock des icônes pour l'environnement de test
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
  };
});

describe('ExerciseFeedback', () => {
  // Activer les fake timers pour tester les délais
  beforeAll(() => {
    jest.useFakeTimers();
  });

  // Restaurer les timers réels après les tests
  afterAll(() => {
    jest.useRealTimers();
  });

  const onDismissMock = jest.fn();

  afterEach(() => {
    onDismissMock.mockClear();
  });

  it('renders the message correctly', () => {
    const { getByText } = render(<ExerciseFeedback message="Correct!" />);
    expect(getByText('Correct!')).toBeTruthy();
  });

  it('renders the explanation when provided', () => {
    const { getByText } = render(
      <ExerciseFeedback message="Incorrect" explanation="The answer was X." />
    );
    expect(getByText('The answer was X.')).toBeTruthy();
  });

  it('does not render the explanation when not provided', () => {
    const { queryByText } = render(<ExerciseFeedback message="Correct!" />);
    expect(queryByText('The answer was X.')).toBeNull();
  });

  it('shows a success icon for type "success"', () => {
    const { getByTestId } = render(<ExerciseFeedback message="Success" type="success" />);
    expect(getByTestId('icon-checkmark-circle')).toBeTruthy();
  });

  it('shows an error icon for type "error"', () => {
    const { getByTestId } = render(<ExerciseFeedback message="Error" type="error" />);
    expect(getByTestId('icon-close-circle')).toBeTruthy();
  });

  it('shows an info icon for type "info"', () => {
    const { getByTestId } = render(<ExerciseFeedback message="Info" type="info" />);
    expect(getByTestId('icon-information-circle')).toBeTruthy();
  });

  it('calls onDismiss when the dismiss button is pressed', () => {
    const { getByTestId } = render(
      <ExerciseFeedback message="Test" onDismiss={onDismissMock} />
    );
    fireEvent.press(getByTestId('icon-close'));
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it('does not show the dismiss button if showDismissButton is false', () => {
    const { queryByTestId } = render(
      <ExerciseFeedback message="Test" showDismissButton={false} />
    );
    expect(queryByTestId('icon-close')).toBeNull();
  });

  it('calls onDismiss automatically when autoHide is true', async () => {
    render(
      <ExerciseFeedback
        message="Hiding soon..."
        onDismiss={onDismissMock}
        autoHide={true}
        autoHideDuration={5000}
      />
    );

    expect(onDismissMock).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(onDismissMock).toHaveBeenCalledTimes(1);
    });
  });
});