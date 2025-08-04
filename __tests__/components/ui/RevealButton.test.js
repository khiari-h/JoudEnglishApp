import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import RevealButton from '../../../src/components/ui/RevealButton';

describe('RevealButton', () => {
  // Utiliser les vrais timers pour les setTimeout
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders reveal button when not revealed', () => {
    render(<RevealButton isRevealed={false} onToggle={jest.fn()} revealText="Show Answer" />);
    expect(screen.getByText('Show Answer')).toBeOnTheScreen();
    expect(screen.queryByText('Hide Translation')).toBeNull();
  });

  it('renders revealed content and hide button when revealed', () => {
    render(
      <RevealButton
        isRevealed={true}
        onToggle={jest.fn()}
        revealedContent="The answer is 42"
        hideText="Hide Answer"
      />
    );
    expect(screen.getByText('The answer is 42')).toBeOnTheScreen();
    expect(screen.getByText('Hide Answer')).toBeOnTheScreen();
    expect(screen.queryByText('Reveal Translation')).toBeNull();
  });

  it('calls onToggle when reveal button is pressed', async () => {
    const handleToggle = jest.fn();
    render(<RevealButton isRevealed={false} onToggle={handleToggle} />);
    
    fireEvent.press(screen.getByText('Reveal Translation'));
    
    // Attendre que le setTimeout se déclenche (60ms + un peu de marge)
    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalledTimes(1);
    }, { timeout: 200 });
  });

  it('calls onToggle when hide button is pressed', async () => {
    const handleToggle = jest.fn();
    render(<RevealButton isRevealed={true} onToggle={handleToggle} />);
    
    fireEvent.press(screen.getByText('Hide Translation'));
    
    // Attendre que le setTimeout se déclenche (60ms + un peu de marge)
    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalledTimes(1);
    }, { timeout: 200 });
  });

  it('displays custom revealText', () => {
    render(<RevealButton isRevealed={false} onToggle={jest.fn()} revealText="Custom Reveal" />);
    expect(screen.getByText('Custom Reveal')).toBeOnTheScreen();
  });

  it('displays custom hideText', () => {
    render(<RevealButton isRevealed={true} onToggle={jest.fn()} hideText="Custom Hide" />);
    expect(screen.getByText('Custom Hide')).toBeOnTheScreen();
  });

  it('displays custom revealedContent', () => {
    render(<RevealButton isRevealed={true} onToggle={jest.fn()} revealedContent="Custom Content" />);
    expect(screen.getByText('Custom Content')).toBeOnTheScreen();
  });
});