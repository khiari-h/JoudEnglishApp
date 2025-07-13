import { render } from '@testing-library/react-native';



describe('ConversationsExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ConversationsExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 