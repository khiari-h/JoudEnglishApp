// src/__tests__/ThemeContext.test.js
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { ThemeProvider, ThemeContext } from '../../src/contexts/ThemeContext';
import { useColorScheme } from 'react-native';
import { storeData, getData } from '../../src/utils/storageUtils';

// Mock des dépendances externes
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    return {
        ...RN,
        useColorScheme: jest.fn(() => 'light'),
    };
});

jest.mock('../../src/utils/storageUtils', () => ({
    storeData: jest.fn(() => Promise.resolve()),
    getData: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('../../src/utils/constants', () => ({
    COLORS: {
        background: '#FFFFFF',
        surface: '#F0F0F0',
        primary: '#007AFF',
        text: '#000000',
        textSecondary: '#666666',
        border: '#CCCCCC',
        divider: '#E0E0E0',
        disabled: '#999999',
        icon: '#000000',
        error: '#ff3b30',
    },
}));

// Composant de test qui utilise le contexte
const TestComponent = () => {
    const {
        theme,
        isDarkTheme,
        colors,
        loaded,
        spacing,
        typography,
        borderRadius,
        shadows,
        setTheme,
        toggleTheme,
        resetToSystemTheme,
    } = React.useContext(ThemeContext);

    if (!loaded) {
        return <Text testID="loading-status">Loading Theme...</Text>;
    }

    return (
        <>
            <Text testID="current-theme">Theme: {theme}</Text>
            <Text testID="is-dark-theme">Is Dark: {isDarkTheme ? 'Yes' : 'No'}</Text>
            <Text testID="background-color">Background: {colors.background}</Text>
            <Text testID="text-color">Text: {colors.text}</Text>
            <Text testID="spacing-md">Spacing: {spacing.md}</Text>
            <Text testID="typography-md-font-size">Font Size: {typography.fontSizes.md}</Text>
            <Text testID="border-radius-md">Border Radius: {borderRadius.md}</Text>
            <Text testID="shadows-md-elevation">Shadows: {shadows.md.elevation}</Text>
            <Text testID="level-A1">Level A1: {colors.level.A1}</Text>


            <Button title="Set Light" onPress={() => setTheme('light')} />
            <Button title="Set Dark" onPress={() => setTheme('dark')} />
            <Button title="Set System" onPress={() => setTheme('system')} />
            <Button title="Toggle Theme" onPress={toggleTheme} />
            <Button title="Reset to System" onPress={resetToSystemTheme} />
        </>
    );
};

// Helper pour aplatir les enfants d'un composant Text
const flattenChildren = (children) =>
    Array.isArray(children) ? children.join('') : children;

describe('ThemeProvider', () => {
    // Variables pour contrôler la promesse de getData
    let mockGetDataPromise;
    let resolveMockPromise;
    let rejectMockPromise;

    beforeEach(() => {
        // Réinitialisation des mocks et des timers
        jest.clearAllMocks();
        jest.useFakeTimers();
        
        // Création d'une promesse contrôlable pour getData
        mockGetDataPromise = new Promise((resolve, reject) => {
            resolveMockPromise = resolve;
            rejectMockPromise = reject;
        });
        getData.mockReturnValue(mockGetDataPromise);
        
        // Mock par défaut pour useColorScheme
        useColorScheme.mockReturnValue('light');
    });

    afterEach(() => {
        // Nettoyage des timers en attente
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    // 1. Tests de chargement initial et de stockage
    it('should load default system theme when no saved theme exists', async () => {
        // Déclenche la résolution de la promesse pour le cas par défaut
        resolveMockPromise(null);
        
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('loading-status')).toBeTruthy();
        await act(async () => jest.runAllTimers());
        expect(screen.queryByTestId('loading-status')).toBeNull();

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
        expect(getData).toHaveBeenCalledWith('appTheme');
    });

    it('should load saved theme from storage', async () => {
        // Déclenche la résolution de la promesse avec une valeur sauvegardée
        resolveMockPromise('dark');
        useColorScheme.mockReturnValue('light');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        await act(async () => jest.runAllTimers());

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');
        expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #121212');
        expect(flattenChildren(screen.getByTestId('text-color').props.children)).toBe('Text: #FFFFFF');
    });
    
    // 2. Tests des fonctions de modification du thème
    it('should set theme to light and save it', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        fireEvent.press(screen.getByText('Set Light'));

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
        await act(async () => jest.runAllTimers());
        expect(storeData).toHaveBeenCalledWith('appTheme', 'light');
    });

    it('should set theme to dark and save it', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        fireEvent.press(screen.getByText('Set Dark'));

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
        await act(async () => jest.runAllTimers());
        expect(storeData).toHaveBeenCalledWith('appTheme', 'dark');
    });

    it('should reset to system theme and save it', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        fireEvent.press(screen.getByText('Set Dark'));
        await act(async () => jest.runAllTimers());
        
        fireEvent.press(screen.getByText('Reset to System'));
        
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
        await act(async () => jest.runAllTimers());
        expect(storeData).toHaveBeenCalledWith('appTheme', 'system');
    });

    it('should toggle from light to dark theme', async () => {
        resolveMockPromise('light');
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        fireEvent.press(screen.getByText('Toggle Theme'));
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
    });

    it('should toggle from dark to light theme', async () => {
        resolveMockPromise('dark');
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        fireEvent.press(screen.getByText('Toggle Theme'));
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
    });

    it('should toggle from system to light theme if systemColorScheme is dark', async () => {
        useColorScheme.mockReturnValue('dark');
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');

        fireEvent.press(screen.getByText('Toggle Theme'));
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: light');
    });
    
    it('should toggle from system to dark theme if systemColorScheme is light', async () => {
        useColorScheme.mockReturnValue('light');
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());

        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');

        fireEvent.press(screen.getByText('Toggle Theme'));
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: dark');
    });

    // 3. Tests des valeurs mémoïsées (`useMemo`)
    it('should correctly provide static memoized values', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());

        expect(flattenChildren(screen.getByTestId('spacing-md').props.children)).toBe('Spacing: 16');
        expect(flattenChildren(screen.getByTestId('typography-md-font-size').props.children)).toBe('Font Size: 16');
        expect(flattenChildren(screen.getByTestId('border-radius-md').props.children)).toBe('Border Radius: 8');
    });

    it('should apply correct shadows based on theme', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers());
        
        // Thème clair par défaut
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: No');
        expect(flattenChildren(screen.getByTestId('shadows-md-elevation').props.children)).toBe('Shadows: 4');
        
        // Passer au thème sombre
        fireEvent.press(screen.getByText('Set Dark'));
        expect(flattenChildren(screen.getByTestId('is-dark-theme').props.children)).toBe('Is Dark: Yes');
        expect(flattenChildren(screen.getByTestId('background-color').props.children)).toBe('Background: #121212');
        expect(flattenChildren(screen.getByTestId('shadows-md-elevation').props.children)).toBe('Shadows: 4');
    });

    // 4. Test des cas de bord et de la couverture
    it('should handle storage read error gracefully', async () => {
        rejectMockPromise(new Error('Storage read failed'));
        
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        
        await act(async () => jest.runAllTimers());
        
        expect(screen.queryByTestId('loading-status')).toBeNull();
        expect(flattenChildren(screen.getByTestId('current-theme').props.children)).toBe('Theme: system');
    });
    
    it('should not update state after unmount (in try block)', async () => {
        const { unmount } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
    
        // Démontage du composant
        unmount();
    
        // Résolution de la promesse pour le cas de succès
        await act(async () => {
            resolveMockPromise('light');
        });
    
        // Le test passe si aucune erreur n'est levée
    });
    
    it('should not update state after unmount (in catch block)', async () => {
        const consoleSpy = jest.spyOn(console, 'error');
        const { unmount } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        
        // Démontage du composant
        unmount();
        
        // Rejet de la promesse pour le cas d'échec
        await act(async () => {
            rejectMockPromise(new Error('Storage read failed'));
        });
        
        // On s'assure que le `console.error` a été appelé
        expect(consoleSpy).toHaveBeenCalledWith('Error loading theme:', expect.any(Error));
    
        consoleSpy.mockRestore();
    });

    it('should not save theme when not loaded yet', async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        // Au moment du rendu initial, le bouton n'existe pas
        expect(screen.queryByText('Set Dark')).toBeNull();

        // On avance les timers pour simuler le chargement
        await act(async () => {
            resolveMockPromise(null);
            jest.runAllTimers();
        });

        // Maintenant que le composant est chargé, le bouton est présent
        fireEvent.press(screen.getByText('Set Dark'));

        // On s'attend à ce que la sauvegarde soit en attente du debounce
        expect(storeData).not.toHaveBeenCalled();

        await act(async () => jest.advanceTimersByTime(300));
        
        expect(storeData).toHaveBeenCalledTimes(1);
        expect(storeData).toHaveBeenCalledWith('appTheme', 'dark');
    });

    it('should debounce theme saving', async () => {
        resolveMockPromise(null);
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        await act(async () => jest.runAllTimers()); 

        fireEvent.press(screen.getByText('Set Light'));
        fireEvent.press(screen.getByText('Set Dark'));
        fireEvent.press(screen.getByText('Set System'));

        expect(storeData).not.toHaveBeenCalled();

        await act(async () => jest.advanceTimersByTime(300));
        
        expect(storeData).toHaveBeenCalledTimes(1);
        expect(storeData).toHaveBeenCalledWith('appTheme', 'system');
    });
});