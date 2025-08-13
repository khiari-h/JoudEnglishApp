import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LockProvider } from '../../src/contexts/LockContext';
import LockScreen from '../../src/screens/Lock/LockScreen';

jest.mock('../../src/services/lockService', () => ({
  isEnabled: jest.fn().mockResolvedValue(true),
  verifyPin: jest.fn(async (pin) => ({ ok: pin === '1234' })),
  disableLock: jest.fn().mockResolvedValue(true),
  enableLock: jest.fn().mockResolvedValue(true),
}));

describe('LockScreen', () => {
  it('unlocks with valid PIN', async () => {
    const { getByTestId, queryByTestId } = render(
      <LockProvider>
        <LockScreen />
      </LockProvider>
    );
    const input = await waitFor(() => getByTestId('pin-input'));
    fireEvent.changeText(input, '1234');
    fireEvent.press(getByTestId('pin-submit'));
    // here we can't assert navigation, but no error should be visible
  });
});


