import { render } from '@testing-library/react-native';



describe('SpellingExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <SpellingExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 