import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from '../../components/ui/Modal';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import styles from './styles';

const LevelProgressModal = ({ 
  visible, 
  levels, 
  onClose, 
  onSelectLevel 
}) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="My Language Level Progress"
      position="bottom"
      scrollable
    >
      <ScrollView style={styles.levelsScrollView}>
        {levels.map((level) => (
          <Card
            key={level.id}
            title={level.title}
            style={styles.levelCard}
            onPress={() => {
              onClose();
              onSelectLevel(level.id.toUpperCase());
            }}
            contentStyle={styles.levelCardContent}
          >
            <View style={styles.levelProgressContainer}>
              <ProgressBar
                progress={level.progress}
                fillColor={level.color}
                height={6}
                showPercentage
              />
            </View>
            <Badge
              label={level.id.toUpperCase()}
              color="primary"
              style={[
                styles.levelBadge,
                { backgroundColor: level.color },
              ]}
            />
          </Card>
        ))}
      </ScrollView>

      <Button
        title="Close"
        variant="filled"
        color="primary"
        fullWidth
        onPress={onClose}
        style={styles.closeModalButton}
      />
    </Modal>
  );
};

export default LevelProgressModal;