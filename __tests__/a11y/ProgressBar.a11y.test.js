import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../../src/components/ui/ProgressBar';

describe('ProgressBar accessibility', () => {
  it('should expose progressbar role and value', () => {
    const { getByRole } = render(<ProgressBar progress={42} label="Avancement" showPercentage />);
    const bar = getByRole('progressbar');
    expect(bar.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 42 });
  });
});


