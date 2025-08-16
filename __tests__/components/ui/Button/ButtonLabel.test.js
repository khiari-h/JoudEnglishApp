import React from 'react';
import { render } from '@testing-library/react-native';
import ButtonLabel from '../../../../src/components/ui/Button/ButtonLabel';

// Mocks des styles pour une meilleure lisibilité et pour éviter les dépendances
const mockSizeStyles = { text: { fontSize: 16 } };
const mockVariantStyles = { text: { color: 'blue' } };
const mockCustomTextStyle = { letterSpacing: 0.5 };

describe('ButtonLabel', () => {
  it('devrait rendre le titre en majuscules si la prop uppercase est vraie', () => {
    const { getByText } = render(
      <ButtonLabel
        title="mon bouton"
        sizeStyles={mockSizeStyles}
        variantStyles={mockVariantStyles}
        uppercase={true}
        textStyle={mockCustomTextStyle}
      />
    );
    const textComponent = getByText('mon bouton');
    // On vérifie que le style contient l'objet de style pour la mise en majuscules
    expect(textComponent.props.style).toContainEqual(
      expect.objectContaining({ textTransform: 'uppercase' })
    );
  });

  it('ne devrait pas rendre le titre en majuscules si la prop uppercase est fausse', () => {
    const { getByText } = render(
      <ButtonLabel
        title="mon bouton"
        sizeStyles={mockSizeStyles}
        variantStyles={mockVariantStyles}
        uppercase={false}
      />
    );
    const textComponent = getByText('mon bouton');
    // On vérifie que le style ne contient pas l'objet de style pour la mise en majuscules
    expect(textComponent.props.style).not.toContainEqual(
      expect.objectContaining({ textTransform: 'uppercase' })
    );
  });

  it('devrait appliquer le style de texte correct', () => {
    const { getByText } = render(
      <ButtonLabel
        title="Titre"
        sizeStyles={mockSizeStyles}
        variantStyles={mockVariantStyles}
      />
    );
    const textComponent = getByText('Titre');
    expect(textComponent.props.style).toContainEqual(mockSizeStyles.text);
    expect(textComponent.props.style).toContainEqual(mockVariantStyles.text);
  });
  
  it('devrait appliquer un style de texte personnalisé si fourni', () => {
    const customTextStyle = { fontWeight: 'bold' };
    const { getByText } = render(
      <ButtonLabel
        title="Titre"
        sizeStyles={mockSizeStyles}
        variantStyles={mockVariantStyles}
        textStyle={customTextStyle}
      />
    );
    const textComponent = getByText('Titre');
    expect(textComponent.props.style).toContainEqual(customTextStyle);
  });
});