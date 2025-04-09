// VocabularyExercise/VocabularyWordCard/index.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import Card from "../../../../components/ui/Card";
import styles from "./style";

/**
 * Carte de mot pour l'exercice de vocabulaire
 * Utilise le composant Card générique
 */
const VocabularyWordCard = ({
  word,
  translation,
  definition,
  example,
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  // Contenu personnalisé pour le header (pour avoir un fond coloré)
  const customHeader = (
    <View style={[styles.wordHeader, { backgroundColor: `${levelColor}15` }]}>
      <Text style={styles.wordText}>{word}</Text>
    </View>
  );

  return (
    <Card
      withShadow
      borderRadius={15}
      contentStyle={styles.cardContent}
      style={styles.card}
    >
      {/* Header personnalisé pour le mot */}
      {customHeader}

      {/* Section de traduction avec toggle */}
      <Pressable
        style={styles.translationToggleContainer}
        onPress={onToggleTranslation}
        android_ripple={{ color: `${levelColor}10` }}
      >
        {showTranslation ? (
          <View style={styles.translationContainer}>
            <Text style={[styles.translation, { color: levelColor }]}>
              {translation}
            </Text>
            <Text style={styles.toggleHint}>(Tap to hide)</Text>
          </View>
        ) : (
          <View
            style={[
              styles.translationPlaceholder,
              { borderColor: `${levelColor}30` },
            ]}
          >
            <Text
              style={[styles.translationPlaceholderText, { color: levelColor }]}
            >
              Tap to reveal translation
            </Text>
          </View>
        )}
      </Pressable>

      {/* Section définition */}
      <View style={styles.contentSection}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionDot, { backgroundColor: levelColor }]} />
          <Text style={styles.sectionTitle}>Definition</Text>
        </View>
        <Text style={styles.sectionText}>{definition}</Text>
      </View>

      {/* Section exemple */}
      <View style={styles.contentSection}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionDot, { backgroundColor: levelColor }]} />
          <Text style={styles.sectionTitle}>Example</Text>
        </View>
        <Text style={styles.sectionText}>
          <Text style={styles.exampleText}>{example}</Text>
        </Text>
      </View>
    </Card>
  );
};

export default VocabularyWordCard;
