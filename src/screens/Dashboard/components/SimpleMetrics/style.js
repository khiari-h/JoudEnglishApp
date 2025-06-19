// src/screens/Dashboard/components/SimpleMetrics/style.js - STYLES COMPLETS

import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  // =================== LOADING STATE ===================
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  loadingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },

  // =================== EMPTY STATE ===================
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // =================== HEADER ===================
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  // =================== METRICS GRID ===================
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  // =================== METRIC CARD ===================
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    minHeight: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // =================== TREND INDICATOR ===================
  trendIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 20,
  },

  trendText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  // =================== METRIC CONTENT ===================
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },

  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default styles;