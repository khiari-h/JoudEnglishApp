// src/hooks/useProgressGamification.js
import { useMemo, useRef, useEffect } from 'react';

/**
 * 🎮 Hook de gamification pour les progress bars
 * Transforme une progression simple en expérience engageante
 * 
 * @param {Object} params - Paramètres de progression
 * @param {number} params.progress - Pourcentage de progression (0-100)
 * @param {number} params.completed - Nombre d'éléments complétés
 * @param {number} params.total - Nombre total d'éléments
 * @param {string} params.type - Type d'exercice (vocabulary, grammar, etc.)
 * @returns {Object} Objet de gamification complet
 */
const useProgressGamification = ({ 
  progress = 0, 
  completed = 0, 
  total = 0, 
  type = "exercise" 
}) => {
  
  // Référence pour tracker les milestones déjà célébrés
  const celebratedMilestones = useRef(new Set());
  
  // =================== CALCULS DE BASE ===================
  
  const progressData = useMemo(() => {
    const validProgress = Math.min(Math.max(progress, 0), 100);
    const validCompleted = Math.min(Math.max(completed, 0), total);
    
    return {
      progress: validProgress,
      completed: validCompleted,
      total: Math.max(total, 1),
      percentage: validProgress
    };
  }, [progress, completed, total]);
  
  // =================== MILESTONES ET CÉLÉBRATIONS ===================
  
  const milestones = useMemo(() => {
    const thresholds = [25, 50, 75, 100];
    const currentMilestone = thresholds.find(threshold => 
      progressData.progress >= threshold
    );
    
    const nextMilestone = thresholds.find(threshold => 
      progressData.progress < threshold
    );
    
    return {
      current: currentMilestone || 0,
      next: nextMilestone || 100,
      shouldCelebrate: currentMilestone && 
                      !celebratedMilestones.current.has(currentMilestone)
    };
  }, [progressData.progress]);
  
  // =================== COULEURS DYNAMIQUES ===================
  
  const colors = useMemo(() => {
    const { progress } = progressData;
    
    // Palette de couleurs selon la progression
    if (progress < 25) {
      return {
        primary: "#EF4444",      // Rouge motivant
        secondary: "#FEE2E2",    // Rouge clair
        accent: "#DC2626"        // Rouge accent
      };
    } else if (progress < 50) {
      return {
        primary: "#F59E0B",      // Orange progression
        secondary: "#FEF3C7",    // Orange clair
        accent: "#D97706"        // Orange accent
      };
    } else if (progress < 75) {
      return {
        primary: "#3B82F6",      // Bleu avancement
        secondary: "#DBEAFE",    // Bleu clair
        accent: "#2563EB"        // Bleu accent
      };
    } else {
      return {
        primary: "#10B981",      // Vert succès
        secondary: "#D1FAE5",    // Vert clair
        accent: "#059669"        // Vert accent
      };
    }
  }, [progressData.progress]);
  
  // =================== MESSAGES MOTIVANTS ===================
  
  const messages = useMemo(() => {
    const { progress, completed, total } = progressData;
    const remaining = total - completed;
    
    if (progress === 0) {
      return {
        main: "Commençons cette aventure ! 🚀",
        subtitle: `${total} défis t'attendent !`
      };
    } else if (progress < 25) {
      return {
        main: "Excellent début ! 💪",
        subtitle: `Tu as déjà ${completed} réussites !`
      };
    } else if (progress < 50) {
      return {
        main: "Tu prends le rythme ! 🔥",
        subtitle: `Plus que ${remaining} à conquérir !`
      };
    } else if (progress < 75) {
      return {
        main: "Tu y es presque ! ⭐",
        subtitle: `Encore ${remaining} efforts !`
      };
    } else if (progress < 100) {
      return {
        main: "Presque au bout ! 🎯",
        subtitle: `Plus que ${remaining} et c'est fini !`
      };
    } else {
      return {
        main: "Fantastique ! Mission accomplie ! 🎉",
        subtitle: "Tu as tout réussi !"
      };
    }
  }, [progressData]);
  
  // =================== BADGES ET RÉCOMPENSES ===================
  
  const badges = useMemo(() => {
    const { progress, completed } = progressData;
    
    // Badges selon le type d'exercice
    const badgeConfig = {
      vocabulary: {
        10: "🌱 Débutant",
        25: "🔍 Explorateur", 
        50: "📚 Collectionneur",
        100: "👑 Maître des mots"
      },
      grammar: {
        10: "📝 Apprenti",
        25: "✏️ Étudiant",
        50: "🎓 Grammairien", 
        100: "🏆 Expert"
      },
      phrases: {
        10: "🗣️ Bavard",
        25: "💬 Orateur",
        50: "🎭 Comédien",
        100: "🌟 Star"
      },
      default: {
        10: "🌱 Débutant",
        25: "🔍 Explorateur",
        50: "📚 Expert",
        100: "👑 Maître"
      }
    };
    
    const config = badgeConfig[type] || badgeConfig.default;
    
    // Badge actuel
    let currentBadge = "🌱 Débutant";
    let nextBadge = "🔍 Explorateur";
    let nextBadgeProgress = 25;
    
    if (progress >= 100) {
      currentBadge = config[100];
      nextBadge = "🏆 Champion !";
      nextBadgeProgress = 100;
    } else if (progress >= 50) {
      currentBadge = config[50];
      nextBadge = config[100];
      nextBadgeProgress = 100;
    } else if (progress >= 25) {
      currentBadge = config[25];
      nextBadge = config[50];
      nextBadgeProgress = 50;
    } else if (progress >= 10) {
      currentBadge = config[10];
      nextBadge = config[25];
      nextBadgeProgress = 25;
    }
    
    return {
      current: currentBadge,
      next: nextBadge,
      nextProgress: nextBadgeProgress,
      progressToNext: nextBadgeProgress - progress
    };
  }, [progressData.progress, type]);
  
  // =================== EFFETS VISUELS ===================
  
  const visualEffects = useMemo(() => {
    const { progress } = progressData;
    
    return {
      // Glow effect selon la progression
      glowIntensity: Math.min(progress / 100, 0.8),
      
      // Pulse effect pour les milestones
      pulseActive: milestones.shouldCelebrate,
      
      // Gradient intensity
      gradientIntensity: Math.min(progress / 100, 1),
      
      // Shadow depth
      shadowDepth: Math.min(progress / 100 * 8, 8)
    };
  }, [progressData.progress, milestones.shouldCelebrate]);
  
  // =================== TYPES DE CÉLÉBRATION ===================
  
  const celebration = useMemo(() => {
    if (!milestones.shouldCelebrate) return null;
    
    const { current } = milestones;
    
    const celebrations = {
      25: {
        type: "particles",
        emoji: "✨",
        message: "Premier milestone !",
        color: "#F59E0B"
      },
      50: {
        type: "confetti",
        emoji: "🎉",
        message: "À mi-chemin !",
        color: "#3B82F6"
      },
      75: {
        type: "stars",
        emoji: "⭐",
        message: "Presque fini !",
        color: "#8B5CF6"
      },
      100: {
        type: "fireworks",
        emoji: "🎆",
        message: "Mission accomplie !",
        color: "#10B981"
      }
    };
    
    return celebrations[current] || null;
  }, [milestones]);
  
  // =================== MARQUER MILESTONE CÉLÉBRÉ ===================
  
  useEffect(() => {
    if (milestones.shouldCelebrate && milestones.current > 0) {
      celebratedMilestones.current.add(milestones.current);
    }
  }, [milestones.shouldCelebrate, milestones.current]);
  
  // =================== RETURN FINAL ===================
  
  return {
    // Données de base
    ...progressData,
    
    // Couleurs dynamiques
    colors,
    
    // Messages motivants
    messages,
    
    // Badges et récompenses
    badges,
    
    // Effets visuels
    visualEffects,
    
    // Célébration
    celebration,
    
    // Milestones
    milestones: {
      ...milestones,
      shouldCelebrate: !!celebration
    },
    
    // Utilitaires
    isComplete: progressData.progress >= 100,
    isNearComplete: progressData.progress >= 90,
    isStarting: progressData.progress < 10
  };
};

export default useProgressGamification;
