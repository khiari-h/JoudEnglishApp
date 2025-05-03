import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import styles from "./style";

/**
 * Composant pour afficher le parcours d'apprentissage avec 
 * mise en évidence du niveau actif sélectionné par l'utilisateur
 */
const LearningPathCompact = ({
  levels = [],
  currentLevel = "A1",
  onSelectLevel,
  onViewProgress,
  primaryColor = "#3B82F6"
}) => {
  // Si aucun niveau n'est fourni, utiliser les niveaux CECRL par défaut
  const defaultLevels = [
    { id: "A1", color: "#22C55E", isActive: currentLevel === "A1" },
    { id: "A2", color: "#10B981", isActive: currentLevel === "A2" },
    { id: "B1", color: "#3B82F6", isActive: currentLevel === "B1" },
    { id: "B2", color: "#8B5CF6", isActive: currentLevel === "B2" },
    { id: "C1", color: "#EC4899", isActive: currentLevel === "C1" },
    { id: "C2", color: "#F43F5E", isActive: currentLevel === "C2" },
  ];

  const displayLevels = levels.length > 0 ? levels : defaultLevels;
  
  // Trouver l'index du niveau actuel
  const currentLevelIndex = displayLevels.findIndex(level => 
    level.id === currentLevel || level.isActive
  );

  // Texte explicatif selon le niveau actuel
  const getLevelDescription = () => {
    switch (currentLevel) {
      case "A1":
        return "Niveau débutant - Communication de base";
      case "A2":
        return "Niveau élémentaire - Expressions courantes";
      case "B1":
        return "Niveau intermédiaire - Communication claire";
      case "B2":
        return "Niveau intermédiaire avancé - Sujets complexes";
      case "C1":
        return "Niveau avancé - Expression fluide";
      case "C2":
        return "Niveau maîtrise - Proche du locuteur natif";
      default:
        return "Choisissez votre niveau d'apprentissage";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Parcours d'apprentissage</Text>
        <TouchableOpacity onPress={onViewProgress}>
          <Text style={[styles.actionText, { color: primaryColor }]}>
            Voir détails
          </Text>
        </TouchableOpacity>
      </View>
      
      <Card style={styles.card}>
        {/* Information sur le niveau actif */}
        <View style={styles.activeInfoContainer}>
          <Text style={styles.activeInfoLabel}>Niveau actif :</Text>
          <View 
            style={[
              styles.activeInfoBadge, 
              { backgroundColor: primaryColor }
            ]}
          >
            <Text style={styles.activeInfoText}>{currentLevel}</Text>
          </View>
        </View>
        
        <Text style={styles.levelDescription}>
          {getLevelDescription()}
        </Text>
        
        {/* Niveaux de langue */}
        <View style={styles.levelsContainer}>
          {displayLevels.map((level, index) => {
            // Déterminer l'état du niveau (actif, complété, ou futur)
            const isActive = level.id === currentLevel || level.isActive;
            const isCompletedLevel = index < currentLevelIndex;
            
            let circleStyle;
            let textStyle;
            
            if (isActive) {
              circleStyle = [styles.levelCircle, { backgroundColor: level.color || primaryColor }];
              textStyle = styles.activeLevelText;
            } else if (isCompletedLevel) {
              circleStyle = [styles.levelCircle, { backgroundColor: `${level.color || primaryColor}40` }];
              textStyle = styles.completedLevelText;
            } else {
              circleStyle = [styles.levelCircle, styles.futureLevelCircle];
              textStyle = styles.futureLevelText;
            }
            
            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelButton}
                onPress={() => onSelectLevel && onSelectLevel(level.id)}
                activeOpacity={0.7}
              >
                <View style={circleStyle}>
                  <Text style={textStyle}>{level.id}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Ligne de progression */}
        <View style={styles.progressLineContainer}>
          <View style={styles.progressLineTrack} />
          <View 
            style={[
              styles.progressLineFill,
              { 
                width: `${((currentLevelIndex) / (displayLevels.length - 1)) * 100}%`,
                backgroundColor: primaryColor
              }
            ]} 
          />
        </View>
        
        {/* Bouton pour explorer le niveau actuel */}
        <Button
          title={`Explorer le niveau ${currentLevel}`}
          variant="filled"
          color={primaryColor}
          fullWidth
          rightIcon="arrow-forward-outline"
          onPress={() => onSelectLevel && onSelectLevel(currentLevel)}
          style={styles.exploreButton}
        />
      </Card>
    </View>
  );
};

export default LearningPathCompact;