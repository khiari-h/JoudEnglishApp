
import { render, fireEvent } from '@testing-library/react-native';


// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));
// Mock useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

describe('ResultsScreen', () => {
  it('affiche le score et le pourcentage', () => {
    const { getByText } = render(
      <ResultsScreen correctAnswers={8} totalQuestions={10} />
    );
    expect(getByText('80%')).toBeTruthy();
    expect(getByText('8/10')).toBeTruthy();
  });

  it('affiche les stats (Correctes, Incorrectes, Passées, Temps)', () => {
    const { getByText } = render(
      <ResultsScreen correctAnswers={5} incorrectAnswers={3} skippedAnswers={2} timeTaken="01:23" />
    );
    expect(getByText('Correctes')).toBeTruthy();
    expect(getByText('Incorrectes')).toBeTruthy();
    expect(getByText('Passées')).toBeTruthy();
    expect(getByText('Temps')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('01:23')).toBeTruthy();
  });

  it('appelle onRetry et onContinue lors du clic sur les boutons', () => {
    const onRetry = jest.fn();
    const onContinue = jest.fn();
    const { getByText } = render(
      <ResultsScreen onRetry={onRetry} onContinue={onContinue} />
    );
    fireEvent.press(getByText('Réessayer'));
    fireEvent.press(getByText('Continuer'));
    expect(onRetry).toHaveBeenCalled();
    expect(onContinue).toHaveBeenCalled();
  });

  it('affiche le feedback si fourni', () => {
    const { getByText } = render(
      <ResultsScreen feedback="Bravo !" />
    );
    expect(getByText('Bravo !')).toBeTruthy();
  });
});
