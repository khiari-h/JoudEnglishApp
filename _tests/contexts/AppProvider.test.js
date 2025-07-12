import React from 'react';
import { render } from '@testing-library/react-native';
import AppProvider from '../../src/contexts/AppProvider';

describe('AppProvider', () => {
  it('fournit un contexte global sans erreur', () => {
    const TestComponent = () => <></>;
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    // Si aucun crash, le test passe
    expect(true).toBe(true);
  });
});
