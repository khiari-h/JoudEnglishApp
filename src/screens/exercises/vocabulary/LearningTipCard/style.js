// VocabularyExercise/LearningTipCard/styles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1F2937",
  },
  text: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
});

export default styles;