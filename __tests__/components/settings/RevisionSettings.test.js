import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RevisionSettings from '../../../src/components/setting/RevisionSettings';
import { useRevisionSettings } from '../../../src/hooks/useRevisionSettings';

// Mock du hook useRevisionSettings
jest.mock('../../../src/hooks/useRevisionSettings');

describe('RevisionSettings', () => {
  const mockPreferences = {
    isDisabled: false,
    frequency: 50,
    questionsCount: 10,
    nextRevisionAt: 150,
  };

  const mockEnableRevisions = jest.fn();
  const mockDisableRevisions = jest.fn();
  const mockUpdateFrequency = jest.fn();

  beforeEach(() => {
    useRevisionSettings.mockReturnValue({
      preferences: mockPreferences,
      isLoading: false,
      enableRevisions: mockEnableRevisions,
      disableRevisions: mockDisableRevisions,
      updateFrequency: mockUpdateFrequency,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait afficher le titre et le switch des révisions automatiques', () => {
    const { getByText, getByRole } = render(<RevisionSettings />);
    expect(getByText('🔄 Révisions automatiques')).toBeTruthy();
    expect(getByText('Révisions automatiques')).toBeTruthy();
    expect(getByRole('switch')).toBeTruthy();
  });

  it('devrait afficher les options de fréquence si les révisions sont activées', () => {
    const { getByText } = render(<RevisionSettings />);
    expect(getByText('Fréquence :')).toBeTruthy();
    expect(getByText('Tous les 25 mots (léger)')).toBeTruthy();
    expect(getByText('Tous les 50 mots (standard)')).toBeTruthy();
    expect(getByText('Tous les 100 mots (espacé)')).toBeTruthy();
  });

  it('ne devrait pas afficher les options de fréquence si les révisions sont désactivées', () => {
    useRevisionSettings.mockReturnValueOnce({
      preferences: { ...mockPreferences, isDisabled: true },
      isLoading: false,
      enableRevisions: mockEnableRevisions,
      disableRevisions: mockDisableRevisions,
      updateFrequency: mockUpdateFrequency,
    });
    const { queryByText } = render(<RevisionSettings />);
    expect(queryByText('Fréquence :')).toBeNull();
    expect(queryByText('Tous les 25 mots (léger)')).toBeNull();
    expect(queryByText('⚠️ Révisions désactivées')).toBeTruthy();
  });

  it('devrait appeler disableRevisions quand le switch est désactivé', async () => {
    const { getByRole } = render(<RevisionSettings />);
    const toggleSwitch = getByRole('switch');
    fireEvent(toggleSwitch, 'onValueChange', false);
    await waitFor(() => expect(mockDisableRevisions).toHaveBeenCalled());
  });

  it('devrait appeler enableRevisions quand le switch est activé', async () => {
    useRevisionSettings.mockReturnValueOnce({
      preferences: { ...mockPreferences, isDisabled: true },
      isLoading: false,
      enableRevisions: mockEnableRevisions,
      disableRevisions: mockDisableRevisions,
      updateFrequency: mockUpdateFrequency,
    });
    const { getByRole } = render(<RevisionSettings />);
    const toggleSwitch = getByRole('switch');
    fireEvent(toggleSwitch, 'onValueChange', true);
    await waitFor(() => expect(mockEnableRevisions).toHaveBeenCalledWith(mockPreferences.frequency, mockPreferences.questionsCount));
  });

  it('devrait appeler updateFrequency quand une option de fréquence est pressée', () => {
    const { getByText } = render(<RevisionSettings />);
    const option50 = getByText('Tous les 50 mots (standard)');
    fireEvent.press(option50);
    expect(mockUpdateFrequency).toHaveBeenCalledWith(50);

    const option25 = getByText('Tous les 25 mots (léger)');
    fireEvent.press(option25);
    expect(mockUpdateFrequency).toHaveBeenCalledWith(25);
  });

  it('devrait afficher le message de chargement quand isLoading est vrai', () => {
    useRevisionSettings.mockReturnValueOnce({
      preferences: mockPreferences,
      isLoading: true,
      enableRevisions: mockEnableRevisions,
      disableRevisions: mockDisableRevisions,
      updateFrequency: mockUpdateFrequency,
    });
    const { getByText } = render(<RevisionSettings />);
    expect(getByText('Chargement des paramètres...')).toBeTruthy();
  });
});
