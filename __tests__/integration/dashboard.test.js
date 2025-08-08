
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Dashboard from '../../src/screens/Dashboard';
import { ProgressProvider } from '../../src/contexts/ProgressContext';
import { AppProvider } from '../../src/contexts/AppProvider';

// Mock de @react-navigation/native pour éviter les erreurs de navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

describe('Dashboard Integration Tests', () => {
  it('should render the dashboard with default progress', () => {
    render(
      <AppProvider>
        <ProgressProvider>
          <Dashboard />
        </ProgressProvider>
      </AppProvider>
    );

    // Vérifier que le titre "Dashboard" est présent
    expect(screen.getByText(/Tableau de bord/i)).toBeTruthy();

    // Vérifier que la section "Continuer" est présente
    expect(screen.getByText(/Continuer là où vous en étiez/i)).toBeTruthy();

    // Vérifier que les statistiques sont présentes
    expect(screen.getByText(/Statistiques/i)).toBeTruthy();
  });
});
