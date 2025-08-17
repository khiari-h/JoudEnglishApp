import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Platform, Animated } from 'react-native';
import createStyles from '../../../src/components/exercise-common/NavigationButtons/style';
import NavigationButtons from '../../../src/components/exercise-common/NavigationButtons';

// Mock dependencies
jest.mock('expo-linear-gradient', () => {
    const { View } = require('react-native');
    return {
        LinearGradient: (props) => <View testID="linear-gradient" {...props} />,
    };
});

jest.mock('@expo/vector-icons', () => {
    const { Text } = require('react-native');
    return {
        Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
    };
});

// Mock de l'API Animated pour des tests rapides et fiables
jest.spyOn(Animated, 'sequence').mockImplementation(() => ({
    start: (callback) => {
        if (callback) {
            callback();
        }
    },
}));

describe('NavigationButtons', () => {
    const onNextMock = jest.fn();
    const onPreviousMock = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.runOnlyPendingTimers();
    });

    // ---------------------------------
    // Rendu et Fonctionnalité des Boutons
    // ---------------------------------
    describe('Rendering and Functionality', () => {
        it('renders both previous and next buttons by default', () => {
            const { getByText } = render(
                <NavigationButtons onNext={onNextMock} onPrevious={onPreviousMock} />
            );
            expect(getByText('Précédent')).toBeTruthy();
            expect(getByText('Suivant')).toBeTruthy();
        });

        it('hides the previous button when disablePrevious is true', () => {
            const { queryByText } = render(<NavigationButtons onNext={onNextMock} onPrevious={onPreviousMock} disablePrevious={true} />);
            expect(queryByText('Précédent')).toBeNull();
        });

        it('calls onPrevious when the previous button is pressed', () => {
            const { getByText } = render(<NavigationButtons onPrevious={onPreviousMock} />);
            fireEvent.press(getByText('Précédent'));
            act(() => jest.runAllTimers());
            expect(onPreviousMock).toHaveBeenCalledTimes(1);
        });

        it('calls onNext when the next button is pressed', () => {
            const { getByText } = render(<NavigationButtons onNext={onNextMock} />);
            fireEvent.press(getByText('Suivant'));
            act(() => jest.runAllTimers());
            expect(onNextMock).toHaveBeenCalledTimes(1);
        });

        // Test corrigé pour vérifier l'absence du bouton
        it('does not render next button when disabled', () => {
            const { queryByText } = render(<NavigationButtons onNext={onNextMock} disableNext={true} />);
            expect(queryByText('Suivant')).toBeNull();
        });

        it('displays "Terminer" and a checkmark icon on the next button when isLast is true', () => {
            const { getByText, getByTestId } = render(<NavigationButtons isLast={true} onNext={onNextMock} />);
            expect(getByText('Terminer')).toBeTruthy();
            expect(getByTestId('icon-checkmark')).toBeTruthy();
        });

        it('hides both buttons when both are disabled', () => {
            const { queryByText } = render(
                <NavigationButtons disablePrevious={true} disableNext={true} />
            );
            expect(queryByText('Précédent')).toBeNull();
            expect(queryByText('Suivant')).toBeNull();
            expect(queryByText('Terminer')).toBeNull();
        });

        it('renders only the previous button when disableNext is true', () => {
            const { getByText, queryByText } = render(
                <NavigationButtons onPrevious={onPreviousMock} disableNext={true} />
            );
            expect(getByText('Précédent')).toBeTruthy();
            expect(queryByText('Suivant')).toBeNull();
        });

        it('renders only the next button when disablePrevious is true', () => {
            const { getByText, queryByText } = render(
                <NavigationButtons onNext={onNextMock} disablePrevious={true} />
            );
            expect(getByText('Suivant')).toBeTruthy();
            expect(queryByText('Précédent')).toBeNull();
        });

        it('uses custom button labels', () => {
            const { getByText } = render(
                <NavigationButtons
                    buttonLabels={{ previous: 'Back', next: 'Next', finish: 'Done' }}
                />
            );
            expect(getByText('Back')).toBeTruthy();
            expect(getByText('Next')).toBeTruthy();
        });
    });

    // ---------------------------------
    // Styles platform-specific
    // ---------------------------------
    describe('Platform-specific Styles', () => {
        it('applies iOS styles correctly', () => {
            jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.ios);
            const styles = createStyles('#5E60CE');
            expect(styles.previousButton.shadowColor).toBe('#000');
            expect(styles.previousButton.shadowOpacity).toBe(0.08);
            expect(styles.previousButton).not.toHaveProperty('elevation');
        });

        it('applies Android styles correctly', () => {
            jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.android);
            const styles = createStyles('#5E60CE');
            expect(styles.previousButton.elevation).toBe(3);
            expect(styles.previousButton).not.toHaveProperty('shadowOpacity');
        });
        
        // Ce test est maintenant obsolète car le bouton n'est pas rendu
        // lorsque disableNext est true. Nous l'avons remplacé par le test
        // 'does not render next button when disabled' ci-dessus.
    });
});