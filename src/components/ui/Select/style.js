// src/components/ui/Select/styles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
  },
  requiredMark: {
    color: '#EF4444',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectText: {
    flex: 1,
    color: '#1F2937',
  },
  placeholder: {
    color: '#9CA3AF',
  },
  disabled: {
    opacity: 0.6,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  
  // Variantes
  outlinedContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  outlinedError: {
    borderColor: '#EF4444',
  },
  
  underlinedContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  underlinedError: {
    borderBottomColor: '#EF4444',
  },
  
  filledContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filledError: {
    backgroundColor: '#FEF2F2',
  },
  
  // Tailles
  smallContainer: {
    height: 36,
  },
  smallText: {
    fontSize: 14,
  },
  
  mediumContainer: {
    height: 42,
  },
  mediumText: {
    fontSize: 16,
  },
  
  largeContainer: {
    height: 48,
  },
  largeText: {
    fontSize: 16,
  },
  
  // Dropdown
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
  },
  optionsList: {
    paddingVertical: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedOptionText: {
    color: '#5E60CE',
    fontWeight: '500',
  },
  noOptionsText: {
    padding: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
  clearButton: {
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearButtonText: {
    color: '#EF4444',
    fontWeight: '500',
  },
});

export default styles;