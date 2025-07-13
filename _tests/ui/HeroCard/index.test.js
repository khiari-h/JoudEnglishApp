
import { render } from '@testing-library/react-native';



describe('HeroCard', () => {
  it('rend les enfants', () => {
    const { getByText } = render(
      <HeroCard>
        <Text>Héros</Text>
      </HeroCard>
    );
    expect(getByText('Héros')).toBeTruthy();
  });
});
