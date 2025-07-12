

import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ReadingExerciseScreen from '../../app/tabs/readingExercise';
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

describe('ReadingExercise Screen', () => {
  it('renders sans crash (mock route)', () => {
    render(
      <NavigationContainer>
        <ReadingExerciseScreen />
      </NavigationContainer>
    );
    // On vérifie simplement que le composant ne crash pas au rendu
  });
});
