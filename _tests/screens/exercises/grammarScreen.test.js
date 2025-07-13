import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import GrammarExerciseScreen from '../../../src/screens/exercises/grammar';

describe('GrammarExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <GrammarExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 