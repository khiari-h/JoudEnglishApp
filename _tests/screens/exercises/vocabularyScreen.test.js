import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import VocabularyExerciseScreen from '../../../src/screens/exercises/vocabulary';

describe('VocabularyExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <VocabularyExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 