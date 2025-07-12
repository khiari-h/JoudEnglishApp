import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../../../src/components/ui/ProgressBar';

describe('ProgressBar', () => {
  it('affiche la progression', () => {
    const { getByTestId } = render(
      <ProgressBar progress={0.5} testID="progress-bar" />
    );
    expect(getByTestId('progress-bar')).toBeTruthy();
  });
});
