// src/components/Dashboard/components/LevelProgressModal/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  levelsList: {
    marginBottom: 20,
  },
  levelCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeContainer: {
    marginLeft: 12,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    minWidth: 40,
    alignItems: 'center',
  },
  levelBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginVertical: 20,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 8,
  },
});

export default styles;