import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import VocabularyRevisionScreen from '../../src/screens/VocabularyRevision';

describe('VocabularyRevisionScreen', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <VocabularyRevisionScreen route={{ params: {} }} />
      </NavigationContainer>
    );
  });
}); 