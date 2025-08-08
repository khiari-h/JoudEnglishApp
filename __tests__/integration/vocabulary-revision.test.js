
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { ProgressProvider } from '../../src/contexts/ProgressContext';
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

describe('Vocabulary Revision Integration Test', () => {
  it('should add words to revision list and allow revision', async () => {
    const { getByText, findByText } = render(
      <AppProvider>
        <ProgressProvider>
            <App />
        </ProgressProvider>
      </AppProvider>
    );

    // 1. Simuler la réalisation d'un exercice de vocabulaire
    // (Cette partie est une simplification. En réalité, vous interagiriez avec l'exercice)
    // Supposons qu'après un exercice, des mots sont ajoutés à la révision.

    // 2. Naviguer vers l'écran de révision du vocabulaire
    fireEvent.press(getByText(/Révision du vocabulaire/i));

    // 3. Vérifier que les mots à réviser sont affichés
    const wordToRevise = await findByText(/Mot à réviser/i); // Remplacez par un vrai mot de votre exercice
    expect(wordToRevise).toBeTruthy();

    // 4. Démarrer une session de révision
    fireEvent.press(getByText(/Commencer la révision/i));

    // 5. Simuler la révision d'un mot
    // (Interagissez avec les composants de votre session de révision)
    fireEvent.press(getByText(/Je me souviens/i));

    // 6. Vérifier que le mot a été retiré de la liste de révision immédiate
    await waitFor(() => {
      expect(screen.queryByText(/Mot à réviser/i)).toBeNull();
    });
  });
});
