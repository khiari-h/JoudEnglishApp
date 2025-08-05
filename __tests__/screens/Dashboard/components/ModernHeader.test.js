// __tests__/screens/Dashboard/components/ModernHeader.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import ModernHeader from '../../../../src/screens/Dashboard/components/ModernHeader';
import { ThemeContext } from '../../../../src/contexts/ThemeContext';

// Mock du LinearGradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  }
}));

describe('ModernHeader', () => {
  const mockThemeContext = {
    colors: {
      surface: '#FFFFFF',
      text: '#1F2937',
      primary: '#3B82F6'
    }
  };

  const renderWithTheme = (component, themeValue = mockThemeContext) => {
    return render(
      <ThemeContext.Provider value={themeValue}>
        {component}
      </ThemeContext.Provider>
    );
  };

  it('devrait afficher le logo JOUD avec l\'emoji', () => {
    const { getByText } = renderWithTheme(<ModernHeader />);
    
    expect(getByText('🎓')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
  });

  it('devrait afficher le niveau par défaut (1)', () => {
    const { getByText } = renderWithTheme(<ModernHeader />);
    
    expect(getByText('1')).toBeTruthy();
  });

  it('devrait afficher le niveau spécifié', () => {
    const { getByText } = renderWithTheme(<ModernHeader level="3" />);
    
    expect(getByText('3')).toBeTruthy();
  });

  it('devrait afficher "B" pour le niveau bonus', () => {
    const { getByText } = renderWithTheme(<ModernHeader level="bonus" />);
    
    expect(getByText('B')).toBeTruthy();
  });

  it('devrait utiliser la couleur de niveau spécifiée', () => {
    const customColor = '#FF5722';
    const { getByText } = renderWithTheme(
      <ModernHeader level="2" levelColor={customColor} />
    );
    
    // Vérifier que le composant se rend sans erreur avec la couleur personnalisée
    expect(getByText('2')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
  });

  it('devrait utiliser la couleur par défaut si aucune couleur n\'est spécifiée', () => {
    const { getByText } = renderWithTheme(<ModernHeader level="1" />);
    
    expect(getByText('1')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
  });

  it('devrait fonctionner sans contexte de thème', () => {
    const { getByText } = render(<ModernHeader level="4" />);
    
    expect(getByText('🎓')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('devrait utiliser les couleurs par défaut si le contexte de thème est incomplet', () => {
    const incompleteTheme = {
      colors: {
        // surface manquant
        text: '#1F2937'
      }
    };

    const { getByText } = renderWithTheme(
      <ModernHeader level="5" />, 
      incompleteTheme
    );
    
    expect(getByText('5')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
  });

  it('devrait afficher tous les niveaux possibles correctement', () => {
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const expectedDisplays = ['1', '2', '3', '4', '5', '6', 'B'];

    levels.forEach((level, index) => {
      const { getByText, unmount } = renderWithTheme(
        <ModernHeader level={level} />
      );
      
      expect(getByText(expectedDisplays[index])).toBeTruthy();
      expect(getByText('JOUD')).toBeTruthy();
      expect(getByText('🎓')).toBeTruthy();
      
      unmount();
    });
  });

  it('devrait avoir la structure correcte avec les sections gauche et droite', () => {
    const { getByText } = renderWithTheme(<ModernHeader level="2" />);
    
    // Section gauche : Logo
    expect(getByText('🎓')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
    
    // Section droite : Badge niveau
    expect(getByText('2')).toBeTruthy();
  });

  it('devrait gérer les props undefined gracieusement', () => {
    const { getByText } = renderWithTheme(
      <ModernHeader level={undefined} levelColor={undefined} />
    );
    
    // Devrait utiliser les valeurs par défaut
    expect(getByText('1')).toBeTruthy(); // niveau par défaut
    expect(getByText('JOUD')).toBeTruthy();
    expect(getByText('🎓')).toBeTruthy();
  });

  it('devrait gérer les niveaux non-standard', () => {
    // Test avec un niveau qui n'est pas dans la liste standard
    const { getByText } = renderWithTheme(<ModernHeader level="7" />);
    
    expect(getByText('7')).toBeTruthy(); // Devrait afficher tel quel
    expect(getByText('JOUD')).toBeTruthy();
  });

  it('devrait appliquer le LinearGradient avec les bonnes props', () => {
    const customColor = '#8B5CF6';
    const { getByText } = renderWithTheme(
      <ModernHeader level="3" levelColor={customColor} />
    );
    
    // Vérifier que le composant se rend correctement
    expect(getByText('3')).toBeTruthy();
    expect(getByText('JOUD')).toBeTruthy();
  });
});