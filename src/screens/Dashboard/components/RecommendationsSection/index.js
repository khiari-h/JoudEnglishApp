import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant pour afficher les exercices recommandés
 */
const RecommendationsSection = ({
  recommendations = [],
  onSelectExercise,
  accentColor = "#3B82F6",
  title = "Recommandé pour vous"
}) => {
  // Si aucune recommandation n'est disponible
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  // Déterminer l'icône en fonction du type d'exercice
  const getExerciseIcon = (type) => {
    switch (type) {
      case "vocabulary":
        return "book-outline";
      case "grammar":
        return "pencil-outline";
      case "reading":
        return "reader-outline";
      case "chatbot":
        return "chatbubble-outline";
      case "error_correction":
        return "checkmark-circle-outline";
      case "phrases":
        return "text-outline";
      case "spelling":
        return "create-outline";
      default:
        return "document-text-outline";
    }
  };

  // Rendu d'un exercice recommandé
  const renderRecommendation = ({ item }) => {
    const icon = item.icon || getExerciseIcon(item.type);
    
    return (
      <TouchableOpacity
        style={styles.recommendationCard}
        onPress={() => onSelectExercise && onSelectExercise(item)}
        activeOpacity={0.7}
      >
        <View 
          style={[
            styles.iconContainer, 
            { backgroundColor: `${accentColor}15` }
          ]}
        >
          {typeof icon === 'string' && icon.includes('outline') ? (
            <Ionicons name={icon} size={24} color={accentColor} />
          ) : (
            <Text style={styles.emoji}>{icon}</Text>
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.exerciseTitle} numberOfLines={1}>
            {item.title}
          </Text>
          
          <View style={styles.tagContainer}>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
            
            <View style={[styles.levelTag, { backgroundColor: `${accentColor}20` }]}>
              <Text style={[styles.levelText, { color: accentColor }]}>
                {item.level}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color={accentColor} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default RecommendationsSection;