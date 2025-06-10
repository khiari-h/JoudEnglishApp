// src/utils/tokens.js
export const tokens = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  // Typography
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 22,
    hero: 24,
    display: 28,
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  },

  // Border Radius
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  // Colors
  colors: {
    // Base
    white: '#FFFFFF',
    black: '#000000',

    // Text
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
    },

    // Background
    background: {
      primary: '#F8FAFC',
      secondary: '#F1F5F9',
    },

    // Surface
    surface: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
    },

    // Semantic
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    // Level colors
    level: {
      1: '#10B981',
      2: '#3B82F6', 
      3: '#8B5CF6',
      4: '#F59E0B',
      5: '#EF4444',
      6: '#EC4899',
      bonus: '#6366F1',
    },

    // Border
    border: {
      primary: '#E5E7EB',
      secondary: '#D1D5DB',
    },
  },

  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
  },

  // Line Height
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.5,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.3,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Helper functions
export const getLevelColor = (level) => {
  return tokens.colors.level[level] || tokens.colors.primary;
};

export const withOpacity = (color, opacity) => {
  if (!color || opacity === undefined) return color;
  
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return color;
};

export default tokens;