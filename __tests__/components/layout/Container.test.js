import React from 'react';
import { render } from '@testing-library/react-native';
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import Container from '../../../src/components/layout/Container';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style, ...rest }) => (
      <View style={style} {...rest}>
        {children}
      </View>
    ),
  };
});

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Container><Text>Hello World</Text></Container>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders StatusBar with default props', () => {
    const { UNSAFE_getByType } = render(<Container />);
    const statusBar = UNSAFE_getByType(StatusBar);
    expect(statusBar.props.barStyle).toBe('dark-content');
    expect(statusBar.props.backgroundColor).toBe('#FFFFFF');
  });

  it('renders StatusBar with custom props', () => {
    const { UNSAFE_getByType } = render(
      <Container statusBarStyle="light-content" statusBarColor="#FF0000" />
    );
    const statusBar = UNSAFE_getByType(StatusBar);
    expect(statusBar.props.barStyle).toBe('light-content');
    expect(statusBar.props.backgroundColor).toBe('#FF0000');
  });

  it('does not render StatusBar when withStatusBar is false', () => {
    const { UNSAFE_queryByType } = render(<Container withStatusBar={false} />);
    const statusBar = UNSAFE_queryByType(StatusBar);
    expect(statusBar).toBeNull();
  });

  it('renders content inside ScrollView when withScrollView is true', () => {
    const { getByText, UNSAFE_getByType } = render(
      <Container withScrollView><Text>Inside Scroll</Text></Container>
    );
    expect(UNSAFE_getByType(ScrollView)).toBeTruthy();
    expect(getByText('Inside Scroll')).toBeTruthy();
  });

  it('renders content directly when withScrollView is false', () => {
    const { getByText, UNSAFE_queryByType } = render(
      <Container withScrollView={false}><Text>No Scroll</Text></Container>
    );
    expect(UNSAFE_queryByType(ScrollView)).toBeNull();
    expect(getByText('No Scroll')).toBeTruthy();
  });

  it('applies default backgroundColor', () => {
    const { UNSAFE_getByType } = render(<Container />);
    const wrapper = UNSAFE_getByType(View);
    const style = StyleSheet.flatten(wrapper.props.style);
    expect(style.backgroundColor).toBe('#F9FAFB');
  });

  it('applies custom backgroundColor', () => {
    const { UNSAFE_getByType } = render(<Container backgroundColor="#123456" />);
    const wrapper = UNSAFE_getByType(View);
    const style = StyleSheet.flatten(wrapper.props.style);
    expect(style.backgroundColor).toBe('#123456');
  });

  it('applies padding by default', () => {
    const { UNSAFE_getByType } = render(<Container />);
    const wrapper = UNSAFE_getByType(View);
    const style = StyleSheet.flatten(wrapper.props.style);
    expect(style.padding).toBe(16);
  });

  it('does not apply padding if withPadding is false', () => {
    const { UNSAFE_getByType } = render(<Container withPadding={false} />);
    const wrapper = UNSAFE_getByType(View);
    const style = StyleSheet.flatten(wrapper.props.style);
    expect(style.padding).toBeUndefined();
  });
});
