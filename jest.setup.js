import { NativeModules } from 'react-native';
import '@testing-library/jest-native/extend-expect';

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

// Mock expo-crypto pour les tests
jest.mock('expo-crypto', () => ({
  getRandomBytes: jest.fn().mockImplementation(async (length) => {
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }),
  digestStringAsync: jest.fn().mockImplementation(async (algorithm, data) => {
    return `mock-hash-${data.slice(0, 8)}`;
  }),
  randomUUID: jest.fn().mockImplementation(() => {
    return 'mock-uuid-' + Math.random().toString(36).substr(2, 9);
  }),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
  isLoaded: () => true,
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
}));

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  manifest: {
    extra: {
      // your extra config here
    },
  },
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(() => ({
      downloadAsync: jest.fn(),
      uri: 'test-uri',
    })),
  },
}));

// Mocks pour éviter warnings RN extraits du core
jest.mock('@react-native-clipboard/clipboard', () => ({
  getString: jest.fn(async () => ''),
  setString: jest.fn(),
}), { virtual: true });
jest.mock('@react-native-community/push-notification-ios', () => ({
  presentLocalNotification: jest.fn(),
}), { virtual: true });
jest.mock('@react-native-community/progress-bar-android', () => 'ProgressBarAndroid', { virtual: true });

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.useSharedValue = jest.fn(() => ({ value: 0 }));
    Reanimated.withTiming = (toValue, options, callback) => {
        if (callback) {
            callback(true);
        }
        return toValue;
    };
    Reanimated.withSpring = (toValue, options, callback) => {
        if (callback) {
            callback(true);
        }
        return toValue;
    };
    Reanimated.withRepeat = (animation, repetitions, reverse) => {
        return animation;
    };
    Reanimated.withSequence = (...animations) => {
        return animations[0];
    };
    Reanimated.withDelay = (delay, animation) => {
        return animation;
    };
    return Reanimated;
});

// Mock 'expo-modules-core'
jest.mock('expo-modules-core', () => ({
  ...jest.requireActual('expo-modules-core'),
  requireOptionalNativeModule: jest.fn(),
  NativeModulesProxy: new Proxy({}, {
    get(target, prop) {
      if (prop === 'ExpoLocalization') {
        return {
          locale: 'en-US',
          isoCurrencyCodes: ['USD'],
          timezone: 'America/New_York',
          isRTL: false,
        };
      }
      if (prop === 'ExpoRandom') {
          return {
              getRandomBytes: jest.fn(),
              getRandomBytesAsync: jest.fn(),
          }
      }
      return {};
    }
  }),
  EventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  })),
  requireNativeViewManager: jest.fn(() => ({})),
}));

// 🔥 Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  return {
    LinearGradient: ({ children, colors, start, end, style, ...props }) => (
      <View 
        style={[
          style,
          { backgroundColor: colors ? colors[0] : 'transparent' }
        ]} 
        {...props}
      >
        {children}
      </View>
    ),
  };
});

// 🔥 Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  },
  useFocusEffect: jest.fn(() => {}),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  })),
  useLocalSearchParams: jest.fn(() => ({})),
  useGlobalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => '/'),
  Redirect: ({ href }) => null,
  Link: ({ href, children, ...props }) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return React.createElement(TouchableOpacity, props, 
      typeof children === 'string' 
        ? React.createElement(Text, {}, children)
        : children
    );
  },
  Stack: {
    Screen: ({ children, ...props }) => {
      const React = require('react');
      return React.createElement('div', props, children);
    },
  },
  Tabs: {
    Screen: ({ children, ...props }) => {
      const React = require('react');
      return React.createElement('div', props, children);
    },
  },
}));

// 4. Polyfills
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof clearImmediate === 'undefined') {
  global.clearImmediate = (id) => clearTimeout(id);
}

// 5. Suppress warnings pour les tests - VERSION CORRIGÉE
const originalConsole = { ...console };

global.console = {
  ...console,
  // Supprimer les warnings d'animations dans les tests
  error: jest.fn((message) => {
    if (
      typeof message === 'string' && 
      message.includes('Warning: An update to') && 
      message.includes('was not wrapped in act')
    ) {
      return; // Ignore les warnings act() pour les animations
    }
    originalConsole.error(message);
  }),
  warn: jest.fn((message) => {
    const msg = typeof message === 'string' ? message : '';
    const ignore = [
      'Warning: An update to',
      'was not wrapped in act',
      'has been extracted from react-native core and will be removed in a future release',
      'new NativeEventEmitter()',
      'PushNotificationIOS has been extracted from react-native core',
      'Clipboard has been extracted from react-native core',
      'ProgressBarAndroid has been extracted from react-native core',
    ].some((t) => msg.includes(t));
    if (ignore) return;
    originalConsole.warn(message);
  }),
};