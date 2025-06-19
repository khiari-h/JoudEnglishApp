// src/screens/Dashboard/style.js - VERSION ULTRA-SIMPLE
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // =================== LAYOUT ===================
  container: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 32,
  },
  
  bottomSpacer: {
    height: 80,
  },

  // =================== LOADING ===================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});