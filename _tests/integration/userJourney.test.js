import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('User Journey Integration', () => {
  it('should allow a user to navigate from dashboard to an exercise and complete a step', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un exercice (ex: vocabulaire)
    fireEvent.press(getByText(/Vocabulaire/i));
    await waitFor(() => expect(getByTestId('vocabulary-exercise-root')).toBeTruthy());

    // Simuler une réponse à une question
    fireEvent.press(getByTestId('answer-option-0'));
    fireEvent.press(getByTestId('submit-answer'));
    await waitFor(() => expect(getByTestId('feedback')).toBeTruthy());
  });

  // Ajoute d'autres parcours selon les besoins (lecture, phrases, révision, etc.)
});
