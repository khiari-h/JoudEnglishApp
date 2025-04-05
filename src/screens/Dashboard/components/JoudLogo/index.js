import React from "react";
import { View, Text, Animated } from "react-native";

const JoudLogo = () => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation, { iterations: 3 }).start();

    return () => {
      scaleAnim.stopAnimation();
    };
  }, []);

  return (
    <View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Text>JOUD</Text>
      </Animated.View>
      <Text>English Made Easy</Text>
    </View>
  );
};

export default JoudLogo;
