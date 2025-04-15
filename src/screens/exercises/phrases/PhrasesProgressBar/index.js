// src/screens/exercises/phrases/PhrasesProgressBar/index.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const PhrasesProgressBar = ({
  progress = 0,
  currentPhrase = 1,
  totalPhrases = 0,
  levelColor = "#5E60CE"
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress}%`, backgroundColor: levelColor }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {currentPhrase}/{totalPhrases}
      </Text>
    </View>
  );
};

export default PhrasesProgressBar;
