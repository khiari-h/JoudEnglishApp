import React from 'react';
import { render } from '@testing-library/react-native';


describe('ThemeContext', () => {
  it('fournit un thème par défaut', () => {
    let contextValue;

      contextValue = React.useContext(ThemeContext);
      return null;
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(contextValue).toBeDefined();
    expect(contextValue.colors).toBeDefined();
  });
});
