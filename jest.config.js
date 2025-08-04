// jest.config.js

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-?react-native|@react-native|react-native|react-native-reanimated|@react-native-async-storage/async-storage|expo|expo-.*|@expo/vector-icons|@react-navigation/.*)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  cacheDirectory: '.jest/cache',
};
