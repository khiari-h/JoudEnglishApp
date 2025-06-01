// src/components/exercise-common/InstructionBox/styles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  standardContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  compactContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  highlightedContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  instructions: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  examplesContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  exampleItem: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#1F2937',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tipsContainer: {
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});

export default styles;
