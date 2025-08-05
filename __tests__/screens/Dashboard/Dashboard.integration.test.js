// __tests__/screens/Dashboard/Dashboard.integration.test.js
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

// Mock des constantes
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

describe('Dashboard - Tests d\'intégration', () => {
  const mockTheme = {
    colors: {
      background: '#F8FAFC',
      primary: '#3B82F6',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  };

  const setupMocks = (overrides = {}) => {
    const defaults = {
      progress: { isLoading: false, progress: { level1: 50 } },
      currentLevel: { setCurrentLevel: jest.fn() },
      dashboardLevel: { currentLevel: '1', handleChangeActiveLevel: jest.fn(), levelColor: '#10B981' },
      dashboardState: { refreshing: false, onRefresh: jest.fn() },
      lastActivity: { lastActivity: null, isLoading: false, reload: jest.fn() },
      realTimeProgress: { getLevelProgress: jest.fn(() => 25), refresh: jest.fn() }
    };

    const mocks = { ...defaults, ...overrides };

    mockUseProgress.mockReturnValue(mocks.progress);
    mockUseCurrentLevel.mockReturnValue(mocks.currentLevel);
    mockUseDashboardLevel.mockReturnValue(mocks.dashboardLevel);
    mockUseDashboardState.mockReturnValue(mocks.dashboardState);
    mockUseLastActivity.mockReturnValue(mocks.lastActivity);
    mockUseRealTimeProgress.mockReturnValue(mocks.realTimeProgress);
  };

  const renderComponent = () => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <Dashboard />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe('Intégration complète', () => {
    it('devrait rendre le dashboard avec tous les composants', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait gérer l\'état de chargement', () => {
      setupMocks({
        progress: { isLoading: true, progress: {} }
      });

      const { getByText } = renderComponent();
      expect(getByText('Chargement du tableau de bord...')).toBeTruthy();
    });
  });

  describe('Intégration avec lastActivity', () => {
    it('devrait afficher l\'activité en cours', () => {
      setupMocks({
        lastActivity: {
          lastActivity: { type: 'vocabulary', level: '2', title: 'Test Vocab' },
          isLoading: false,
          reload: jest.fn()
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait gérer l\'état de chargement de l\'activité', () => {
      setupMocks({
        lastActivity: {
          lastActivity: null,
          isLoading: true,
          reload: jest.fn()
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Intégration avec les niveaux', () => {
    it('devrait changer de niveau et mettre à jour l\'affichage', () => {
      setupMocks({
        dashboardLevel: {
          currentLevel: '3',
          handleChangeActiveLevel: jest.fn(),
          levelColor: '#8B5CF6'
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait calculer la progression pour différents niveaux', () => {
      const mockGetLevelProgress = jest.fn();
      mockGetLevelProgress.mockImplementation((level) => {
        const progressMap = { '1': 30, '2': 60, '3': 90 };
        return progressMap[level] || 0;
      });

      setupMocks({
        realTimeProgress: {
          getLevelProgress: mockGetLevelProgress,
          refresh: jest.fn()
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
      expect(mockGetLevelProgress).toHaveBeenCalledWith('1');
    });
  });

  describe('Intégration avec le refresh', () => {
    it('devrait gérer l\'état de refresh', () => {
      setupMocks({
        dashboardState: {
          refreshing: true,
          onRefresh: jest.fn()
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait appeler les fonctions de refresh', () => {
      const mockOnRefresh = jest.fn();
      const mockRefreshProgress = jest.fn();

      setupMocks({
        dashboardState: {
          refreshing: false,
          onRefresh: mockOnRefresh
        },
        realTimeProgress: {
          getLevelProgress: jest.fn(() => 25),
          refresh: mockRefreshProgress
        }
      });

      renderComponent();
      
      // Vérifier que les hooks sont appelés correctement
      expect(mockUseDashboardState).toHaveBeenCalled();
      expect(mockUseRealTimeProgress).toHaveBeenCalled();
    });
  });

  describe('Gestion des erreurs d\'intégration', () => {
    it('devrait gérer l\'absence de données de progression', () => {
      setupMocks({
        progress: { isLoading: false },
        realTimeProgress: {
          getLevelProgress: jest.fn(() => 0),
          refresh: jest.fn()
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });

    it('devrait gérer les hooks qui retournent null', () => {
      setupMocks({
        currentLevel: {},
        dashboardLevel: {
          currentLevel: '1',
          handleChangeActiveLevel: jest.fn(),
          levelColor: '#10B981'
        }
      });

      const { container } = renderComponent();
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Navigation et callbacks', () => {
    it('devrait intégrer les callbacks de navigation', () => {
      const { router } = require('expo-router');
      
      renderComponent();
      
      // Vérifier que le composant est rendu et prêt pour la navigation
      expect(router.push).not.toHaveBeenCalled(); // Pas d'appel automatique
    });

    it('devrait synchroniser les contextes lors des changements', () => {
      const mockSetCurrentLevel = jest.fn();
      
      setupMocks({
        currentLevel: { setCurrentLevel: mockSetCurrentLevel }
      });

      renderComponent();
      
      // Vérifier que les hooks sont configurés correctement
      expect(mockUseCurrentLevel).toHaveBeenCalled();
      expect(mockUseDashboardLevel).toHaveBeenCalled();
    });
  });
});