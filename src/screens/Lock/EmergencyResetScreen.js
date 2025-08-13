// src/screens/Lock/EmergencyResetScreen.js
import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Lock from '../../services/lockService';

const EmergencyResetScreen = ({ onDone }) => {
  const [confirm, setConfirm] = useState('');

  const onReset = useCallback(async () => {
    if (confirm !== 'ERASE') return;
    await Lock.emergencyReset();
    onDone?.();
  }, [confirm, onDone]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }} testID="emergency-reset-screen">
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Réinitialisation d'urgence</Text>
      <Text style={{ color: '#6B7280', textAlign: 'center', marginBottom: 12 }}>
        Cette action efface toutes les données locales (verrou, préférences, progression).
      </Text>
      <Text style={{ color: '#DC2626', marginBottom: 8 }}>Tape "ERASE" pour confirmer</Text>
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        placeholder="ERASE"
        autoCapitalize="characters"
        style={{ width: '80%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 8 }}
        testID="reset-confirm-input"
      />
      <TouchableOpacity testID="reset-confirm-button" onPress={onReset} style={{ backgroundColor: '#DC2626', padding: 12, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Effacer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyResetScreen;


