// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', // Placé en premier
    './jest.setup.js',
  ],
  testTimeout: 30000,
  transformIgnorePatterns: [
    'node_modules/(?!(jest-?react-native|@react-native|react-native|react-native-reanimated|@react-native-async-storage/async-storage|expo|expo-.*|@expo/vector-icons|@react-navigation/.*)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  cacheDirectory: '.jest/cache',
};