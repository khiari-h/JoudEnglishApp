import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native'; // Import the real Animated module
import CategorySelector, { areEqual } from '../../../src/components/exercise-common/CategorySelector';

// Mock other dependencies
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => {
    const { View } = require('react-native');
    return <View>{children}</View>;
  },
}));

// ==========================
// ✅ The FINAL Mocks
// ==========================
const mockTimingStart = jest.fn((callback) => {
  if (callback) {
    callback({ finished: true });
  }
});
const mockParallelStart = jest.fn((callback) => {
  if (callback) {
    callback({ finished: true });
  }
});

// Spy on the real methods and replace their implementations
const spyOnAnimatedTiming = jest.spyOn(Animated, 'timing').mockReturnValue({ start: mockTimingStart });
const spyOnAnimatedParallel = jest.spyOn(Animated, 'parallel').mockReturnValue({ start: mockParallelStart });
const spyOnAnimatedValue = jest.spyOn(Animated, 'Value').mockImplementation(() => ({
  interpolate: jest.fn(() => ({ _nativeTag: 1 })),
  setValue: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

// ==========================
// 🔹 Test Data
// ==========================
const categories = [
  { id: '1', name: 'Grammar' },
  { id: '2', name: 'Vocabulary' },
  { id: '3', name: 'Reading' },
];

// ==========================
// 🔹 Tests
// ==========================
describe('CategorySelector', () => {
  beforeEach(() => {
    // Clear all mocks and spies
    jest.clearAllMocks();
  });

  // ✅ Basic Rendering Tests
  describe('Basic rendering', () => {
    it('renders all categories', () => {
      const { getByText } = render(
        <CategorySelector categories={categories} onSelectCategory={() => {}} />
      );
      expect(getByText('Grammar')).toBeTruthy();
      expect(getByText('Vocabulary')).toBeTruthy();
      expect(getByText('Reading')).toBeTruthy();
    });

    it('shows sparkle for selected category', () => {
      const { getByText } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={() => {}} />
      );
      expect(getByText('✨')).toBeTruthy();
    });
  });

  // ✅ User Interactions Tests
  describe('User interactions', () => {
    it('calls onSelectCategory when pressing category', () => {
      const onSelectCategory = jest.fn();
      const { getByText } = render(
        <CategorySelector categories={categories} onSelectCategory={onSelectCategory} />
      );
      fireEvent.press(getByText('Vocabulary'));
      expect(onSelectCategory).toHaveBeenCalledWith('2');
    });

    it('does not call onSelectCategory if category is already selected', () => {
      const onSelectCategory = jest.fn();
      const { getByText } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={onSelectCategory} />
      );
      fireEvent.press(getByText('Grammar'));
      expect(onSelectCategory).not.toHaveBeenCalled();
    });
  });

  // 🎯 Corrected Animation Tests
  describe('Animations', () => {
    it('triggers parallel animations when selectedCategory changes', async () => {
      const { rerender } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={jest.fn()} />
      );

      // Clear the initial calls to focus on the re-render
      spyOnAnimatedParallel.mockClear();
      spyOnAnimatedTiming.mockClear();

      await act(async () => {
        rerender(
          <CategorySelector categories={categories} selectedCategory="2" onSelectCategory={jest.fn()} />
        );
      });

      expect(spyOnAnimatedParallel).toHaveBeenCalledTimes(1);
      expect(spyOnAnimatedTiming).toHaveBeenCalledTimes(2);
    });

    it('prevents animation conflicts with isAnimatingRef', async () => {
      const { rerender } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={jest.fn()} />
      );

      spyOnAnimatedParallel.mockClear();

      // First transition: should trigger one animation
      await act(async () => {
        rerender(
          <CategorySelector categories={categories} selectedCategory="2" onSelectCategory={jest.fn()} />
        );
      });

      expect(spyOnAnimatedParallel).toHaveBeenCalledTimes(1);

      // Second, immediate transition: should not trigger a new animation
      await act(async () => {
        rerender(
          <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={jest.fn()} />
        );
      });

      // The count should remain at 1
      expect(spyOnAnimatedParallel).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ Dynamic Category Management Tests
  describe('Dynamic category management', () => {
    it('handles category addition', () => {
      const onSelectCategory = jest.fn();
      const { rerender, getByText } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={onSelectCategory} />
      );

      act(() => {
        rerender(
          <CategorySelector
            categories={[...categories, { id: '4', name: 'Writing' }]}
            selectedCategory="1"
            onSelectCategory={onSelectCategory}
          />
        );
      });

      expect(getByText('Writing')).toBeTruthy();
    });

    it('handles category removal', () => {
      const onSelectCategory = jest.fn();
      const { rerender, queryByText } = render(
        <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={onSelectCategory} />
      );

      act(() => {
        rerender(
          <CategorySelector
            categories={[categories[0]]}
            selectedCategory="1"
            onSelectCategory={onSelectCategory}
          />
        );
      });

      expect(queryByText('Vocabulary')).toBeNull();
    });
  });
});