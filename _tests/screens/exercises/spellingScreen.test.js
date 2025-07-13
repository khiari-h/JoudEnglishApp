import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SpellingExerciseScreen from '../../../src/screens/exercises/spelling';

describe('SpellingExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <SpellingExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 