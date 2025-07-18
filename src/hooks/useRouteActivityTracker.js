// src/hooks/useRouteActivityTracker.js - VERSION CORRIGÉE SANS BOUCLE
import { useEffect, useRef } from 'react';
import { useSegments, usePathname } from 'expo-router';
import useActivityMetrics from './useActivityMetrics';

const useRouteActivityTracker = () => {
  const segments = useSegments();
  const pathname = usePathname();
  const { startSession, endSession, updateStreak } = useActivityMetrics();
  
  // ✅ CORRECTION : Refs pour éviter les appels en boucle
  const currentSessionRef = useRef(null);
  const isTrackingRef = useRef(false);
  const lastPathnameRef = useRef(null);

  useEffect(() => {
    // ✅ CORRECTION : Eviter les re-déclenchements inutiles
    if (lastPathnameRef.current === pathname) {
      return;
    }
    lastPathnameRef.current = pathname;

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
      
      // ✅ CORRECTION : Logique directe sans callbacks
      if (!isTrackingRef.current || currentSessionRef.current !== exerciseType) {
        // Arrêter la session précédente si elle existe
        if (isTrackingRef.current) {
          try {
            endSession();
            updateStreak();
          } catch (error) {
            console.warn('Erreur lors de la fin de session:', error);
          }
        }
        
        // Démarrer la nouvelle session
        try {
          isTrackingRef.current = true;
          currentSessionRef.current = exerciseType;
          startSession(exerciseType);
        } catch (error) {
          console.warn('Erreur lors du démarrage de session:', error);
          isTrackingRef.current = false;
          currentSessionRef.current = null;
        }
      }
    } else {
      // Si on n'est plus sur un exercice, arrêter la session
      if (isTrackingRef.current) {
        try {
          isTrackingRef.current = false;
          currentSessionRef.current = null;
          endSession();
          updateStreak();
        } catch (error) {
          console.warn('Erreur lors de la fin de session:', error);
        }
      }
    }

    // ✅ CORRECTION : Cleanup unique et stable
    return () => {
      if (isTrackingRef.current) {
        try {
          isTrackingRef.current = false;
          currentSessionRef.current = null;
          endSession();
        } catch (error) {
          console.warn('Erreur lors du cleanup:', error);
        }
      }
      // Suppression du return null (aucun return attendu)
    };
  }, [segments, pathname]); // ✅ CORRIGÉ : Seulement les vraies dépendances

  // ✅ CORRECTION : Cleanup final seulement au démontage
  useEffect(() => {
    return () => {
      if (isTrackingRef.current) {
        try {
          endSession();
        } catch (error) {
          console.warn('Erreur lors du cleanup final:', error);
        }
      }
    };
  }, []); // ✅ CORRIGÉ : Aucune dépendance = seulement au démontage

  // Pas de rendu
};

export default useRouteActivityTracker;