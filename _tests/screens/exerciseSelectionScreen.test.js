import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ExerciseSelectionScreen from '../../src/screens/ExerciseSelection';

describe('ExerciseSelectionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ExerciseSelectionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 