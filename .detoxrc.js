/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/jest.config.js',
  apps: {
    'expo.go': {
      type: 'expo.go',
      binaryPath: '', // Expo Go est déjà installé sur l'émulateur
      build: '',      // Pas de build natif à faire
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Medium_Phone_API_36.0',
      },
    },
  },
  configurations: {
    'android': {
      device: 'emulator',
      app: 'expo.go',
    },
  },
};
