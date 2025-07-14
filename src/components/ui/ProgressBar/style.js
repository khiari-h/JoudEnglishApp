// src/components/ui/ProgressBar/style.js - Version Mobile-First Simple
import { StyleSheet } from 'react-native';

/**
 * 📊 ProgressBar - Styles optimisés pour mobile
 * - Lisibilité optimale sur mobile
 * - Animation fluide et subtile
 */
const createStyles = (height = 8, borderRadius = 4) =>
  StyleSheet.create({
    // =================== CONTAINER SIMPLE ===================
    container: {
      width: '100%',
      marginVertical: 4, // Réduit pour mobile
    },

    // =================== CONTENU AU-DESSUS ===================
    topContentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    valuesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    // =================== BARRE SIMPLE ===================
    progressBarContainer: {
      height,
      borderRadius,
      position: 'relative',
      overflow: 'hidden',
    },
    progressTrack: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    progressFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
    },

    // =================== POURCENTAGE EN LIGNE ===================
    inlinePercentage: {
      alignItems: 'flex-end',
      marginTop: 4,
    },

    // =================== TYPOGRAPHY SIMPLE ===================
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
    },
    value: {
      fontSize: 12,
      color: '#6B7280',
      fontWeight: '500',
      marginRight: 6,
    },
    percentage: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
  });

export default createStyles;