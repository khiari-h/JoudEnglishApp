// SpellingCorrection/index.js - VERSION REFACTORISÉE (HeroCard + ContentSection)

import React from "react";
import { View } from "react-native";
import HeroCard from "../../../../../components/ui/HeroCard";
import ContentSection from "../../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * ✏️ SpellingCorrection - Version Refactorisée avec composants génériques
 * Remplace le composant custom par HeroCard + ContentSection
 * 
 * @param {string} wordToCorrect - Mot à corriger
 * @param {string} instruction - Instruction pour l'exercice
 * @param {string} levelColor - Couleur du niveau
 */
const SpellingCorrection = ({ 
  wordToCorrect, 
  instruction, 
  levelColor = "#3b82f6" 
}) => {
  const styles = createStyles(levelColor);

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - Mot à corriger */}
      <HeroCard 
        content={wordToCorrect}
        fontSize={32}
        levelColor={levelColor}
        showUnderline={true}
        style={styles.heroCard}
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

export default SpellingCorrection;