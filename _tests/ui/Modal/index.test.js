import React from 'react';
import { render } from '@testing-library/react-native';
import Modal from '../../../src/components/ui/Modal';
import { Text } from 'react-native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  MaterialIcons: () => null,
  FontAwesome: () => null,
  // Ajoute d'autres icônes si besoin
}));

describe('Modal', () => {
  it('rend les enfants quand visible', () => {
    const { getByText } = render(
      <Modal visible={true}>
        <Text>Contenu modal</Text>
      </Modal>
    );
    expect(getByText('Contenu modal')).toBeTruthy();
  });
});
