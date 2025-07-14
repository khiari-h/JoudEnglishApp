// src/screens/Settings/index.js
import { Text, ScrollView } from 'react-native';
import RevisionSettings from '../../components/setting/RevisionSettings';

const SettingsScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Paramètres
      </Text>
      <RevisionSettings />
      {/* D'autres paramètres pourront être ajoutés ici */}
    </ScrollView>
  );
};

export default SettingsScreen;
