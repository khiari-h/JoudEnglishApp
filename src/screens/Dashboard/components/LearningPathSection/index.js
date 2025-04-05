import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Section from '../../components/layout/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

const LearningPathSection = ({ 
  onSelectLevel, 
  onViewProgress 
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Section
      title="Learning Path"
      actionText="Select Level"
      onActionPress={onSelectLevel}
      style={styles.sectionContainer}
    >
      <Card
        style={[styles.learningPathCard, { backgroundColor: colors.primary }]}
        contentStyle={styles.learningPathContent}
      >
        <View style={styles.learningPathTextContainer}>
          <Text style={styles.learningPathTitle}>
            Start Your English Journey
          </Text>
          <Text style={styles.learningPathSubtitle}>
            Choose a level from beginner to advanced
          </Text>
        </View>
        <View style={styles.learningPathIconContainer}>
          <Text style={styles.learningPathIcon}>🌐</Text>
        </View>
      </Card>

      <Button
        title="View My Progress"
        variant="outlined"
        color="primary"
        fullWidth
        style={styles.viewProgressButton}
        onPress={onViewProgress}
      />
    </Section>
  );
};

export default LearningPathSection;