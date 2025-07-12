import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Container from '../../../src/components/layout/Container';

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }) => <>{children}</>,
}));

describe('Container', () => {
  it('rend les enfants', () => {
    const { getByText } = render(
      <Container>
        <Text>Contenu test</Text>
      </Container>
    );
    expect(getByText('Contenu test')).toBeTruthy();
  });

  it('utilise ScrollView si withScrollView est true', () => {
    const { UNSAFE_getByType } = render(
      <Container withScrollView={true}>
        <Text>Scrollé</Text>
      </Container>
    );
    // Vérifie la présence du composant ScrollView
    expect(UNSAFE_getByType(require('react-native').ScrollView)).toBeTruthy();
  });
});
