
import { render, fireEvent } from '@testing-library/react-native';


// Mock Ionicons (expo)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('ExerciseCard', () => {
  const props = {
    title: 'Titre exercice',
    description: 'Description exercice',
    icon: '🔥',
    progress: 50,
    color: '#123456',
    onPress: jest.fn(),
    isNew: false,
  };

  it('affiche le titre et la description', () => {
    const { getByText } = render(<ExerciseCard {...props} />);
    expect(getByText('Titre exercice')).toBeTruthy();
    expect(getByText('Description exercice')).toBeTruthy();
  });

  it('affiche le bouton Commencer', () => {
    const { getByText } = render(<ExerciseCard {...props} />);
    expect(getByText('Commencer')).toBeTruthy();
  });

  it('appelle onPress lors du clic sur le bouton Commencer', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ExerciseCard {...props} onPress={onPress} />);
    fireEvent.press(getByText('Commencer'));
    expect(onPress).toHaveBeenCalled();
  });
});
