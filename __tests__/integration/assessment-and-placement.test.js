
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { AppProvider } from '../../src/contexts/AppProvider';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

describe('Assessment and Placement Integration Test', () => {
  it('should place the user at the correct level based on assessment results', async () => {
    const { getByText, findByText } = render(
      <AppProvider>
          <App />
      </AppProvider>
    );

    // 1. Démarrer le test de niveau
    fireEvent.press(getByText(/Commencer le test de niveau/i));

    // 2. Simuler les réponses au test
    // (Cette partie dépend de la structure de votre test de niveau)
    // Exemple : répondre correctement à des questions pour un niveau B1
    fireEvent.press(getByText(/Réponse A/i)); // Simulez les réponses
    fireEvent.press(getByText(/Réponse B/i));
    // ... continuez pour toutes les questions

    // 3. Terminer le test
    fireEvent.press(getByText(/Terminer le test/i));

    // 4. Vérifier que l'utilisateur est redirigé vers le bon niveau
    const recommendedLevel = await findByText(/Niveau recommandé : B1/i);
    expect(recommendedLevel).toBeTruthy();

    // 5. Naviguer vers la sélection de niveau pour confirmer
    fireEvent.press(getByText(/Continuer/i));
    const levelB1 = await findByText(/Niveau B1/i);
    expect(levelB1).toBeTruthy();
  });
});
