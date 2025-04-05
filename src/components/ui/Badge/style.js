import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start', // Pour que le badge prenne juste la largeur nécessaire
  },
  
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
});

export default styles;