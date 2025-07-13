

import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ExerciseSelectionScreen from '../../app/tabs/exerciseSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  ...jest.requireActual('@expo/vector-icons'),
  createIconSet: () => 'Icon',
  Ionicons: 'Icon',
  MaterialIcons: 'Icon',
  FontAwesome: 'Icon',
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({ params: {} }),
  };
});

describe('ExerciseSelection Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('1'); // Niveau par défaut
  });

  it('renders sans crash avec niveau par défaut', () => {
    render(
      <NavigationContainer>
        <ExerciseSelectionScreen />
      </NavigationContainer>
    );
  });

  it('renders avec niveau spécifique depuis les paramètres', () => {
    const mockUseRoute = jest.fn().mockReturnValue({ 
      params: { level: '3' } 
    });
    
    jest.doMock('@react-navigation/native', () => ({
      ...jest.requireActual('@react-navigation/native'),
      useRoute: mockUseRoute,
    }));

    render(
      <NavigationContainer>
        <ExerciseSelectionScreen />
      </NavigationContainer>
    );
  });

  it('utilise le niveau sauvegardé quand pas de paramètres', async () => {
    AsyncStorage.getItem.mockResolvedValue('2');
    
    render(
      <NavigationContainer>
        <ExerciseSelectionScreen />
      </NavigationContainer>
    );
  });
});
