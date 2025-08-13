// src/screens/Settings/index.js
import { Text, ScrollView, View } from 'react-native';
import RevisionSettings from '../../components/setting/RevisionSettings';
import SecuritySettings from '../../components/setting/SecuritySettings';

const SettingsScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Paramètres
      </Text>
      <View style={{ gap: 16 }}>
        <RevisionSettings />
        <SecuritySettings />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
