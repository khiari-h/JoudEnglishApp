// src/components/ui/RevealButton/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../Card";
import createStyles from "./style";

/**
 * 🔘 RevealButton - Composant générique pour révéler/cacher contenu
 * Usage : Vocabulary, Phrases, Grammar, Reading, etc.
 * 
 * @param {boolean} isRevealed - État actuel (révélé ou non)
 * @param {function} onToggle - Fonction appelée lors du toggle
 * @param {string} revealText - Texte du bouton reveal (ex: "Reveal Translation")
 * @param {string} hideText - Texte du bouton hide (ex: "Hide Translation")
 * @param {string} revealedContent - Contenu à afficher quand révélé
 * @param {string} levelColor - Couleur du niveau
 * @param {string} revealIcon - Icône pour révéler (défaut: "eye-outline")
 * @param {string} hideIcon - Icône pour cacher (défaut: "eye-off-outline")
 */
const RevealButton = ({
  isRevealed = false,
  onToggle,
  revealText = "Reveal Content",
  hideText = "Hide Content", 
  revealedContent = "",
  levelColor = "#5E60CE",
  revealIcon = "eye-outline",
  hideIcon = "eye-off-outline",
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
    
    setTimeout(() => onToggle(), 50);
  };

  return (
    <Card
      withShadow
      borderRadius={20}
      style={styles.card}
      contentStyle={styles.cardContent}
    >
      {isRevealed ? (
        // État : Contenu révélé
        <View style={styles.revealedContainer}>
          {/* Contenu révélé */}
          <View style={styles.contentWrapper}>
            <Text style={[styles.revealedText, { color: levelColor }]}>
              {revealedContent}
            </Text>
            <View style={[styles.contentDot, { backgroundColor: `${levelColor}30` }]} />
          </View>
          
          {/* Bouton Hide */}
          <TouchableOpacity
            style={[styles.hideButton, { borderColor: `${levelColor}40` }]}
            onPress={onToggle}
            activeOpacity={0.7}
          >
            <View style={[styles.hideButtonIcon, { backgroundColor: `${levelColor}15` }]}>
              <Ionicons name={hideIcon} size={16} color={levelColor} />
            </View>
            <Text style={[styles.hideButtonText, { color: levelColor }]}>
              {hideText}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // État : Bouton Reveal avec glassmorphism
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
                <Ionicons name={revealIcon} size={24} color="white" style={styles.revealIcon} />
                <Text style={styles.revealButtonText}>{revealText}</Text>
                <View style={styles.sparkle}>✨</View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Card>
  );
};

export default RevealButton;