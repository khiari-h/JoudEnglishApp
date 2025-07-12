import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Reading Exercise Journey', () => {
  it('should allow a user to start a reading exercise and answer a question', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un exercice de lecture
    fireEvent.press(getByText(/Lecture/i));
    await waitFor(() => expect(getByTestId('reading-exercise-root')).toBeTruthy());

    // Simuler la sélection d'une réponse
    fireEvent.press(getByTestId('answer-option-0'));
    fireEvent.press(getByTestId('submit-answer'));
    await waitFor(() => expect(getByTestId('feedback')).toBeTruthy());
  });
});
