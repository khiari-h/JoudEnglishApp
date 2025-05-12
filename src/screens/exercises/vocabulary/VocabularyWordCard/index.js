// VocabularyExercise/VocabularyWordCard/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../../components/ui/Card";
import createStyles from "./style";

/**
 * Carte de mot pour l'exercice de vocabulaire
 * Version utilisant les styles générés dynamiquement
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
  // Générer les styles en fonction de la couleur du niveau
  const styles = createStyles(levelColor);

  // Contenu personnalisé pour le header avec le mot en évidence
  const customHeader = (
    <View style={styles.wordHeader}>
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

      {/* Section de traduction avec CTA explicite */}
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
              <Text style={styles.hideButtonText}>Hide Translation</Text>
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
            <Text style={styles.revealButtonText}>Reveal Translation</Text>
          </TouchableOpacity>
        )}
      </View>


      {/* Section exemple */}
      <View style={styles.contentSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
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
