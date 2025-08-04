import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { CurrentLevelProvider, useCurrentLevel } from '../../src/contexts/CurrentLevelContext';

// Helper component to consume the context
const TestComponent = () => {
  const { currentLevel, setCurrentLevel } = useCurrentLevel();
  return (
    <>
      <Text testID="current-level">{currentLevel}</Text>
      <Button title="Set Level 2" onPress={() => setCurrentLevel('2')} />
      <Button title="Set Level 3" onPress={() => setCurrentLevel('3')} />
    </>
  );
};

const ComponentWithoutProvider = () => {
  useCurrentLevel();
  return null;
};

describe('CurrentLevelContext', () => {
  it('provides initial level and allows updating it', () => {
    render(
      <CurrentLevelProvider initialLevel="1">
        <TestComponent />
      </CurrentLevelProvider>
    );

    expect(screen.getByTestId('current-level').props.children).toBe('1');

    fireEvent.press(screen.getByText('Set Level 2'));
    expect(screen.getByTestId('current-level').props.children).toBe('2');

    fireEvent.press(screen.getByText('Set Level 3'));
    expect(screen.getByTestId('current-level').props.children).toBe('3');
  });

  it('defaults to level "1" if no initialLevel is provided', () => {
    render(
      <CurrentLevelProvider>
        <TestComponent />
      </CurrentLevelProvider>
    );
    expect(screen.getByTestId('current-level').props.children).toBe('1');
  });

  it('throws an error if useCurrentLevel is used outside of CurrentLevelProvider', () => {
    // Suppress console.error for this test to avoid noisy output
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<ComponentWithoutProvider />)).toThrow(
      "useCurrentLevel doit être utilisé dans CurrentLevelProvider"
    );

    // Restore console.error
    console.error = originalError;
  });
});
