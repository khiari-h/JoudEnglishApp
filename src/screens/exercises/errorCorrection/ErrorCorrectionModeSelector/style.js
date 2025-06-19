// ErrorCorrectionModeSelector/style.js - VERSION SIMPLIFIÉE

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles ultra-simplifiés pour ErrorCorrectionModeSelector  
 * Focus sur l'essentiel, suppression des redondances
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      padding: 16,
      marginBottom: 16,
    },
    
    // =================== TITRE ===================
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 16,
      textAlign: 'center',
    },

    // =================== MODE CARDS ===================
    modeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      ...Platform.select({
        ios: {
          shadowColor: '#64748b',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    disabledCard: {
      opacity: 0.6,
    },

    // =================== ICON & INFO ===================
    icon: {
      marginRight: 16,
    },
    modeInfo: {
      flex: 1,
    },
    modeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: 2,
    },
    modeDescription: {
      fontSize: 14,
      color: '#64748b',
    },
    disabledText: {
      color: '#94a3b8',
    },
  });

export default createStyles;