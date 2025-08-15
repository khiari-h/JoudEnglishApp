import React from 'react';
import { render } from '@testing-library/react-native';
import InstructionBox from '../../../src/components/exercise-common/InstructionBox';

// Mock des styles
jest.mock('../../../src/components/exercise-common/InstructionBox/style', () => ({
  container: { container: true },
  standardContainer: { standard: true },
  compactContainer: { compact: true },
  highlightedContainer: { highlighted: true },
}));

describe('InstructionBox', () => {
  const defaultProps = {
    title: 'Test Instructions',
    instructions: 'Test instruction text',
    examples: ['Example 1', 'Example 2'],
    tips: ['Tip 1', 'Tip 2'],
  };

  it('renders with standard variant by default', () => {
    const { getByText } = render(<InstructionBox {...defaultProps} />);
    expect(getByText('Test Instructions')).toBeTruthy();
    expect(getByText('Test instruction text')).toBeTruthy();
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

  it('starts collapsed when initiallyExpanded is false', () => {
    const { queryByText } = render(
      <InstructionBox {...defaultProps} initiallyExpanded={false} />
    );
    // Le contenu ne devrait pas être visible initialement
    expect(queryByText('Test instruction text')).toBeNull();
  });
});
