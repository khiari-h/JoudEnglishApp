import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button, View } from 'react-native';
import { SettingsProvider, SettingsContext } from '../../src/contexts/SettingContext';
import { storeData, getData } from '../../src/utils/storageUtils';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../../src/utils/constants';

// Mock des modules externes
jest.mock('../../src/utils/storageUtils', () => ({
  storeData: jest.fn().mockResolvedValue(undefined),
  getData: jest.fn().mockResolvedValue(null),
}));

// Le mock de 'constants' doit refléter les vraies valeurs par défaut utilisées dans le contexte
jest.mock('../../src/utils/constants', () => ({
  DEFAULT_SETTINGS: {
    notifications: true,
    dailyGoal: 30,
    theme: 'light',
  },
  STORAGE_KEYS: {
    USER_SETTINGS: 'userSettings',
  },
}));

// Composant de test pour consommer le contexte
const TestConsumer = () => {
  const {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
    areNotificationsEnabled, // ✅ est une valeur, pas une fonction
    getDailyGoal, // ✅ est une valeur, pas une fonction
    setDailyGoal,
  } = React.useContext(SettingsContext);

  if (isLoading) {
    return <Text testID="loading-status">Loading...</Text>;
  }

  return (
    <View>
      <Text testID="notifications-status">Notifications: {settings.notifications ? 'On' : 'Off'}</Text>
      <Text testID="daily-goal-status">Daily Goal: {settings.dailyGoal}</Text>
      <Text testID="theme-status">Theme: {settings.theme}</Text>

      {/* ✅ CORRECTION : on utilise les variables directement sans les parenthèses () */}
      <Text testID="are-notifications-enabled">Are Notifs Enabled: {areNotificationsEnabled ? 'Yes' : 'No'}</Text>
      <Text testID="get-daily-goal">Get Daily Goal: {getDailyGoal}</Text>

      <Button title="Toggle Notifications" onPress={() => updateSetting('notifications', !settings.notifications)} />
      <Button title="Set Goal to 90" onPress={() => setDailyGoal(90)} />
      <Button title="Set Goal to -10" onPress={() => setDailyGoal(-10)} />
      <Button title="Set Goal to 200" onPress={() => setDailyGoal(200)} />
      <Button title="Update Theme" onPress={() => updateSetting('theme', 'dark')} />
      <Button title="Update Multiple" onPress={() => updateSettings({ notifications: false, dailyGoal: 45 })} />
      <Button title="Reset" onPress={resetSettings} />
      <Button title="Update Invalid" onPress={() => updateSetting('nonExistentKey', 'some-value')} />
    </View>
  );
};

// Wrapper pour le rendu
const renderWithProvider = (component) =>
  render(<SettingsProvider>{component}</SettingsProvider>);

