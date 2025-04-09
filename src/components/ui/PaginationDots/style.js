// components/ui/PaginationDots/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  dot: {
    borderRadius: 6,
  },
});

export default styles;