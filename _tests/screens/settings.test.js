
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from '../../app/tabs/settings';
jest.mock('@expo/vector-icons', () => ({
  ...jest.requireActual('@expo/vector-icons'),
  createIconSet: () => 'Icon',
  Ionicons: 'Icon',
  MaterialIcons: 'Icon',
  FontAwesome: 'Icon',
}));
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({ params: {} }),
  };
});

describe('Settings Screen', () => {
  it('renders sans crash (mock route)', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    );
    expect(getByTestId('settings-root')).toBeTruthy();
  });
});
