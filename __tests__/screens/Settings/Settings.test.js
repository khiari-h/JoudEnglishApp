import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SettingsScreen from '../../../src/screens/Settings';

// Mock the RevisionSettings component
jest.mock('../../../src/components/setting/RevisionSettings', () => 'RevisionSettings');

describe('SettingsScreen', () => {
  it('should render correctly', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('Paramètres')).toBeTruthy();
  });
});
