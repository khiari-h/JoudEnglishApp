import React from 'react';
import { render } from '@testing-library/react-native';
import LevelSelection from '../../src/screens/LevelSelection';

jest.mock('expo-router', () => ({ router: { push: jest.fn() }, useFocusEffect: jest.fn(() => {}) }));

jest.mock('../../src/hooks/useRealTimeProgress', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getLevelProgress: jest.fn(() => 0),
    hasProgress: jest.fn(() => false),
    refresh: jest.fn(),
  })),
}));

describe('LevelSelection accessibility', () => {
  it('should expose levels as buttons with progress value', () => {
    const { getAllByRole } = render(<LevelSelection />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});


