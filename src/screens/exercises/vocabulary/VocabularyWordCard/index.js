// VocabularyExercise/VocabularyWordCard/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../../../components/ui/Card";
import createStyles from "./style";

/**
 * 🏆 VocabularyWordCard - Design Niveau LDC (Paris Saint-Germain)
 * - Hero section pour le mot principal
 * - Glassmorphism effects
 * - Typography hiérarchisée
 * - Animations subtiles
 * - Breathing room généreux
 */
const VocabularyWordCard = ({
  word,
  translation,
  definition,
  example,
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);
  const [buttonScale] = useState(new Animated.Value(1));

  // Animation du bouton reveal
  const handleRevealPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: true 
      }),
      Animated.timing(buttonScale, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onToggleTranslation(), 50);
  };

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - Le mot principal comme une star */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[`${levelColor}12`, `${levelColor}08`, `${levelColor}04`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          {/* Cercles décoratifs en arrière-plan */}
          <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: `${levelColor}08` }]} />
          <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: `${levelColor}06` }]} />
          
          {/* Le mot principal - STAR ABSOLUE */}
          <View style={styles.wordContainer}>
            <Text style={[styles.wordText, { color: levelColor }]}>
              {word}
            </Text>
            <View style={[styles.wordUnderline, { backgroundColor: levelColor }]} />
          </View>
        </LinearGradient>
      </View>

      {/* 🎨 SECTION TRADUCTION - Design moderne */}
      <Card
        withShadow
        borderRadius={20}
        style={styles.translationCard}
        contentStyle={styles.translationContent}
      >
        {showTranslation ? (
          // État : Traduction visible
          <View style={styles.translationVisible}>
            {/* Traduction avec style */}
            <View style={styles.translationWrapper}>
              <Text style={[styles.translationText, { color: levelColor }]}>
                {translation}
              </Text>
              <View style={[styles.translationDot, { backgroundColor: `${levelColor}30` }]} />
            </View>
            
            {/* Bouton Hide - Design élégant */}
            <TouchableOpacity
              style={[styles.hideButton, { borderColor: `${levelColor}40` }]}
              onPress={onToggleTranslation}
              activeOpacity={0.7}
            >
              <View style={[styles.hideButtonIcon, { backgroundColor: `${levelColor}15` }]}>
                <Ionicons name="eye-off-outline" size={16} color={levelColor} />
              </View>
              <Text style={[styles.hideButtonText, { color: levelColor }]}>
                Hide Translation
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // État : Bouton Reveal - HERO CTA
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
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
                {/* Effet glassmorphism */}
                <View style={styles.glassEffect}>
                  <Ionicons name="eye-outline" size={24} color="white" style={styles.revealIcon} />
                  <Text style={styles.revealButtonText}>Reveal Translation</Text>
                  <View style={styles.sparkle}>✨</View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Card>

      {/* 💬 SECTION EXEMPLE - Card séparée avec style */}
      <Card
        withShadow
        borderRadius={18}
        style={styles.exampleCard}
        contentStyle={styles.exampleContent}
      >
        <View style={styles.exampleHeader}>
          <View style={[styles.exampleDot, { backgroundColor: levelColor }]} />
          <Text style={styles.exampleTitle}>Example</Text>
          <View style={styles.exampleLine} />
        </View>
        
        <Text style={styles.exampleText}>
          <Text style={styles.exampleItalic}>{example}</Text>
        </Text>
      </Card>
    </View>
  );
};

export default VocabularyWordCard;