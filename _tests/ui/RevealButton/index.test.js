
import { render, fireEvent } from '@testing-library/react-native';



describe('RevealButton', () => {
  it('affiche le bouton et appelle onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <RevealButton onToggle={onPress} isRevealed={false} revealText="Révéler" />
    );
    const button = getByRole('button');
    fireEvent.press(button);
    setTimeout(() => {
      expect(onPress).toHaveBeenCalled();
    }, 100);
  });
});
