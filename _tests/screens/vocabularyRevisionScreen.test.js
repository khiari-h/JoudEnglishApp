import { render } from '@testing-library/react-native';



describe('VocabularyRevisionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <VocabularyRevisionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 