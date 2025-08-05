import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LevelSelection from '../../../src/screens/LevelSelection';

// Mock useRealTimeProgress hook
jest.mock('../../../src/hooks/useRealTimeProgress', () => ({
  __esModule: true,
  default: () => ({
    getLevelProgress: jest.fn(() => 0),
    hasProgress: jest.fn(() => false),
    refresh: jest.fn(),
  }),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock @react-navigation/native's useFocusEffect and useNavigation
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(() => () => {}),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
}));

describe('LevelSelection', () => {
  it('should render correctly', () => {
    render(<LevelSelection />);
    expect(screen.getByText('Niveaux')).toBeTruthy();
  });
});