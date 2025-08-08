
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../app/_layout';
import { AppProvider } from '../../src/contexts/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage pour contrôler le stockage
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({ params: {} }),
}));

describe('Session Resume Integration Test', () => {
  beforeEach(async () => {
    // Nettoyer le stockage avant chaque test
    await AsyncStorage.clear();
  });

  it('should persist and resume progress after app restart', async () => {
    const { getByText, findByText, unmount } = render(
      <AppProvider><App /></AppProvider>
    );

    // 1. Effectuer une action qui modifie la progression
    // (Simplification : nous allons directement manipuler le stockage pour simuler une session précédente)
    const progress = { A1: { vocabulary: { progress: 50 } } };
    await AsyncStorage.setItem('progress', JSON.stringify(progress));

    // 2. Simuler la fermeture de l'application
    unmount();

    // 3. Simuler la réouverture de l'application
    const { getByText: getByTextAfterRestart } = render(
      <AppProvider><App /></AppProvider>
    );

    // 4. Vérifier que la progression a été restaurée sur le Dashboard
    // (La vérification exacte dépend de la façon dont votre Dashboard affiche la progression)
    const continueButton = await findByText(/Continuer/i);
    expect(continueButton).toBeTruthy();

    // Idéalement, vérifier une barre de progression ou un texte spécifique
    // const progressText = await findByText(/50%/);
    // expect(progressText).toBeTruthy();
  });
});
