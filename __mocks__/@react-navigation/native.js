export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  canGoBack: jest.fn(() => true),
  addListener: jest.fn(),
  isFocused: jest.fn(() => true),
});

export const useRoute = () => ({
  params: {},
  name: 'MockScreen',
});

export const useFocusEffect = jest.fn(() => () => {});