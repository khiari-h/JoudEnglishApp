import React from 'react';
import { render } from '@testing-library/react-native';


describe('SettingContext', () => {
  it('fournit des paramètres par défaut', () => {
    let contextValue;

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
