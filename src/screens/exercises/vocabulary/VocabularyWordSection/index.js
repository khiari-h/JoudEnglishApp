// VocabularyWordSection/index.js - VERSION AJUSTÉE (garde la logique, utilise le nouveau VocabularyWordCard)

import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VocabularyWordCard from "../VocabularyWordCard"; // ← Utilise la version refactorisée
import createStyles from "./style";

/**
 * ⚡ VocabularyWordSection - Version ajustée
 * Garde toute la logique métier (compteur, mode, etc.)
 * Utilise le nouveau VocabularyWordCard refactorisé
 * 
 * @param {object} currentWord - Mot actuel avec ses propriétés
 * @param {string} wordCounter - Compteur stylé (ex: "34 / 80")
 * @param {string} level - Niveau actuel
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 */
const VocabularyWordSection = memo(({
  currentWord,
  wordCounter,
  levelColor,
  showTranslation,
  onToggleTranslation,
}) => {
  const styles = createStyles(levelColor);
  
  return (
    <View style={styles.container}>
      {/* 🎯 COMPTEUR STYLÉ - Garde la logique existante */}
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
        </LinearGradient>
      </View>

      {/* 🎨 NOUVELLE CARTE DU MOT - Utilise la version refactorisée */}
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

VocabularyWordSection.displayName = "VocabularyWordSection";

export default VocabularyWordSection;