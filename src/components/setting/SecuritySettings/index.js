// src/components/setting/SecuritySettings/index.js
import { useCallback, useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, TextInput, Modal } from 'react-native';
import * as Lock from '../../../services/lockService';
import styles from './style';

const SecuritySettings = () => {
  const [enabled, setEnabled] = useState(false);
  const [bioEnabled, setBioEnabled] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');

  useEffect(() => {
    (async () => {
      const isOn = await Lock.isEnabled();
      const bio = await Lock.isBiometricsEnabled();
      setEnabled(isOn);
      setBioEnabled(bio);
    })();
  }, []);

  const openPinModal = useCallback(() => {
    setPin1('');
    setPin2('');
    setShowPinModal(true);
  }, []);

  const closePinModal = useCallback(() => setShowPinModal(false), []);

  const handleToggleEnabled = useCallback(async (value) => {
    if (value) {
      // require pin setup if not set yet
      setEnabled(true);
      openPinModal();
    } else {
      await Lock.disableLock();
      setEnabled(false);
    }
  }, [openPinModal]);

  const handleSavePin = useCallback(async () => {
    if (!pin1 || pin1 !== pin2 || pin1.length < 4) return;
    await Lock.enableLock();
    await Lock.setPin(pin1);
    setEnabled(true);
    setShowPinModal(false);
  }, [pin1, pin2]);

  const handleToggleBiometrics = useCallback(async (value) => {
    await Lock.setBiometricsEnabled(value);
    setBioEnabled(value);
  }, []);

  const handleShowOrGenerateRecovery = useCallback(async () => {
    // generate a new code each time for simplicity; real app might show existing if present
    const code = Lock.generateRecoveryCode();
    await Lock.setRecoveryCode(code);
    setRecoveryCode(code);
  }, []);

  const handleLockNow = useCallback(async () => {
    // minimal: enable if not, and rely on app-level lock screen implementation
    await Lock.enableLock();
    setEnabled(true);
  }, []);

  return (
    <View style={styles.container} testID="security-settings">
      <Text style={styles.sectionTitle}>🔒 Sécurité</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Activer le verrouillage</Text>
        <Switch
          testID="security-toggle"
          value={enabled}
          onValueChange={handleToggleEnabled}
        />
      </View>

      <TouchableOpacity testID="set-pin-button" style={styles.button} onPress={openPinModal}>
        <Text style={styles.buttonText}>{enabled ? 'Changer le PIN' : 'Définir un PIN'}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.label}>Biométrie</Text>
        <Switch
          testID="biometrics-toggle"
          value={bioEnabled}
          onValueChange={handleToggleBiometrics}
        />
      </View>

      <TouchableOpacity testID="recovery-generate-button" style={styles.secondaryButton} onPress={handleShowOrGenerateRecovery}>
        <Text style={styles.secondaryText}>Afficher / Générer code de récupération</Text>
      </TouchableOpacity>
      {recoveryCode ? (
        <View style={styles.recoveryBox}>
          <Text style={styles.recoveryLabel}>Code de récupération:</Text>
          <Text selectable testID="recovery-code" style={styles.recoveryCode}>{recoveryCode}</Text>
          <Text style={styles.recoveryHint}>Conserve ce code en lieu sûr. Il permet de réinitialiser le PIN.</Text>
        </View>
      ) : null}

      <TouchableOpacity testID="lock-now-button" style={styles.secondaryButton} onPress={handleLockNow}>
        <Text style={styles.secondaryText}>Verrouiller maintenant</Text>
      </TouchableOpacity>

      {/* PIN Modal */}
      <Modal visible={showPinModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Définir un code PIN</Text>
            <TextInput
              testID="pin-input-1"
              value={pin1}
              onChangeText={setPin1}
              placeholder="Code PIN (4+)"
              secureTextEntry
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              testID="pin-input-2"
              value={pin2}
              onChangeText={setPin2}
              placeholder="Confirmer le PIN"
              secureTextEntry
              keyboardType="number-pad"
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity testID="pin-cancel" style={styles.modalCancel} onPress={closePinModal}>
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="pin-save" style={styles.modalSave} onPress={handleSavePin}>
                <Text style={styles.modalSaveText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SecuritySettings;


