// src/hooks/useUnifiedRevisionSystem.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVISION_SETTINGS_KEY = 'revision_user_preferences_v2';
const REVISION_DELAYS_KEY = 'revision_delays_v2';

/**
 * 🎯 Système de révision unifié avec styles Light/Standard/Intensive/Aucune
 * 
 * Logique finale :
 * 1. Premier déclenchement à 25 mots (trigger modal de choix)
 * 2. Styles : Light(25/5), Standard(35/8), Intensive(50/12), Aucune(null/0)
 * 3. Options popup : Plus tard (+10), Reporter (+15), Ignorer (cycle suivant)
 * 4. Système anti-spam : cooldown, max 1 popup par session
 */
const useUnifiedRevisionSystem = (totalWordsLearned = 0) => {
  
  // ========== ÉTATS ==========
  const [revisionSettings, setRevisionSettings] = useState({
    isFirstTime: true,
    styleId: 'standard', // 'light', 'standard', 'intensive', 'none'
    frequency: 35, // 25, 35, 50, null
    questionsCount: 8, // 5, 8, 12, 0
    lastRevisionAt: null,
    totalRevisionsCompleted: 0,
    lastRevisionCycle: 0
  });
  
  const [revisionDelays, setRevisionDelays] = useState({
    snoozeCount: 0, // Compteur "Plus tard" (+10 mots)
    postponeCount: 0, // Compteur "Reporter" (+15 mots)
    ignoreCount: 0, // Compteur "Ignorer" (cycle suivant)
    lastDelayAt: null,
    lastPopupShown: null // Anti-spam
  });
  
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [revisionData, setRevisionData] = useState({
    needsRevision: false,
    wordsToReview: 0,
    questionsCount: 0,
    nextMilestone: 25,
    reason: '',
    triggerType: 'manual', // 'first', 'scheduled', 'manual'
    currentCycle: 0
  });

  // ========== STYLES DE RÉVISION ==========
  const revisionStyles = {
    light: { 
      frequency: 25, 
      questionsCount: 5, 
      title: 'Light',
      description: 'Fréquent et rapide'
    },
    standard: { 
      frequency: 35, 
      questionsCount: 8, 
      title: 'Standard',
      description: 'Équilibré et efficace'
    },
    intensive: { 
      frequency: 50, 
      questionsCount: 12, 
      title: 'Intensive',
      description: 'Complet et approfondi'
    },
    none: { 
      frequency: null, 
      questionsCount: 0, 
      title: 'Aucune',
      description: 'Révision manuelle uniquement'
    }
  };

  // ========== CHARGEMENT DES DONNÉES ==========
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [savedSettings, savedDelays] = await Promise.all([
          AsyncStorage.getItem(REVISION_SETTINGS_KEY),
          AsyncStorage.getItem(REVISION_DELAYS_KEY)
        ]);

        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setRevisionSettings(settings);
        }

        if (savedDelays) {
          const delays = JSON.parse(savedDelays);
          setRevisionDelays(delays);
        }
      } catch (error) {
        console.error('🔧 Erreur chargement données révision:', error);
      }
    };
    loadSettings();
  }, []);

  // ========== SAUVEGARDE DES DONNÉES ==========
  const saveSettings = useCallback(async (newSettings) => {
    try {
      const updatedSettings = { ...revisionSettings, ...newSettings };
      await AsyncStorage.setItem(REVISION_SETTINGS_KEY, JSON.stringify(updatedSettings));
      setRevisionSettings(updatedSettings);
    } catch (error) {
      console.error('🔧 Erreur sauvegarde settings:', error);
    }
  }, [revisionSettings]);

  const saveDelays = useCallback(async (newDelays) => {
    try {
      const updatedDelays = { ...revisionDelays, ...newDelays };
      await AsyncStorage.setItem(REVISION_DELAYS_KEY, JSON.stringify(updatedDelays));
      setRevisionDelays(updatedDelays);
    } catch (error) {
      console.error('🔧 Erreur sauvegarde delays:', error);
    }
  }, [revisionDelays]);

  // ========== LOGIQUE DE DÉCLENCHEMENT ==========
  const calculateRevisionNeed = useCallback(() => {
    console.log("🎯 Calcul révision unifié:", {
      totalWordsLearned,
      isFirstTime: revisionSettings.isFirstTime,
      styleId: revisionSettings.styleId,
      frequency: revisionSettings.frequency
    });

    // ========== CAS 1: PREMIER DÉCLENCHEMENT (25 mots) ==========
    if (revisionSettings.isFirstTime && totalWordsLearned >= 25) {
      return {
        needsRevision: true,
        wordsToReview: 5, 
        questionsCount: 5,
        nextMilestone: 25,
        reason: "🎉 Premier déclenchement à 25 mots - Configurez vos préférences",
        triggerType: 'first',
        currentCycle: 1
      };
    }

    // ========== CAS 2: STYLE "AUCUNE" ==========
    if (revisionSettings.styleId === 'none' && !revisionSettings.isFirstTime) {
      return {
        needsRevision: false,
        wordsToReview: 0,
        questionsCount: 0,
        nextMilestone: 0,
        reason: "❌ Révision automatique désactivée",
        triggerType: 'manual',
        currentCycle: 0
      };
    }

    // ========== CAS 3: RÉVISIONS PROGRAMMÉES ==========
    if (!revisionSettings.isFirstTime && revisionSettings.frequency) {
      // Calculer le seuil avec les délais
      const baseThreshold = revisionSettings.frequency;
      const snoozeDelay = revisionDelays.snoozeCount * 10; // +10 mots par "Plus tard"
      const postponeDelay = revisionDelays.postponeCount * 15; // +15 mots par "Reporter"
      const effectiveThreshold = baseThreshold + snoozeDelay + postponeDelay;

      console.log("📊 Calcul seuils:", {
        base: baseThreshold,
        snooze: snoozeDelay,
        postpone: postponeDelay,
        effective: effectiveThreshold,
        current: totalWordsLearned
      });

      if (totalWordsLearned >= effectiveThreshold) {
        const currentCycle = Math.floor(totalWordsLearned / baseThreshold);
        const lastCycle = revisionSettings.lastRevisionCycle || 0;
        
        // Anti-spam : vérifier qu'on n'a pas déjà fait cette révision
        if (currentCycle > lastCycle) {
          // Anti-spam : cooldown de 1h minimum
          const now = Date.now();
          const lastShown = revisionDelays.lastPopupShown;
          const cooldownMs = 60 * 60 * 1000; // 1 heure
          
          if (!lastShown || (now - lastShown) > cooldownMs) {
            return {
              needsRevision: true,
              wordsToReview: revisionSettings.questionsCount,
              questionsCount: revisionSettings.questionsCount,
              nextMilestone: effectiveThreshold,
              reason: `🔄 Révision ${revisionSettings.styleId} - ${revisionSettings.questionsCount} questions`,
              triggerType: 'scheduled',
              currentCycle
            };
          } else {
            const timeLeft = Math.ceil((cooldownMs - (now - lastShown)) / (60 * 1000));
            return {
              needsRevision: false,
              wordsToReview: 0,
              questionsCount: 0,
              nextMilestone: effectiveThreshold,
              reason: `⏰ Cooldown actif (${timeLeft}min restantes)`,
              triggerType: 'manual',
              currentCycle
            };
          }
        }
      }
    }

    // ========== CAS 4: PAS DE RÉVISION NÉCESSAIRE ==========
    const nextThreshold = revisionSettings.isFirstTime 
      ? 25 
      : (revisionSettings.frequency || 35);
    
    const wordsUntilNext = Math.max(0, nextThreshold - totalWordsLearned);
    
    return {
      needsRevision: false,
      wordsToReview: 0,
      questionsCount: 0,
      nextMilestone: wordsUntilNext,
      reason: wordsUntilNext > 0 
        ? `📚 Prochaine révision dans ${wordsUntilNext} mots`
        : `✅ Prêt pour révision (attente conditions)`,
      triggerType: 'manual',
      currentCycle: 0
    };
  }, [totalWordsLearned, revisionSettings, revisionDelays]);

  // ========== MISE À JOUR DES DONNÉES ==========
  useEffect(() => {
    const newRevisionData = calculateRevisionNeed();
    setRevisionData(newRevisionData);

    // Déclencher modal de préférences lors du premier déclenchement
    if (newRevisionData.triggerType === 'first' && revisionSettings.isFirstTime) {
      setShowPreferencesModal(true);
    }
  }, [calculateRevisionNeed, revisionSettings.isFirstTime]);

  // ========== GESTIONNAIRES PRINCIPAUX ==========

  // Configuration des préférences (premier déclenchement)
  const handlePreferencesChoice = useCallback(async (frequency, questionsCount, styleId) => {
    console.log("✅ Configuration préférences:", { frequency, questionsCount, styleId });
    
    await saveSettings({
      isFirstTime: false,
      styleId,
      frequency,
      questionsCount,
      preferencesSetAt: new Date().toISOString()
    });
    
    // Reset les délais
    await saveDelays({
      snoozeCount: 0,
      postponeCount: 0,
      ignoreCount: 0,
      lastDelayAt: null,
      lastPopupShown: null
    });
    
    setShowPreferencesModal(false);
  }, [saveSettings, saveDelays]);

  // Démarrer une révision programmée
  const handleStartRevision = useCallback(async () => {
    console.log("🚀 Démarrage révision programmée");
    
    const currentCycle = revisionData.currentCycle || 
      Math.floor(totalWordsLearned / (revisionSettings.frequency || 35));
    
    await Promise.all([
      saveSettings({
        lastRevisionAt: new Date().toISOString(),
        lastRevisionCycle: currentCycle,
        totalRevisionsCompleted: revisionSettings.totalRevisionsCompleted + 1
      }),
      saveDelays({
        snoozeCount: 0, // Reset délais après révision
        postponeCount: 0,
        ignoreCount: 0,
        lastDelayAt: new Date().toISOString(),
        lastPopupShown: Date.now() // Anti-spam
      })
    ]);

    return {
      wordsToReview: revisionData.questionsCount,
      questionsCount: revisionData.questionsCount,
      level: 'mixed',
      source: 'popup_trigger'
    };
  }, [revisionData, totalWordsLearned, revisionSettings, saveSettings, saveDelays]);

  // Révision manuelle (QuickActions)
  const handleManualRevision = useCallback(() => {
    console.log("📚 Révision manuelle déclenchée");
    
    const questionsCount = Math.min(Math.floor(totalWordsLearned / 3), 15); // Max 15 questions
    return {
      wordsToReview: questionsCount,
      questionsCount,
      level: 'mixed',
      source: 'manual_trigger'
    };
  }, [totalWordsLearned]);

  // ========== GESTIONNAIRES POPUP (DÉLAIS) ==========

  // "Plus tard" (+10 mots)
  const handleSnoozeLater = useCallback(async () => {
    console.log("⏰ Plus tard (+10 mots)");
    await saveDelays({
      snoozeCount: revisionDelays.snoozeCount + 1,
      lastDelayAt: new Date().toISOString(),
      lastPopupShown: Date.now()
    });
  }, [revisionDelays, saveDelays]);

  // "Reporter" (+15 mots)
  const handlePostpone = useCallback(async () => {
    console.log("😴 Reporter (+15 mots)");
    await saveDelays({
      postponeCount: revisionDelays.postponeCount + 1,
      lastDelayAt: new Date().toISOString(),
      lastPopupShown: Date.now()
    });
  }, [revisionDelays, saveDelays]);

  // "Ignorer cette fois" (cycle suivant)
  const handleIgnore = useCallback(async () => {
    console.log("❌ Ignorer cette fois");
    
    const currentCycle = Math.floor(totalWordsLearned / (revisionSettings.frequency || 35));
    
    await Promise.all([
      saveSettings({
        lastRevisionCycle: currentCycle // Marquer comme fait
      }),
      saveDelays({
        ignoreCount: revisionDelays.ignoreCount + 1,
        snoozeCount: 0, // Reset délais
        postponeCount: 0,
        lastDelayAt: new Date().toISOString(),
        lastPopupShown: Date.now()
      })
    ]);
  }, [totalWordsLearned, revisionSettings.frequency, revisionDelays, saveSettings, saveDelays]);

  // ========== UTILITAIRES ==========

  // Reset complet du système (debug/tests)
  const resetRevisionSystem = useCallback(async () => {
    try {
      console.log("🗑️ Reset système révision");
      await AsyncStorage.multiRemove([REVISION_SETTINGS_KEY, REVISION_DELAYS_KEY]);
      
      setRevisionSettings({
        isFirstTime: true,
        styleId: 'standard',
        frequency: 35,
        questionsCount: 8,
        lastRevisionAt: null,
        totalRevisionsCompleted: 0,
        lastRevisionCycle: 0
      });
      
      setRevisionDelays({
        snoozeCount: 0,
        postponeCount: 0,
        ignoreCount: 0,
        lastDelayAt: null,
        lastPopupShown: null
      });
      
      setShowPreferencesModal(false);
    } catch (error) {
      console.error('🔧 Erreur reset système révision:', error);
    }
  }, []);

  // Obtenir infos du style actuel
  const getCurrentStyleInfo = useCallback(() => {
    return revisionStyles[revisionSettings.styleId] || revisionStyles.standard;
  }, [revisionSettings.styleId]);

  // ========== RETOUR DU HOOK ==========
  return {
    // ========== ÉTATS ==========
    revisionData,
    revisionSettings,
    revisionDelays,
    showPreferencesModal,
    
    // ========== ACTIONS PRINCIPALES ==========
    handlePreferencesChoice,
    handleStartRevision,
    handleManualRevision,
    
    // ========== ACTIONS POPUP ==========
    handleSnoozeLater,
    handlePostpone,
    handleIgnore,
    
    // ========== UTILITAIRES ==========
    resetRevisionSystem,
    getCurrentStyleInfo,
    
    // ========== INDICATEURS ==========
    isAvailable: revisionData.needsRevision,
    canDoManualRevision: totalWordsLearned >= 10,
    
    // ========== DEBUG ==========
    debugInfo: {
      totalWordsLearned,
      triggerType: revisionData.triggerType,
      isFirstTime: revisionSettings.isFirstTime,
      styleId: revisionSettings.styleId,
      frequency: revisionSettings.frequency,
      delays: revisionDelays,
      nextMilestone: revisionData.nextMilestone,
      reason: revisionData.reason
    }
  };
};

export default useUnifiedRevisionSystem;