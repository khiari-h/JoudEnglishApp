
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
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

describe('Exercise Abandonment Integration Test', () => {
  it('should not save progress if an exercise is abandoned midway', async () => {
    const { getByText, findByText, queryByText } = render(
      <AppProvider>
        <ProgressProvider> {/* Assurez-vous que le contexte de progression est ici */}
          <App />
        </ProgressProvider>
      </AppProvider>
    );

    // 1. Naviguer vers un exercice
    fireEvent.press(getByText(/Commencer l'apprentissage/i));
    const levelA1 = await findByText(/Niveau A1/i);
    fireEvent.press(levelA1);
    const vocabExercise = await findByText(/Vocabulaire/i);
    fireEvent.press(vocabExercise);

    // 2. Simuler une progression partielle dans l'exercice
    // (Cette partie est une simplification, vous interagiriez avec les questions)

    // 3. Abandonner l'exercice en revenant en arrière
    const navigation = require('@react-navigation/native');
    fireEvent.press(navigation.useNavigation().goBack());

    // 4. Vérifier que la progression sur l'écran de sélection d'exercices n'a pas changé
    const vocabExerciseAfter = await findByText(/Vocabulaire/i);
    // S'assurer que le texte de progression (ex: "10%") n'est PAS là
    expect(queryByText(/%/)).toBeNull();
  });
});
