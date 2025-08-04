import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { ThemeProvider, ThemeContext } from '../../src/contexts/ThemeContext';

// Mock react-native's useColorScheme
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    useColorScheme: jest.fn(() => 'light'),
  };
});

// Mock storageUtils
jest.mock('../../src/utils/storageUtils', () => ({
  storeData: jest.fn(() => Promise.resolve()),
  getData: jest.fn(() => Promise.resolve(null)),
}));

// Mock constants with dark colors
jest.mock('../../src/utils/constants', () => ({
  COLORS: {
    background: '#FFFFFF',
    text: '#000000',
    // dark theme colors used in provider when theme==='dark'
    darkBackground: '#121212',
    darkText: '#FFFFFF',
  },
}));

import { useColorScheme } from 'react-native';
import { storeData, getData } from '../../src/utils/storageUtils';

// Helper to flatten children prop which can be array/list in RN Text
const flattenChildren = (children) =>
  Array.isArray(children) ? children.join('') : children;

const TestComponent = () => {
  const {
    theme,
    isDarkTheme,
    colors,
    loaded,
    setTheme: setAppTheme,
    toggleTheme,
    resetToSystemTheme,
  } = React.useContext(ThemeContext);

  if (!loaded) {
    return <Text testID="loading-status">Loading Theme...</Text>;
  }

  return (
    <>
      <Text testID="current-theme">Theme: {theme}</Text>
      <Text testID="is-dark-theme">Is Dark: {isDarkTheme ? 'Yes' : 'No'}</Text>
      <Text testID="background-color">Background: {colors.background}</Text>
      <Text testID="text-color">Text: {colors.text}</Text>

      <Button title="Set Light" onPress={() => setAppTheme('light')} />
      <Button title="Set Dark" onPress={() => setAppTheme('dark')} />
      <Button title="Set System" onPress={() => setAppTheme('system')} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <Button title="Reset to System" onPress={resetToSystemTheme} />
    </>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getData.mockResolvedValue(null);
    useColorScheme.mockReturnValue('light');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('loads default theme (system) if none saved', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('loading-status')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId('loading-status')).toBeNull();

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
    expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #FFFFFF');
    expect(getData).toHaveBeenCalledWith('appTheme');
    expect(storeData).not.toHaveBeenCalled();
  });

  it('loads saved theme from storage', async () => {
    getData.mockResolvedValueOnce('dark');
    // Also mock dark colors for dark theme, fix provider accordingly (colors.background)

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');
    expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #121212');
  });

  it('sets theme to light and saves it', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Set Light'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
    expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #FFFFFF');

    await act(async () => {
      jest.runAllTimers();
    });

    expect(storeData).toHaveBeenCalledWith('appTheme', 'light');
  });

  it('sets theme to dark and saves it', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Set Dark'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');
    expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #121212');

    await act(async () => {
      jest.runAllTimers();
    });

    expect(storeData).toHaveBeenCalledWith('appTheme', 'dark');
  });

  it('toggles theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Set Light'));

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Toggle Theme'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');
  });

  it('toggles theme from dark to light', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Set Dark'));

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Toggle Theme'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
  });

  it('toggles theme from system based on systemColorScheme', async () => {
    useColorScheme.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');

    fireEvent.press(screen.getByText('Toggle Theme'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
  });

  it('resets to system theme and saves it', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Set Dark'));

    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText('Reset to System'));

    expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
    expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');

    await act(async () => {
      jest.runAllTimers();
    });

    expect(storeData).toHaveBeenCalledWith('appTheme', 'system');
  });
});