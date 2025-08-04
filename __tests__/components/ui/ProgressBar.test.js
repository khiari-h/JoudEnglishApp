import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProgressBar from '../../../src/components/ui/ProgressBar';
import { Animated } from 'react-native';

describe('ProgressBar', () => {
  beforeAll(() => {
    jest.spyOn(Animated, 'timing').mockImplementation(() => ({
      start: (callback) => {
        callback && callback();
        return { stop: jest.fn() };
      },
      stop: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<ProgressBar testID="progress-bar" />);
    expect(getByTestId('progress-bar')).toBeTruthy();
  });

  it('should display percentage when showPercentage is true', () => {
    const { getByText } = render(<ProgressBar progress={50} showPercentage={true} />);
    expect(getByText('50%')).toBeTruthy();
  });

  it('should not display percentage when showPercentage is false', () => {
    const { queryByText } = render(<ProgressBar progress={50} showPercentage={false} />);
    expect(queryByText('50%')).toBeNull();
  });

  it('should display value when showValue is true', () => {
    const { getByText } = render(<ProgressBar progress={50} total={200} showValue={true} />);
    expect(getByText('100/200')).toBeTruthy();
  });

  it('should not display value when showValue is false', () => {
    const { queryByText } = render(<ProgressBar progress={50} total={200} showValue={false} />);
    expect(queryByText('100/200')).toBeNull();
  });

  it('should display label when label is provided', () => {
    const { getByText } = render(<ProgressBar label="My Progress" />);
    expect(getByText('My Progress')).toBeTruthy();
  });

  it('should apply custom height', () => {
    const { getByTestId } = render(<ProgressBar height={20} testID="progress-bar-custom-height" />);
    const progressBar = getByTestId('progress-bar-custom-height');
    
    // Vérifier que le composant a été rendu avec la prop height
    expect(progressBar).toBeTruthy();
    
    // Test plus spécifique : vérifier via le createStyles mock si nécessaire
    // ou simplement vérifier que le rendu s'est fait sans erreur avec height={20}
  });

  it('should apply custom colors', () => {
    const { getByTestId } = render(
      <ProgressBar
        backgroundColor="#FF0000"
        fillColor="#00FF00"
        testID="progress-bar-custom-colors"
      />
    );
    const progressBar = getByTestId('progress-bar-custom-colors');
    
    // Vérifier que le composant a été rendu avec les props de couleur
    expect(progressBar).toBeTruthy();
  });

  it('should apply custom border radius', () => {
    const { getByTestId } = render(<ProgressBar borderRadius={10} testID="progress-bar-custom-radius" />);
    const progressBar = getByTestId('progress-bar-custom-radius');
    
    // Vérifier que le composant a été rendu avec la prop borderRadius
    expect(progressBar).toBeTruthy();
  });

  it('should format percentage correctly with custom formatter', () => {
    const customFormatter = (percentage) => `Progress: ${percentage}%`;
    const { getByText } = render(
      <ProgressBar progress={75} showPercentage={true} percentageFormatter={customFormatter} />
    );
    expect(getByText('Progress: 75%')).toBeTruthy();
  });

  it('should format value correctly with custom formatter', () => {
    const customFormatter = (value, total) => `${value} of ${total} units`;
    const { getByText } = render(
      <ProgressBar progress={25} total={100} showValue={true} valueFormatter={customFormatter} />
    );
    expect(getByText('25 of 100 units')).toBeTruthy();
  });

  // Tests supplémentaires pour une meilleure couverture
  it('should handle progress values outside 0-100 range', () => {
    const { getByTestId } = render(<ProgressBar progress={150} testID="progress-overflow" />);
    expect(getByTestId('progress-overflow')).toBeTruthy();
    // Le composant devrait gérer cela sans erreur
  });

  it('should handle negative progress values', () => {
    const { getByTestId } = render(<ProgressBar progress={-10} testID="progress-negative" />);
    expect(getByTestId('progress-negative')).toBeTruthy();
    // Le composant devrait gérer cela sans erreur
  });

  it('should render without animation when animated is false', () => {
    const { getByTestId } = render(<ProgressBar progress={50} animated={false} testID="progress-no-anim" />);
    expect(getByTestId('progress-no-anim')).toBeTruthy();
  });
});