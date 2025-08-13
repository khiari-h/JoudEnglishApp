import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Modal from '../../src/components/ui/Modal';

describe('Modal accessibility', () => {
  it('should expose an accessible close button with label', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(<Modal visible onClose={onClose} title="Titre" />);
    fireEvent.press(getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalled();
  });
});


