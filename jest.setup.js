import { NativeModules } from 'react-native';

// 1. Mocks de base React Native
jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(() => 'light'),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

NativeModules.SettingsManager = NativeModules.SettingsManager || {
  settings: { AppleLocale: 'en_US' },
};

// 2. Mocks des librairies tierces
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-font', () => ({
  useFonts: () => [true],
  isLoaded: () => true,
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
}));

// 3. Mocks spécifiques
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  RN.Animated = {
    ...RN.Animated,
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      setValue: jest.fn(),
    })),
    timing: jest.fn(() => ({
      start: jest.fn(callback => callback?.({ finished: true })),
    })),
  };

  return RN;
});

// 4. Polyfills
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof clearImmediate === 'undefined') {
  global.clearImmediate = (id) => clearTimeout(id);
}