import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { SettingsProvider, SettingsContext } from '../../src/contexts/SettingContext';

// Mock storageUtils
jest.mock('../../src/utils/storageUtils', () => ({
  storeData: jest.fn(() => Promise.resolve()),
  getData: jest.fn(() => Promise.resolve(null)),
}));

// Mock constants
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

import { storeData, getData } from '../../src/utils/storageUtils';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../../src/utils/constants';

const flattenChildren = (children) =>
  Array.isArray(children) ? children.join('') : children;

const TestComponent = () => {
  const {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
    areNotificationsEnabled,
    getDailyGoal,
    setDailyGoal,
  } = React.useContext(SettingsContext);

  if (isLoading) {
    return <Text testID="loading-status">Loading...</Text>;
  }

  return (
    <>
      <Text testID="notifications-enabled">Notifications: {settings.notifications ? 'On' : 'Off'}</Text>
      <Text testID="daily-goal">Daily Goal: {settings.dailyGoal} minutes</Text>
      <Text testID="theme">Theme: {settings.theme}</Text>
      <Text testID="are-notifications-enabled-func">Func Notifications: {areNotificationsEnabled() ? 'On' : 'Off'}</Text>
      <Text testID="get-daily-goal-func">Func Daily Goal: {getDailyGoal()} minutes</Text>

      <Button title="Toggle Notifications" onPress={() => updateSetting('notifications', !settings.notifications)} />
      <Button title="Set Daily Goal 60" onPress={() => setDailyGoal(60)} />
      <Button title="Set Daily Goal 5" onPress={() => setDailyGoal(5)} />
      <Button title="Set Daily Goal 150" onPress={() => setDailyGoal(150)} />
      <Button title="Update Theme to Dark" onPress={() => updateSetting('theme', 'dark')} />
      <Button title="Update Multiple" onPress={() => updateSettings({ notifications: false, dailyGoal: 45 })} />
      <Button title="Reset Settings" onPress={resetSettings} />
      <Button title="Update Invalid Setting" onPress={() => updateSetting('invalidKey', 'value')} />
    </>
  );
};

describe('SettingsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getData.mockResolvedValue(null);
  });

  it('loads default settings if no saved settings found', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('loading-status')).toBeTruthy();

    await act(async () => {});

    expect(screen.queryByTestId('loading-status')).toBeNull();

    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: On');
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 30 minutes');
    expect(flattenChildren(screen.getByTestId('theme').props.children)).toBe('Theme: light');

    expect(getData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS);
    expect(storeData).toHaveBeenCalledTimes(2); // Should save default settings on initial load, and then again when settings are updated after load
  });

  it('loads saved settings from storage', async () => {
    const savedSettings = { notifications: false, dailyGoal: 60, theme: 'dark' };
    getData.mockResolvedValueOnce(savedSettings);

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    await act(async () => {});

    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: Off');
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 60 minutes');
    expect(flattenChildren(screen.getByTestId('theme').props.children)).toBe('Theme: dark');
  });

  it('updates a single setting and saves it', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    fireEvent.press(screen.getByText('Toggle Notifications'));
    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: Off');
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, { ...DEFAULT_SETTINGS, notifications: false });

    fireEvent.press(screen.getByText('Update Theme to Dark'));
    expect(flattenChildren(screen.getByTestId('theme').props.children)).toBe('Theme: dark');
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, { ...DEFAULT_SETTINGS, notifications: false, theme: 'dark' });
  });

  it('updates multiple settings and saves them', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    fireEvent.press(screen.getByText('Update Multiple'));
    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: Off');
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 45 minutes');
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, { ...DEFAULT_SETTINGS, notifications: false, dailyGoal: 45 });
  });

  it('resets settings to defaults and saves', async () => {
    getData.mockResolvedValueOnce({ notifications: false, dailyGoal: 60, theme: 'dark' });
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: Off');

    fireEvent.press(screen.getByText('Reset Settings'));
    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: On');
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 30 minutes');
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS);
  });

  it('areNotificationsEnabled returns correct status', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    expect(flattenChildren(screen.getByTestId('are-notifications-enabled-func').props.children)).toBe('Func Notifications: On');
    fireEvent.press(screen.getByText('Toggle Notifications'));
    expect(flattenChildren(screen.getByTestId('are-notifications-enabled-func').props.children)).toBe('Func Notifications: Off');
  });

  it('getDailyGoal returns correct value', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    expect(flattenChildren(screen.getByTestId('get-daily-goal-func').props.children)).toBe('Func Daily Goal: 30 minutes');
    fireEvent.press(screen.getByText('Set Daily Goal 60'));
    expect(flattenChildren(screen.getByTestId('get-daily-goal-func').props.children)).toBe('Func Daily Goal: 60 minutes');
  });

  it('setDailyGoal clamps values between 1 and 120', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    fireEvent.press(screen.getByText('Set Daily Goal 5'));
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 5 minutes');

    fireEvent.press(screen.getByText('Set Daily Goal 150'));
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 120 minutes');
  });

  it('does not update invalid setting key', async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await act(async () => {});

    fireEvent.press(screen.getByText('Update Invalid Setting'));

    expect(flattenChildren(screen.getByTestId('notifications-enabled').props.children)).toBe('Notifications: On');
    expect(flattenChildren(screen.getByTestId('daily-goal').props.children)).toBe('Daily Goal: 30 minutes');
    expect(flattenChildren(screen.getByTestId('theme').props.children)).toBe('Theme: light');

    // No extra storeData calls for invalid keys
    expect(storeData).toHaveBeenCalledTimes(1);
  });
});