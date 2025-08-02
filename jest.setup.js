// c:/Users/khi_h/Desktop/Projets/JoudEnglishApp/jest.setup.js
// Mock pour @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Polyfill pour setImmediate (problème courant avec Jest + React Native)
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof clearImmediate === 'undefined') {
  global.clearImmediate = (id) => clearTimeout(id);
}

// Mock pour expo-font qui cause l'erreur dans le test du Modal
jest.mock('expo-font', () => ({
  useFonts: () => [true],
  isLoaded: () => true,
}));

// Mock pour react-native-reanimated (prévient les erreurs courantes)
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock pour expo-haptics (prévient les erreurs dans les composants qui l'utilisent)
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
}));
