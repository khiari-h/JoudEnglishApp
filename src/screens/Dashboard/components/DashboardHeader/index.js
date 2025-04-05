import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/layout/Header';
import JoudLogo from './JoudLogo';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

const DashboardHeader = ({ name, streak }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Header
      title=""
      showBackButton={false}
      backgroundColor={colors.primary}
      rightComponent={
        <View style={styles.headerTop}>
          <JoudLogo />
        </View>
      }
    >
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back, {name}!</Text>
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={24} color="#FFB830" />
          <Text style={styles.streakText}>{streak} day streak!</Text>
        </View>
      </View>
    </Header>
  );
};

export default DashboardHeader;