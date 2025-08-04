// __tests__/components/layout/Container.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from '../../../src/components/layout/Container';

// Mock SafeAreaView from react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style, edges, ...rest }) => (
      <View style={style} {...rest} testID="mock-safe-area-view" edges={edges}>
        {children}
      </View>
    ),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 320, height: 640 }),
  };
});

describe('Container', () => {
  // No need to clear StatusBar mocks here, it's handled globally in jest.setup.js
  // beforeEach(() => {
  //   StatusBar.setBarStyle.mockClear();
  //   StatusBar.setBackgroundColor.mockClear();
  // });

  it('renders children correctly', () => {
    const { getByText } = render(<Container><Text>Hello World</Text></Container>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('uses SafeAreaView by default', () => {
    const { getByTestId } = render(<Container />);
    expect(getByTestId('mock-safe-area-view')).toBeTruthy();
  });

  it('uses View when safeArea is false', () => {
    const { queryByTestId, UNSAFE_getByType } = render(<Container safeArea={false} />);
    expect(queryByTestId('mock-safe-area-view')).toBeNull();
    expect(UNSAFE_getByType(View)).toBeTruthy(); // Check if it renders a plain View
  });

  it('applies padding by default', () => {
    const { getByTestId } = render(<Container />);
    const container = getByTestId('mock-safe-area-view');
    const flatStyle = StyleSheet.flatten(container.props.style);
    expect(flatStyle).toHaveProperty('paddingHorizontal', 20); // Example, adjust based on your style.js
  });

  it('does not apply padding when withPadding is false', () => {
    const { getByTestId } = render(<Container withPadding={false} />);
    const container = getByTestId('mock-safe-area-view');
    const flatStyle = StyleSheet.flatten(container.props.style);
    expect(flatStyle).not.toHaveProperty('paddingHorizontal', 20); // Example, adjust based on your style.js
  });

  it('renders ScrollView when withScrollView is true', () => {
    const { getByTestId, UNSAFE_getByType, getByText } = render(<Container withScrollView={true}><Text>Scrollable Content</Text></Container>);
    expect(UNSAFE_getByType(ScrollView)).toBeTruthy();
    expect(getByTestId('mock-safe-area-view')).toBeTruthy(); // Still wrapped by SafeAreaView
    expect(getByText('Scrollable Content')).toBeTruthy();
  });

  it('passes scrollViewProps to ScrollView', () => {
    const { UNSAFE_getByType } = render(
      <Container withScrollView={true} scrollViewProps={{ keyboardShouldPersistTaps: 'always' }} />
    );
    expect(UNSAFE_getByType(ScrollView).props.keyboardShouldPersistTaps).toBe('always');
  });

  it('does not render ScrollView when withScrollView is false', () => {
    const { queryByText, UNSAFE_queryByType } = render(<Container withScrollView={false}><Text>Static Content</Text></Container>);
    expect(UNSAFE_queryByType(ScrollView)).toBeNull();
    expect(queryByText('Static Content')).toBeTruthy();
  });

  it('renders StatusBar by default', () => {
    render(<Container />);
    expect(StatusBar.setBarStyle).toHaveBeenCalledWith('dark-content');
    expect(StatusBar.setBackgroundColor).toHaveBeenCalledWith('#FFFFFF');
  });

  it('does not render StatusBar when withStatusBar is false', () => {
    render(<Container withStatusBar={false} />);
    expect(StatusBar.setBarStyle).not.toHaveBeenCalled();
    expect(StatusBar.setBackgroundColor).not.toHaveBeenCalled();
  });

  it('applies custom statusBarColor and statusBarStyle', () => {
    render(<Container statusBarColor="#FF0000" statusBarStyle="light-content" />);
    expect(StatusBar.setBarStyle).toHaveBeenCalledWith('light-content');
    expect(StatusBar.setBackgroundColor).toHaveBeenCalledWith('#FF0000');
  });

  it('applies custom backgroundColor', () => {
    const { getByTestId } = render(<Container backgroundColor="#FF00FF" />);
    const container = getByTestId('mock-safe-area-view');
    const flatStyle = StyleSheet.flatten(container.props.style);
    expect(flatStyle).toHaveProperty('backgroundColor', '#FF00FF');
  });

  it('passes safeAreaEdges to SafeAreaView', () => {
    const { getByTestId } = render(<Container safeAreaEdges={['bottom']} />);
    const safeAreaView = getByTestId('mock-safe-area-view');
    expect(safeAreaView.props.edges).toEqual(['bottom']);
  });
});