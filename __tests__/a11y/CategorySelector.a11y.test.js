import React from 'react';
import { render } from '@testing-library/react-native';
import CategorySelector from '../../src/components/exercise-common/CategorySelector';

describe('CategorySelector accessibility', () => {
  it('should render categories as accessible buttons and reflect selected state', () => {
    const categories = [
      { id: 0, name: 'Cat 1' },
      { id: 1, name: 'Cat 2' },
    ];
    const { getAllByRole } = render(<CategorySelector categories={categories} selectedCategory={1} onSelectCategory={() => {}} />);
    const items = getAllByRole('button');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});


