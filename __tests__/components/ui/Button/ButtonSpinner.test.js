import React from 'react';
import { render } from '@testing-library/react-native';
import ButtonSpinner from '../../../../src/components/ui/Button/ButtonSpinner';

describe('ButtonSpinner', () => {
  it('devrait rendre un ActivityIndicator avec les props size et color', () => {
    const mockSize = 'large';
    const mockColor = '#FF0000';
    
    const { getByTestId } = render(<ButtonSpinner size={mockSize} color={mockColor} />);
    
    // Utiliser testID pour vérifier que le composant est rendu avec les bonnes props
    const activityIndicator = getByTestId('button-loader');
    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator.props.size).toBe(mockSize);
    expect(activityIndicator.props.color).toBe(mockColor);
  });
});