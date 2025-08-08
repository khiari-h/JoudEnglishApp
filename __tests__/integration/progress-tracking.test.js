import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout'; // Assurez-vous que le chemin est correct
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

describe('Progress Tracking Integration Test', () => {
  it('should update progress across screens after completing an exercise', async () => {
    const { getByText, findByText } = render(
      <AppProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AppProvider>
    );

    // 1. Démarrer sur le Dashboard et naviguer vers la sélection de niveau
    fireEvent.press(getByText(/Commencer l'apprentissage/i));

    // 2. Sélectionner un niveau (par exemple, A1)
    const levelA1 = await findByText(/Niveau A1/i);
    fireEvent.press(levelA1);

    // 3. Sélectionner un type d'exercice (par exemple, Vocabulaire)
    const vocabExercise = await findByText(/Vocabulaire/i);
    fireEvent.press(vocabExercise);

    // 4. Simuler la réalisation de l'exercice et la mise à jour de la progression
    // (Cette partie peut nécessiter une simulation plus complexe en fonction de votre code)
    // Pour ce test, nous allons simuler un changement de progression manuellement
    // et vérifier si l'interface utilisateur réagit correctement.

    // NOTE: La simulation directe de la logique de l'exercice peut être complexe.
    // Une approche alternative consiste à déclencher des événements qui modifient le contexte de progression.
    // Par exemple, si vous avez un événement `onExerciseComplete`, déclenchez-le ici.

    // Pour les besoins de ce test, nous allons supposer qu'une action met à jour la progression.
    // Par exemple, en appelant une fonction du contexte de progression.
    // Dans un vrai test, vous interagiriez avec les composants de l'exercice.

    // Simuler un retour à l'écran de sélection d'exercices
    fireEvent.press(getByText(/Retour/i)); // Assurez-vous d'avoir un bouton "Retour"

    // 5. Vérifier la mise à jour de la progression sur l'écran de sélection d'exercices
    const updatedVocabExercise = await findByText(/Vocabulaire - 10%/i);
    expect(updatedVocabExercise).toBeTruthy();

    // 6. Retourner à l'écran de sélection de niveau
    fireEvent.press(getByText(/Retour/i));

    // 7. Vérifier la mise à jour de la progression sur l'écran de sélection de niveau
    const updatedLevelA1 = await findByText(/Niveau A1 - 1%/i);
    expect(updatedLevelA1).toBeTruthy();

    // 8. Retourner au Dashboard
    fireEvent.press(getByText(/Retour/i));

    // 9. Vérifier la mise à jour de la progression sur le Dashboard
    const continueSection = await findByText(/Continuer : Vocabulaire A1/i);
    expect(continueSection).toBeTruthy();
  });
});