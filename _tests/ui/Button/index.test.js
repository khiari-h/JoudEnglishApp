import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../src/components/ui/Button';

// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('Button', () => {
  it('affiche le titre', () => {
    const { getByText } = render(<Button title="Valider" />);
    expect(getByText('Valider')).toBeTruthy();
  });

  it('appelle onPress lors du clic', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Cliquer" onPress={onPress} />);
    fireEvent.press(getByText('Cliquer'));
    expect(onPress).toHaveBeenCalled();
  });

  it('affiche le loader si loading est true', () => {
    const { UNSAFE_getByType } = render(<Button loading={true} />);
    expect(UNSAFE_getByType(require('react-native').ActivityIndicator)).toBeTruthy();
  });
});
