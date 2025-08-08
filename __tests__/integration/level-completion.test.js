
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { ProgressProvider, ProgressContext } from '../../src/contexts/ProgressContext';
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

describe('Level Completion Integration Test', () => {
  it('should unlock the next level after completing all exercises of a level', async () => {
    // Fonction pour simuler la complétion de tous les exercices d'un niveau
    const completeAllExercises = (updateProgress) => {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      const exercises = ['vocabulary', 'grammar', 'reading', 'listening', 'speaking'];
      levels.forEach(level => {
        exercises.forEach(exercise => {
          updateProgress(level, exercise, 100);
        });
      });
    };

    const TestComponent = () => (
      <AppProvider>
        <ProgressProvider>
          <ProgressContext.Consumer>
            {({ updateProgress }) => (
              <button
                testID="complete-all"
                onPress={() => completeAllExercises(updateProgress)}
              />
            )}
          </ProgressContext.Consumer>
          <App />
        </ProgressProvider>
      </AppProvider>
    );

    const { getByText, findByText, getByTestId } = render(<TestComponent />);

    // 1. Simuler la complétion de tous les exercices du niveau A1
    fireEvent.press(getByTestId('complete-all'));

    // 2. Naviguer vers la sélection de niveau
    fireEvent.press(getByText(/Commencer l'apprentissage/i));

    // 3. Vérifier que le niveau A1 est marqué comme complet
    const levelA1 = await findByText(/Niveau A1 - Terminé/i);
    expect(levelA1).toBeTruthy();

    // 4. Vérifier que le niveau A2 est maintenant débloqué
    const levelA2 = await findByText(/Niveau A2/i);
    expect(levelA2).toBeTruthy();
    expect(levelA2.props.style.opacity).not.toBe(0.5); // Supposant qu'un niveau bloqué a une opacité réduite
  });
});
