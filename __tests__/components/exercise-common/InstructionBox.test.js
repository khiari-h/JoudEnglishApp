import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InstructionBox from '../../../src/components/exercise-common/InstructionBox';

// Mock des icônes et styles
jest.mock('@expo/vector-icons', () => {
    const { Text } = require('react-native');
    return {
        Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
    };
});

jest.mock('../../../src/components/exercise-common/InstructionBox/style', () => ({
    container: { container: true },
    standardContainer: { standard: true },
    compactContainer: { compact: true },
    highlightedContainer: { highlighted: true },
    headerContainer: { header: true },
    titleContainer: { titleContainer: true },
    titleIcon: { titleIcon: true },
    title: { title: true },
    contentContainer: { contentContainer: true },
    instructions: { instructions: true },
    examplesContainer: { examplesContainer: true },
    sectionTitle: { sectionTitle: true },
    exampleItem: { exampleItem: true },
    exampleText: { exampleText: true },
    tipsContainer: { tipsContainer: true },
    tipItem: { tipItem: true },
    tipIcon: { tipIcon: true },
    tipText: { tipText: true },
}));


describe('InstructionBox', () => {
    const defaultProps = {
        title: 'Test Instructions',
        instructions: 'Test instruction text',
        examples: ['Example 1', 'Example 2'],
        tips: ['Tip 1', 'Tip 2'],
    };

    // --- Tests de rendu et de contenu ---
    it('renders with standard variant by default', () => {
        const { getByText, queryByTestId } = render(<InstructionBox {...defaultProps} />);
        expect(getByText('Test Instructions')).toBeTruthy();
        expect(getByText('Test instruction text')).toBeTruthy();
        expect(getByText('Exemples:')).toBeTruthy();
        expect(getByText('Example 1')).toBeTruthy();
        expect(getByText('Astuces:')).toBeTruthy();
        expect(getByText('Tip 1')).toBeTruthy();
        expect(queryByTestId('icon-information-circle')).toBeTruthy();
    });

    it('renders with compact variant', () => {
        const { getByText } = render(
            <InstructionBox {...defaultProps} variant="compact" />
        );
        expect(getByText('Test Instructions')).toBeTruthy();
    });

    it('renders with highlighted variant', () => {
        const { getByText } = render(
            <InstructionBox {...defaultProps} variant="highlighted" />
        );
        expect(getByText('Test Instructions')).toBeTruthy();
    });

    it('renders without instructions when not provided', () => {
        const { queryByText } = render(
            <InstructionBox {...defaultProps} instructions={null} />
        );
        expect(queryByText('Test instruction text')).toBeNull();
    });

    it('renders without examples when empty array', () => {
        const { queryByText } = render(
            <InstructionBox {...defaultProps} examples={[]} />
        );
        expect(queryByText('Exemples:')).toBeNull();
    });

    it('renders without tips when empty array', () => {
        const { queryByText } = render(
            <InstructionBox {...defaultProps} tips={[]} />
        );
        expect(queryByText('Astuces:')).toBeNull();
    });

    it('applies custom primary color', () => {
        const customColor = '#FF0000';
        const { getByText } = render(
            <InstructionBox {...defaultProps} primaryColor={customColor} />
        );
        expect(getByText('Test Instructions')).toBeTruthy();
    });

    it('renders default title when not provided', () => {
      const { getByText } = render(<InstructionBox />);
      expect(getByText('Instructions')).toBeTruthy();
    });

    // --- Tests de comportement ---
    it('starts expanded by default', () => {
        const { getByText } = render(<InstructionBox {...defaultProps} />);
        // Le contenu devrait être visible
        expect(getByText('Test instruction text')).toBeTruthy();
    });

    it('starts collapsed when initiallyExpanded is false', () => {
        const { queryByText } = render(
            <InstructionBox {...defaultProps} initiallyExpanded={false} />
        );
        // Le contenu ne devrait pas être visible
        expect(queryByText('Test instruction text')).toBeNull();
    });

    it('toggles expansion when header is pressed', () => {
        const { getByText, queryByText } = render(
            <InstructionBox {...defaultProps} initiallyExpanded={false} />
        );

        // Le contenu est initialement caché
        expect(queryByText('Test instruction text')).toBeNull();

        // Clique pour expand
        fireEvent.press(getByText('Test Instructions'));

        // Le contenu devrait maintenant être visible
        expect(getByText('Test instruction text')).toBeTruthy();

        // Clique de nouveau pour collapse
        fireEvent.press(getByText('Test Instructions'));

        // Le contenu devrait être à nouveau caché
        expect(queryByText('Test instruction text')).toBeNull();
    });
});