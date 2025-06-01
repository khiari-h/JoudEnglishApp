// src/components/screens/exercises/reading/ReadingTextSelector/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "white",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingRight: 20,
  },
  textButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedTextButton: {
    borderWidth: 2,
  },
  textButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
});

export default styles;
