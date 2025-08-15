// __mocks__/expo-crypto.js - Mock pour expo-crypto dans les tests

export const getRandomBytes = jest.fn().mockImplementation(async (length) => {
  // Génère des bytes pseudo-aléatoires pour les tests
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
});

export const digestStringAsync = jest.fn().mockImplementation(async (algorithm, data) => {
  // Mock simple pour le hachage
  return `mock-hash-${data.slice(0, 8)}`;
});

export const randomUUID = jest.fn().mockImplementation(() => {
  // Mock simple pour UUID
  return 'mock-uuid-' + Math.random().toString(36).substr(2, 9);
});
