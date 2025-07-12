import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressCard from '../../../src/components/ui/ProgressCard';
import { Text } from 'react-native';

describe('ProgressCard', () => {
  it('affiche le titre par défaut', () => {
    const { getByText } = render(<ProgressCard />);
    expect(getByText('Progress')).toBeTruthy();
  });
});
