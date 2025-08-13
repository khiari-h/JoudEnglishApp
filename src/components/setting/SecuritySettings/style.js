import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F8FAFC', borderRadius: 12, gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  label: { fontSize: 16, color: '#111827' },
  button: { backgroundColor: '#3B82F6', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  secondaryButton: { backgroundColor: '#EEF2FF', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  secondaryText: { color: '#3B82F6', fontWeight: '600' },
  recoveryBox: { backgroundColor: 'white', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  recoveryLabel: { color: '#6B7280', marginBottom: 6 },
  recoveryCode: { fontSize: 18, letterSpacing: 1, fontWeight: '700', color: '#111827' },
  recoveryHint: { color: '#6B7280', marginTop: 6 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '88%', backgroundColor: 'white', borderRadius: 12, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  modalCancel: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#F3F4F6' },
  modalCancelText: { color: '#111827', fontWeight: '600' },
  modalSave: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#3B82F6' },
  modalSaveText: { color: 'white', fontWeight: '700' },
});


