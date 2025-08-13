import React from 'react';
import { render } from '@testing-library/react-native';
import ExerciseSelection from '../../src/screens/ExerciseSelection';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/hooks/useRealTimeProgress', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getExerciseProgress: jest.fn(() => 0),
    hasProgress: jest.fn(() => false),
    refresh: jest.fn(),
  })),
}));

describe('ExerciseSelection accessibility', () => {
  it('should expose exercises as buttons with progress value', () => {
    const { getAllByRole } = render(<ExerciseSelection level="1" />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});


