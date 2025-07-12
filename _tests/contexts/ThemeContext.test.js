import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider, ThemeContext } from '../../src/contexts/ThemeContext';

describe('ThemeContext', () => {
  it('fournit un thème par défaut', () => {
    let contextValue;
    const TestComponent = () => {
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
