import { useState, useRef, useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * Hook pour tracker le temps passé sur chaque exercice
 * Compte tout en secondes, tracking détaillé par mode
 */
const useExerciseTimeTracking = () => {
  // Stockage persistant des temps totaux
  const {
    value: exerciseTimeStats,
    setValue: setExerciseTimeStats,
    loaded,
  } = useLocalStorage("exercise_time_stats", {
    // Vocabulary avec modes
    vocabulary_classic: 0,
    vocabulary_fast: 0,
    // Autres exercices simples
    phrases: 0,
    grammar: 0,
    reading: 0,
    conversations: 0,
    spelling: 0,
    errorCorrection: 0,
    wordGames: 0,
    assessment: 0,
  });

  // État du tracking en cours
  const [currentlyTracking, setCurrentlyTracking] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const intervalRef = useRef(null);
  const [sessionTime, setSessionTime] = useState(0);

  // Démarrer le tracking d'un exercice
  const startTracking = useCallback(
    (exerciseKey) => {
      console.log(`⏱️ Début tracking: ${exerciseKey}`);

      // Arrêter le tracking précédent s'il y en a un
      if (currentlyTracking) {
        stopAndSave();
      }

      // Démarrer le nouveau tracking
      const startTime = Date.now();
      setCurrentlyTracking(exerciseKey);
      setSessionStartTime(startTime);
      setSessionTime(0);

      // Chronomètre qui update chaque seconde
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setSessionTime(elapsed);
      }, 1000);
    },
    [currentlyTracking]
  );

  // Arrêter et sauvegarder le tracking
  const stopAndSave = useCallback(() => {
    if (!currentlyTracking || !sessionStartTime) {
      return 0;
    }

    // Calculer le temps de session en secondes
    const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);

    console.log(`⏹️ Fin tracking: ${currentlyTracking} - ${sessionDuration}s`);

    // Arrêter le chronomètre
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Sauvegarder le temps total
    if (sessionDuration > 0) {
      setExerciseTimeStats((prevStats) => ({
        ...prevStats,
        [currentlyTracking]:
          (prevStats[currentlyTracking] || 0) + sessionDuration,
      }));
    }

    // Reset l'état de tracking
    setCurrentlyTracking(null);
    setSessionStartTime(null);
    setSessionTime(0);

    return sessionDuration;
  }, [currentlyTracking, sessionStartTime, setExerciseTimeStats]);

  // Ajouter du temps manuellement (en secondes)
  const addTime = useCallback(
    (exerciseKey, seconds) => {
      console.log(`➕ Ajout manuel: ${exerciseKey} + ${seconds}s`);

      setExerciseTimeStats((prevStats) => ({
        ...prevStats,
        [exerciseKey]: (prevStats[exerciseKey] || 0) + seconds,
      }));
    },
    [setExerciseTimeStats]
  );

  // Obtenir le temps total pour un exercice (en gérant les modes)
  const getTimeForExercise = useCallback(
    (exerciseType) => {
      if (!loaded) return 0;

      // Pour vocabulary, prendre le max entre classic et fast
      if (exerciseType === "vocabulary") {
        const classicTime = exerciseTimeStats.vocabulary_classic || 0;
        const fastTime = exerciseTimeStats.vocabulary_fast || 0;
        return Math.max(classicTime, fastTime);
      }

      // Pour les autres exercices
      return exerciseTimeStats[exerciseType] || 0;
    },
    [exerciseTimeStats, loaded]
  );

  // Obtenir le temps total de l'app
  const getTotalTime = useCallback(() => {
    if (!loaded) return 0;

    return Object.values(exerciseTimeStats).reduce(
      (total, time) => total + time,
      0
    );
  }, [exerciseTimeStats, loaded]);

  // Obtenir les stats formatées pour les recommandations (en minutes)
  const getFormattedStats = useCallback(() => {
    if (!loaded) return {};

    const stats = {};

    // Pour vocabulary, prendre le max entre modes
    stats.vocabulary = Math.floor(getTimeForExercise("vocabulary") / 60);

    // Pour les autres exercices
    const simpleExercises = [
      "phrases",
      "grammar",
      "reading",
      "conversations",
      "spelling",
      "errorCorrection",
      "wordGames",
      "assessment",
    ];

    simpleExercises.forEach((exercise) => {
      stats[exercise] = Math.floor((exerciseTimeStats[exercise] || 0) / 60);
    });

    return stats;
  }, [exerciseTimeStats, loaded, getTimeForExercise]);

  // Obtenir les stats détaillées (secondes)
  const getDetailedStats = useCallback(() => {
    if (!loaded) return {};
    return { ...exerciseTimeStats };
  }, [exerciseTimeStats, loaded]);

  // Reset toutes les données
  const resetAllStats = useCallback(() => {
    console.log("🔄 Reset toutes les stats de temps");

    const emptyStats = {
      vocabulary_classic: 0,
      vocabulary_fast: 0,
      phrases: 0,
      grammar: 0,
      reading: 0,
      conversations: 0,
      spelling: 0,
      errorCorrection: 0,
      wordGames: 0,
      assessment: 0,
    };

    setExerciseTimeStats(emptyStats);
  }, [setExerciseTimeStats]);

  // Auto-stop au démontage du hook
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Auto-save si on était en train de tracker
      if (currentlyTracking && sessionStartTime) {
        const sessionDuration = Math.floor(
          (Date.now() - sessionStartTime) / 1000
        );
        if (sessionDuration > 0) {
          // Sauvegarde synchrone rapide au démontage
          const currentStats = JSON.parse(
            localStorage.getItem("exercise_time_stats") || "{}"
          );
          currentStats[currentlyTracking] =
            (currentStats[currentlyTracking] || 0) + sessionDuration;
          localStorage.setItem(
            "exercise_time_stats",
            JSON.stringify(currentStats)
          );
        }
      }
    };
  }, [currentlyTracking, sessionStartTime]);

  // Debug logs
  useEffect(() => {
    if (loaded) {
      console.log("📊 Stats exercices chargées:", exerciseTimeStats);
      console.log("📊 Stats formatées (min):", getFormattedStats());
    }
  }, [loaded, exerciseTimeStats, getFormattedStats]);

  return {
    // États
    exerciseTimeStats: getFormattedStats(), // Pour compatibilité (en minutes)
    detailedStats: getDetailedStats(), // Stats complètes (en secondes)
    currentlyTracking,
    sessionTime,
    isTracking: currentlyTracking !== null,
    loaded,

    // Actions principales
    startTracking,
    stopAndSave,
    addTime,

    // Utilitaires
    getTimeForExercise,
    getTotalTime,
    getFormattedStats,
    resetAllStats,
  };
};

export default useExerciseTimeTracking;
