import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Error Handling Journey', () => {
  it('should display an error message if data is missing', async () => {
    // Simuler un contexte où les données sont manquantes ou corrompues
    // (nécessite éventuellement un mock du provider ou du fetch)
    // Ici, on suppose qu'un testID "error-message" s'affiche en cas d'erreur
    const { getByTestId } = render(<App initialRouteName="/missing-data" />);
    await waitFor(() => expect(getByTestId('error-message')).toBeTruthy());
  });

  it('should handle navigation to a non-existent screen gracefully', async () => {
    // Simuler une navigation vers une route inconnue
    const { getByTestId } = render(<App initialRouteName="/unknown-route" />);
    await waitFor(() => expect(getByTestId('not-found-root')).toBeTruthy());
  });
});
