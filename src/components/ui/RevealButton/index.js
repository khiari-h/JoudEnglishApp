// src/components/ui/RevealButton/index.js - VERSION DYNAMIQUE
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from 'expo-haptics'; // ← SUPPRIMÉ pour compatibilité web
import Card from "../Card";
import createStyles from "./style";

/**
 * 🔘 RevealButton - Version Dynamique & Moderne
 * Micro-interactions, haptic feedback, animations fluides
 */
const RevealButton = ({
  isRevealed = false,
  onToggle,
  revealText = "Reveal Content",
  hideText = "Hide Content", 
  revealedContent = "",
  levelColor = "#5E60CE",
  contentColor = null,
  contentStyle = {}, // Support pour styles personnalisés
  revealIcon = "eye-outline",
  hideIcon = "eye-off-outline",
}) => {
  const styles = createStyles(levelColor);
  
  // États pour animations dynamiques
  const [buttonScale] = useState(new Animated.Value(1));
  const [contentOpacity] = useState(new Animated.Value(0));
  const [contentSlide] = useState(new Animated.Value(50));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [shimmerAnim] = useState(new Animated.Value(0));

  const finalContentColor = contentColor || levelColor;

  // Helper pour haptic feedback web-safe
  const triggerHaptic = async (type = 'medium') => {
    if (Platform.OS !== 'web') {
      try {
        const Haptics = require('expo-haptics');
        switch (type) {
          case 'light':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          case 'medium':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
          case 'heavy':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
        }
      } catch (error) {
        // Silently fail if haptics not available
      }
    }
  };

  // Animation de pulse continue pour le bouton reveal
  useEffect(() => {
    if (!isRevealed) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
      return () => pulseLoop.stop();
    }
  }, [isRevealed, pulseAnim]);

  // Animation shimmer pour effet premium
  useEffect(() => {
    const shimmerLoop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    shimmerLoop.start();
    return () => shimmerLoop.stop();
  }, [shimmerAnim]);

  // Animation du contenu révélé
  useEffect(() => {
    if (isRevealed) {
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(contentSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      contentOpacity.setValue(0);
      contentSlide.setValue(50);
    }
  }, [isRevealed, contentOpacity, contentSlide]);

  // Gestion du press avec haptic feedback web-safe
  const handleRevealPress = async () => {
    // Haptic feedback premium (web-safe)
    await triggerHaptic('medium');
    
    // Animation du bouton
    Animated.sequence([
      Animated.timing(buttonScale, { 
        toValue: 0.92, 
        duration: 100, 
        useNativeDriver: true 
      }),
      Animated.spring(buttonScale, { 
        toValue: 1,
        tension: 300,
        friction: 4,
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onToggle(), 80);
  };

  const handleHidePress = async () => {
    await triggerHaptic('light');
    onToggle();
  };

  return (
    <Card
      withShadow
      borderRadius={20}
      style={styles.card}
      contentStyle={styles.cardContent}
    >
      {isRevealed ? (
        // État : Contenu révélé avec animations
        <Animated.View 
          style={[
            styles.revealedContainer,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentSlide }],
            }
          ]}
        >
          {/* Contenu révélé avec effet typewriter subtle */}
          <View style={styles.contentWrapper}>
            <Text style={[
              styles.revealedText, 
              { color: finalContentColor },
              contentStyle // Styles personnalisés appliqués
            ]}>
              {revealedContent}
            </Text>
            
            {/* Dots animés */}
            <View style={styles.dotsContainer}>
              {[0, 1, 2].map((i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.contentDot,
                    { 
                      backgroundColor: `${levelColor}30`,
                      transform: [{
                        scale: pulseAnim.interpolate({
                          inputRange: [1, 1.05],
                          outputRange: [1, 1.2],
                          extrapolate: 'clamp',
                        })
                      }]
                    }
                  ]}
                />
              ))}
            </View>
          </View>
          
          {/* Bouton Hide avec micro-interaction */}
          <TouchableOpacity
            style={[styles.hideButton, { borderColor: `${levelColor}40` }]}
            onPress={handleHidePress}
            activeOpacity={0.7}
          >
            <Animated.View 
              style={[
                styles.hideButtonIcon, 
                { backgroundColor: `${levelColor}15` }
              ]}
            >
              <Ionicons name={hideIcon} size={16} color={levelColor} />
            </Animated.View>
            <Text style={[styles.hideButtonText, { color: levelColor }]}>
              {hideText}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        // État : Bouton Reveal premium avec animations
        <Animated.View 
          style={{ 
            transform: [
              { scale: Animated.multiply(buttonScale, pulseAnim) }
            ] 
          }}
        >
          <TouchableOpacity
            style={styles.revealButtonContainer}
            onPress={handleRevealPress}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[levelColor, `${levelColor}E6`, `${levelColor}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.revealButton}
            >
              {/* Effet shimmer animé */}
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  {
                    transform: [{
                      translateX: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 200],
                      })
                    }]
                  }
                ]}
              />
              
              {/* Contenu du bouton avec glassmorphism */}
              <View style={styles.glassEffect}>
                <Animated.View
                  style={{
                    transform: [{
                      rotate: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '10deg'],
                      })
                    }]
                  }}
                >
                  <Ionicons name={revealIcon} size={24} color="white" style={styles.revealIcon} />
                </Animated.View>
                <Text style={styles.revealButtonText}>{revealText}</Text>
                <Text style={styles.sparkle}>✨</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Card>
  );
};

export default RevealButton;