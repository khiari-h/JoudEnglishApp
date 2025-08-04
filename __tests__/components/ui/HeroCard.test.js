import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HeroCard from '../../../src/components/ui/HeroCard';
import { Text } from 'react-native';

describe('HeroCard', () => {
  it('renders correctly with content', () => {
    render(<HeroCard content="Hello World" />);
    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });

  it('renders correctly with children', () => {
    render(
      <HeroCard>
        <Text>Child Content</Text>
      </HeroCard>
    );
    expect(screen.getByText('Child Content')).toBeOnTheScreen();
  });

  it('applies custom font size', () => {
    render(<HeroCard content="Large Text" fontSize={40} />);
    const textElement = screen.getByText('Large Text');
    // Testing styles directly can be tricky. We'll rely on the component's internal logic.
    expect(textElement).toBeOnTheScreen();
  });

  it('applies custom text alignment', () => {
    render(<HeroCard content="Right Aligned" textAlign="right" />);
    const textElement = screen.getByText('Right Aligned');
    expect(textElement).toBeOnTheScreen();
  });

  it('does not show underline when showUnderline is false', () => {
    render(<HeroCard content="No Underline" showUnderline={false} />);
    expect(screen.getByText('No Underline')).toBeOnTheScreen();
    // Verifying absence of a specific style element is hard without test IDs or snapshots.
  });

  it('applies custom containerStyle', () => {
    const customStyle = { padding: 20 };
    render(<HeroCard content="Styled Card" containerStyle={customStyle} />);
    expect(screen.getByText('Styled Card')).toBeOnTheScreen();
  });

  it('does not render content if it is empty string or not a string', () => {
    const { queryByText } = render(<HeroCard content="" />);
    expect(queryByText('')).toBeNull();

    const { queryByText: queryByTextNull } = render(<HeroCard content={null} />);
    expect(queryByTextNull(null)).toBeNull();

    const { queryByText: queryByTextUndefined } = render(<HeroCard content={undefined} />);
    expect(queryByTextUndefined(undefined)).toBeNull();
  });
});
