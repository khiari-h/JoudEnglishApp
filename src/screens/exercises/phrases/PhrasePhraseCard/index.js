// PhraseCard/index.js - VERSION COMPLÈTE

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../../components/ui/Card";
import createStyles from "./style";

/**
 * Carte de phrase pour l'exercice de phrases
 * Remplace PhrasePhraseCard + PhrasesDetailsModal
 * Utilise le mapping direct des données existantes
 */
const PhraseCard = ({
  phraseData,           // Structure existante de vos phrases
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  // Validation des données
  if (!phraseData) {
    return (
      <Card
        withShadow
        borderRadius={15}
        style={createStyles(levelColor).card}
      >
        <View style={createStyles(levelColor).loadingContainer}>
          <Text style={createStyles(levelColor).loadingText}>
            Chargement de la phrase...
          </Text>
        </View>
      </Card>
    );
  }

  // Générer les styles en fonction de la couleur du niveau
  const styles = createStyles(levelColor);

  // ✅ MAPPING de vos données existantes (aucun changement requis dans vos fichiers)
  const phrase = phraseData.english;                    // "Can you help me?"
  const translation = phraseData.translation;           // "Pouvez-vous m'aider ?"
  const example = phraseData.examples?.[0]?.english || ""; // Premier exemple
  const context = phraseData.context || "";             // Contexte si disponible

  return (
    <Card
      withShadow
      borderRadius={15}
      contentStyle={styles.cardContent}
      style={styles.card}
    >
      {/* Header avec la phrase principale */}
      <View style={styles.phraseHeader}>
        <Text style={styles.phraseText}>{phrase}</Text>
      </View>

      {/* Section de traduction avec toggle */}
      <View style={styles.translationSection}>
        {showTranslation ? (
          <View style={styles.translationContainer}>
            <Text style={styles.translation}>{translation}</Text>
            <TouchableOpacity
              style={styles.hideButton}
              onPress={onToggleTranslation}
              activeOpacity={0.7}
            >
              <Ionicons
                name="eye-off-outline"
                size={16}
                color={levelColor}
                style={styles.buttonIcon}
              />
              <Text style={styles.hideButtonText}>Masquer la traduction</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.revealButton}
            onPress={onToggleTranslation}
            activeOpacity={0.8}
          >
            <Ionicons
              name="eye-outline"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.revealButtonText}>Voir la traduction</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section exemple - affiché seulement s'il existe */}
      {example && (
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Exemple</Text>
          </View>
          <Text style={styles.sectionText}>
            <Text style={styles.exampleText}>{example}</Text>
          </Text>
        </View>
      )}

      {/* Section contexte - si disponible dans vos données */}
      {context && (
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Contexte</Text>
          </View>
          <Text style={styles.sectionText}>
            <Text style={styles.contextText}>{context}</Text>
          </Text>
        </View>
      )}
    </Card>
  );
};

export default PhraseCard;