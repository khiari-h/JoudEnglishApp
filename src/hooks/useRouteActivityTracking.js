// src/hooks/useRouteActivityTracker.js - TRACKING NAVIGATION

import { useEffect } from 'react';
import { useSegments, usePathname } from 'expo-router';
import useActivityMetrics from './useActivityMetrics';

const useRouteActivityTracker = () => {
  const segments = useSegments();
  const pathname = usePathname();
  const { startSession, endSession, updateStreak } = useActivityMetrics();

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
      
      // Démarrer la session
      startSession(exerciseType);
      
      // Cleanup au changement de route
      return () => {
        endSession();
        updateStreak();
      };
    }
  }, [segments, pathname, startSession, endSession, updateStreak]);

  // Pas de rendu
};

export default useRouteActivityTracker;