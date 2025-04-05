import React, { useContext } from 'react';
import { View } from 'react-native';
import Section from '../../components/layout/Section';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

const LastActivitySection = ({ 
  lastActivity, 
  onPress 
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Section 
      title="Continue Learning" 
      style={styles.sectionContainer}
    >
      <Card
        title={lastActivity.title}
        subtitle={lastActivity.topic}
        onPress={onPress}
        style={styles.lastActivityCard}
        headerIcon={lastActivity.icon}
        headerIconColor={colors.primary}
        footer={
          <ProgressBar 
            progress={lastActivity.progress} 
            height={6} 
            fillColor={colors.primary} 
            showPercentage 
          />
        }
      />
    </Section>
  );
};

export default LastActivitySection;