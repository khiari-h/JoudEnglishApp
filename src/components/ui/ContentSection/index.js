// src/components/ui/ContentSection/index.js
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Card from "../Card";
import createStyles from "./style";

/**
 * 📝 ContentSection - Composant générique pour sections de contenu
 * Usage : Examples, Context, Rules, Explanations, etc.
 * 
 * @param {string} title - Titre de la section (ex: "Example", "Context", "Rule")
 * @param {string} content - Contenu principal de la section
 * @param {string} levelColor - Couleur du niveau
 * @param {string} backgroundColor - Couleur de fond (optionnel)
 * @param {boolean} isItalic - Mettre le contenu en italique
 * @param {boolean} showIcon - Afficher l'icône/dot coloré
 * @param {object} containerStyle - Style personnalisé pour le container
 * @param {React.ReactNode} children - Éléments enfants à rendre
 */
const ContentSection = ({
  title = "Content",
  content,
  levelColor = "#5E60CE",
  backgroundColor,
  isItalic = false,
  showIcon = true,
  containerStyle = {},
  children,
}) => {
  const styles = createStyles(levelColor, backgroundColor);

  // Ne pas rendre si pas de contenu et pas d'enfants
  if (!content && !children) return null;

  return (
    <Card
      withShadow
      borderRadius={18}
      style={[styles.card, containerStyle]}
      contentStyle={styles.cardContent}
    >
      {/* Header avec titre et ligne décorative */}
      <View style={styles.header}>
        {showIcon && (
          <View style={[styles.iconDot, { backgroundColor: levelColor }]} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.decorativeLine} />
      </View>
      
      {/* Contenu */}
      {content ? (
        <Text style={[styles.contentText, isItalic && styles.italicText]}>
          {content}
        </Text>
      ) : null}
      {children}
    </Card>
  );
};

// PropTypes pour la validation des props
ContentSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  levelColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  isItalic: PropTypes.bool,
  showIcon: PropTypes.bool,
  containerStyle: PropTypes.object,
  children: PropTypes.node,
};

// Valeurs par défaut
ContentSection.defaultProps = {
  title: "Content",
  content: null,
  levelColor: "#5E60CE",
  backgroundColor: null,
  isItalic: false,
  showIcon: true,
  containerStyle: {},
  children: null,
};

export default ContentSection;