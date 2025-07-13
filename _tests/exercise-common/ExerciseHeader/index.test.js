
import { render, fireEvent } from '@testing-library/react-native';


// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));
// Mock useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));
// Mock constants
jest.mock('../../../src/utils/constants', () => ({
  EXERCISE_TYPES: {
    vocabulary: { color: '#000', icon: '📚' },
    grammar: { color: '#111', icon: '📝' },
  },
  LANGUAGE_LEVELS: {
    '1': { color: '#222' },
    bonus: { color: '#333' },
  },
}));

describe('ExerciseHeader', () => {
  it('affiche le titre et le badge de niveau', () => {
    const { getByText } = render(
      <ExerciseHeader title="Titre test" level="1" />
    );
    expect(getByText('Titre test')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('appelle onClose lors du clic sur le bouton retour', () => {
    const onClose = jest.fn();
    const { getAllByRole } = render(
      <ExerciseHeader title="Test" level="1" onClose={onClose} />
    );
    // Le bouton retour est le premier TouchableOpacity
    const buttons = getAllByRole('button');
    fireEvent.press(buttons[0]);
    expect(onClose).toHaveBeenCalled();
  });
});
