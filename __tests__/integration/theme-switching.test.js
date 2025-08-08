
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { AppProvider } from '../../src/contexts/AppProvider';
import { ThemeContext, ThemeProvider } from '../../src/contexts/ThemeContext';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({ params: {} }),
}));

describe('Theme Switching Integration Test', () => {
  it('should apply theme changes across different screens', async () => {
    const { getByText, findByTestId } = render(
      <AppProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppProvider>
    );

    // 1. Vérifier le thème initial sur le Dashboard
    const dashboardContainer = await findByTestId('dashboard-container'); // Ajoutez ce testID à votre Dashboard
    const initialStyle = dashboardContainer.props.style;
    // expect(initialStyle.backgroundColor).toBe('#FFFFFF'); // Exemple pour le thème clair

    // 2. Naviguer vers les paramètres et changer le thème
    fireEvent.press(getByText(/Paramètres/i));
    const themeSwitch = await findByTestId('theme-switch'); // Ajoutez ce testID à votre interrupteur de thème
    fireEvent.press(themeSwitch);

    // 3. Revenir au Dashboard
    const navigation = require('@react-navigation/native');
    fireEvent.press(navigation.useNavigation().goBack());

    // 4. Vérifier que le nouveau thème est appliqué
    const updatedDashboardContainer = await findByTestId('dashboard-container');
    const updatedStyle = updatedDashboardContainer.props.style;
    // expect(updatedStyle.backgroundColor).toBe('#000000'); // Exemple pour le thème sombre
  });
});
