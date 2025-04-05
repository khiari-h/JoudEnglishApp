// src/components/exercise-common/Timer/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tailles de conteneur
  smallContainer: {
    padding: 8,
  },
  mediumContainer: {
    padding: 12,
  },
  largeContainer: {
    padding: 16,
  },
  // Styles pour le cercle de progression
  progressCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressCenter: {
    backgroundColor: 'white',
    borderRadius: 100,
    overflow: 'hidden',
  },
  // Styles pour le texte du timer
  timeText: {
    fontWeight: 'bold',
    position: 'absolute',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 24,
  },
  // Styles pour les contrôles
  controls: {
    flexDirection: 'row',
    marginTop: 12,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default styles;