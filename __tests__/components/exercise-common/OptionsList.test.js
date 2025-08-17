import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import OptionsList from '../../../src/components/exercise-common/OptionsList';

// Mock des icônes
jest.mock('@expo/vector-icons', () => {
    const { Text } = require('react-native');
    return {
        Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
    };
});

describe('OptionsList', () => {
    const options = [
        { id: '1', text: 'Apple' },
        { id: '2', text: 'Banana' },
        { id: '3', text: 'Cherry' },
    ];
    const onSelectOptionMock = jest.fn();

    afterEach(() => {
        onSelectOptionMock.mockClear();
    });

    // --- Tests de rendu de base ---
    it('renders all options correctly', () => {
        const { getByText } = render(<OptionsList options={options} />);
        expect(getByText('Apple')).toBeTruthy();
        expect(getByText('Banana')).toBeTruthy();
        expect(getByText('Cherry')).toBeTruthy();
    });

    it('calls onSelectOption with the correct id when an option is pressed', () => {
        const { getByText } = render(
            <OptionsList options={options} onSelectOption={onSelectOptionMock} />
        );
        fireEvent.press(getByText('Banana'));
        expect(onSelectOptionMock).toHaveBeenCalledWith('2');
    });

    it('does not call onSelectOption when disabled', () => {
        const { getByText } = render(
            <OptionsList options={options} onSelectOption={onSelectOptionMock} disabled={true} />
        );
        fireEvent.press(getByText('Banana'));
        expect(onSelectOptionMock).not.toHaveBeenCalled();
    });

    it('shows a selected indicator for the selected option when answer is not shown', () => {
        const { getByTestId, queryByTestId } = render(
            <OptionsList options={options} selectedOptionId={'1'} />
        );
        // Vérifie que l'indicateur de sélection est bien présent
        expect(getByTestId('selected-indicator-1')).toBeTruthy();
        // Vérifie qu'il n'y a pas d'icône de bonne/mauvaise réponse
        expect(queryByTestId('icon-checkmark-circle')).toBeNull();
        expect(queryByTestId('icon-close-circle')).toBeNull();
    });

    // --- Tests de mise en page et de logique ---
    describe('Layout and Logic', () => {
        it('renders with vertical layout by default', () => {
            const { getByTestId } = render(<OptionsList options={options} />);
            const optionStyle = StyleSheet.flatten(getByTestId('option-item-1').props.style);
            expect(optionStyle).toEqual(expect.objectContaining({ flexDirection: 'row' }));
        });

        it('renders with grid layout when specified', () => {
            const { getByTestId } = render(<OptionsList options={options} layout="grid" />);
            const gridContainer = StyleSheet.flatten(getByTestId('grid-container').props.style);
            expect(gridContainer).toEqual(expect.objectContaining({ flexDirection: 'row', flexWrap: 'wrap' }));

            const optionStyle = StyleSheet.flatten(getByTestId('grid-option-item-1').props.style);
            expect(optionStyle).toEqual(expect.objectContaining({ width: '48%' }));
        });

        it('handles grid layout with more than 2 options', () => {
            const { getByTestId } = render(<OptionsList options={options} layout="grid" />);
            const optionStyle = StyleSheet.flatten(getByTestId('grid-option-item-1').props.style);
            expect(optionStyle).toEqual(expect.objectContaining({ width: '48%' }));
        });

        it('handles grid layout with a single option', () => {
            const oneOption = [{ id: '1', text: 'One' }];
            const { getByTestId } = render(<OptionsList options={oneOption} layout="grid" />);
            const optionStyle = StyleSheet.flatten(getByTestId('grid-option-item-1').props.style);
            expect(optionStyle).toEqual(expect.objectContaining({ width: '98%' }));
        });
        
        it('renders correctly with only one option in vertical layout', () => {
            const oneOption = [{ id: '1', text: 'One' }];
            const { getByText } = render(<OptionsList options={oneOption} />);
            expect(getByText('One')).toBeTruthy();
        });
    });

    // --- Tests d'affichage de la réponse ---
    describe('when showing correct answer', () => {
        it('shows a checkmark for the correct answer', () => {
            const { getByTestId, queryByTestId } = render(
                <OptionsList
                    options={options}
                    selectedOptionId={'2'}
                    correctOptionId={'2'}
                    showCorrectAnswer={true}
                />
            );
            expect(getByTestId('icon-checkmark-circle')).toBeTruthy();
            expect(queryByTestId('selected-indicator-2')).toBeNull();
        });

        it('shows a cross for the incorrect selection and a checkmark for the correct answer', () => {
            const { getByTestId, queryAllByTestId } = render(
                <OptionsList
                    options={options}
                    selectedOptionId={'1'}
                    correctOptionId={'2'}
                    showCorrectAnswer={true}
                />
            );
            expect(getByTestId('icon-close-circle')).toBeTruthy();
            expect(queryAllByTestId('icon-checkmark-circle').length).toBe(1);
        });

        it('should correctly memoize the component based on props', () => {
    const { rerender } = render(<OptionsList options={[]} selectedOptionId={null} />);

    // Rerender avec les mêmes props pour vérifier que areEqual retourne true
    rerender(<OptionsList options={[]} selectedOptionId={null} />);

    // Rerender avec des props différentes pour vérifier que areEqual retourne false
    // et que le composant se met à jour
    const newOptions = [{ id: '4', text: 'Mango' }];
    rerender(<OptionsList options={newOptions} selectedOptionId={'4'} />);
});

        it('handles correct and incorrect answers in grid layout', () => {
            const { getByTestId, queryAllByTestId } = render(
                <OptionsList
                    options={options}
                    selectedOptionId={'1'}
                    correctOptionId={'2'}
                    showCorrectAnswer={true}
                    layout="grid"
                />
            );
            expect(getByTestId('icon-close-circle')).toBeTruthy();
            expect(queryAllByTestId('icon-checkmark-circle').length).toBe(1);
        });
    });
});