import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles';

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
    <View style={styles.logoContainer}>
      <Animated.View
        style={[styles.logoBackground, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.logoText}>JOUD</Text>
      </Animated.View>
      <Text style={styles.logoTagline}>English Made Easy</Text>
    </View>
  );
};

export default JoudLogo;