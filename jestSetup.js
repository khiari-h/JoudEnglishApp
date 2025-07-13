// Mock AsyncStorage pour Jest (corrige l'erreur NativeModule: AsyncStorage is null)
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
// Mock global pour @expo/vector-icons afin d'éviter les erreurs liées à expo-font dans les tests Jest.
jest.mock('@expo/vector-icons', () => {

  return new Proxy({}, {
    get: (target, prop) => () => <View />
  });
});
// Polyfill pour setImmediate (problème courant avec Jest + React Native)
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof clearImmediate === 'undefined') {
  global.clearImmediate = (id) => clearTimeout(id);
}
