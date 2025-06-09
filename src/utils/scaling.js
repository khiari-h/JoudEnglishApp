// src/components/utils/Scaling.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design iPhone 6/7/8
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

/**
 * Scale horizontal
 * @param {number} size 
 * @returns {number}
 */
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Scale vertical
 * @param {number} size 
 * @returns {number}
 */
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Scale modéré (facteur 0.5 par défaut)
 * @param {number} size 
 * @param {number} factor 
 * @returns {number}
 */
export const moderateScale = (size, factor = 0.5) => {
  const scaledSize = scale(size);
  return size + (scaledSize - size) * factor;
};

/**
 * Arrondi au pixel proche (anti-flou)
 * @param {number} size 
 * @returns {number}
 */
export const pixelRound = (size) => {
  const scaleFactor = PixelRatio.get();
  return Math.round(size * scaleFactor) / scaleFactor;
};

export default {
  scale,
  verticalScale,
  moderateScale,
  pixelRound,
};
