
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import VocabularyRevisionScreen from '../../app/tabs/vocabularyRevision';
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

describe('VocabularyRevision Screen', () => {
  it('renders sans crash (mock route)', () => {
    render(
      <NavigationContainer>
        <VocabularyRevisionScreen />
      </NavigationContainer>
    );
  });
});