describe('SettingsContext', () => {
  beforeEach(() => {
    // Nettoyer les mocks avant chaque test
    jest.clearAllMocks();
    // S'assurer que par défaut, aucun paramètre n'est en mémoire
    getData.mockResolvedValue(null);
  });

  it('should show loading state initially', () => {
    renderWithProvider(<TestConsumer />);
    expect(screen.getByTestId('loading-status')).toBeTruthy();
  });

  it('should load default settings when no data is in storage', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {}); // Attendre la fin du chargement

    expect(screen.queryByTestId('loading-status')).toBeNull();
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: On');
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 30');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Theme: light');

    // Vérifier les appels aux fonctions de stockage
    expect(getData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS);
    expect(storeData).toHaveBeenCalledTimes(1);
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS);
  });

  it('should load saved settings from storage', async () => {
    const savedSettings = { notifications: false, dailyGoal: 90, theme: 'dark' };
    getData.mockResolvedValueOnce(savedSettings);

    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: Off');
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 90');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Theme: dark');
    
    // Doit sauvegarder les paramètres fusionnés (au cas où de nouveaux paramètres par défaut auraient été ajoutés)
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, {
      ...DEFAULT_SETTINGS,
      ...savedSettings,
    });
  });

  it('should update a single setting and persist the change', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {}); // Chargement initial

    // Vérifier l'état initial
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: On');

    // Simuler une action utilisateur
    await act(async () => {
      fireEvent.press(screen.getByText('Toggle Notifications'));
    });

    // Vérifier le nouvel état
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: Off');
    
    // Vérifier que la sauvegarde a été appelée avec les nouvelles données
    expect(storeData).toHaveBeenCalledTimes(2); // 1. Initial load, 2. Update
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, {
      ...DEFAULT_SETTINGS,
      notifications: false,
    });
  });

  it('should update multiple settings at once and persist changes', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    await act(async () => {
      fireEvent.press(screen.getByText('Update Multiple'));
    });

    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: Off');
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 45');
    
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, {
      ...DEFAULT_SETTINGS,
      notifications: false,
      dailyGoal: 45,
    });
  });

  it('should reset settings to default and persist the change', async () => {
    const savedSettings = { notifications: false, dailyGoal: 90, theme: 'dark' };
    getData.mockResolvedValueOnce(savedSettings);

    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    // Vérifier que les données sauvegardées sont bien chargées
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: Off');

    await act(async () => {
      fireEvent.press(screen.getByText('Reset'));
    });

    // Vérifier que les paramètres sont revenus à leurs valeurs par défaut
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: On');
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 30');
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS);
  });

  it('should correctly report status via helper functions', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    // ✅ CORRECTION : on utilise les variables directement, sans les parenthèses ()
    expect(screen.getByTestId('are-notifications-enabled')).toHaveTextContent('Are Notifs Enabled: Yes');
    expect(screen.getByTestId('get-daily-goal')).toHaveTextContent('Get Daily Goal: 30');

    await act(async () => {
      fireEvent.press(screen.getByText('Toggle Notifications'));
      fireEvent.press(screen.getByText('Set Goal to 90'));
    });

    // ✅ CORRECTION : on utilise les variables directement, sans les parenthèses ()
    expect(screen.getByTestId('are-notifications-enabled')).toHaveTextContent('Are Notifs Enabled: No');
    expect(screen.getByTestId('get-daily-goal')).toHaveTextContent('Get Daily Goal: 90');
  });

  it('should clamp daily goal values using setDailyGoal', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    // Test avec une valeur trop basse
    await act(async () => {
      fireEvent.press(screen.getByText('Set Goal to -10'));
    });
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 1');

    // Test avec une valeur trop haute
    await act(async () => {
      fireEvent.press(screen.getByText('Set Goal to 200'));
    });
    expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 120');
  });

  it('should not update state for an invalid setting key', async () => {
    renderWithProvider(<TestConsumer />);
    await act(async () => {});

    const initialSettings = { ...DEFAULT_SETTINGS };
    
    // storeData a été appelé une fois au chargement
    expect(storeData).toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.press(screen.getByText('Update Invalid'));
    });

    // Vérifier que rien n'a changé
    expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: On');
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Theme: light');
    
    // S'assurer qu'aucune sauvegarde supplémentaire n'a eu lieu
    expect(storeData).toHaveBeenCalledTimes(1);
  });
  it('should handle errors when loading settings and use defaults', async () => {
  // Simuler une erreur lors de l'appel à getData
  getData.mockRejectedValueOnce(new Error('AsyncStorage error'));

  // Rendre le composant
  renderWithProvider(<TestConsumer />);
  await act(async () => {});

  // Vérifier que le composant n'est plus en état de chargement
  expect(screen.queryByTestId('loading-status')).toBeNull();

  // S'assurer que les paramètres par défaut sont utilisés
  expect(screen.getByTestId('notifications-status')).toHaveTextContent('Notifications: On');
  expect(screen.getByTestId('daily-goal-status')).toHaveTextContent('Daily Goal: 30');
  expect(screen.getByTestId('theme-status')).toHaveTextContent('Theme: light');
});
});