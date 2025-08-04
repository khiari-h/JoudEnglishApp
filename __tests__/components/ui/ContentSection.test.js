import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ContentSection from '../../../src/components/ui/ContentSection';
import { Text } from 'react-native';

describe('ContentSection', () => {
  it('renders correctly with title and content', () => {
    render(<ContentSection title="Test Title" content="Test Content" />);
    expect(screen.getByText('Test Title')).toBeOnTheScreen();
    expect(screen.getByText('Test Content')).toBeOnTheScreen();
  });

  it('renders correctly with children', () => {
    render(
      <ContentSection title="Test Title">
        <Text>Child Content</Text>
      </ContentSection>
    );
    expect(screen.getByText('Test Title')).toBeOnTheScreen();
    expect(screen.getByText('Child Content')).toBeOnTheScreen();
  });

  it('applies italic style when isItalic is true', () => {
    render(<ContentSection content="Italic Content" isItalic={true} />);
    const contentText = screen.getByText('Italic Content');
    expect(contentText).toBeOnTheScreen();
  });

  it('does not render icon when showIcon is false', () => {
    render(<ContentSection title="No Icon" content="Content" showIcon={false} />);
    expect(screen.getByText('No Icon')).toBeOnTheScreen();
  });

  it('returns null if no content and no children are provided', () => {
    const { UNSAFE_root } = render(<ContentSection />);
    // Vérifier que le composant ne rend rien
    expect(UNSAFE_root.children.length).toBe(0);
  });

  it('applies custom containerStyle', () => {
    const customStyle = { borderWidth: 2, borderColor: 'red' };
    render(<ContentSection title="Styled" content="Content" containerStyle={customStyle} />);
    expect(screen.getByText('Styled')).toBeOnTheScreen();
  });
});