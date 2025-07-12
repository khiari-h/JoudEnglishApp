import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Word Games Exercise Journey', () => {
  it('should allow a user to start a word game and submit an answer', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un jeu de mots
    fireEvent.press(getByText(/Jeu de mots|Word Game/i));
    await waitFor(() => expect(getByTestId('wordgames-exercise-root')).toBeTruthy());

    // Simuler la saisie d'une réponse
    fireEvent.changeText(getByTestId('wordgame-input'), 'mot');
    fireEvent.press(getByTestId('submit-answer'));
    await waitFor(() => expect(getByTestId('feedback')).toBeTruthy());
  });
});
