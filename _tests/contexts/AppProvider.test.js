import { render } from '@testing-library/react-native';


describe('AppProvider', () => {
  it('fournit un contexte global sans erreur', () => {

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    // Si aucun crash, le test passe
    expect(true).toBe(true);
  });
});
