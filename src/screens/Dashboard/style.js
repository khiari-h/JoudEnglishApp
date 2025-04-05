import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../utils/constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionSpacing: {
    marginVertical: 10,
  },
  fullWidthContainer: {
    width: '100%',
  },
  tipCardContainer: {
    width: width - 40,
    paddingHorizontal: 4,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  bottomPadding: {
    paddingBottom: 20,
  },
});