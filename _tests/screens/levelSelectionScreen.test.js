import { render } from '@testing-library/react-native';



describe('LevelSelectionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <LevelSelectionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 