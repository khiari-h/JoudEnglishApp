// src/components/ui/ContentSection/style.js
import { StyleSheet } from "react-native";

/**
 * 📝 Styles génériques pour ContentSection
 * Adaptables selon le type de contenu
 */
const createStyles = (levelColor, backgroundColor) =>
  StyleSheet.create({
    // =================== CARD ===================
    card: {
      backgroundColor: backgroundColor || '#f1f5f9', // bleu très clair
      borderWidth: 1,
      borderColor: '#e0e7ef', // bleu-gris très pâle
      marginBottom: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2, // Android
    },
    cardContent: {
      padding: 18,
    },

    // =================== HEADER ===================
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: levelColor || '#2563eb', // bleu doux
      letterSpacing: 0.3,
    },
    decorativeLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#e0e7ef',
      marginLeft: 10,
    },

    // =================== CONTENU ===================
    contentText: {
      fontSize: 15,
      color: '#334155', // gris foncé
      lineHeight: 24,
      fontWeight: '500',
    },
    italicText: {
      fontStyle: 'italic',
      color: '#64748b', // gris-bleu doux
    },
  });

export default createStyles;