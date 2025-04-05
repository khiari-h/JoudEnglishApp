// src/components/layout/Grid/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  itemWrapper: {
    // La largeur est calculée dynamiquement dans le composant
  },
});

export default styles;