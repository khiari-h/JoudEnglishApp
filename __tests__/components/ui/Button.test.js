import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../src/components/ui/Button';

describe('Button', () => {
  it('devrait rendre le texte correct', () => {
    const { getByText } = render(<Button title="Mon Bouton" onPress={() => {}} />);
    expect(getByText('Mon Bouton')).toBeTruthy();
  });

  it('devrait appeler la fonction onPress quand le bouton est pressé', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Mon Bouton" onPress={mockOnPress} />);
    fireEvent.press(getByText('Mon Bouton'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('ne devrait pas appeler la fonction onPress quand le bouton est désactivé', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Mon Bouton" onPress={mockOnPress} disabled />);
    fireEvent.press(getByText('Mon Bouton'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('devrait afficher un indicateur de chargement si loading est vrai', () => {
    const { queryByTestId } = render(<Button title="Mon Bouton" onPress={() => {}} loading />);
    expect(queryByTestId('button-loader')).toBeTruthy();
  });

  it('ne devrait pas afficher un indicateur de chargement si loading est faux', () => {
    const { queryByTestId } = render(<Button title="Mon Bouton" onPress={() => {}} loading={false} />);
    expect(queryByTestId('button-loader')).toBeNull();
  });
});
