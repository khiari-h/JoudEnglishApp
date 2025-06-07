// src/screens/Dashboard/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // =================== LAYOUT PRINCIPAL ===================
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14, // ✅ RÉDUIT de 16→14 (plus compact)
    paddingBottom: 16,
  },
  bottomSpacer: {
    height: 60, // Pour la navigation en bas
  },

  // =================== ÉTATS DE CHARGEMENT ===================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },

  // =================== RESPONSIVE DESIGN ===================
  // Pour les petits écrans
  '@media (max-height: 680)': {
    scrollContent: {
      paddingTop: 12,
      paddingHorizontal: 14,
    },
  },
});

export default styles;