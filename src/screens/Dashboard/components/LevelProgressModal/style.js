import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  levelCard: {
    marginBottom: 12,
    borderRadius: 10,
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
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
  closeButton: {
    marginTop: 8,
    marginHorizontal: 16,
  },
});

export default styles;