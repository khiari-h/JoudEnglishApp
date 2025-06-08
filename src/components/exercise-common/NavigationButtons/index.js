// src/components/exercise-common/NavigationButtons/index.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🏆 NavigationButtons - Design Niveau LDC (Paris Saint-Germain)
 * - Glassmorphism effects premium
 * - Animations fluides et micro-interactions
 * - États disabled élégants
 * - Typography moderne et cohérente
 * - Focus sur l'essentiel : navigation parfaite
 */
const NavigationButtons = ({
  onNext,
  onPrevious,
  onSkip,
  currentIndex,
  totalCount,
  disablePrevious = false,
  disableNext = false,
  showSkip = false, // Généralement false pour mode épuré
  primaryColor = "#5E60CE",
  buttonLabels = {
    previous: "Précédent",
    next: "Suivant",
    skip: "Passer",
    finish: "Terminer",
  },
  variant = "standard",
}) => {
  const styles = createStyles(primaryColor);
  
  // Animations pour les micro-interactions
  const [prevButtonScale] = useState(new Animated.Value(1));
  const [nextButtonScale] = useState(new Animated.Value(1));

  // Déterminer si on est sur le dernier exercice
  const isLastItem = currentIndex === totalCount - 1;
  const nextButtonLabel = isLastItem ? buttonLabels.finish : buttonLabels.next;

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

  // Rendu version standard (recommandée pour LDC)
  const renderStandard = () => (
    <View style={styles.container}>
      {/* 🎨 Background gradient subtil */}
      <LinearGradient
        colors={[`${primaryColor}02`, 'transparent', `${primaryColor}02`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.backgroundGradient}
      >
        <View style={styles.buttonsContainer}>
          {/* 🔙 BOUTON PRÉCÉDENT - Glassmorphism */}
          {!disablePrevious && (
            <Animated.View style={{ transform: [{ scale: prevButtonScale }] }}>
              <TouchableOpacity
                style={[
                  styles.previousButton,
                  disablePrevious && styles.disabledButton
                ]}
                onPress={handlePrevPress}
                disabled={disablePrevious}
                activeOpacity={0.8}
              >
                <View style={[styles.previousButtonInner, { backgroundColor: `${primaryColor}10` }]}>
                  <View style={[styles.previousIconContainer, { backgroundColor: `${primaryColor}15` }]}>
                    <Ionicons name="chevron-back" size={18} color={primaryColor} />
                  </View>
                  <Text style={[styles.previousButtonText, { color: primaryColor }]}>
                    {buttonLabels.previous}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ⏭️ BOUTON SUIVANT/TERMINER - Hero CTA */}
          <Animated.View style={{ transform: [{ scale: nextButtonScale }] }}>
            <TouchableOpacity
              style={[
                styles.nextButtonContainer,
                disableNext && styles.disabledButtonContainer
              ]}
              onPress={handleNextPress}
              disabled={disableNext}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={
                  isLastItem 
                    ? ['#10B981', '#059669', '#047857'] // Vert pour terminer
                    : [primaryColor, `${primaryColor}E6`, `${primaryColor}CC`] // Couleur normale
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.nextButton}
              >
                {/* Effet glassmorphism sur le bouton next */}
                <View style={styles.nextButtonInner}>
                  <Text style={styles.nextButtonText}>
                    {nextButtonLabel}
                  </Text>
                  <View style={styles.nextIconContainer}>
                    <Ionicons
                      name={isLastItem ? "checkmark-circle" : "chevron-forward"}
                      size={20}
                      color="white"
                    />
                  </View>
                  {isLastItem && (
                    <View style={styles.finishSparkle}>
                      <Text style={styles.sparkleText}>✨</Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* 📊 INDICATEUR DE PROGRESSION DISCRET */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, { backgroundColor: `${primaryColor}20` }]} />
          <Text style={[styles.progressText, { color: primaryColor }]}>
            {currentIndex + 1} / {totalCount}
          </Text>
          <View style={[styles.progressDot, { backgroundColor: `${primaryColor}20` }]} />
        </View>
      </LinearGradient>
    </View>
  );

  // Rendu version compacte - aussi au niveau LDC
  const renderCompact = () => (
    <View style={styles.compactContainer}>
      <LinearGradient
        colors={[`${primaryColor}04`, 'transparent']}
        style={styles.compactGradient}
      >
        <View style={styles.compactButtonsRow}>
          {/* Bouton précédent compact */}
          <Animated.View style={{ transform: [{ scale: prevButtonScale }] }}>
            <TouchableOpacity
              style={[
                styles.compactPreviousButton,
                { backgroundColor: `${primaryColor}12` },
                disablePrevious && styles.disabledCompactButton,
              ]}
              onPress={handlePrevPress}
              disabled={disablePrevious}
              activeOpacity={0.8}
            >
              <View style={[styles.compactButtonInner, { borderColor: `${primaryColor}20` }]}>
                <Ionicons name="chevron-back" size={22} color={primaryColor} />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Indicateur central stylé */}
          <View style={[styles.compactProgressContainer, { backgroundColor: `${primaryColor}08` }]}>
            <Text style={[styles.compactProgressText, { color: primaryColor }]}>
              {currentIndex + 1}/{totalCount}
            </Text>
          </View>

          {/* Bouton suivant compact */}
          <Animated.View style={{ transform: [{ scale: nextButtonScale }] }}>
            <TouchableOpacity
              style={styles.compactNextButtonContainer}
              onPress={handleNextPress}
              disabled={disableNext}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={
                  isLastItem 
                    ? ['#10B981', '#059669'] 
                    : [primaryColor, `${primaryColor}E6`]
                }
                style={styles.compactNextButton}
              >
                <View style={styles.compactNextInner}>
                  <Ionicons
                    name={isLastItem ? "checkmark-circle" : "chevron-forward"}
                    size={22}
                    color="white"
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );

  // Choisir le rendu selon la variante
  switch (variant) {
    case "compact":
      return renderCompact();
    case "standard":
    default:
      return renderStandard();
  }
};

export default NavigationButtons;