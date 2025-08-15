// src/screens/Lock/LockScreen.js
import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLock } from '../../contexts/LockContext';
import ForgotPinScreen from './ForgotPinScreen';
import EmergencyResetScreen from './EmergencyResetScreen';
import * as Lock from '../../services/lockService';


const LockScreen = () => {
  const { unlockWithPin } = useLock();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState('lock'); // lock | forgot | reset | newpin
  const [newPin1, setNewPin1] = useState('');
  const [newPin2, setNewPin2] = useState('');

  const onSubmit = useCallback(async () => {
    const res = await unlockWithPin(pin);
    if (!res.ok) {
      setError(res.reason === 'lockout' ? 'Trop de tentatives. Réessaie plus tard.' : 'PIN incorrect');
    }
  }, [pin, unlockWithPin]);

  if (view === 'forgot') {
    return (
      <ForgotPinScreen onReset={() => setView('newpin')} />
    );
  }

  if (view === 'reset') {
    return (
      <EmergencyResetScreen onDone={() => setView('lock')} />
    );
  }

  if (view === 'newpin') {
    const onSaveNewPin = async () => {
      if (!newPin1 || newPin1 !== newPin2 || newPin1.length < 4) return;
      await Lock.enableLock();
      await Lock.setPin(newPin1);
      await unlockWithPin(newPin1);
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Nouveau PIN</Text>
        <TextInput
          value={newPin1}
          onChangeText={setNewPin1}
          placeholder="Nouveau PIN"
          secureTextEntry
          keyboardType="number-pad"
          style={{ width: '80%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 8 }}
          testID="newpin-input-1"
        />
        <TextInput
          value={newPin2}
          onChangeText={setNewPin2}
          placeholder="Confirmer le PIN"
          secureTextEntry
          keyboardType="number-pad"
          style={{ width: '80%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 12 }}
          testID="newpin-input-2"
        />
        <TouchableOpacity onPress={onSaveNewPin} style={{ backgroundColor: '#10B981', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 }} testID="newpin-save">
          <Text style={{ color: 'white', fontWeight: '700' }}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }} testID="lock-screen">
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Déverrouiller</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        placeholder="Code PIN"
        secureTextEntry
        keyboardType="number-pad"
        style={{ width: '80%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 8 }}
        testID="pin-input"
      />
      {!!error && <Text style={{ color: '#DC2626', marginBottom: 8 }}>{error}</Text>}
      <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, marginBottom: 12 }} testID="pin-submit">
        <Text style={{ color: 'white', fontWeight: '700' }}>Déverrouiller</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('forgot')} testID="forgot-pin-link" style={{ marginBottom: 8 }}>
        <Text style={{ color: '#3B82F6', fontWeight: '600' }}>PIN oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('reset')} testID="emergency-reset-link">
        <Text style={{ color: '#DC2626', fontWeight: '600' }}>Réinitialisation d'urgence</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LockScreen;


