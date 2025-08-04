import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AppProvider from '../../src/contexts/AppProvider';
import { Text } from 'react-native';

// Mock all nested providers to simplify testing AppProvider itself
jest.mock('../../src/contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
}));
jest.mock('../../src/contexts/ProgressContext', () => ({
  ProgressProvider: ({ children }) => <>{children}</>,
}));
jest.mock('../../src/contexts/SettingContext', () => ({
  SettingsProvider: ({ children }) => <>{children}</>,
}));
jest.mock('../../src/contexts/CurrentLevelContext', () => ({
  CurrentLevelProvider: ({ children }) => <>{children}</>,
}));

describe('AppProvider', () => {
  it('renders children correctly', () => {
    render(
      <AppProvider>
        <Text>Test Child</Text>
      </AppProvider>
    );
    expect(screen.getByText('Test Child')).toBeOnTheScreen();
  });
});
