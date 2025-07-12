import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationButtons from '../../../src/components/exercise-common/NavigationButtons';

// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));
// Mock LinearGradient (expo)
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

describe('NavigationButtons', () => {
  it('affiche les labels des boutons', () => {
    const { getByText } = render(
      <NavigationButtons buttonLabels={{ previous: 'Retour', next: 'Avancer', finish: 'Finir' }} />
    );
    expect(getByText('Retour')).toBeTruthy();
    expect(getByText('Avancer')).toBeTruthy();
  });

  it('appelle onPrevious lors du clic sur le bouton précédent', () => {
    const onPrevious = jest.fn();
    const { getByText } = render(
      <NavigationButtons onPrevious={onPrevious} />
    );
    fireEvent.press(getByText('Précédent'));
    // L’animation utilise setTimeout, on laisse passer le délai
    setTimeout(() => {
      expect(onPrevious).toHaveBeenCalled();
    }, 70);
  });

  it('appelle onNext lors du clic sur le bouton suivant', () => {
    const onNext = jest.fn();
    const { getByText } = render(
      <NavigationButtons onNext={onNext} />
    );
    fireEvent.press(getByText('Suivant'));
    setTimeout(() => {
      expect(onNext).toHaveBeenCalled();
    }, 70);
  });

  it('affiche le label Terminer si isLast est true', () => {
    const { getByText } = render(
      <NavigationButtons isLast={true} buttonLabels={{ finish: 'Terminer' }} />
    );
    expect(getByText('Terminer')).toBeTruthy();
  });
});
