// src/hooks/useRouteActivityTracker.js - VERSION CORRIGÉE SANS BOUCLE
import { useEffect, useCallback, useRef } from 'react';
import { useSegments, usePathname } from 'expo-router';
import useActivityMetrics from './useActivityMetrics';

const useRouteActivityTracker = () => {
  const segments = useSegments();
  const pathname = usePathname();
  const { startSession, endSession, updateStreak } = useActivityMetrics();
  
  // ✅ CORRECTION : Refs pour éviter les appels en boucle
  const currentSessionRef = useRef(null);
  const isTrackingRef = useRef(false);

  // ✅ CORRECTION : Mémoriser les handlers pour éviter les re-créations
  const handleStartSession = useCallback((exerciseType) => {
    if (!isTrackingRef.current && currentSessionRef.current !== exerciseType) {
      isTrackingRef.current = true;
      currentSessionRef.current = exerciseType;
      startSession(exerciseType);
    }
  }, [startSession]);

  const handleEndSession = useCallback(() => {
    if (isTrackingRef.current) {
      isTrackingRef.current = false;
      currentSessionRef.current = null;
      endSession();
      updateStreak();
    }
  }, [endSession, updateStreak]);

  useEffect(() => {
    // Vérifier si c'est un exercice
    const isExercise = segments.some(segment => 
      segment.includes('Exercise') ||
      segment.includes('exercise') ||
      segment.includes('Assessment') ||
      segment.includes('assessment')
    );

    if (isExercise) {
      // Récupérer le type d'exercice (dernier segment)
      const exerciseType = segments[segments.length - 1];
      
      // Démarrer la session seulement si ce n'est pas déjà en cours
      handleStartSession(exerciseType);
      
      // Cleanup au changement de route
      return () => {
        handleEndSession();
      };
    } else {
      // Si on n'est plus sur un exercice, arrêter la session
      handleEndSession();
    }
  }, [segments, pathname, handleStartSession, handleEndSession]); // ✅ CORRIGÉ : handlers mémorisés

  // Cleanup général au démontage du composant
  useEffect(() => {
    return () => {
      handleEndSession();
    };
  }, [handleEndSession]);

  // Pas de rendu
};

export default useRouteActivityTracker;