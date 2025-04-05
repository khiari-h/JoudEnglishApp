// hooks/useAnimation.js
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Hook personnalisé pour créer des animations échelonnées
 * @param {number} itemCount - Nombre d'éléments à animer
 * @param {Object} options - Options de configuration de l'animation
 * @returns {Array} Tableau de styles d'animation
 */
export const useStaggeredAnimation = (itemCount, options = {}) => {
  const {
    duration = 500,      // Durée de l'animation
    delay = 100,         // Délai entre chaque élément
    initialTranslateY = 50, // Translation verticale initiale
    initialOpacity = 0,  // Opacité initiale
    staggerType = 'parallel' // Type de stagger (parallel ou sequence)
  } = options;

  // Créer des valeurs animées pour chaque élément
  const animations = useRef(
    Array(itemCount).fill().map(() => ({
      opacity: new Animated.Value(initialOpacity),
      translateY: new Animated.Value(initialTranslateY)
    }))
  ).current;

  useEffect(() => {
    // Créer les animations pour chaque élément
    const itemAnimations = animations.map(({ opacity, translateY }) => 
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true
        })
      ])
    );

    // Choisir le type d'animation
    const animationSequence = staggerType === 'sequence'
      ? Animated.sequence(itemAnimations)
      : Animated.stagger(delay, itemAnimations);

    // Démarrer l'animation
    animationSequence.start();

    // Nettoyer si nécessaire
    return () => {
      animations.forEach(({ opacity, translateY }) => {
        opacity.stopAnimation();
        translateY.stopAnimation();
      });
    };
  }, []);

  // Convertir les animations en styles
  return animations.map(({ opacity, translateY }) => ({
    opacity,
    transform: [{ translateY }]
  }));
};