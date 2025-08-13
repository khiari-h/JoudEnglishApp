// src/screens/Lock/ForgotPinScreen.js
import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Lock from '../../services/lockService';import PropTypes from 'prop-types';


const ForgotPinScreen = ({ onReset }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleBiometric = useCallback(async () => {
    const res = await Lock.unlockWithBiometrics();
    if (res.ok) {
      onReset?.();
    } else {
      setError('Biométrie indisponible ou refusée.');
    }
  }, [onReset]);

  const handleRecovery = useCallback(async () => {
    const ok = await Lock.verifyRecovery(code);
    if (ok) {
      onReset?.();
    } else {
      setError('Code de récupération invalide');
    }
  }, [code, onReset]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }} testID="forgot-pin-screen">
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>PIN oublié</Text>
      {!!error && <Text style={{ color: '#DC2626', marginBottom: 12 }}>{error}</Text>}
      <TouchableOpacity testID="biometric-button" onPress={handleBiometric} style={{ backgroundColor: '#10B981', padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Utiliser la biométrie</Text>
      </TouchableOpacity>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Code de récupération"
        autoCapitalize="characters"
        style={{ width: '80%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 8 }}
        testID="recovery-input"
      />
      <TouchableOpacity testID="recovery-submit" onPress={handleRecovery} style={{ backgroundColor: '#3B82F6', padding: 12, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};


ForgotPinScreen.propTypes = {
  onReset: PropTypes.func.isRequired,
};

export default ForgotPinScreen;


