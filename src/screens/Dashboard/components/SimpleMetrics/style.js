// src/screens/Dashboard/components/SimpleMetrics/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 20, // +2px pour plus d'impact (était 18px)
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // =================== GRID LAYOUT ===================
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },

  // =================== METRIC CARD ===================
  metricCard: {
    flex: 1,
    minWidth: 100, // Largeur minimum
    maxWidth: '48%', // 2 cartes par ligne max
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    // Ombres subtiles
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
    alignItems: 'center',
  },

  // =================== TREND INDICATOR ===================
  trendIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // =================== METRIC CONTENT ===================
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 4, // Espace pour trend indicator
  },
  
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 14,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    metricsGrid: {
      gap: 8,
    },
    
    metricCard: {
      padding: 12,
      minWidth: 90,
    },
    
    metricValue: {
      fontSize: 18,
    },
    
    metricIcon: {
      fontSize: 20,
    },
  },
});