// __tests__/components/layout/Header.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/layout/Header';

jest.mock('@expo/vector-icons'); // Important pour éviter l'erreur ESM

describe('Header', () => {
  it('affiche le titre passé en prop', () => {
    const { getByText } = render(<Header title="Accueil" />);
    expect(getByText('Accueil')).toBeTruthy();
  });

  it('n’affiche pas le bouton retour si showBackButton est false ou non défini', () => {
    const { queryByTestId } = render(<Header title="Sans Retour" showBackButton={false} />);
    expect(queryByTestId('back-button')).toBeNull();
  });

  it('affiche le bouton retour si showBackButton est true', () => {
    const { getByTestId } = render(<Header title="Avec Retour" showBackButton={true} />);
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('exécute une action au clic sur le bouton retour si onBackPress est défini', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<Header title="Retour" showBackButton={true} onBackPress={mockFn} />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
