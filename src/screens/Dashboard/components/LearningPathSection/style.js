// src/components/sections/LearningPathSection/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 120,
    position: 'relative',
    marginBottom: 16,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
  },
  emoji: {
    fontSize: 34,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  levelItem: {
    alignItems: 'center',
    marginBottom: 8,
    width: '16%', // Six niveaux par ligne
  },
  levelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  progressButton: {
    marginTop: 8,
  },
});

export default styles;