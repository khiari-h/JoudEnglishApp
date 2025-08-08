
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { SettingProvider, SettingContext } from '../../src/contexts/SettingContext';
import { AppProvider } from '../../src/contexts/AppProvider';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

describe('Settings and Impact Integration Test', () => {
  it('should reflect settings changes on the Dashboard', async () => {
    const { getByText, findByText, getByTestId } = render(
      <AppProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AppProvider>
    );

    // 1. Naviguer vers les paramètres
    fireEvent.press(getByText(/Paramètres/i));

    // 2. Changer un paramètre (par exemple, l'objectif quotidien)
    const dailyGoalInput = getByTestId('daily-goal-input'); // Assurez-vous d'avoir ce testID
    fireEvent.changeText(dailyGoalInput, '30'); // Changer l'objectif à 30 minutes

    // 3. Retourner au Dashboard
    fireEvent.press(getByText(/Retour/i));

    // 4. Vérifier que le changement est répercuté sur le Dashboard
    const updatedDailyGoal = await findByText(/Objectif quotidien : 30 minutes/i);
    expect(updatedDailyGoal).toBeTruthy();
  });
});
