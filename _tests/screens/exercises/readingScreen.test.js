import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ReadingExerciseScreen from '../../../src/screens/exercises/reading';

describe('ReadingExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ReadingExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 