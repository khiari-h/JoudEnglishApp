// components/VocabularyWordSection.js
import React, { memo } from "react";
import { View, Text } from "react-native";
import VocabularyWordCard from "../VocabularyWordCard";
import { isBonusLevel } from "../../../../utils/vocabulary/vocabularyDataHelper";

/**
 * Composant mémorisé pour afficher le compteur de mots + carte de vocabulaire
 * Extrait du composant principal pour simplifier et optimiser
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
  return (
    <>
      {/* Compteur de mots avec indicateur de mode */}
      <View
        style={{
          padding: 10,
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            color: levelColor,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {wordCounter}
        </Text>
        {mode === "fast" && (
          <Text
            style={{
              color: "#f59e0b",
              fontSize: 12,
              fontWeight: "600",
              marginTop: 2,
              textTransform: "uppercase",
            }}
          >
            {isBonusLevel(level) ? "Bonus Level" : "Fast Mode"}
          </Text>
        )}
      </View>

      {/* Carte du mot avec toutes ses informations */}
      <VocabularyWordCard
        word={currentWord.word || ""}
        translation={currentWord.translation || ""}
        definition={currentWord.definition || ""}
        example={currentWord.example || ""}
        showTranslation={showTranslation}
        onToggleTranslation={onToggleTranslation}
        levelColor={levelColor}
      />
    </>
  );
});

VocabularyWordSection.displayName = "VocabularyWordSection";

export default VocabularyWordSection;