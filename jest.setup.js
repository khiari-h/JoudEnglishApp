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

jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  EventEmitter: jest.fn(),
  requireNativeViewManager: jest.fn(() => ({})),
}));

// 🔥 NOUVEAU: Mock expo-linear-gradient
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

// 3. Mock complet des animations React Native - PLUS AGGRESSIF
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  // Mock complet d'Animated pour éviter tous les warnings
  const mockAnimatedValue = {
    setValue: jest.fn(),
    addListener: jest.fn(() => 'mockListenerId'),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    interpolate: jest.fn(() => mockAnimatedValue),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    _value: 0,
    _offset: 0,
    __getValue: jest.fn(() => 0),
  };

  const mockAnimatedTiming = {
    start: jest.fn((callback) => {
      if (callback) {
        // Exécuter immédiatement sans délai
        setTimeout(callback, 0, { finished: true });
      }
    }),
    stop: jest.fn(),
    reset: jest.fn(),
  };

  RN.Animated = {
    ...RN.Animated,
    // Values
    Value: jest.fn(() => mockAnimatedValue),
    ValueXY: jest.fn(() => ({
      x: mockAnimatedValue,
      y: mockAnimatedValue,
      setValue: jest.fn(),
      setOffset: jest.fn(),
      flattenOffset: jest.fn(),
      extractOffset: jest.fn(),
      addListener: jest.fn(() => 'mockListenerId'),
      removeListener: jest.fn(),
      stopAnimation: jest.fn(),
      resetAnimation: jest.fn(),
      getLayout: jest.fn(() => ({ left: mockAnimatedValue, top: mockAnimatedValue })),
      getTranslateTransform: jest.fn(() => [
        { translateX: mockAnimatedValue },
        { translateY: mockAnimatedValue },
      ]),
    })),
    
    // Animations - Exécution immédiate
    timing: jest.fn(() => ({
      start: jest.fn((callback) => {
        if (callback) callback({ finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    spring: jest.fn(() => ({
      start: jest.fn((callback) => {
        if (callback) callback({ finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    decay: jest.fn(() => mockAnimatedTiming),
    sequence: jest.fn((animations) => ({
      start: jest.fn((callback) => {
        if (callback) callback({ finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    parallel: jest.fn((animations) => ({
      start: jest.fn((callback) => {
        if (callback) callback({ finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    stagger: jest.fn((time, animations) => ({
      start: jest.fn((callback) => {
        if (callback) setTimeout(callback, 0, { finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    delay: jest.fn((time) => ({
      start: jest.fn((callback) => {
        if (callback) setTimeout(callback, 0, { finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
    loop: jest.fn((animation) => ({
      start: jest.fn((callback) => {
        if (callback) setTimeout(callback, 0, { finished: true });
      }),
      stop: jest.fn(),
      reset: jest.fn(),
    })),

    // Components
    View: RN.Animated.View,
    Text: RN.Animated.Text,
    ScrollView: RN.Animated.ScrollView,
    Image: RN.Animated.Image,
    
    // Easing
    Easing: {
      linear: jest.fn((t) => t),
      ease: jest.fn((t) => t),
      quad: jest.fn((t) => t * t),
      cubic: jest.fn((t) => t * t * t),
      poly: jest.fn((n) => (t) => Math.pow(t, n)),
      sin: jest.fn((t) => 1 - Math.cos(t * Math.PI / 2)),
      circle: jest.fn((t) => 1 - Math.sqrt(1 - t * t)),
      exp: jest.fn((t) => Math.pow(2, 10 * (t - 1))),
      elastic: jest.fn((bounciness) => (t) => t),
      back: jest.fn((s) => (t) => t),
      bounce: jest.fn((t) => t),
      bezier: jest.fn((x1, y1, x2, y2) => (t) => t),
      in: jest.fn((easing) => easing),
      out: jest.fn((easing) => (t) => 1 - easing(1 - t)),
      inOut: jest.fn((easing) => (t) => t < 0.5 ? easing(t * 2) / 2 : (2 - easing((1 - t) * 2)) / 2),
    },

    // Add other methods
    add: jest.fn((a, b) => mockAnimatedValue),
    subtract: jest.fn((a, b) => mockAnimatedValue),
    multiply: jest.fn((a, b) => mockAnimatedValue),
    divide: jest.fn((a, b) => mockAnimatedValue),
    modulo: jest.fn((a, modulus) => mockAnimatedValue),
    diffClamp: jest.fn((a, min, max) => mockAnimatedValue),
    
    // Event
    event: jest.fn(() => jest.fn()),
    forkEvent: jest.fn(() => jest.fn()),
    unforkEvent: jest.fn(),
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
    if (
      typeof message === 'string' && 
      message.includes('Warning: An update to') && 
      message.includes('was not wrapped in act')
    ) {
      return; // Ignore les warnings act() pour les animations
    }
    originalConsole.warn(message);
  }),
};