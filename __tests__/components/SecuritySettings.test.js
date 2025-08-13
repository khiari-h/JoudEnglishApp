import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SecuritySettings from '../../src/components/setting/SecuritySettings';

jest.mock('../../src/services/lockService', () => ({
  isEnabled: jest.fn().mockResolvedValue(false),
  isBiometricsEnabled: jest.fn().mockResolvedValue(false),
  enableLock: jest.fn().mockResolvedValue(true),
  disableLock: jest.fn().mockResolvedValue(true),
  setPin: jest.fn().mockResolvedValue(true),
  setBiometricsEnabled: jest.fn().mockResolvedValue(true),
  generateRecoveryCode: jest.fn(() => 'ABCD2345EFGH6789'),
  setRecoveryCode: jest.fn().mockResolvedValue(true),
}));

describe('SecuritySettings', () => {
  it('permet de définir un PIN via la modale', async () => {
    const { getByTestId, queryByTestId } = render(<SecuritySettings />);

    // ouvrir la modale via bouton "Définir un PIN"
    fireEvent.press(getByTestId('set-pin-button'));
    const pin1 = await waitFor(() => getByTestId('pin-input-1'));
    const pin2 = getByTestId('pin-input-2');

    fireEvent.changeText(pin1, '1234');
    fireEvent.changeText(pin2, '1234');
    fireEvent.press(getByTestId('pin-save'));

    await waitFor(() => expect(queryByTestId('pin-input-1')).toBeNull());
  });

  it('active/désactive la biométrie', async () => {
    const { getByTestId } = render(<SecuritySettings />);
    const toggle = await waitFor(() => getByTestId('biometrics-toggle'));
    fireEvent(toggle, 'valueChange', true);
  });

  it('génère et affiche un code de récupération', async () => {
    const { getByTestId, findByTestId } = render(<SecuritySettings />);
    fireEvent.press(getByTestId('recovery-generate-button'));
    const code = await findByTestId('recovery-code');
    expect(code.props.children).toBe('ABCD2345EFGH6789');
  });
});


