// src/components/settings/RevisionSettings/index.js - INTERFACE SETTINGS
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useRevisionSettings } from '../../../hooks/useRevisionSettings';
import { useCallback } from 'react';
import styles from './style';

const RevisionSettings = () => {
  const { 
    preferences, 
    isLoading, 
    enableRevisions, 
    disableRevisions, 
    updateFrequency 
  } = useRevisionSettings();

  const handleToggleRevisions = useCallback(async (enabled) => {
    if (enabled) {
      // Activation simple, garder la fréquence actuelle
      await enableRevisions(preferences.frequency, preferences.questionsCount);
    } else {
      // Désactivation simple
      await disableRevisions();
    }
  }, [enableRevisions, disableRevisions, preferences.frequency, preferences.questionsCount]);

  const handleFrequencyPress = useCallback((value) => () => updateFrequency(value), [updateFrequency]);

  const frequencyOptions = [
    { value: 25, label: "Tous les 25 mots (léger)" },
    { value: 50, label: "Tous les 50 mots (standard)" },
    { value: 100, label: "Tous les 100 mots (espacé)" }
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des paramètres...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        🔄 Révisions automatiques
      </Text>

      {/* Toggle principal */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Révisions automatiques</Text>
        <Switch
          value={!preferences.isDisabled}
          onValueChange={handleToggleRevisions}
        />
      </View>

      {/* Options de fréquence */}
      {!preferences.isDisabled && (
        <View style={styles.frequencySection}>
          <Text style={styles.frequencyTitle}>
            Fréquence :
          </Text>
          
          {frequencyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.frequencyOption,
                preferences.frequency === option.value 
                  ? styles.frequencyOptionSelected 
                  : styles.frequencyOptionDefault
              ]}
              onPress={handleFrequencyPress(option.value)}
            >
              <Text style={[
                styles.frequencyText,
                preferences.frequency === option.value 
                  ? styles.frequencyTextSelected 
                  : styles.frequencyTextDefault
              ]}>
                {option.label}
              </Text>
              {preferences.frequency === option.value && (
                <Text style={styles.checkIcon}>✓</Text>
              )}
            </TouchableOpacity>
          ))}

          <Text style={styles.nextRevisionInfo}>
            💡 Prochaine révision à {preferences.nextRevisionAt} mots appris
          </Text>
        </View>
      )}

      {/* Message si désactivé */}
      {preferences.isDisabled && (
        <View style={styles.disabledWarning}>
          <Text style={styles.warningTitle}>
            ⚠️ Révisions désactivées
          </Text>
          <Text style={styles.warningMessage}>
            Réactivez-les pour maintenir votre mémorisation !
          </Text>
        </View>
      )}
    </View>
  );
};

export default RevisionSettings;