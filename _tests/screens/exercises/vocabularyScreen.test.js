import { render } from '@testing-library/react-native';



describe('VocabularyExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <VocabularyExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 