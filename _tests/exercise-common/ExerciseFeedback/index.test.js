
import { render, fireEvent } from '@testing-library/react-native';


// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('ExerciseFeedback', () => {
  it('affiche le message et l’explication', () => {
    const { getByText } = render(
      <ExerciseFeedback
        message="Bonne réponse !"
        explanation="Explication détaillée."
        showDismissButton={true}
      />
    );
    expect(getByText('Bonne réponse !')).toBeTruthy();
    expect(getByText('Explication détaillée.')).toBeTruthy();
  });

  it('appelle onDismiss lors du clic sur le bouton de fermeture', () => {
    const onDismiss = jest.fn();
    const { getAllByRole } = render(
      <ExerciseFeedback
        message="Test"
        onDismiss={onDismiss}
        showDismissButton={true}
      />
    );
    // Il peut y avoir plusieurs TouchableOpacity, on prend le dernier (bouton close)
    const buttons = getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);
    expect(onDismiss).toHaveBeenCalled();
  });
});
