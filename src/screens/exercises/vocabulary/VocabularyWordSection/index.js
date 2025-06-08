// components/VocabularyWordSection.js
import React, { memo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VocabularyWordCard from "../VocabularyWordCard";
import { isBonusLevel } from "../../../../utils/vocabulary/vocabularyDataHelper";

/**
 * 🏆 VocabularyWordSection - Design Niveau LDC (Paris Saint-Germain)
 * - Compteur stylé avec glassmorphism
 * - Indicateurs de mode améliorés  
 * - Breathing room généreux
 * - Typography hiérarchisée
 */
const VocabularyWordSection = memo(({
  currentWord,
  wordCounter,
  mode,
  level,
  levelColor,
  showTranslation,
  onToggleTranslation,
}) => {
  
  // Détermine le texte du mode
  const getModeText = () => {
    if (mode === "fast") {
      return isBonusLevel(level) ? "Bonus Level" : "Fast Mode";
    }
    return "Classic Mode";
  };

  // Détermine la couleur du mode
  const getModeColor = () => {
    if (mode === "fast") {
      return isBonusLevel(level) ? "#F59E0B" : "#EF4444";
    }
    return levelColor;
  };

  return (
    <View style={styles.container}>
      {/* 🎯 COMPTEUR STYLÉ - Hero section pour les stats */}
      <View style={styles.counterSection}>
        <LinearGradient
          colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.counterGradient}
        >
          {/* Compteur principal */}
          <View style={[styles.counterBadge, { borderColor: `${levelColor}20` }]}>
            <Text style={[styles.counterText, { color: levelColor }]}>
              {wordCounter}
            </Text>
          </View>

          {/* Mode badge supprimé - pas de tartinage */}
        </LinearGradient>
      </View>

      {/* 🎨 CARTE DU MOT - Composant principal */}
      <VocabularyWordCard
        word={currentWord.word || ""}
        translation={currentWord.translation || ""}
        definition={currentWord.definition || ""}
        example={currentWord.example || ""}
        showTranslation={showTranslation}
        onToggleTranslation={onToggleTranslation}
        levelColor={levelColor}
      />
    </View>
  );
});

// Styles pour VocabularyWordSection
const styles = {
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  
  // =================== COMPTEUR SECTION ===================
  counterSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  counterGradient: {
    paddingVertical: 16, // Réduit car plus de badge
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center', // Centré sans le badge
  },
  
  // =================== BADGE COMPTEUR ===================
  counterBadge: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 12,
    // Ombre subtile
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  counterText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  
  // =================== BADGE MODE ===================
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    // Ombre pour faire ressortir
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  modeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  lightningIcon: {
    marginLeft: 6,
  },
  lightningEmoji: {
    fontSize: 14,
  },
};

VocabularyWordSection.displayName = "VocabularyWordSection";

export default VocabularyWordSection;