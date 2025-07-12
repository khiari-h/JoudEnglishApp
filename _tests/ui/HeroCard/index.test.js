import React from 'react';
import { render } from '@testing-library/react-native';
import HeroCard from '../../../src/components/ui/HeroCard';
import { Text } from 'react-native';

describe('HeroCard', () => {
  it('rend les enfants', () => {
    const { getByText } = render(
      <HeroCard>
        <Text>Héros</Text>
      </HeroCard>
    );
    expect(getByText('Héros')).toBeTruthy();
  });
});
