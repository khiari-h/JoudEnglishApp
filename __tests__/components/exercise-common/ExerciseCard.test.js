
// __tests__/components/exercise-common/ExerciseCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import ExerciseCard from '../../../src/components/exercise-common/ExerciseCard';

describe('ExerciseCard', () => {
  const defaultProps = {
    title: 'Vocabulary Practice',
    description: 'Expand your word knowledge',
    icon: '📚',
    onPress: jest.fn(),
  };

  // Nettoyer les mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the basic card information correctly', () => {
    const { getByText } = render(<ExerciseCard {...defaultProps} />);

    expect(getByText('Vocabulary Practice')).toBeTruthy();
    expect(getByText('Expand your word knowledge')).toBeTruthy();
    expect(getByText('📚')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const { getByText } = render(<ExerciseCard {...defaultProps} />);
    fireEvent.press(getByText('Vocabulary Practice'));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPress when the "Commencer" button is pressed', () => {
    const { getByText } = render(<ExerciseCard {...defaultProps} />);
    fireEvent.press(getByText('Commencer'));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('displays the progress bar when progress is greater than 0', () => {
    const { getByText, getByTestId } = render(
      <ExerciseCard {...defaultProps} progress={50} />
    );

    expect(getByText('50%')).toBeTruthy();
    const progressFill = getByTestId('progress-fill');
    const flatStyle = StyleSheet.flatten(progressFill.props.style);
    expect(flatStyle.width).toBe('50%');
  });

  it('does not display the progress bar when progress is 0', () => {
    const { queryByText, queryByTestId } = render(
      <ExerciseCard {...defaultProps} progress={0} />
    );

    expect(queryByText('50%')).toBeNull();
    expect(queryByTestId('progress-fill')).toBeNull();
  });

  it('displays the "Nouveau" badge when isNew is true and progress is 0', () => {
    const { getByText } = render(
      <ExerciseCard {...defaultProps} isNew={true} progress={0} />
    );

    expect(getByText('Nouveau')).toBeTruthy();
  });

  it('does not display the "Nouveau" badge when progress is greater than 0', () => {
    const { queryByText } = render(
      <ExerciseCard {...defaultProps} isNew={true} progress={50} />
    );

    expect(queryByText('Nouveau')).toBeNull();
  });

  it('does not display the "Nouveau" badge when isNew is false', () => {
    const { queryByText } = render(<ExerciseCard {...defaultProps} isNew={false} />);

    expect(queryByText('Nouveau')).toBeNull();
  });
});
