import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import Section from '../../components/layout/Section';
import Card from '../../components/ui/Card';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './styles';

const LanguageTipsCarousel = ({ tips }) => {
  const { colors } = useContext(ThemeContext);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderDotIndicators = () => {
    return (
      <View style={styles.dotIndicatorContainer}>
        {tips.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeTipIndex ? colors.primary : "#D1D5DB",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Section 
      title="Language Tips" 
      style={styles.sectionContainer}
    >
      <FlatList
        data={tips}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (styles.tipCardContainer.width || 300)
          );
          setActiveTipIndex(index);
        }}
        snapToInterval={styles.tipCardContainer.width || 300}
        decelerationRate="fast"
        contentContainerStyle={styles.tipsContainer}
        renderItem={({ item }) => (
          <View style={styles.tipCardContainer}>
            <Card
              title={item.title}
              headerIcon={item.icon}
              headerIconColor={colors.primary}
              style={styles.tipCard}
            >
              <Text style={styles.tipDescription}>{item.description}</Text>
            </Card>
          </View>
        )}
      />

      {renderDotIndicators()}
    </Section>
  );
};

export default LanguageTipsCarousel;