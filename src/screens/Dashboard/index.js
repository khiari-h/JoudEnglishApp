// src/screens/Dashboard/index.js - VERSION FINALE AVEC BEST PRACTICE

import { useContext, useCallback } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
// ✅ BEST PRACTICE : On déstructure toutes les propriétés nécessaires du contexte
import { useProgressRead } from "../../contexts/ProgressContext"; 
import { useCurrentLevel } from '../../contexts/CurrentLevelContext';

// 🚀 HOOK PROGRESSION TEMPS RÉEL
import useRealTimeProgress from "../../hooks/useRealTimeProgress";

// Hooks
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardState } from "./hooks/useDashboardState";
import useLastActivity from "../../hooks/useLastActivity";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants Dashboard
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

// 🚀 RÉVISION
import RevisionOrchestrator from "../VocabularyRevision/RevisionOrchestrator";

// Constantes
import styles from "./style";
import useDashboardRefresh from "./hooks/useDashboardRefresh";
import useDashboardNavigation from "./hooks/useDashboardNavigation";
import useDashboardSelectors from "./hooks/useDashboardSelectors";

const Dashboard = () => {
    
  // =================== ÉTAT LOCAL RAFRAÎCHISSEMENT ===================
  // Géré par useDashboardRefresh
    
  // =================== CONTEXTES ===================
  const themeContext = useContext(ThemeContext);
  const { progress, isLoading, calculateGlobalProgress, calculateLevelProgress } = useProgressRead();

  // 🚀 PROGRESSION TEMPS RÉEL
  const { getLevelProgress, refresh: refreshProgress } = useRealTimeProgress();

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6", 
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // =================== HOOKS DASHBOARD ===================
  const { currentLevel, handleChangeActiveLevel, levelColor } = useDashboardLevel({ 
    progress 
  });
  const { setCurrentLevel } = useCurrentLevel();
    
  const { lastActivity, isLoading: isActivityLoading, reload: reloadActivity } = useLastActivity();
    
  const { refreshing, onRefresh: originalOnRefresh } = useDashboardState(reloadActivity);
  const { refreshKey, onRefresh } = useDashboardRefresh({ originalOnRefresh, refreshProgress });

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  // =================== NAVIGATION ===================
  const { handleContinue, handleChangeLevelVisual, handleLevelSelect } = useDashboardNavigation({
    setCurrentLevel,
    handleChangeActiveLevel,
  });

  // =================== NIVEAUX ===================
  const { allLevels, globalProgress } = useDashboardSelectors({
    getLevelProgress,
    currentLevel,
    calculateLevelProgress,
    calculateGlobalProgress
  });

  // Note: on ne bloque plus l'affichage sur isLoading; les sections se rafraîchiront via refreshKey

  // =================== BACKGROUND ===================
  const backgroundGradient = {
    colors: [`${levelColor}05`, colors.background, `${levelColor}08`],
    locations: [0, 0.6, 1],
  };

  // =================== RENDER ===================
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent"
      statusBarStyle="light-content"
      withPadding={false}
    >
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Header */}
        <ModernHeader
          level={currentLevel}
          levelColor={levelColor}
        />

        {/* Contenu principal */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[levelColor]}
              tintColor={levelColor}
            />
          }
        >
          {/* Section Continue */}
          <HeroContinueSection
            key={`continue-${refreshKey}`} // 🔥 Force le re-render
            lastActivity={lastActivity}
            onPress={handleContinue}
            accentColor={levelColor}
            isLoading={isActivityLoading}
            accessibilityLabel="Continuer l'activité"
            accessibilityRole="button"
          />

          {/* Actions rapides */}
          <QuickActions
            key={`actions-${refreshKey}`} // 🔥 Force le re-render
            currentLevel={currentLevel}
            // ✅ CORRIGÉ : On passe les props déstructurées
            progressContext={{ progress, isLoading, calculateGlobalProgress, calculateLevelProgress }} 
            accentColor={levelColor}
          />

          {/* Métriques */}
          <SimpleMetrics 
            key={`metrics-${refreshKey}`} // 🔥 Force le re-render
            accentColor={levelColor} 
            refreshKey={refreshKey} // 🔥 Passe la clé de rafraîchissement
          />

          {/* Progression */}
          <LearningProgress
            key={`progress-${refreshKey}`} // 🔥 Force le re-render
            globalProgress={globalProgress}
            levels={allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect}
            onChangeLevelVisual={handleChangeLevelVisual}
            primaryColor={levelColor}
            accessibilityLabel="Progression générale"
          />

          {/* Espace en bas */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Système de révision */}
        <RevisionOrchestrator 
          key={`revision-${refreshKey}`} // 🔥 Force le re-render
          currentLevel={currentLevel} 
          refreshKey={refreshKey} // 🔥 Passe la clé de rafraîchissement
        />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;