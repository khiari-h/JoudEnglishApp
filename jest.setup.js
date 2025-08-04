// jest.setup.js

// Ligne supprimée car ce module n'existe plus / casse Jest :
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

import { NativeModules } from 'react-native';

// Mock AsyncStorage (très utilisé dans RN)
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo font (si tu utilises expo-font, sinon tu peux retirer)
jest.mock('expo-font', () => ({
  useFonts: () => [true],
  isLoaded: () => true,
}));

// Mock Expo haptics (vibration)
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
}));

// Mock react-native-reanimated pour éviter les erreurs dans les tests
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Patch pour éviter des erreurs supplémentaires
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Mock des Settings natives (pour éviter erreurs TurboModuleRegistry)
jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(() => 'light'),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock NativeModules.SettingsManager (simule locale)
NativeModules.SettingsManager = NativeModules.SettingsManager || {
  settings: { AppleLocale: 'en_US' },
};

// Polyfill global pour setImmediate / clearImmediate (parfois manquant)
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof clearImmediate === 'undefined') {
  global.clearImmediate = (id) => clearTimeout(id);
}

// Mock complet et robuste du module Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Mock Animated
  RN.Animated = {
    ...RN.Animated,
    Value: jest.fn(() => ({
      interpolate: jest.fn(config => config.outputRange[0]),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      stopAnimation: jest.fn(),
      resetAnimation: jest.fn(),
      setValue: jest.fn(),
    })),
    timing: jest.fn(() => ({
      start: jest.fn(callback => {
        if (callback) {
          callback({ finished: true });
        }
      }),
    })),
  };

  return RN;
});

// Mock direct de StatusBar
jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  setBarStyle: jest.fn(),
  setBackgroundColor: jest.fn(),
}));