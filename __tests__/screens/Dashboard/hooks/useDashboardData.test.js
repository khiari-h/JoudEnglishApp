// __tests__/screens/Dashboard/hooks/useDashboardData.test.js
import { renderHook } from '@testing-library/react-native';
import { useDashboardData } from '../../../../src/screens/Dashboard/hooks/useDashboardData';
import { LANGUAGE_LEVELS } from '../../../../src/utils/constants';

// Mock des constantes
jest.mock('../../../../src/utils/constants', () => ({
  LANGUAGE_LEVELS: {
    '1': { title: 'Débutant', color: '#10B981', icon: '🌱' },
    '2': { title: 'Élémentaire', color: '#3B82F6', icon: '📚' },
    '3': { title: 'Intermédiaire', color: '#8B5CF6', icon: '🎯' },
    '4': { title: 'Intermédiaire+', color: '#F59E0B', icon: '🚀' },
    '5': { title: 'Avancé', color: '#EF4444', icon: '⭐' },
    '6': { title: 'Expert', color: '#EC4899', icon: '👑' },
    'bonus': { title: 'Bonus', color: '#6366F1', icon: '🎁' }
  }
}));

describe('useDashboardData', () => {
  const mockProgressContext = {
    progress: { level1: 50, level2: 30 },
    calculateGlobalProgress: jest.fn(() => 65),
    calculateLevelProgress: jest.fn((level) => {
      const progressMap = { '1': 50, '2': 30, '3': 0 };
      return progressMap[level] || 0;
    })
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait retourner les données par défaut quand progressContext est null', () => {
    const { result } = renderHook(() => 
      useDashboardData(null, '1', null, 0)
    );

    expect(result.current.progress).toEqual({});
    expect(result.current.globalProgress).toBe(0);
    expect(result.current.levelProgress).toBe(0);
  });

  it('devrait calculer correctement les données avec un contexte valide', () => {
    const { result } = renderHook(() => 
      useDashboardData(mockProgressContext, '1', 'vocabulary', 5)
    );

    expect(result.current.progress).toEqual(mockProgressContext.progress);
    expect(result.current.globalProgress).toBe(65);
    expect(result.current.levelProgress).toBe(50);
    expect(result.current.lastActivity).toBe('vocabulary');
    expect(result.current.currentStreak).toBe(5);
  });

  it('devrait mémoriser la liste de tous les niveaux', () => {
    const { result, rerender } = renderHook(
      ({ currentLevel }) => useDashboardData(mockProgressContext, currentLevel, null, 0),
      { initialProps: { currentLevel: '1' } }
    );

    const initialLevels = result.current.allLevels;
    expect(initialLevels).toHaveLength(7);
    expect(initialLevels[0]).toEqual({
      id: '1',
      color: '#10B981',
      isActive: true
    });

    // Rerender avec le même niveau - devrait retourner la même référence
    rerender({ currentLevel: '1' });
    expect(result.current.allLevels).toBe(initialLevels);

    // Rerender avec un niveau différent - devrait recalculer
    rerender({ currentLevel: '2' });
    expect(result.current.allLevels).not.toBe(initialLevels);
    expect(result.current.allLevels[1].isActive).toBe(true);
  });

  it('devrait mémoriser la liste des niveaux d\'apprentissage avec progression', () => {
    const { result } = renderHook(() => 
      useDashboardData(mockProgressContext, '2', null, 0)
    );

    const learningLevels = result.current.getAllLearningLevels;
    expect(learningLevels).toHaveLength(7);
    
    const level1 = learningLevels.find(l => l.id === '1');
    expect(level1).toEqual({
      id: '1',
      title: 'Débutant',
      color: '#10B981',
      progress: 50,
      isActive: false
    });

    const level2 = learningLevels.find(l => l.id === '2');
    expect(level2).toEqual({
      id: '2',
      title: 'Élémentaire',
      color: '#3B82F6',
      progress: 30,
      isActive: true
    });
  });

  it('devrait appeler calculateGlobalProgress une seule fois', () => {
    renderHook(() => 
      useDashboardData(mockProgressContext, '1', null, 0)
    );

    expect(mockProgressContext.calculateGlobalProgress).toHaveBeenCalledTimes(1);
  });

  it('devrait appeler calculateLevelProgress pour le niveau courant', () => {
    renderHook(() => 
      useDashboardData(mockProgressContext, '3', null, 0)
    );

    expect(mockProgressContext.calculateLevelProgress).toHaveBeenCalledWith('3');
  });

  it('devrait recalculer quand le niveau courant change', () => {
    const { rerender } = renderHook(
      ({ currentLevel }) => useDashboardData(mockProgressContext, currentLevel, null, 0),
      { initialProps: { currentLevel: '1' } }
    );

    expect(mockProgressContext.calculateLevelProgress).toHaveBeenCalledWith('1');

    rerender({ currentLevel: '2' });
    expect(mockProgressContext.calculateLevelProgress).toHaveBeenCalledWith('2');
  });

  it('devrait gérer les fonctions manquantes dans progressContext', () => {
    const incompleteContext = {
      progress: { level1: 25 }
      // calculateGlobalProgress et calculateLevelProgress manquantes
    };

    const { result } = renderHook(() => 
      useDashboardData(incompleteContext, '1', null, 0)
    );

    expect(result.current.globalProgress).toBe(0);
    expect(result.current.levelProgress).toBe(0);
    expect(result.current.progress).toEqual({ level1: 25 });
  });
});