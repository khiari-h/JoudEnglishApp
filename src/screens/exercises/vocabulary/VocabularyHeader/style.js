// VocabularyExercise/VocabularyHeader/styles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  levelBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  levelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  }
});

export default styles;