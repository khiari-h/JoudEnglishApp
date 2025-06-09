// SpellingRule/index.js - VERSION REFACTORISÉE (HeroCard + ContentSection)

import React from "react";
import { View } from "react-native";
import HeroCard from "../../../../../components/ui/HeroCard";
import ContentSection from "../../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * 📚 SpellingRule - Version Refactorisée avec composants génériques
 * Remplace le composant custom par HeroCard + ContentSection
 * 
 * @param {string} rule - Règle d'orthographe à apprendre
 * @param {string} instruction - Instruction pour l'exercice
 * @param {string} levelColor - Couleur du niveau
 */
const SpellingRule = ({ 
  rule, 
  instruction, 
  levelColor = "#3b82f6" 
}) => {
  const styles = createStyles(levelColor);

  return (
    <View style={styles.container}>
      {/* 📚 SECTION RÈGLE - Mise en avant */}
      <ContentSection
        title="Règle d'orthographe"
        content={rule}
        levelColor={levelColor}
        backgroundColor="#F0F9FF"
        style={styles.ruleSection}
        isHighlighted={true}
      />
      
      {/* 📝 SECTION INSTRUCTIONS */}
      <ContentSection
        title="Instructions"
        content={instruction}
        levelColor={levelColor}
        backgroundColor="#F8F9FA"
        style={styles.instructionSection}
      />
    </View>
  );
};

export default SpellingRule;