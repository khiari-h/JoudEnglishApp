import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../../../src/components/ui/Card';
import { Text } from 'react-native';

describe('Card', () => {
  it('rend les enfants', () => {
    const { getByText } = render(
      <Card>
        <Text>Contenu de la carte</Text>
      </Card>
    );
    expect(getByText('Contenu de la carte')).toBeTruthy();
  });

  it('applique le style personnalisé', () => {
    const { getByTestId } = render(
      <Card testID="card" style={{ backgroundColor: 'red' }}>
        <Text>Test</Text>
      </Card>
    );
    expect(getByTestId('card').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' })
      ])
    );
  });
});
