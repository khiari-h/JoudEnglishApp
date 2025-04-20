// src/components/exercise-common/WordCard/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Carte présentant un mot et sa traduction, avec possibilité de retourner la carte
 * pour voir le contenu caché (type flashcard)
 */
const WordCard = ({
  word,
  translation,
  phonetic = "",
  context = "",
  color = "#5E60CE",
  showTranslationInitially = false,
  showContextInitially = false,
  audioUrl = null,
  onPressAudio,
}) => {
  // États
  const [showTranslation, setShowTranslation] = useState(
    showTranslationInitially
  );
  const [showContext, setShowContext] = useState(showContextInitially);

  // Animations
  const flipAnimation = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    // Animation d'entrée
    Animated.spring(translateY, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fonction pour retourner la carte
  const flipCard = () => {
    // Valeur cible de l'animation (0 = face, 1 = dos)
    const toValue = showTranslation ? 0 : 1;

    // Animation de retournement
    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    // Mise à jour de l'état après un délai (pour que l'animation ait le temps de cacher la face)
    setTimeout(() => {
      setShowTranslation(!showTranslation);
    }, 100);
  };

  // Interpolation pour la rotation de la carte
  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
      { translateY },
    ],
    opacity: flipAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [1, 0],
    }),
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
        }),
      },
      { translateY },
    ],
    opacity: flipAnimation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      {/* Face de la carte (mot) */}
      <Animated.View
        style={[styles.card, styles.frontCard, frontAnimatedStyle]}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.word}>{word}</Text>
          {phonetic ? <Text style={styles.phonetic}>{phonetic}</Text> : null}

          {/* Bouton audio si disponible */}
          {audioUrl && (
            <TouchableOpacity
              style={[styles.audioButton, { backgroundColor: `${color}20` }]}
              onPress={onPressAudio}
            >
              <Ionicons name="volume-medium" size={24} color={color} />
            </TouchableOpacity>
          )}
        </View>

        {/* Bouton pour voir le contexte */}
        {context && !showContext && (
          <TouchableOpacity
            style={styles.contextButton}
            onPress={() => setShowContext(true)}
          >
            <Text style={[styles.contextButtonText, { color }]}>
              Voir en contexte
            </Text>
          </TouchableOpacity>
        )}

        {/* Contexte si visible */}
        {context && showContext && (
          <View style={styles.contextContainer}>
            <Text style={styles.contextTitle}>Contexte:</Text>
            <Text style={styles.contextText}>{context}</Text>
          </View>
        )}

        {/* Bouton pour retourner la carte */}
        <TouchableOpacity
          style={[styles.flipButton, { backgroundColor: color }]}
          onPress={flipCard}
        >
          <Text style={styles.flipButtonText}>Voir la traduction</Text>
          <Ionicons name="sync" size={16} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Dos de la carte (traduction) */}
      <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
        <Text style={styles.translationTitle}>Traduction:</Text>
        <Text style={styles.translation}>{translation}</Text>

        {/* Bouton pour retourner la carte */}
        <TouchableOpacity
          style={[styles.flipButton, { backgroundColor: color }]}
          onPress={flipCard}
        >
          <Text style={styles.flipButtonText}>Voir le mot</Text>
          <Ionicons name="sync" size={16} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WordCard;
