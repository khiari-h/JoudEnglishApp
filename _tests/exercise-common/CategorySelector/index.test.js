import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategorySelector from '../../../src/components/exercise-common/CategorySelector';

// Mock LinearGradient (expo)
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

describe('CategorySelector', () => {
  const categories = [
    { id: 'cat1', name: 'Catégorie 1' },
    { id: 'cat2', name: 'Catégorie 2' },
  ];
  const primaryColor = '#123456';

  it('affiche toutes les catégories', () => {
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory={'cat1'}
        onSelectCategory={() => {}}
        primaryColor={primaryColor}
      />
    );
    expect(getByText('Catégorie 1')).toBeTruthy();
    expect(getByText('Catégorie 2')).toBeTruthy();
  });

  it('appelle onSelectCategory lors du clic sur une catégorie', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory={'cat1'}
        onSelectCategory={onSelectCategory}
        primaryColor={primaryColor}
      />
    );
    fireEvent.press(getByText('Catégorie 2'));
    expect(onSelectCategory).toHaveBeenCalledWith('cat2');
  });

  it('affiche le sparkle ✨ sur la catégorie sélectionnée', () => {
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory={'cat2'}
        onSelectCategory={() => {}}
        primaryColor={primaryColor}
      />
    );
    // L’emoji ✨ n’est affiché que sur la catégorie sélectionnée
    expect(getByText('✨')).toBeTruthy();
  });
});
