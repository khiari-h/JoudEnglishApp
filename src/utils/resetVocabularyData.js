// src/utils/resetVocabularyData.js - Fonctions de reset
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🗑️ RESET COMPLET - Supprime toutes les données vocabulaire
 * Utile pour tester la logique de révision depuis zéro
 */
export const resetAllVocabularyData = async () => {
  try {
    console.log("🗑️ DÉBUT RESET COMPLET");
    
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const modes = ['classic', 'fast'];
    const keysToDelete = [];

    // 1. Clés VocabularyExercise
    levels.forEach(level => {
      modes.forEach(mode => {
        keysToDelete.push(`vocabulary_${level}_${mode}`);
      });
    });

    // 2. Clés ProgressContext
    keysToDelete.push('userProgress');
    keysToDelete.push('user_active_level');
    keysToDelete.push('user_streak_data');

    // 3. Clés useLastActivity
    levels.forEach(level => {
      modes.forEach(mode => {
        keysToDelete.push(`vocabulary_position_${level}_${mode}`);
      });
      keysToDelete.push(`vocabulary_position_${level}`);
    });

    // 4. Clés useRevisionTrigger
    keysToDelete.push('revision_trigger_data');

    // 5. Autres clés possibles
    keysToDelete.push('exercise_time_stats');
    keysToDelete.push('exercise_time_stats_backup');

    console.log("🗑️ Clés à supprimer:", keysToDelete.length);

    // Supprimer toutes les clés
    await AsyncStorage.multiRemove(keysToDelete);

    console.log("🗑️ RESET TERMINÉ - Toutes les données supprimées");
    
    return {
      success: true,
      deletedKeys: keysToDelete.length,
      message: "Toutes les données vocabulaire ont été supprimées"
    };

  } catch (error) {
    console.error("🗑️ Erreur reset:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * 🔧 RESET PARTIEL - Garde les settings utilisateur
 * Supprime seulement les données d'apprentissage
 */
export const resetOnlyLearningData = async () => {
  try {
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const modes = ['classic', 'fast'];
    const keysToDelete = [];

    // Seulement les données d'apprentissage
    levels.forEach(level => {
      modes.forEach(mode => {
        keysToDelete.push(`vocabulary_${level}_${mode}`);
        keysToDelete.push(`vocabulary_position_${level}_${mode}`);
      });
    });

    keysToDelete.push('revision_trigger_data');

    await AsyncStorage.multiRemove(keysToDelete);

    return {
      success: true,
      deletedKeys: keysToDelete.length,
      message: "Données d'apprentissage supprimées, settings conservés"
    };

  } catch (error) {
    console.error("Erreur reset partiel:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// 🚀 BOUTON DE DEBUG À AJOUTER DANS QuickActions
/*
// Dans QuickActions, ajouter ce bouton en mode debug :

{__DEV__ && (
  <TouchableOpacity
    style={styles.debugResetButton}
    onPress={async () => {
      Alert.alert(
        "Reset données",
        "Supprimer toutes les données vocabulaire ?",
        [
          { text: "Annuler", style: "cancel" },
          { 
            text: "Reset complet", 
            style: "destructive",
            onPress: async () => {
              const result = await resetAllVocabularyData();
              Alert.alert("Reset", result.message);
              // Rafraîchir les données
              setRealWordsData(prev => ({ ...prev, totalWordsLearned: 0 }));
            }
          }
        ]
      );
    }}
  >
    <Text style={styles.debugResetText}>🗑️ Reset Toutes Données</Text>
  </TouchableOpacity>
)}
*/