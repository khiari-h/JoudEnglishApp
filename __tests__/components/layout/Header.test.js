import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/layout/Header';
import { Text, View } from 'react-native';

// Mock du hook de navigation pour simuler la navigation.goBack()
const mockGoBack = jest.fn();
const mockCanGoBack = jest.fn(() => true);
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    canGoBack: mockCanGoBack,
  }),
}));

// Mock d'Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, ...props }) => {
    // La bonne pratique est ici
    const { Text } = require('react-native');
    return <Text testID={`icon-${name}`} {...props}>{name}</Text>;
  }
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Tests du comportement de base (déjà existants mais complétés) ---
  it('affiche le titre passé en prop', () => {
    const { getByText } = render(<Header title="Accueil" />);
    expect(getByText('Accueil')).toBeTruthy();
  });

  it('n’affiche pas le bouton retour si showBackButton est false', () => {
    const { queryByTestId } = render(<Header title="Sans Retour" showBackButton={false} />);
    expect(queryByTestId('back-button')).toBeNull();
  });

  it('affiche le bouton retour si showBackButton est true', () => {
    const { getByTestId } = render(<Header title="Avec Retour" showBackButton={true} />);
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('exécute une action au clic sur le bouton retour si onBackPress est défini', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<Header title="Retour" showBackButton={true} onBackPress={mockFn} />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockFn).toHaveBeenCalled();
    expect(mockGoBack).not.toHaveBeenCalled(); // Ne doit pas appeler la navigation
  });

  // --- Nouveaux tests pour couvrir les branches manquantes ---

  it('appelle navigation.goBack() si onBackPress n’est pas défini', () => {
    const { getByTestId } = render(<Header title="Retour via Nav" showBackButton={true} />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('affiche un composant de gauche personnalisé si fourni', () => {
    const CustomLeft = <Text testID="custom-left">Custom Left</Text>;
    const { getByTestId, queryByTestId } = render(<Header title="Titre" leftComponent={CustomLeft} showBackButton={true} />);
    expect(getByTestId('custom-left')).toBeTruthy();
    expect(queryByTestId('back-button')).toBeNull();
  });
  
  it('affiche une icône de droite si rightIcon est fourni', () => {
    const { getByTestId } = render(<Header title="Titre" rightIcon="settings-outline" />);
    expect(getByTestId('icon-settings-outline')).toBeTruthy();
  });

  it('appelle onRightPress au clic sur l’icône de droite', () => {
    const mockRightPress = jest.fn();
    const { getByTestId } = render(<Header title="Titre" rightIcon="settings-outline" onRightPress={mockRightPress} />);
    fireEvent.press(getByTestId('icon-settings-outline'));
    expect(mockRightPress).toHaveBeenCalledTimes(1);
  });

  it('affiche un composant de droite personnalisé si fourni', () => {
    const CustomRight = <Text testID="custom-right">Custom Right</Text>;
    const { getByTestId, queryByTestId } = render(<Header title="Titre" rightComponent={CustomRight} rightIcon="settings-outline" />);
    expect(getByTestId('custom-right')).toBeTruthy();
    expect(queryByTestId('icon-settings-outline')).toBeNull(); // Le composant personnalisé remplace l'icône
  });

  it('affiche le contenu enfants si children est fourni', () => {
    const { getByTestId, queryByTestId } = render(<Header title="Titre">{<View testID="children-content" />}</Header>);
    expect(getByTestId('children-content')).toBeTruthy();
    expect(queryByTestId('back-button')).toBeNull(); // Le children remplace tout le contenu standard
  });

  it('rend le header en mode titre large si largeTitleMode est true', () => {
    const { getByText, getByTestId } = render(<Header title="Grand Titre" largeTitleMode={true} subtitle="Sous-titre" showBackButton={true} />);
    expect(getByText('Grand Titre')).toBeTruthy();
    expect(getByText('Sous-titre')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });
  
  it('affiche un composant de droite dans le mode titre large si rightComponent est fourni', () => {
    const CustomRight = <Text testID="custom-right-large">Custom Right</Text>;
    const { getByTestId } = render(<Header title="Grand Titre" largeTitleMode={true} rightComponent={CustomRight} />);
    expect(getByTestId('custom-right-large')).toBeTruthy();
  });

  it('affiche une icône de droite dans le mode titre large si rightIcon est fourni', () => {
    const { getByTestId } = render(<Header title="Grand Titre" largeTitleMode={true} rightIcon="search" />);
    expect(getByTestId('icon-search')).toBeTruthy();
  });
  
  it('affiche un composant sous le titre si bottomComponent est fourni', () => {
    const BottomContent = <Text testID="bottom-content">Contenu en bas</Text>;
    const { getByTestId } = render(<Header title="Titre" largeTitleMode={true} bottomComponent={BottomContent} />);
    expect(getByTestId('bottom-content')).toBeTruthy();
  });
});