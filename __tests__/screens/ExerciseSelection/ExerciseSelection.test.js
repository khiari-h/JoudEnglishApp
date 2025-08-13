import React from 'react';
import { render } from '@testing-library/react-native';
import ExerciseSelection from '../../../src/screens/ExerciseSelection';
jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useFocusEffect: jest.fn(() => {}),
}));

describe('ExerciseSelection', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ExerciseSelection level="A1" />);
    expect(getByText('Choisissez votre exercice')).toBeTruthy();
  });
});
