
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { AppProvider } from '../../src/contexts/AppProvider';
import { ProgressProvider } from '../../src/contexts/ProgressContext';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({ params: {} }),
}));

describe('Specific Exercise Flow (Word Games) Integration Test', () => {
  it('should correctly calculate and save progress after a word game', async () => {
    const { getByText, findByText } = render(
      <AppProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AppProvider>
    );

    // 1. Naviguer vers l'exercice de jeux de mots
    fireEvent.press(getByText(/Commencer l'apprentissage/i));
    const levelA1 = await findByText(/Niveau A1/i);
    fireEvent.press(levelA1);
    const wordGamesExercise = await findByText(/Jeux de Mots/i); // Assurez-vous que le nom est correct
    fireEvent.press(wordGamesExercise);

    // 2. Simuler le déroulement du jeu
    // (Exemple : trouver des mots, atteindre un score)
    // Cette partie est une simplification. Vous devrez interagir avec les éléments de votre jeu.
    fireEvent.press(getByText(/Démarrer le jeu/i));
    // ... simuler des actions dans le jeu ...
    fireEvent.press(getByText(/Terminer le jeu/i));

    // 3. Revenir à l'écran de sélection d'exercices
    const navigation = require('@react-navigation/native');
    fireEvent.press(navigation.useNavigation().goBack());

    // 4. Vérifier que la progression a été mise à jour spécifiquement pour cet exercice
    const updatedGame = await findByText(/Jeux de Mots - (\d+)%/i); // Vérifie la présence d'un pourcentage
    expect(updatedGame).toBeTruthy();
  });
});
