import { render } from '@testing-library/react-native';



describe('GrammarExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <GrammarExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 