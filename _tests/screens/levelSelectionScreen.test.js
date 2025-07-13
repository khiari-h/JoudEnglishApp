import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LevelSelectionScreen from '../../src/screens/LevelSelection';

describe('LevelSelectionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <LevelSelectionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 