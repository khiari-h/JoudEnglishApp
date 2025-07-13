
import { render } from '@testing-library/react-native';


describe('ProgressContext', () => {
  it('fournit des valeurs par défaut', () => {
    let contextValue;

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
