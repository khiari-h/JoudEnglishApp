// PhraseCard/index.js - VERSION LDC (Paris Saint-Germain)

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../../../components/ui/Card";
import createStyles from "./style";

/**
 * 🏆 PhraseCard - Design Niveau LDC (Paris Saint-Germain)
 * Suit exactement le pattern de VocabularyWordCard :
 * - Hero section avec glassmorphism
 * - Typography spectaculaire 
 * - Animations subtiles
 * - Cards séparées pour sections
 * Adapté pour phrases (plus longues que mots simples)
 */
const PhraseCard = ({
  phraseData,
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);
  const [buttonScale] = useState(new Animated.Value(1));

  // Validation des données
  if (!phraseData) {
    return (
      <Card withShadow borderRadius={15} style={styles.loadingCard}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Loading phrase...
          </Text>
        </View>
      </Card>
    );
  }

  // 🎯 MAPPING des données (même structure que avant)
  const phrase = phraseData.english;
  const translation = phraseData.translation;
  const example = phraseData.examples?.[0]?.english || "";
  const context = phraseData.context || "";

  // Animation du bouton reveal (même que VocabularyWordCard)
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
      {/* 🎯 HERO SECTION - La phrase principale comme une star */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[`${levelColor}12`, `${levelColor}08`, `${levelColor}04`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          {/* Cercles décoratifs en arrière-plan (même que VocabularyWordCard) */}
          <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: `${levelColor}08` }]} />
          <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: `${levelColor}06` }]} />
          
          {/* La phrase principale - STAR ABSOLUE */}
          <View style={styles.phraseContainer}>
            <Text style={[styles.phraseText, { color: levelColor }]}>
              {phrase}
            </Text>
            <View style={[styles.phraseUnderline, { backgroundColor: levelColor }]} />
          </View>
        </LinearGradient>
      </View>

      {/* 🎨 SECTION TRADUCTION - Design moderne (même pattern) */}
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
            
            {/* Bouton Hide - Design élégant (même que VocabularyWordCard) */}
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
          // État : Bouton Reveal - HERO CTA (même glassmorphism)
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
                {/* Effet glassmorphism (identique) */}
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

      {/* 💬 SECTION EXEMPLE - Card séparée (même pattern que VocabularyWordCard) */}
      {example && (
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
      )}

      {/* 📝 SECTION CONTEXTE - Card séparée (nouvelle section pour phrases) */}
      {context && (
        <Card
          withShadow
          borderRadius={18}
          style={styles.contextCard}
          contentStyle={styles.contextContent}
        >
          <View style={styles.contextHeader}>
            <View style={[styles.contextDot, { backgroundColor: levelColor }]} />
            <Text style={styles.contextTitle}>Context</Text>
            <View style={styles.contextLine} />
          </View>
          
          <Text style={styles.contextText}>
            {context}
          </Text>
        </Card>
      )}
    </View>
  );
};

export default PhraseCard;