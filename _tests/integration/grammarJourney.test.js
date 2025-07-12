import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Grammar Exercise Journey', () => {
  it('should allow a user to start a grammar exercise and submit an answer', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un exercice de grammaire
    fireEvent.press(getByText(/Grammaire|Grammar/i));
    await waitFor(() => expect(getByTestId('grammar-exercise-root')).toBeTruthy());

    // Simuler la saisie d'une réponse
    fireEvent.changeText(getByTestId('grammar-input'), 'réponse');
    fireEvent.press(getByTestId('submit-answer'));
    await waitFor(() => expect(getByTestId('feedback')).toBeTruthy());
  });
});
