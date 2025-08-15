// src/hooks/useRouteActivityTracker.js - REFACTORISÉ pour réduire la complexité cognitive
import { useEffect, useRef } from 'react';
import { useSegments, usePathname } from 'expo-router';
import useActivityMetrics from './useActivityMetrics';

const useRouteActivityTracker = () => {
  const segments = useSegments();
  const pathname = usePathname();
  const { startSession, endSession, updateStreak } = useActivityMetrics();
  
  // Refs pour éviter les appels en boucle
  const currentSessionRef = useRef(null);
  const isTrackingRef = useRef(false);
  const lastPathnameRef = useRef(null);

  // Fonction utilitaire pour exécuter des fonctions de manière sécurisée
  const safeExecute = (fn, errorMessage) => {
    try {
      return fn();
    } catch (error) {
      console.warn(errorMessage, error);
      return false;
    }
  };

  // Fonction pour détecter si on est sur un exercice
  const detectExercise = (segments) => {
    return segments.some(segment => 
      segment.includes('Exercise') ||
      segment.includes('exercise') ||
      segment.includes('Assessment') ||
      segment.includes('assessment')
    );
  };

  // Fonction pour gérer le démarrage d'un exercice
  const handleExerciseStart = (exerciseType) => {
    if (isTrackingRef.current && currentSessionRef.current === exerciseType) {
      return; // Déjà en cours de tracking
    }

    // Arrêter la session précédente si elle existe
    if (isTrackingRef.current) {
      safeExecute(() => {
        endSession();
        updateStreak();
      }, 'Erreur lors de la fin de session:');
    }
    
    // Démarrer la nouvelle session
    const success = safeExecute(() => {
      startSession(exerciseType);
    }, 'Erreur lors du démarrage de session:');

    if (success) {
      isTrackingRef.current = true;
      currentSessionRef.current = exerciseType;
    } else {
      isTrackingRef.current = false;
      currentSessionRef.current = null;
    }
  };

  // Fonction pour gérer la fin d'un exercice
  const handleExerciseEnd = () => {
    if (!isTrackingRef.current) {
      return;
    }

    safeExecute(() => {
      endSession();
      updateStreak();
    }, 'Erreur lors de la fin de session:');

    isTrackingRef.current = false;
    currentSessionRef.current = null;
  };

  // Fonction pour nettoyer l'état - simplifiée pour éviter les problèmes
  const cleanup = async () => {
    if (isTrackingRef.current) {
      try {
        await endSession();
      } catch (error) {
        console.warn('Erreur lors du cleanup:', error);
      }
      
      isTrackingRef.current = false;
      currentSessionRef.current = null;
    }
  };

  useEffect(() => {
    // Éviter les re-déclenchements inutiles
    if (lastPathnameRef.current === pathname) {
      return;
    }
    lastPathnameRef.current = pathname;

    const isExercise = detectExercise(segments);

    if (isExercise) {
      const exerciseType = segments[segments.length - 1];
      handleExerciseStart(exerciseType);
    } else {
      handleExerciseEnd();
    }

    // Cleanup quand les segments/pathname changent
    return cleanup;
  }, [segments, pathname, startSession, endSession, updateStreak]);

  // Cleanup final au démontage - simplifié et direct
  useEffect(() => {
    return () => {
      if (isTrackingRef.current) {
        // Utiliser une IIFE async pour gérer la Promise
        (async () => {
          try {
            await endSession();
          } catch (error) {
            console.warn('Erreur lors du cleanup final:', error);
          }
        })();
        
        isTrackingRef.current = false;
        currentSessionRef.current = null;
      }
    };
  }, []); // Aucune dépendance = seulement au démontage

  // Pas de rendu
};

export default useRouteActivityTracker;