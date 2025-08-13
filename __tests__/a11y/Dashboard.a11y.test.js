import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Dashboard from '../../src/screens/Dashboard';
import { ProgressProvider } from '../../src/contexts/ProgressContext';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { CurrentLevelProvider } from '../../src/contexts/CurrentLevelContext';

jest.mock('expo-router', () => ({
  useFocusEffect: jest.fn(() => {}),
  router: { push: jest.fn(), back: jest.fn() },
}));

describe('Dashboard accessibility', () => {
  it('should expose accessible buttons for actions/levels', async () => {
    const { getAllByRole } = render(
      <ThemeProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            <Dashboard />
          </CurrentLevelProvider>
        </ProgressProvider>
      </ThemeProvider>
    );
    await waitFor(() => {
      const buttons = getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});


