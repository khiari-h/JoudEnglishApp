
import { render, fireEvent } from '@testing-library/react-native';


// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('ExerciseFooter', () => {
  it('affiche les labels des boutons', () => {
    const { getByText } = render(
      <ExerciseFooter primaryLabel="Suivant" secondaryLabel="Retour" />
    );
    expect(getByText('Suivant')).toBeTruthy();
    expect(getByText('Retour')).toBeTruthy();
  });

  it('appelle onPrimaryPress lors du clic sur le bouton principal', () => {
    const onPrimaryPress = jest.fn();
    const { getByText } = render(
      <ExerciseFooter onPrimaryPress={onPrimaryPress} />
    );
    fireEvent.press(getByText('Continuer'));
    expect(onPrimaryPress).toHaveBeenCalled();
  });

  it('appelle onSecondaryPress lors du clic sur le bouton secondaire', () => {
    const onSecondaryPress = jest.fn();
    const { getByText } = render(
      <ExerciseFooter onSecondaryPress={onSecondaryPress} />
    );
    fireEvent.press(getByText('Précédent'));
    expect(onSecondaryPress).toHaveBeenCalled();
  });

  it('appelle onSkip lors du clic sur le bouton Passer', () => {
    const onSkip = jest.fn();
    const { getByText } = render(
      <ExerciseFooter onSkip={onSkip} />
    );
    fireEvent.press(getByText('Passer'));
    expect(onSkip).toHaveBeenCalled();
  });
});
