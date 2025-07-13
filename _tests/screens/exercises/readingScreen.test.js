import { render } from '@testing-library/react-native';



describe('ReadingExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ReadingExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 