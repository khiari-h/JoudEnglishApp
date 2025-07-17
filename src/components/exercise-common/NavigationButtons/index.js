// NavigationButtons/index.js - SIMPLE & EFFICACE 🎯

import { useRef, useCallback } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🎯 NavigationButtons - Coupe au gel sur le côté
 * - Simple mais léché
 * - Pas de délire glassmorphism
 * - Juste propre et moderne
 */
const NavigationButtons = ({
  onNext,
  onPrevious,
  disablePrevious = false,
  disableNext = false,
  primaryColor = "#5E60CE",
  buttonLabels = {
    previous: "Précédent",
    next: "Suivant",
    finish: "Terminer",
  },
  isLast = false,
}) => {
  const styles = createStyles(primaryColor);
  
  // Animations subtiles - pas de délire
  const prevScale = useRef(new Animated.Value(1)).current;
  const nextScale = useRef(new Animated.Value(1)).current;

  // Animation simple pour précédent
  const handlePrevPress = useCallback(() => {
    if (disablePrevious) return;
    
    Animated.sequence([
      Animated.spring(prevScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(prevScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onPrevious(), 60);
  }, [disablePrevious, prevScale, onPrevious]);

  // Animation simple pour suivant
  const handleNextPress = useCallback(() => {
    if (disableNext) return;
    
    Animated.sequence([
      Animated.spring(nextScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(nextScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onNext(), 60);
  }, [disableNext, nextScale, onNext]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        
        {/* 🔙 BOUTON PRÉCÉDENT - Ghost propre */}
        <PreviousButton 
          disablePrevious={disablePrevious} 
          prevScale={prevScale} 
          handlePrevPress={handlePrevPress} 
          buttonLabels={buttonLabels} 
          primaryColor={primaryColor} 
          styles={styles} 
        />

        {/* ⏭️ BOUTON SUIVANT - Gradient propre */}
        <NextButton 
          disableNext={disableNext} 
          nextScale={nextScale} 
          handleNextPress={handleNextPress} 
          isLast={isLast} 
          buttonLabels={buttonLabels} 
          primaryColor={primaryColor} 
          styles={styles} 
        />
      </View>
    </View>
  );
};

const PreviousButton = ({ disablePrevious, prevScale, handlePrevPress, buttonLabels, primaryColor, styles }) => (
  !disablePrevious && (
    <Animated.View style={{ transform: [{ scale: prevScale }] }}>
      <TouchableOpacity
        style={styles.previousButton}
        onPress={handlePrevPress}
        disabled={disablePrevious}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={18} color={primaryColor} />
        <Text style={[styles.previousText, { color: primaryColor }]}>
          {buttonLabels.previous}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
);

const NextButton = ({ disableNext, nextScale, handleNextPress, isLast, buttonLabels, primaryColor, styles }) => (
  <Animated.View style={{ transform: [{ scale: nextScale }] }}>
    <TouchableOpacity
      style={styles.nextButtonContainer}
      onPress={handleNextPress}
      disabled={disableNext}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={
          isLast 
            ? ['#10B981', '#059669']
            : [primaryColor, `${primaryColor}E6`]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.nextButton}
      >
        <Text style={styles.nextText}>
          {isLast ? buttonLabels.finish : buttonLabels.next}
        </Text>
        <Ionicons
          name={isLast ? "checkmark" : "chevron-forward"}
          size={18}
          color="white"
          style={styles.nextIcon}
        />
      </LinearGradient>
    </TouchableOpacity>
  </Animated.View>
);

export default NavigationButtons;