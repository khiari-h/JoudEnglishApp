
// __tests__/components/exercise-common/CategorySelector.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategorySelector from '../../../src/components/exercise-common/CategorySelector';

// Mock des dépendances
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: (props) => <View {...props} />,
  };
});

describe('CategorySelector', () => {
  const categories = [
    { id: '1', name: 'Grammar' },
    { id: '2', name: 'Vocabulary' },
    { id: '3', name: 'Reading' },
  ];

  it('renders correctly with minimum props', () => {
    const { getByText } = render(<CategorySelector categories={categories} />);
    expect(getByText('Grammar')).toBeTruthy();
    expect(getByText('Vocabulary')).toBeTruthy();
    expect(getByText('Reading')).toBeTruthy();
  });

  it('renders nothing when categories array is empty', () => {
    const { queryByText } = render(<CategorySelector categories={[]} />);
    expect(queryByText('Grammar')).toBeNull();
  });

  it('displays the selected category with the correct style', () => {
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={() => {}}
      />
    );

    // Dans le composant, la catégorie sélectionnée contient un emoji "✨"
    expect(getByText('✨')).toBeTruthy();
  });

  it('calls onSelectCategory with the correct category id when a category is pressed', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
    );

    fireEvent.press(getByText('Vocabulary'));
    expect(onSelectCategory).toHaveBeenCalledWith('2');
  });
});
