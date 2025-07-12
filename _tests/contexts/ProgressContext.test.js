import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressProvider, useProgress } from '../../src/contexts/ProgressContext';

describe('ProgressContext', () => {
  it('fournit des valeurs par défaut', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useProgress();
      return null;
    };
    render(
      <ProgressProvider>
        <TestComponent />
      </ProgressProvider>
    );
    expect(contextValue).toBeDefined();
    expect(contextValue.progress).toBeDefined();
  });
});
