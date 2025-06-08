// NavigationButtons/index.js - VERSION OPTIMISÉE (300 → 80 lignes)

import React, { useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🎯 NavigationButtons - Version Optimisée et Cohérente
 * - Une seule variante (finies les versions standard/compact)
 * - Pas d'indicateur redondant "1/2" 
 * - Styles cohérents avec HeroCard/RevealButton
 * - Glassmorphism dosé et élégant
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
  isLast = false, // Nouveau prop simple pour finish
}) => {
  const styles = createStyles(primaryColor);
  
  // Animations pour micro-interactions
  const [prevButtonScale] = useState(new Animated.Value(1));
  const [nextButtonScale] = useState(new Animated.Value(1));

  // Déterminer le label du bouton suivant
  const nextButtonLabel = isLast ? buttonLabels.finish : buttonLabels.next;

  // Animation de press pour bouton précédent
  const handlePrevPress = () => {
    if (disablePrevious) return;
    
    Animated.sequence([
      Animated.timing(prevButtonScale, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: true 
      }),
      Animated.timing(prevButtonScale, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onPrevious(), 50);
  };

  // Animation de press pour bouton suivant
  const handleNextPress = () => {
    if (disableNext) return;
    
    Animated.sequence([
      Animated.timing(nextButtonScale, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: true 
      }),
      Animated.timing(nextButtonScale, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onNext(), 50);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${primaryColor}04`, 'transparent', `${primaryColor}04`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.buttonsRow}>
          {/* 🔙 BOUTON PRÉCÉDENT */}
          {!disablePrevious && (
            <Animated.View style={{ transform: [{ scale: prevButtonScale }] }}>
              <TouchableOpacity
                style={[styles.previousButton, { backgroundColor: `${primaryColor}10` }]}
                onPress={handlePrevPress}
                disabled={disablePrevious}
                activeOpacity={0.8}
              >
                <Ionicons name="chevron-back" size={20} color={primaryColor} />
                <Text style={[styles.previousText, { color: primaryColor }]}>
                  {buttonLabels.previous}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ⏭️ BOUTON SUIVANT/TERMINER */}
          <Animated.View style={{ transform: [{ scale: nextButtonScale }] }}>
            <TouchableOpacity
              style={styles.nextButtonContainer}
              onPress={handleNextPress}
              disabled={disableNext}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={
                  isLast 
                    ? ['#10B981', '#059669'] // Vert pour terminer
                    : [primaryColor, `${primaryColor}E6`] // Couleur normale
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.nextButton}
              >
                <View style={styles.nextButtonInner}>
                  <Text style={styles.nextText}>
                    {nextButtonLabel}
                  </Text>
                  <Ionicons
                    name={isLast ? "checkmark-circle" : "chevron-forward"}
                    size={20}
                    color="white"
                    style={styles.nextIcon}
                  />
                  {isLast && <Text style={styles.sparkle}>✨</Text>}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* 🧹 SUPPRIMÉ : Indicateur de progression "1/2" redondant */}
      </LinearGradient>
    </View>
  );
};

export default NavigationButtons;