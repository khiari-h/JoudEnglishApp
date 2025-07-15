// src/screens/Dashboard/hooks/useDashboardState.js
import { useState, useCallback } from "react";

export const useDashboardState = (loadLastActivities) => {
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Gérer le pull-to-refresh optimisé
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadLastActivities();
    } catch (error) {
      // Ignored on purpose
    } finally {
      setRefreshing(false);
    }
  }, [loadLastActivities]);

  // Gestionnaires pour la modal de progression
  const openLevelProgressModal = useCallback(() => {
    setShowLevelProgress(true);
  }, []);

  const closeLevelProgressModal = useCallback(() => {
    setShowLevelProgress(false);
  }, []);

  return {
    showLevelProgress,
    setShowLevelProgress,
    openLevelProgressModal,
    closeLevelProgressModal,
    refreshing,
    activeTab,
    setActiveTab,
    onRefresh,
  };
};

