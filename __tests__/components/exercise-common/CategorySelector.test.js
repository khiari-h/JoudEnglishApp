// __tests__/components/exercise-common/CategorySelector.test.js
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import CategorySelector, { areEqual } from '../../../src/components/exercise-common/CategorySelector';

// Mocks for the Animated API
const mockStart = jest.fn((callback) => {
  if (callback) callback();
});
const mockTiming = jest.fn(() => ({ start: mockStart }));
const mockScrollViewScrollTo = jest.fn();

// Mock of Animated.Value to track its initialization
const MockAnimatedValue = jest.fn().mockImplementation((initialValue) => {
  const mockValue = {
    interpolate: jest.fn().mockReturnValue(initialValue),
    setValue: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    _value: initialValue,
  };
  return mockValue;
});

// Mock `@testing-library/react-native` to correctly handle event mocks
jest.mock('@testing-library/react-native', () => {
  const originalModule = jest.requireActual('@testing-library/react-native');
  return {
    ...originalModule,
    fireEvent: {
      ...originalModule.fireEvent,
      pressIn: (element) => originalModule.fireEvent(element, 'pressIn'),
      pressOut: (element) => originalModule.fireEvent(element, 'pressOut'),
      layout: (element, event) => originalModule.fireEvent(element, 'layout', event),
    },
  };
});

// Mock of React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const ActualReact = jest.requireActual('react');

  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      Value: MockAnimatedValue,
      timing: mockTiming,
      View: RN.View,
    },
    ScrollView: ActualReact.forwardRef(({ children, ...props }, ref) => (
      <RN.ScrollView {...props} ref={ref} scrollTo={mockScrollViewScrollTo}>
        {children}
      </RN.ScrollView>
    )),
    TouchableOpacity: ({ children, ...props }) => (
      <RN.TouchableOpacity
        {...props}
        onPressIn={() => props.onPressIn?.()}
        onPressOut={() => props.onPressOut?.()}
      >
        {children}
      </RN.TouchableOpacity>
    ),
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

// Mock of style
jest.mock('../../../src/components/exercise-common/CategorySelector/style', () => {
  const { StyleSheet } = require('react-native');
  return () => StyleSheet.create({
    container: {},
    backgroundGradient: {},
    scrollView: {},
    scrollContent: {},
    categoryItemWrapper: {},
    categoryTouchable: {},
    selectedCategoryItem: {},
    selectedInner: {},
    selectedCategoryText: { color: '#FFFFFF' },
    sparkleContainer: {},
    sparkle: {},
    categoryItem: {},
    categoryInner: {},
    categoryText: {},
  });
});

