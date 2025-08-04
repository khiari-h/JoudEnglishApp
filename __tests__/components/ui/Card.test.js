import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import Card from '../../../src/components/ui/Card';
import { ThemeContext } from '../../../src/contexts/ThemeContext';

// Mock du composant ProgressBar
jest.mock('../../../src/components/ui/ProgressBar', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  return ({ progress, testID = 'progress-bar', showPercentage, percentageFormatter, ...props }) => (
    <View testID={testID} {...props}>
      <View testID="progress-fill" style={{ width: `${progress}%` }} />
      {showPercentage && (
        <Text testID="progress-percentage">
          {percentageFormatter ? percentageFormatter(progress) : `${progress}%`}
        </Text>
      )}
    </View>
  );
});

// Mock d'Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, testID, ...props }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { 
      ...props, 
      testID: testID || `icon-${name}` 
    }, name);
  }
}));

// Mock du fichier de styles
jest.mock('../../../src/components/ui/Card/style', () => ({
  container: {},
  shadow: {},
  bordered: {},
  withSideBorder: {},
  elevated: {},
  margin: {},
  activeCard: {},
  containerCompact: {},
  header: {},
  headerColumn: {},
  headerCompact: {},
  headerLeft: {},
  headerLeftColumn: {},
  headerIconContainer: {},
  headerIconContainerCompact: {},
  headerIcon: {},
  headerTextContainer: {},
  titleWithBadgeContainer: {},
  title: {},
  titleCompact: {},
  titleBadge: {},
  titleBadgeCompact: {},
  titleBadgeText: {},
  titleBadgeTextCompact: {},
  subtitle: {},
  subtitleCompact: {},
  headerRight: {},
  rightIconText: {},
  rightIconTextCompact: {},
  cardBadge: {},
  badgeText: {},
  content: {},
  contentPadding: {},
  contentCompact: {},
  footer: {},
  overlay: {}
}));

// Mock des Animations React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      View: RN.View,
      Value: class {
        constructor(value) {
          this.value = value;
        }
        setValue = jest.fn();
        interpolate = () => this.value;
      },
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      spring: jest.fn(() => ({
        start: jest.fn()
      })),
      sequence: jest.fn(() => ({
        start: jest.fn()
      })),
      parallel: jest.fn(() => ({
        start: jest.fn()
      })),
    }
  };
});

const mockThemeContext = {
  colors: {
    primary: '#5E60CE',
    text: '#000000',
    background: '#ffffff',
  },
};

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with title and children', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Test Title">
          <Text>Test Children</Text>
        </Card>
      </ThemeContext.Provider>
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Children')).toBeTruthy();
  });

  it('should call onPress when the card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Pressable Card" onPress={mockOnPress} testID="pressable-card">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    fireEvent.press(getByTestId('pressable-card'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render header icon when headerIcon is provided', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Icon" headerIcon="star" testID="card-with-icon">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByTestId('card-with-icon')).toBeTruthy();
    expect(getByTestId('icon-star')).toBeTruthy();
  });

  it('should render progress bar when progress is provided', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Progress" progress={50} testID="card-with-progress">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByTestId('card-with-progress')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getByTestId('progress-fill')).toBeTruthy();
  });

  it('should render footer when footer is provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Footer" footer={<Text>Test Footer</Text>}>
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    expect(getByText('Test Footer')).toBeTruthy();
  });

  it('should render overlay when showOverlay is true', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Overlay" showOverlay={true} overlayContent={<Text>Overlay Content</Text>}>
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    expect(getByText('Overlay Content')).toBeTruthy();
  });

  it('should render progress bar with percentage when showPercentage is true', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card 
          title="Card with Progress Percentage" 
          progress={75} 
          showPercentage={true}
          testID="card-with-percentage"
        >
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByTestId('card-with-percentage')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getByTestId('progress-percentage')).toBeTruthy();
  });

  it('should render title badge when titleBadge is provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Level" titleBadge="1" testID="card-with-title-badge">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByText('Level')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('should render right icon when rightIcon is provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Right Icon" rightIcon="🌱" testID="card-with-right-icon">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByText('🌱')).toBeTruthy();
  });

  it('should apply compact mode styles when compactMode is true', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Compact Card" compactMode={true} testID="compact-card">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByTestId('compact-card')).toBeTruthy();
  });

  it('should render subtitle when provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card Title" subtitle="Card Subtitle">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByText('Card Title')).toBeTruthy();
    expect(getByText('Card Subtitle')).toBeTruthy();
  });

  it('should render badge when badge is provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Card title="Card with Badge" badge="NEW">
          <Text>Content</Text>
        </Card>
      </ThemeContext.Provider>
    );
    
    expect(getByText('NEW')).toBeTruthy();
  });

  it('should handle missing theme context gracefully', () => {
    const { getByText } = render(
      <Card title="Card without Theme">
        <Text>Content</Text>
      </Card>
    );
    
    expect(getByText('Card without Theme')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });
});