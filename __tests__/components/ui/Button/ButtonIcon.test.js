import { render } from '@testing-library/react-native';
import { LeftIcon, RightIcon, IconOnly } from '../../../../src/components/ui/Button/ButtonIcon';

// Mock des icônes Ionicons pour simuler leur rendu dans l'environnement de test.
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color }) => {
    const { Text } = require('react-native');
    return <Text testID={`icon-${name}`} name={name} size={size} color={color}>{name}</Text>;
  },
}));

describe('ButtonIcon', () => {
  // Test pour le composant LeftIcon
  it('devrait rendre une icône à gauche si un nom est fourni', () => {
    const { getByTestId } = render(<LeftIcon name="arrow-back" size={24} color="blue" />);
    const icon = getByTestId('icon-arrow-back');
    expect(icon).toBeTruthy();
    expect(icon.props.size).toBe(24);
    expect(icon.props.color).toBe('blue');
  });

  it('ne devrait pas rendre d\'icône à gauche si le nom n\'est pas fourni', () => {
    const { queryByTestId } = render(<LeftIcon />);
    expect(queryByTestId('icon-arrow-back')).toBeNull();
  });

  // Test pour le composant RightIcon
  it('devrait rendre une icône à droite si un nom est fourni', () => {
    const { getByTestId } = render(<RightIcon name="arrow-forward" size={20} color="red" />);
    const icon = getByTestId('icon-arrow-forward');
    expect(icon).toBeTruthy();
    expect(icon.props.size).toBe(20);
    expect(icon.props.color).toBe('red');
  });

  it('ne devrait pas rendre d\'icône à droite si le nom n\'est pas fourni', () => {
    const { queryByTestId } = render(<RightIcon />);
    expect(queryByTestId('icon-arrow-forward')).toBeNull();
  });

  // Test pour le composant IconOnly
  it('devrait rendre une icône seule si un nom est fourni', () => {
    const { getByTestId } = render(<IconOnly name="close" size={30} color="black" />);
    const icon = getByTestId('icon-close');
    expect(icon).toBeTruthy();
    expect(icon.props.size).toBe(30);
    expect(icon.props.color).toBe('black');
  });

  it('ne devrait pas rendre d\'icône seule si le nom n\'est pas fourni', () => {
    const { queryByTestId } = render(<IconOnly />);
    expect(queryByTestId('icon-close')).toBeNull();
  });
});