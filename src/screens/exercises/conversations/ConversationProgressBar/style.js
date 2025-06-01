// src/screens/exercises/conversations/ConversationProgressBar/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  progressBar: {
    marginVertical: 0, // ProgressBar de base gère déjà les marges
  },
});

export default styles;
