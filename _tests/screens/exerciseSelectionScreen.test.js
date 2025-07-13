import { render } from '@testing-library/react-native';



describe('ExerciseSelectionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ExerciseSelectionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 