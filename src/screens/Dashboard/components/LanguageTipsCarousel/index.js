import React, { useState, useContext } from "react";
import { View, Text, FlatList, Animated } from "react-native";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import { ThemeContext } from "@/src/contexts/ThemeContext";

const LanguageTipsCarousel = ({ tips }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderDotIndicators = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {tips.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor:
                index === activeTipIndex ? colors.primary : "#D1D5DB",
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <Section title="Language Tips">
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
          const index = Math.round(event.nativeEvent.contentOffset.x / 300);
          setActiveTipIndex(index);
        }}
        snapToInterval={300}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View>
            <Card
              title={item.title}
              headerIcon={item.icon}
              headerIconColor={colors.primary}
            >
              <Text>{item.description}</Text>
            </Card>
          </View>
        )}
      />

      {renderDotIndicators()}
    </Section>
  );
};

export default LanguageTipsCarousel;
