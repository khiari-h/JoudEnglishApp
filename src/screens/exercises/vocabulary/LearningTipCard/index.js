import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

/**
 * Carte de conseils d'apprentissage améliorée avec carousel et possibilité de masquer/afficher
 * Animation subtile sur le texte uniquement, pas sur toute la carte
 * 
 * @param {string} level - Niveau de langue actuel (A1, A2, B1, B2, C1, C2)
 * @param {string} levelColor - Couleur associée au niveau
 */
const LearningTipCard = ({ level, levelColor = "#5E60CE" }) => {
  // État pour suivre si les conseils sont visibles
  const [tipsVisible, setTipsVisible] = useState(true);
  // Index du conseil actuel dans le carousel
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  // Animation pour le texte uniquement
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Clé pour stocker la préférence de visibilité
  const TIPS_VISIBLE_KEY = `vocabulary_tips_visible_${level}`;

  // Liste de conseils utiles pour l'apprentissage du vocabulaire
  const VOCABULARY_TIPS = [
    "Utilise ce mot dans une phrase pour mieux le retenir !",
    "Associe ce mot à une image mentale pour renforcer ta mémoire.",
    "Crée des associations avec des mots que tu connais déjà dans ta langue maternelle.",
    "Cherche les mots de la même famille pour élargir ton vocabulaire.",
    "Répète ce mot à haute voix pour améliorer ta prononciation.",
    "Révise régulièrement les mots appris pour ne pas les oublier.",
    "Groupe les mots par thème pour faciliter la mémorisation.",
    `Les mots de niveau ${level} sont essentiels pour ta progression !`,
    "Note ce mot dans ton carnet de vocabulaire personnel.",
    "Écoute comment ce mot est utilisé dans des conversations authentiques."
  ];

  // Charger la préférence de visibilité au démarrage
  useEffect(() => {
    const loadTipsVisibility = async () => {
      try {
        const savedVisibility = await AsyncStorage.getItem(TIPS_VISIBLE_KEY);
        if (savedVisibility !== null) {
          setTipsVisible(JSON.parse(savedVisibility));
        }
      } catch (error) {

      }
    };

    loadTipsVisibility();
  }, [TIPS_VISIBLE_KEY]);

  // Sauvegarder la préférence de visibilité
  const saveTipsVisibility = async (isVisible) => {
    try {
      await AsyncStorage.setItem(TIPS_VISIBLE_KEY, JSON.stringify(isVisible));
    } catch (error) {

    }
  };

  // Afficher/masquer les conseils
  const toggleTipsVisibility = () => {
    Animated.timing(fadeAnim, {
      toValue: tipsVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setTipsVisible(!tipsVisible);
      saveTipsVisibility(!tipsVisible);
    });
  };

  // Passer au conseil suivant avec animation subtile
  const nextTip = () => {
    // Animation sur le texte uniquement
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: -15,  // Mouvement léger vers la gauche
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % VOCABULARY_TIPS.length);
      slideAnim.setValue(15);  // Prépare le texte à entrer depuis la droite

      // Animation d'entrée du nouveau texte
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,  // Revient à sa position normale
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    });
  };

  // Passer au conseil précédent avec animation subtile
  const prevTip = () => {
    // Animation sur le texte uniquement
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 15,  // Mouvement léger vers la droite
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      setCurrentTipIndex((prevIndex) => 
        prevIndex === 0 ? VOCABULARY_TIPS.length - 1 : prevIndex - 1
      );
      slideAnim.setValue(-15);  // Prépare le texte à entrer depuis la gauche

      // Animation d'entrée du nouveau texte
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,  // Revient à sa position normale
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    });
  };

  // Si les conseils sont masqués, afficher uniquement le bouton pour les afficher
  if (!tipsVisible) {
    return (
      <TouchableOpacity 
        style={styles.showTipsButton} 
        onPress={toggleTipsVisibility}
      >
        <Ionicons name="bulb-outline" size={20} color={levelColor} />
        <Text style={[styles.showTipsText, { color: levelColor }]}>Afficher les conseils</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>💡</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Conseil d'apprentissage</Text>

          {/* Animation uniquement sur le texte du conseil */}
          <Animated.Text 
            style={[
              styles.text,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            {VOCABULARY_TIPS[currentTipIndex]}
          </Animated.Text>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={prevTip}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons name="chevron-back" size={16} color={levelColor} />
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          {currentTipIndex + 1}/{VOCABULARY_TIPS.length}
        </Text>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={nextTip}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons name="chevron-forward" size={16} color={levelColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={toggleTipsVisibility}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons name="eye-off-outline" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};

export default LearningTipCard;
