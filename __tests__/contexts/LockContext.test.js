import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import { LockProvider, useLock } from '../../src/contexts/LockContext';

jest.mock('../../src/services/lockService', () => ({
  isEnabled: jest.fn().mockResolvedValue(true),
  verifyPin: jest.fn(async (pin) => ({ ok: pin === '1234' })),
  disableLock: jest.fn().mockResolvedValue(true),
  enableLock: jest.fn().mockResolvedValue(true),
}));

const Consumer = () => {
  const { isEnabled, isLocked, unlockWithPin, disable } = useLock();
  return (
    <>
      <TestText testID="enabled">{String(isEnabled)}</TestText>
      <TestText testID="locked">{String(isLocked)}</TestText>
      <TestButton testID="unlock" onPress={() => unlockWithPin('1234')} />
      <TestButton testID="disable" onPress={disable} />
    </>
  );
};

// Tiny shims to avoid importing RN primitives
const TestText = ({ children, testID }) => (<text testID={testID}>{children}</text>);
const TestButton = ({ onPress, testID }) => (<button testID={testID} onPress={onPress} />);

describe('LockContext', () => {
  it('initializes locked when enabled, unlocks with correct PIN, and can disable', async () => {
    const ui = render(
      <LockProvider>
        <Consumer />
      </LockProvider>
    );
    // wait initial load
    await waitFor(() => ui.getByTestId('locked'));
    expect(ui.getByTestId('enabled').props.children).toBe('true');
    expect(ui.getByTestId('locked').props.children).toBe('true');

    // unlock
    fireEvent.press(ui.getByTestId('unlock'));
    await waitFor(() => expect(ui.getByTestId('locked').props.children).toBe('false'));

    // disable
    fireEvent.press(ui.getByTestId('disable'));
    await waitFor(() => expect(ui.getByTestId('enabled').props.children).toBe('false'));
  });
});


