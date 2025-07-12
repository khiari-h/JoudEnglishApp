import React from 'react';
import { render } from '@testing-library/react-native';
import { SettingsProvider, SettingsContext } from '../../src/contexts/SettingContext';

describe('SettingContext', () => {
  it('fournit des paramètres par défaut', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(SettingsContext);
      return null;
    };
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    expect(contextValue).toBeDefined();
  });
});
