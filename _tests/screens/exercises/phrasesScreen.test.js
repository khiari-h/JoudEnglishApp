import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import PhrasesExerciseScreen from '../../../src/screens/exercises/phrases';

describe('PhrasesExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <PhrasesExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 