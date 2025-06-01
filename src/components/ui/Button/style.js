// src/components/ui/Button/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden', // Important pour les effets ripple sur Android
  },
  fullWidth: {
    width: '100%',
  },
  // Styles de taille
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minHeight: 36,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minHeight: 52,
  },
  // Styles de texte
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  uppercase: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Container pour le contenu
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
  // Ombre pour les boutons avec élévation
  withElevation: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  // Style pour boutons à coins plus arrondis (pill style)
  rounded: {
    borderRadius: 50, // Grand rayon pour obtenir un effet "pill"
  },
});

export default styles;
