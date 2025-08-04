// __tests__/components/exercise-common/ExerciseFooter.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExerciseFooter from '../../../src/components/exercise-common/ExerciseFooter';

// Mock des icônes
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: (props) => <Text testID={`icon-${props.name}`}>{props.name}</Text>,
  };
});

describe('ExerciseFooter', () => {
  const onPrimaryPressMock = jest.fn();
  const onSecondaryPressMock = jest.fn();
  const onSkipMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the primary button with default label "Continuer"', () => {
    const { getByText } = render(<ExerciseFooter onPrimaryPress={() => {}} />);
    expect(getByText('Continuer')).toBeTruthy();
  });

  it('renders the primary button with label "Terminer" when isLastQuestion is true', () => {
    const { getByText } = render(<ExerciseFooter onPrimaryPress={() => {}} isLastQuestion={true} />);
    expect(getByText('Terminer')).toBeTruthy();
  });

  it('renders the secondary button by default', () => {
    const { getByText } = render(<ExerciseFooter onSecondaryPress={() => {}} />);
    expect(getByText('Précédent')).toBeTruthy();
  });

  it('hides the secondary button when showSecondary is false', () => {
    const { queryByText } = render(<ExerciseFooter showSecondary={false} />);
    expect(queryByText('Précédent')).toBeNull();
  });

  it('renders the skip button when onSkip is provided', () => {
    const { getByText } = render(<ExerciseFooter onSkip={() => {}} />);
    expect(getByText('Passer')).toBeTruthy();
  });

  it('hides the skip button when hideSkip is true', () => {
    const { queryByText } = render(<ExerciseFooter onSkip={() => {}} hideSkip={true} />);
    expect(queryByText('Passer')).toBeNull();
  });

  it('calls onPrimaryPress when the primary button is pressed', () => {
    const { getByText } = render(<ExerciseFooter onPrimaryPress={onPrimaryPressMock} />);
    fireEvent.press(getByText('Continuer'));
    expect(onPrimaryPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSecondaryPress when the secondary button is pressed', () => {
    const { getByText } = render(<ExerciseFooter onSecondaryPress={onSecondaryPressMock} />);
    fireEvent.press(getByText('Précédent'));
    expect(onSecondaryPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSkip when the skip button is pressed', () => {
    const { getByText } = render(<ExerciseFooter onSkip={onSkipMock} />);
    fireEvent.press(getByText('Passer'));
    expect(onSkipMock).toHaveBeenCalledTimes(1);
  });

  it('disables the primary button when isDisabled is true', () => {
    const { getByText } = render(
      <ExerciseFooter onPrimaryPress={onPrimaryPressMock} isDisabled={true} />
    );
    const primaryButton = getByText('Continuer');
    fireEvent.press(primaryButton);
    expect(onPrimaryPressMock).not.toHaveBeenCalled();
    // La prop `disabled` est directement sur l'élément TouchableOpacity, pas dans accessibilityState
    // Pour la tester, on vérifie que le press ne déclenche pas le mock
    // et on peut vérifier la prop sur le composant parent si nécessaire.
    // Ici, le test fonctionnel (ne pas appeler le mock) est le plus important.
  });

  it('shows a forward chevron icon by default in the primary button', () => {
    const { getByTestId } = render(<ExerciseFooter />);
    expect(getByTestId('icon-chevron-forward')).toBeTruthy();
  });

  it('shows a checkmark icon when showCheck is true', () => {
    const { getByTestId } = render(<ExerciseFooter showCheck={true} />);
    expect(getByTestId('icon-checkmark')).toBeTruthy();
  });
});