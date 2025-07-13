import { render } from '@testing-library/react-native';



describe('PhrasesExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <PhrasesExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 