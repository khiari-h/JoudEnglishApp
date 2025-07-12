import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/index';

describe('Conversations Exercise Journey', () => {
  it('should allow a user to start a conversation exercise and send a message', async () => {
    const { getByTestId, getByText } = render(<App />);

    // Dashboard visible
    expect(getByTestId('dashboard-root')).toBeTruthy();

    // Aller vers la sélection d'exercice
    fireEvent.press(getByTestId('go-to-exercise-selection'));
    await waitFor(() => expect(getByTestId('exercise-selection-root')).toBeTruthy());

    // Sélectionner un exercice de conversation
    fireEvent.press(getByText(/Conversation/i));
    await waitFor(() => expect(getByTestId('conversations-exercise-root')).toBeTruthy());

    // Simuler l'envoi d'un message
    fireEvent.changeText(getByTestId('message-input'), 'Hello!');
    fireEvent.press(getByTestId('send-message'));
    await waitFor(() => expect(getByTestId('conversation-history')).toBeTruthy());
  });
});
