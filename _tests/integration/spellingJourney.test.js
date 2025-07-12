import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Spelling Exercise Journey', () => {
  it('should allow a user to start a spelling exercise and submit an answer', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un exercice d'orthographe
    fireEvent.press(getByText(/Orthographe|Spelling/i));
    await waitFor(() => expect(getByTestId('spelling-exercise-root')).toBeTruthy());

    // Simuler la saisie d'une réponse
    fireEvent.changeText(getByTestId('spelling-input'), 'mot');
    fireEvent.press(getByTestId('submit-answer'));
    await waitFor(() => expect(getByTestId('feedback')).toBeTruthy());
  });
});
