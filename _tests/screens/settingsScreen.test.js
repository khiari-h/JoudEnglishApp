import { render } from '@testing-library/react-native';
import SettingsScreen from '../../src/screens/Settings';

describe('SettingsScreen', () => {
  it('renders without crashing', () => {
    render(<SettingsScreen />);
  });
}); 