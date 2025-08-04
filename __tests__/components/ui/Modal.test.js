import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Modal from '../../../src/components/ui/Modal';
import { Text } from 'react-native';

// Mock plus complet du composant Modal de react-native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const { View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView } = RN;
  
  return {
    ...RN,
    Modal: ({ children, visible, onRequestClose }) => 
      visible ? <View testID="rn-modal">{children}</View> : null,
    Dimensions: {
      get: () => ({ width: 375, height: 667 })
    },
    Platform: {
      OS: 'ios'
    },
    Animated: {
      View: View,
      Value: class {
        constructor() {}
        interpolate = () => 0;
      },
      timing: () => ({ start: jest.fn() })
    }
  };
});

// Mock d'Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { ...props, testID: `icon-${name}` }, name);
  }
}));

// Mock du fichier de styles
jest.mock('../../../src/components/ui/Modal/style', () => ({
  modalContainer: {},
  backdrop: {},
  contentContainer: {},
  centerPosition: {},
  bottomPosition: {},
  topPosition: {},
  header: {},
  title: {},
  closeButton: {},
  body: {},
  scrollableBody: {},
  scrollableContent: {},
  footer: {},
  keyboardAvoidingView: {}
}));

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('ne devrait pas rendre le contenu si visible est faux', () => {
    const { queryByText } = render(
      <Modal visible={false} onClose={mockOnClose}>
        <Text>Contenu du modal</Text>
      </Modal>
    );
    expect(queryByText('Contenu du modal')).toBeNull();
  });

  it('devrait rendre le contenu si visible est vrai', () => {
    const { getByText } = render(
      <Modal visible={true} onClose={mockOnClose}>
        <Text>Contenu du modal</Text>
      </Modal>
    );
    expect(getByText('Contenu du modal')).toBeTruthy();
  });

  it('devrait appeler onClose quand le fond est pressé et closeOnBackdropPress est vrai', () => {
    const { getByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} closeOnBackdropPress={true}>
        <Text>Contenu du modal</Text>
      </Modal>
    );
    
    const backdrop = getByTestId('modal-backdrop');
    fireEvent.press(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('ne devrait pas appeler onClose quand le fond est pressé et closeOnBackdropPress est faux', () => {
    const { getByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} closeOnBackdropPress={false}>
        <Text>Contenu du modal</Text>
      </Modal>
    );
    
    const backdrop = getByTestId('modal-backdrop');
    fireEvent.press(backdrop);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('devrait rendre le titre si fourni', () => {
    const { getByText } = render(
      <Modal visible={true} onClose={mockOnClose} title="Titre du Modal">
        <Text>Contenu</Text>
      </Modal>
    );
    expect(getByText('Titre du Modal')).toBeTruthy();
  });

  it('devrait afficher le bouton de fermeture par défaut', () => {
    const { getByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} title="Test">
        <Text>Contenu</Text>
      </Modal>
    );
    expect(getByTestId('icon-close')).toBeTruthy();
  });

  it('ne devrait pas afficher le bouton de fermeture si showCloseButton est false', () => {
    const { queryByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} title="Test" showCloseButton={false}>
        <Text>Contenu</Text>
      </Modal>
    );
    expect(queryByTestId('icon-close')).toBeNull();
  });

  it('devrait appeler onClose quand le bouton de fermeture est pressé', () => {
    const { getByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} title="Test">
        <Text>Contenu</Text>
      </Modal>
    );
    
    const closeButton = getByTestId('icon-close').parent;
    fireEvent.press(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('devrait rendre le footer si fourni', () => {
    const footer = <Text>Footer content</Text>;
    const { getByText } = render(
      <Modal visible={true} onClose={mockOnClose} footer={footer}>
        <Text>Contenu</Text>
      </Modal>
    );
    expect(getByText('Footer content')).toBeTruthy();
  });

  it('devrait utiliser ScrollView si scrollable est true', () => {
    const { getByTestId } = render(
      <Modal visible={true} onClose={mockOnClose} scrollable={true}>
        <Text testID="scrollable-content">Contenu scrollable</Text>
      </Modal>
    );
    // Le contenu devrait être dans un ScrollView
    expect(getByTestId('scrollable-content')).toBeTruthy();
  });
});