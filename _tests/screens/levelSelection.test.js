
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LevelSelectionScreen from '../../app/tabs/levelSelection';
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

describe('LevelSelection Screen', () => {
  it('renders sans crash (mock route)', () => {
    render(
      <NavigationContainer>
        <LevelSelectionScreen />
      </NavigationContainer>
    );
  });
});
