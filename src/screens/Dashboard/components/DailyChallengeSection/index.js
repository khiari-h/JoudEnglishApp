import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Section from '../../components/layout/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

const DailyChallengeSection = ({ 
  challenge, 
  onStartChallenge 
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Section
      title="Today's Challenge"
      actionText="Tomorrow's Challenge →"
      onActionPress={() => {}}
      style={styles.sectionContainer}
    >
      <Card
        title={challenge.title}
        subtitle={challenge.description}
        style={[
          styles.dailyChallengeCard,
          { borderLeftColor: challenge.color, borderLeftWidth: 4 },
        ]}
        headerIcon={challenge.icon}
        headerIconColor={challenge.color}
        footer={
          <Button
            title="Start Challenge"
            color={challenge.color}
            variant="filled"
            fullWidth
            style={styles.startChallengeButton}
            onPress={onStartChallenge}
          />
        }
        contentStyle={styles.challengeContent}
      >
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {challenge.progress}/{challenge.total}
          </Text>
          <ProgressBar 
            progress={(challenge.progress / challenge.total) * 100} 
            fillColor={challenge.color}
            height={8}
          />
        </View>
      </Card>
    </Section>
  );
};

export default DailyChallengeSection;