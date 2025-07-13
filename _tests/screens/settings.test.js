
import { render } from '@testing-library/react-native';



jest.mock('@expo/vector-icons', () => ({
  ...jest.requireActual('@expo/vector-icons'),
  createIconSet: () => 'Icon',
  Ionicons: 'Icon',
  MaterialIcons: 'Icon',
  FontAwesome: 'Icon',
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({ params: {} }),
  };
});

describe('Settings Screen', () => {
  it('renders sans crash (mock route)', () => {
    const { getByText } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    );
    // On vérifie que le titre "Paramètres" est présent, preuve que le composant a rendu
    expect(getByText('Paramètres')).toBeTruthy();
  });
});
