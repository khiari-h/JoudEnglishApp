import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '30%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    paddingVertical: 12,
  },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748b',
  },
});

export default styles;