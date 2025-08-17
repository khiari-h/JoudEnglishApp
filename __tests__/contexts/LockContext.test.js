import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import { LockProvider, useLock } from '../../src/contexts/LockContext';

// 1. Mockez le service au tout début du fichier
jest.mock('../../src/services/lockService', () => ({
  isEnabled: jest.fn(),
  verifyPin: jest.fn(),
  disableLock: jest.fn(),
  enableLock: jest.fn(),
}));

const Lock = require('../../src/services/lockService');

// Un composant de test qui expose toutes les fonctions du contexte
// J'ai ajouté lockNow ici, ce qui est la seule modification nécessaire pour le test
const Consumer = () => {
  const { isEnabled, isLocked, unlockWithPin, disable, enable, isLoading, lockNow } = useLock();
  return (
    <>
      {isLoading && <text testID="loading">Loading...</text>}
      <text testID="enabled">{String(isEnabled)}</text>
      <text testID="locked">{String(isLocked)}</text>
      <button testID="unlock-correct-pin" onPress={() => unlockWithPin('1234')} />
      <button testID="unlock-wrong-pin" onPress={() => unlockWithPin('0000')} />
      <button testID="unlock-lockout" onPress={() => unlockWithPin('0000')} />
      <button testID="disable" onPress={disable} />
      <button testID="enable" onPress={enable} />
      <button testID="lock-now" onPress={lockNow} />
    </>
  );
};

describe('LockContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Lock.isEnabled.mockResolvedValue(true);
    Lock.verifyPin.mockResolvedValue({ ok: true });
    Lock.disableLock.mockResolvedValue(true);
    Lock.enableLock.mockResolvedValue(true);
  });

  it('initializes locked when enabled, unlocks with correct PIN, and can disable', async () => {
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    await waitFor(() => expect(ui.queryByTestId('loading')).toBeNull());
    expect(ui.getByTestId('enabled').props.children).toBe('true');
    expect(ui.getByTestId('locked').props.children).toBe('true');
    await act(async () => {
      fireEvent.press(ui.getByTestId('unlock-correct-pin'));
    });
    expect(ui.getByTestId('locked').props.children).toBe('false');
    expect(Lock.verifyPin).toHaveBeenCalledWith('1234');
    await act(async () => {
      fireEvent.press(ui.getByTestId('disable'));
    });
    expect(ui.getByTestId('enabled').props.children).toBe('false');
    expect(Lock.disableLock).toHaveBeenCalled();
  });

  it('initializes unlocked when not enabled', async () => {
    Lock.isEnabled.mockResolvedValueOnce(false);
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    await waitFor(() => expect(ui.queryByTestId('loading')).toBeNull());
    expect(ui.getByTestId('enabled').props.children).toBe('false');
    expect(ui.getByTestId('locked').props.children).toBe('false');
  });

  it('should not unlock with an incorrect PIN', async () => {
    Lock.verifyPin.mockResolvedValueOnce({ ok: false });
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    await waitFor(() => expect(ui.queryByTestId('loading')).toBeNull());
    expect(ui.getByTestId('locked').props.children).toBe('true');
    let result;
    await act(async () => {
      result = await ui.getByTestId('unlock-wrong-pin').props.onPress();
    });
    expect(ui.getByTestId('locked').props.children).toBe('true');
    expect(result).toEqual({ ok: false });
    expect(Lock.verifyPin).toHaveBeenCalledWith('0000');
  });

  it('should return lockout reason when pin verification fails with lockout', async () => {
    Lock.verifyPin.mockResolvedValueOnce({ ok: false, reason: 'lockout' });
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    await waitFor(() => expect(ui.queryByTestId('loading')).toBeNull());
    expect(ui.getByTestId('locked').props.children).toBe('true');
    let result;
    await act(async () => {
      result = await ui.getByTestId('unlock-lockout').props.onPress();
    });
    expect(ui.getByTestId('locked').props.children).toBe('true');
    expect(result).toEqual({ ok: false, reason: 'lockout' });
    expect(Lock.verifyPin).toHaveBeenCalledWith('0000');
  });

  it('should enable the lock', async () => {
    Lock.isEnabled.mockResolvedValueOnce(false);
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    await waitFor(() => expect(ui.queryByTestId('loading')).toBeNull());
    expect(ui.getByTestId('enabled').props.children).toBe('false');
    expect(ui.getByTestId('locked').props.children).toBe('false');
    await act(async () => {
      fireEvent.press(ui.getByTestId('enable'));
    });
    expect(ui.getByTestId('enabled').props.children).toBe('true');
    expect(ui.getByTestId('locked').props.children).toBe('true');
    expect(Lock.enableLock).toHaveBeenCalled();
  });

  it('should lock the app when lockNow is called', async () => {
    const ui = render(<LockProvider><Consumer /></LockProvider>);
    
    // 1. S'assurer que le verrouillage est activé au départ (état initial)
    await waitFor(() => expect(ui.getByTestId('locked').props.children).toBe('true'));
    
    // 2. Le déverrouiller pour pouvoir tester la fonction `lockNow`
    await act(async () => {
      fireEvent.press(ui.getByTestId('unlock-correct-pin'));
    });
    expect(ui.getByTestId('locked').props.children).toBe('false');
    
    // 3. Appeler la fonction `lockNow` en simulant un clic sur le bouton
    await act(async () => {
      fireEvent.press(ui.getByTestId('lock-now'));
    });

    // 4. Vérifier que le verrouillage est de nouveau actif
    expect(ui.getByTestId('locked').props.children).toBe('true');
  });
  it('should not lock the app when lockNow is called but isEnabled is false', async () => {
  // Mock le service pour que isEnabled soit faux au départ
  Lock.isEnabled.mockResolvedValueOnce(false);

  const ui = render(<LockProvider><Consumer /></LockProvider>);

  // Attendre que le composant soit initialisé et déverrouillé
  await waitFor(() => expect(ui.getByTestId('locked').props.children).toBe('false'));
  
  // S'assurer que le verrouillage n'est pas activé
  expect(ui.getByTestId('enabled').props.children).toBe('false');

  // Appeler la fonction lockNow
  await act(async () => {
    fireEvent.press(ui.getByTestId('lock-now'));
  });

  // Vérifier que le verrouillage reste sur false
  expect(ui.getByTestId('locked').props.children).toBe('false');
});
it('should throw an error when useLock is not used within LockProvider', () => {
  // Créer un composant qui appelle directement useLock sans fournisseur
  const ComponentWithoutProvider = () => {
    useLock();
    return null;
  };
  
  // S'attendre à ce que le rendu de ce composant lève une erreur
  expect(() => render(<ComponentWithoutProvider />)).toThrow(
    'useLock must be used within LockProvider'
  );
});
});