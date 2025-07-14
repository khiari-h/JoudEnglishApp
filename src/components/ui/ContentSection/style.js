// src/components/ui/ContentSection/style.js
import { StyleSheet } from "react-native";

/**
 * 📝 Styles génériques pour ContentSection
 * Adaptables selon le type de contenu
 */
const createStyles = (backgroundColor) =>
  StyleSheet.create({
    // =================== CARD ===================
    card: {
      backgroundColor: backgroundColor || '#FAFBFC',
      borderWidth: 1,
      borderColor: '#F1F3F4',
      marginBottom: 16,
    },
    cardContent: {
      padding: 20,
    },

    // =================== HEADER ===================
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: '#374151',
      letterSpacing: 0.3,
    },
    decorativeLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
      marginLeft: 12,
    },

    // =================== CONTENU ===================
    contentText: {
      fontSize: 16,
      color: '#4B5563',
      lineHeight: 26,
      fontWeight: '500',
    },
    italicText: {
      fontStyle: 'italic',
      color: '#6B7280',
    },
  });

export default createStyles;