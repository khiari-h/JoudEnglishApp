// src/components/exercise-common/Timer/index.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

/**
 * Composant de chronomètre pour les exercices chronométrés
 */
const Timer = ({
  initialTime = 60, // Temps en secondes
  onTimeUp = () => {},
  onPause = () => {},
  onResume = () => {},
  onReset = () => {},
  autoStart = true,
  showControls = false,
  warnThreshold = 10, // Seuil d'avertissement en secondes
  primaryColor = '#5E60CE',
  warningColor = '#F59E0B',
  dangerColor = '#EF4444',
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'countdown', // 'countdown', 'stopwatch'
}) => {
  // États
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Refs
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);
  
  // Animation pour le cercle de progression
  const animatedValue = useRef(new Animated.Value(1)).current;
  
  // Démarrer le chronomètre
  const startTimer = () => {
    if (variant === 'countdown') {
      // Mode compte à rebours
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Mode chronomètre
      startTimeRef.current = Date.now() - pausedTimeRef.current;
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    }
    
    setIsRunning(true);
  };
  
  // Mettre en pause le chronomètre
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    
    if (variant === 'stopwatch') {
      pausedTimeRef.current = Date.now() - startTimeRef.current;
    }
    
    onPause();
  };
  
  // Reprendre le chronomètre
  const resumeTimer = () => {
    startTimer();
    onResume();
  };
  
  // Réinitialiser le chronomètre
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    
    if (variant === 'countdown') {
      setTimeLeft(initialTime);
      
      // Réinitialiser l'animation
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setElapsedTime(0);
      pausedTimeRef.current = 0;
    }
    
    onReset();
  };
  
  // Formater le temps en MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Formater le temps en centièmes de seconde (pour le chronomètre)
  const formatTimeWithMs = (ms) => {
    const totalSeconds = ms / 1000;
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const millisecs = Math.floor((totalSeconds * 100) % 100);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(2, '0')}`;
  };
  
  // Déterminer la couleur du timer en fonction du temps restant
  const getTimerColor = () => {
    if (variant === 'countdown') {
      if (timeLeft <= warnThreshold / 2) return dangerColor;
      if (timeLeft <= warnThreshold) return warningColor;
      return primaryColor;
    }
    return primaryColor;
  };
  
  // Déterminer la taille des composants en fonction de la propriété size
  const getTimerSize = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          text: styles.smallText,
          circle: 50,
          iconSize: 16,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          text: styles.largeText,
          circle: 100,
          iconSize: 24,
        };
      case 'medium':
      default:
        return {
          container: styles.mediumContainer,
          text: styles.mediumText,
          circle: 70,
          iconSize: 20,
        };
    }
  };
  
  const { container, text, circle, iconSize } = getTimerSize();
  
  // Effet pour démarrer/arrêter le timer
  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    
    // Nettoyage à la destruction du composant
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  
  // Effet pour l'animation du cercle de progression (pour le compte à rebours)
  useEffect(() => {
    if (variant === 'countdown' && isRunning) {
      Animated.timing(animatedValue, {
        toValue: timeLeft / initialTime,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [timeLeft, isRunning]);
  
  // Calculer l'arc de cercle pour la progression
  const circularProgress = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={[styles.container, container]}>
      {/* Cercle de progression pour le compte à rebours */}
      {variant === 'countdown' && (
        <View style={[styles.progressCircle, { width: circle, height: circle }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: circle,
                height: circle,
                borderRadius: circle / 2,
                backgroundColor: getTimerColor(),
                transform: [
                  { rotate: '270deg' },
                  { rotateZ: circularProgress },
                ],
              },
            ]}
          />
          <View style={[styles.progressCenter, { width: circle - 10, height: circle - 10 }]} />
        </View>
      )}
      
      {/* Affichage du temps */}
      <Text style={[styles.timeText, text, { color: getTimerColor() }]}>
        {variant === 'countdown' 
          ? formatTime(timeLeft)
          : formatTimeWithMs(elapsedTime)
        }
      </Text>
      
      {/* Contrôles optionnels */}
      {showControls && (
        <View style={styles.controls}>
          {isRunning ? (
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: getTimerColor() }]}
              onPress={pauseTimer}
            >
              <Ionicons name="pause" size={iconSize} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: getTimerColor() }]}
              onPress={resumeTimer}
            >
              <Ionicons name="play" size={iconSize} color="white" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetTimer}
          >
            <Ionicons name="refresh" size={iconSize} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Timer;

