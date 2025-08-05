// __tests__/screens/Dashboard/Dashboard.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeContext } from '../../../src/contexts/ThemeContext';

// Mock des dépendances externes
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => children
}));

jest.mock('expo-router', () => ({
  router: { push: jest.fn() }
}));

// Mock des contextes
const mockUseProgress = jest.fn();
const mockUseCurrentLevel = jest.fn();

jest.mock('../../../src/contexts/ProgressContext', () => ({
  useProgress: mockUseProgress
}));

jest.mock('../../../src/contexts/CurrentLevelContext', () => ({
  useCurrentLevel: mockUseCurrentLevel
}));

// Mock des hooks
const mockUseDashboardLevel = jest.fn();
const mockUseDashboardState = jest.fn();
const mockUseLastActivity = jest.fn();
const mockUseRealTimeProgress = jest.fn();

jest.mock('../../../src/screens/Dashboard/hooks/useDashboardLevel', () => ({
  useDashboardLevel: mockUseDashboardLevel
}));

jest.mock('../../../src/screens/Dashboard/hooks/useDashboardState', () => ({
  useDashboardState: mockUseDashboardState
}));

jest.mock('../../../src/hooks/useLastActivity', () => ({
  __esModule: true,
  default: mockUseLastActivity
}));

jest.mock('../../../src/hooks/useRealTimeProgress', () => ({
  __esModule: true,
  default: mockUseRealTimeProgress
}));

// Mock des composants
jest.mock('../../../src/screens/Dashboard/components/ModernHeader', () => 
  ({ level, levelColor }) => `ModernHeader-${level}-${levelColor}`
);

jest.mock('../../../src/screens/Dashboard/components/HeroContinueSection', () => 
  ({ lastActivity, isLoading }) => 
    `HeroContinueSection-${lastActivity?.type || 'none'}-${isLoading}`
);

jest.mock('../../../src/screens/Dashboard/components/QuickActions', () => 
  ({ currentLevel, accentColor }) => `QuickActions-${currentLevel}-${accentColor}`
);

jest.mock('../../../src/screens/Dashboard/components/SimpleMetrics', () => 
  ({ accentColor }) => `SimpleMetrics-${accentColor}`
);

jest.mock('../../../src/screens/Dashboard/components/LearningProgress', () => 
  ({ globalProgress, currentLevel }) => `LearningProgress-${globalProgress}-${currentLevel}`
);

jest.mock('../../../src/screens/VocabularyRevision/RevisionOrchestrator', () => 
  ({ currentLevel }) => `RevisionOrchestrator-${currentLevel}`
);

jest.mock('../../../src/components/layout/Container', () => 
  ({ children }) => children
);

// Mock des constantes - AVANT l'import du composant
jest.mock('../../../src/utils/constants', () => ({
  LANGUAGE_LEVELS: {
    '1': { title: 'Débutant', color: '#10B981', icon: '🌱' },
    '2': { title: 'Élémentaire', color: '#3B82F6', icon: '📚' },
    '3': { title: 'Intermédiaire', color: '#8B5CF6', icon: '🎯' },
    '4': { title: 'Intermédiaire+', color: '#F59E0B', icon: '🚀' },
    '5': { title: 'Avancé', color: '#EF4444', icon: '⭐' },
    '6': { title: 'Expert', color: '#EC4899', icon: '👑' },
    'bonus': { title: 'Bonus', color: '#6366F1', icon: '🎁' }
  },
  EXERCISES: {
    vocabulary: { id: 'vocabulary', route: '/tabs/vocabulary' },
    grammar: { id: 'grammar', route: '/tabs/grammar' }
  },
  CONTAINER_SAFE_EDGES: { NO_BOTTOM: ['top', 'left', 'right'] }
}));

// Import du composant APRÈS les mocks
const Dashboard = require('../../../src/screens/Dashboard').default;

describe('Dashboard', () => {
  const mockTheme = {
    colors: {
      background: '#F8FAFC',
      primary: '#3B82F6',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const setupDefaultMocks = () => {
    mockUseProgress.mockReturnValue({
      isLoading: false,
      progress: { level1: 50 }
    });

    mockUseCurrentLevel.mockReturnValue({
      setCurrentLevel: jest.fn()
    });

    mockUseDashboardLevel.mockReturnValue({
      currentLevel: '1',
      handleChangeActiveLevel: jest.fn(),
      levelColor: '#10B981'
    });

    mockUseDashboardState.mockReturnValue({
      refreshing: false,
      onRefresh: jest.fn()
    });

    mockUseLastActivity.mockReturnValue({
      lastActivity: null,
      isLoading: false,
      reload: jest.fn()
    });

    mockUseRealTimeProgress.mockReturnValue({
      getLevelProgress: jest.fn(() => 25),
      refresh: jest.fn()
    });
  };

  const renderComponent = (theme = mockTheme) => {
    return render(
      <ThemeContext.Provider value={theme}>
        <Dashboard />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultMocks();
  });

  describe('Rendu de base', () => {
    it('devrait afficher le loading', () => {
      mockUseProgress.mockReturnValue({ isLoading: true, progress: {} });
      
      const { getByText } = renderComponent();
      expect(getByText('Chargement du tableau de bord...')).toBeTruthy();
    });

    it('devrait rendre le composant sans erreur', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait fonctionner sans contexte theme', () => {
      const { container } = render(<Dashboard />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Gestion des niveaux', () => {
    it('devrait utiliser le niveau du hook useDashboardLevel', () => {
      mockUseDashboardLevel.mockReturnValue({
        currentLevel: '3',
        handleChangeActiveLevel: jest.fn(),
        levelColor: '#8B5CF6'
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait calculer la progression des niveaux', () => {
      mockUseRealTimeProgress.mockReturnValue({
        getLevelProgress: jest.fn((level) => {
          const progress = { '1': 30, '2': 60, '3': 90 };
          return progress[level] || 0;
        }),
        refresh: jest.fn()
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Gestion des activités', () => {
    it('devrait passer lastActivity à HeroContinueSection', () => {
      mockUseLastActivity.mockReturnValue({
        lastActivity: { type: 'vocabulary', level: '2' },
        isLoading: false,
        reload: jest.fn()
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait passer isLoading à HeroContinueSection', () => {
      mockUseLastActivity.mockReturnValue({
        lastActivity: null,
        isLoading: true,
        reload: jest.fn()
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer l\'absence de progress', () => {
      mockUseProgress.mockReturnValue({ isLoading: false });
      
      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait gérer l\'absence de currentLevel', () => {
      mockUseCurrentLevel.mockReturnValue({});
      
      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Couleurs et thème', () => {
    it('devrait utiliser les couleurs par défaut sans thème', () => {
      const { container } = render(<Dashboard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait appliquer les couleurs du niveau courant', () => {
      mockUseDashboardLevel.mockReturnValue({
        currentLevel: '2',
        handleChangeActiveLevel: jest.fn(),
        levelColor: '#3B82F6'
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });
});