// useExerciseBackground.js - Hook pour générer des backgrounds dynamiques

import { useMemo } from 'react';

/**
 * 🎨 useExerciseBackground - Hook pour générer des backgrounds dynamiques
 * ✨ Remplace le gris fade par des gradients colorés et attrayants
 * 🎯 Chaque type d'exercice a sa palette de couleurs
 */
const useExerciseBackground = (exerciseType, levelColor = "#5E60CE") => {
  
  const backgroundConfig = useMemo(() => {
    const baseColors = {
      // 🎨 VOCABULAIRE - Bleu/Violet dynamique
      vocabulary: {
        primary: levelColor,
        gradient: [
          `${levelColor}15`, // Très transparent
          `${levelColor}08`, // Transparent
          `${levelColor}03`, // Très transparent
          'transparent'
        ],
        accent: `${levelColor}20`
      },
      
      // 🎨 GRAMMAIRE - Vert/Émeraude professionnel
      grammar: {
        primary: levelColor,
        gradient: [
          '#10B98115', // Vert transparent
          '#05966908', // Vert plus foncé
          '#04785703', // Vert très foncé
          'transparent'
        ],
        accent: '#10B98120'
      },
      
      // 🎨 LECTURE - Orange/Ambre chaleureux
      reading: {
        primary: levelColor,
        gradient: [
          '#F59E0B15', // Orange transparent
          '#D9770610', // Orange plus foncé
          '#B4530908', // Orange très foncé
          'transparent'
        ],
        accent: '#F59E0B20'
      },
      
      // 🎨 PHRASES - Rose/Magenta créatif
      phrases: {
        primary: levelColor,
        gradient: [
          '#EC489915', // Rose transparent
          '#DB277710', // Rose plus foncé
          '#BE185D08', // Rose très foncé
          'transparent'
        ],
        accent: '#EC489920'
      },
      
      // 🎨 JEUX DE MOTS - Indigo/Violet ludique
      'word-games': {
        primary: levelColor,
        gradient: [
          '#6366F115', // Indigo transparent
          '#4F46E510', // Indigo plus foncé
          '#3730A308', // Indigo très foncé
          'transparent'
        ],
        accent: '#6366F120'
      },
      
      // 🎨 CONVERSATIONS - Cyan/Bleu social
      conversations: {
        primary: levelColor,
        gradient: [
          '#06B6D415', // Cyan transparent
          '#0891B210', // Cyan plus foncé
          '#0E749008', // Cyan très foncé
          'transparent'
        ],
        accent: '#06B6D420'
      },
      
      // 🎨 ASSESSMENT - Gris/Neutre professionnel
      assessment: {
        primary: levelColor,
        gradient: [
          '#6B728015', // Gris transparent
          '#4B556310', // Gris plus foncé
          '#37415108', // Gris très foncé
          'transparent'
        ],
        accent: '#6B728020'
      }
    };

    // Retourner la config par défaut si le type n'est pas reconnu
    return baseColors[exerciseType] || baseColors.vocabulary;
  }, [exerciseType, levelColor]);

  return {
    // 🎨 Couleurs de gradient pour le Container
    gradientColors: backgroundConfig.gradient,
    
    // 🎨 Couleur d'accent pour les éléments UI
    accentColor: backgroundConfig.accent,
    
    // 🎨 Couleur primaire (celle du niveau)
    primaryColor: backgroundConfig.primary,
    
    // 🎨 Style d'arrière-plan pour les composants
    backgroundStyle: {
      backgroundColor: 'transparent',
    }
  };
};

export default useExerciseBackground;
