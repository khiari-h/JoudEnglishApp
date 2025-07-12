import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/layout/Header';

// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));
// Mock useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ canGoBack: () => true, goBack: jest.fn() }),
}));

describe('Header', () => {
  it('affiche le titre', () => {
    const { getByText } = render(<Header title="Titre test" />);
    expect(getByText('Titre test')).toBeTruthy();
  });

  it('appelle onBackPress lors du clic sur le bouton retour', () => {
    const onBackPress = jest.fn();
    const { getAllByRole } = render(<Header title="Test" onBackPress={onBackPress} />);
    // Le bouton retour est le premier TouchableOpacity
    const buttons = getAllByRole('button');
    fireEvent.press(buttons[0]);
    expect(onBackPress).toHaveBeenCalled();
  });

  it('affiche le sous-titre en mode largeTitleMode', () => {
    const { getByText } = render(
      <Header title="Titre" subtitle="Sous-titre" largeTitleMode={true} />
    );
    expect(getByText('Sous-titre')).toBeTruthy();
  });
});
