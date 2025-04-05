// index.js
import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import styles from "./style";

const LanguageTipsCarousel = ({ tips }) => {
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  // Rendu des indicateurs
  const renderDotIndicators = () => (
    <View style={styles.dotsContainer}>
      {tips.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === activeTipIndex ? "#5E60CE" : "#D1D5DB" }
          ]}
        />
      ))}
    </View>
  );

  return (
    <Section title="Language Tips">
      <FlatList
        data={tips}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / 300);
          setActiveTipIndex(index);
        }}
        snapToInterval={300}
        renderItem={({ item }) => (
          <Card
            style={styles.tipCard}
            title={item.title}
            headerIcon={item.icon}
          >
            <Text style={styles.tipText}>{item.description}</Text>
          </Card>
        )}
      />
      {renderDotIndicators()}
    </Section>
  );
};

export default LanguageTipsCarousel;