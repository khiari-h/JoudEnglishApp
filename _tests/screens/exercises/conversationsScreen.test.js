import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ConversationsExerciseScreen from '../../../src/screens/exercises/conversations';

describe('ConversationsExerciseScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ConversationsExerciseScreen route={{ params: { level: 'A1' } }} />
      </NavigationContainer>
    );
  });
}); 