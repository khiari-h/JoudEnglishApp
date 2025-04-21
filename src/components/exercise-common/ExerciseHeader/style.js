// src/components/exercise-common/ExerciseHeader/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#f1f2f6',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;