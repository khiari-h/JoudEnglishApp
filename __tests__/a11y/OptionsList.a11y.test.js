import React from 'react';
import { render } from '@testing-library/react-native';
import OptionsList from '../../src/components/exercise-common/OptionsList';

describe('OptionsList accessibility', () => {
  it('should render options as accessible buttons with text labels', () => {
    const options = [
      { id: 'a', text: 'Option A' },
      { id: 'b', text: 'Option B' },
    ];
    const { getAllByRole } = render(<OptionsList options={options} selectedOptionId={'a'} onSelectOption={() => {}} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});


