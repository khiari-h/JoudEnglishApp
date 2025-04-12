import React from "react";
import { View, Text } from "react-native";
import PaginationDots from "../../../../components/ui/PaginationDots";
import styles from "./style";

const VocabularyCardIndicators = ({
  totalWords = 0,
  currentIndex = 0,
  completedIndices = [],
  onSelectWord,
  levelColor = "#5E60CE",
}) => {
  return (
    <View>
      <PaginationDots
        total={totalWords}
        active={currentIndex}
        markedIndices={completedIndices}
        onDotPress={onSelectWord}
        activeColor={levelColor}
        markedColor={`${levelColor}50`}
        containerStyle={styles.container}
        dotSize={{ active: 12, inactive: 8 }}
        spacing={4}
      />
      <Text style={{ textAlign: "center", color: levelColor, marginTop: 4 }}>
        {currentIndex + 1} / {totalWords}
      </Text>
    </View>
  );
};

export default VocabularyCardIndicators;
