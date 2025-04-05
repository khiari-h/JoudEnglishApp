// src/components/ui/TabView/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1,
  },
  scrollableTabContainer: {
    flexDirection: 'row',
    minWidth: width,
  },
  fixedTabContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    // Styles appliqués à l'onglet actif
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  iconTabText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabText: {
    color: '#5E60CE',
    fontWeight: '600',
  },
  tabIcon: {
    marginRight: 8,
  },
  indicator: {
    position: 'absolute',
    height: 3,
    bottom: 0,
    backgroundColor: '#5E60CE',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  swipeableContentContainer: {
    flexDirection: 'row',
  },
  scene: {
    flex: 1,
  },
});

export default styles;