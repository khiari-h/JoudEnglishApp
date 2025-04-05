// src/components/ui/Input/styles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    color: '#1F2937',
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  label: {
    marginBottom: 6,
    color: '#4B5563',
  },
  requiredMark: {
    color: '#EF4444',
    marginLeft: 2,
  },
  leftIconContainer: {
    paddingRight: 8,
  },
  rightIconContainer: {
    paddingLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  successText: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  errorLabel: {
    color: '#EF4444',
  },
  successLabel: {
    color: '#10B981',
  },
  
  // Styles de taille
  smallContainer: {
    minHeight: 36,
  },
  smallInput: {
    fontSize: 14,
    paddingVertical: 8,
  },
  smallLabel: {
    fontSize: 12,
  },
  smallIcon: {
    marginTop: 0,
  },
  
  mediumContainer: {
    minHeight: 42,
  },
  mediumInput: {
    fontSize: 16,
    paddingVertical: 10,
  },
  mediumLabel: {
    fontSize: 14,
  },
  mediumIcon: {
    marginTop: 0,
  },
  
  largeContainer: {
    minHeight: 48,
  },
  largeInput: {
    fontSize: 16,
    paddingVertical: 12,
  },
  largeLabel: {
    fontSize: 16,
  },
  largeIcon: {
    marginTop: 0,
  },
  
  // Styles de variante
  outlinedContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  outlinedInput: {
    paddingHorizontal: 0,
  },
  outlinedFocused: {
    borderColor: '#5E60CE',
  },
  outlinedError: {
    borderColor: '#EF4444',
  },
  outlinedSuccess: {
    borderColor: '#10B981',
  },
  
  underlinedContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  underlinedInput: {
    paddingHorizontal: 0,
  },
  underlinedFocused: {
    borderBottomColor: '#5E60CE',
    borderBottomWidth: 2,
  },
  underlinedError: {
    borderBottomColor: '#EF4444',
    borderBottomWidth: 2,
  },
  underlinedSuccess: {
    borderBottomColor: '#10B981',
    borderBottomWidth: 2,
  },
  
  filledContainer: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filledInput: {
    paddingHorizontal: 0,
  },
  filledFocused: {
    backgroundColor: '#F9FAFB',
    borderColor: '#5E60CE',
  },
  filledError: {
    borderColor: '#EF4444',
  },
  filledSuccess: {
    borderColor: '#10B981',
  },
});

export default styles;