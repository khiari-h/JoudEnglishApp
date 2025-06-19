// src/screens/Dashboard/components/HeroContinueSection/style.js - VERSION COMPLÈTE SIMPLE
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  
  card: {
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  content: {
    padding: 20,
  },

  // =================== HEADER ===================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },

  // =================== CONTENU ===================
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },

  // =================== PROGRESSION ===================
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 40,
  },

  // =================== BOUTON ===================
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // =================== LOADING ===================
  loadingContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  loadingText: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: "500",
  },
});