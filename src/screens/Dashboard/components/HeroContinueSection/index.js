// src/screens/Dashboard/components/HeroContinueSection/index.js



import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

const HeroContinueSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  isLoading = false,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={accentColor} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Chargement...
            </Text>
          </View>
        </Card>
      </View>
    );
  }

  // État vide - première utilisation
  if (!lastActivity) {
    return (
      <View style={styles.container}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.content}>
            <Text style={styles.emoji}>🚀</Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Commencer l'apprentissage
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Choisissez votre premier exercice
            </Text>
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: accentColor }]}
              onPress={() => onPress?.('levelSelection')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Commencer ▶️</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }

  // Calculer progression simple
  const currentWord = (lastActivity.metadata?.word || 0) + 1;
  const totalWords = lastActivity.metadata?.totalWords || 15;
  const percentage = Math.round((currentWord / totalWords) * 100);

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.emoji}>📚</Text>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Reprendre
            </Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {lastActivity.title}
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}> 
            Niv {lastActivity.level || 1}
            {typeof lastActivity.metadata?.categoryIndex === 'number' ? ` • Catégorie ${lastActivity.metadata.categoryIndex + 1}` : ''}
            • Mot {currentWord}/{totalWords}
          </Text>

          {/* Barre de progression */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressTrack, { backgroundColor: `${accentColor}15` }]}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: accentColor
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: accentColor }]}>
              {percentage}%
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={() => onPress?.(lastActivity)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continuer ▶️</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default HeroContinueSection;