describe('CategorySelector', () => {
  const categories = [
    { id: '1', name: 'Grammar' },
    { id: '2', name: 'Vocabulary' },
    { id: '3', name: 'Reading' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all categories correctly with minimum props', () => {
    const { getByText } = render(<CategorySelector categories={categories} />);
    expect(getByText('Grammar')).toBeTruthy();
    expect(getByText('Vocabulary')).toBeTruthy();
    expect(getByText('Reading')).toBeTruthy();
  });

  it('should render nothing when the categories array is empty', () => {
    const { queryByText } = render(<CategorySelector categories={[]} />);
    expect(queryByText('Grammar')).toBeNull();
  });

  it('should display the selected category with the sparkle emoji', () => {
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={() => {}}
      />
    );
    expect(getByText('✨')).toBeTruthy();
  });

  it('should call onSelectCategory with the correct category id when a category is pressed', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
    );
    fireEvent.press(getByText('Vocabulary'));
    expect(onSelectCategory).toHaveBeenCalledWith('2');
  });

  it('should create animations for all categories on mount', async () => {
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={() => {}}
      />
    );

    // Wait for effects to run
    await act(async () => {
        // Empty act to flush promises and effects
    });

    expect(MockAnimatedValue).toHaveBeenCalledTimes(categories.length);
    expect(MockAnimatedValue).toHaveBeenCalledWith(1);
    expect(MockAnimatedValue).toHaveBeenCalledWith(0);
  });

  it('should trigger animation logic when selectedCategory changes', async () => {
    const onSelectCategory = jest.fn();
    const { rerender } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={onSelectCategory}
      />
    );

    await act(async () => {
      rerender(
        <CategorySelector
          categories={categories}
          selectedCategory="2"
          onSelectCategory={onSelectCategory}
        />
      );
    });

    await waitFor(() => {
      expect(mockTiming).toHaveBeenCalledTimes(2);
    });

    expect(mockTiming).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 0 })
    );
    expect(mockTiming).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 1 })
    );
  });

  it('should trigger press animations on touch', () => {
    const { getByText } = render(
      <CategorySelector categories={categories} selectedCategory="1" onSelectCategory={() => {}} />
    );

    mockTiming.mockClear();

    fireEvent.pressIn(getByText('Vocabulary'));
    expect(mockTiming).toHaveBeenCalledTimes(1);
    expect(mockTiming).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 0.95, useNativeDriver: true })
    );

    fireEvent.pressOut(getByText('Vocabulary'));
    expect(mockTiming).toHaveBeenCalledTimes(2);
    expect(mockTiming).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 1, useNativeDriver: true })
    );
  });

  it('should scroll to the selected category', async () => {
    const { rerender, getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={() => {}}
      />
    );
    
    // Simulate onLayout events on the correct parent elements
    const grammarPill = getByText('Grammar').parent;
    const vocabularyPill = getByText('Vocabulary').parent;
    const readingPill = getByText('Reading').parent;

    await act(() => {
      fireEvent.layout(grammarPill, { nativeEvent: { layout: { x: 0, width: 100 } } });
      fireEvent.layout(vocabularyPill, { nativeEvent: { layout: { x: 100, width: 100 } } });
      fireEvent.layout(readingPill, { nativeEvent: { layout: { x: 200, width: 100 } } });
    });

    mockScrollViewScrollTo.mockClear();

    await act(async () => {
      rerender(
        <CategorySelector
          categories={categories}
          selectedCategory="2"
          onSelectCategory={() => {}}
        />
      );
    });

    await waitFor(() => {
      expect(mockScrollViewScrollTo).toHaveBeenCalled();
    });
  });

  it('should handle user interaction correctly', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySelector
        categories={categories}
        selectedCategory="1"
        onSelectCategory={onSelectCategory}
      />
    );

    fireEvent.press(getByText('Vocabulary'));
    expect(onSelectCategory).toHaveBeenCalledWith('2');
  });

  describe('areEqual', () => {
    it('should return true for identical props', () => {
      const props = {
        selectedCategory: '1',
        primaryColor: '#000',
        categories: [{ id: '1', name: 'Cat1' }],
      };
      const result = areEqual(props, props);
      expect(result).toBe(true);
    });

    it('should return false when selectedCategory changes', () => {
      const prevProps = { selectedCategory: '1', primaryColor: '#000', categories: [] };
      const nextProps = { selectedCategory: '2', primaryColor: '#000', categories: [] };
      const result = areEqual(prevProps, nextProps);
      expect(result).toBe(false);
    });

    it('should return false when primaryColor changes', () => {
      const prevProps = { selectedCategory: '1', primaryColor: '#000', categories: [] };
      const nextProps = { selectedCategory: '1', primaryColor: '#111', categories: [] };
      const result = areEqual(prevProps, nextProps);
      expect(result).toBe(false);
    });

    it('should return true when categories array reference changes but content is the same', () => {
      const categories1 = [{ id: '1', name: 'Cat1' }];
      const categories2 = [{ id: '1', name: 'Cat1' }];
      const prevProps = { selectedCategory: '1', primaryColor: '#000', categories: categories1 };
      const nextProps = { selectedCategory: '1', primaryColor: '#000', categories: categories2 };
      const result = areEqual(prevProps, nextProps);
      expect(result).toBe(true);
    });

    it('should return true when array reference is the same', () => {
      const categoriesList = [{ id: '1', name: 'Cat1' }];
      const prevProps = { selectedCategory: '1', primaryColor: '#000', categories: categoriesList };
      const nextProps = { selectedCategory: '1', primaryColor: '#000', categories: categoriesList };
      const result = areEqual(prevProps, nextProps);
      expect(result).toBe(true);
    });

    it('should handle undefined selectedCategory correctly', () => {
      const categories = [];
      const prevProps = { selectedCategory: undefined, primaryColor: '#000', categories };
      const nextProps = { selectedCategory: undefined, primaryColor: '#000', categories };
      const result = areEqual(prevProps, nextProps);
      expect(result).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty categories gracefully', () => {
      const { root } = render(
        <CategorySelector
          categories={[]}
          onSelectCategory={() => {}}
        />
      );
      expect(root).toBeTruthy();
    });

    it('should handle undefined selectedCategory', () => {
      const { getByText } = render(
        <CategorySelector
          categories={categories}
          selectedCategory={undefined}
          onSelectCategory={() => {}}
        />
      );
      expect(getByText('Grammar')).toBeTruthy();
    });

    it('should not crash when selecting non-existent category', () => {
      const onSelectCategory = jest.fn();
      const { getByText } = render(
        <CategorySelector
          categories={categories}
          selectedCategory="999"
          onSelectCategory={onSelectCategory}
        />
      );
      fireEvent.press(getByText('Grammar'));
      expect(onSelectCategory).toHaveBeenCalledWith('1');
    });

    it('should handle categories with different id types', () => {
      const mixedCategories = [
        { id: 1, name: 'Numeric' },
        { id: 'string', name: 'String' },
      ];
      const { getByText } = render(
        <CategorySelector
          categories={mixedCategories}
          selectedCategory={1}
          onSelectCategory={() => {}}
        />
      );
      expect(getByText('✨')).toBeTruthy();
    });

    it('should handle prop changes without crashing', () => {
      const { rerender } = render(
        <CategorySelector
          categories={categories}
          selectedCategory="1"
          onSelectCategory={() => {}}
          primaryColor="#123"
        />
      );
      expect(() => {
        rerender(
          <CategorySelector
            categories={[...categories, { id: '4', name: 'New' }]}
            selectedCategory="2"
            onSelectCategory={() => {}}
            primaryColor="#456"
          />
        );
      }).not.toThrow();
    });
  });
});