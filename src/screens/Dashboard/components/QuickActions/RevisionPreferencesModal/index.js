// src/components/modals/RevisionPreferencesModal/index.js
import { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';

/**
 * 🎯 Modal pour choisir le style de révision
 * S'affiche lors du premier déclenchement à 25 mots
 */
const RevisionPreferencesModal = ({
  visible = false,
  onChoice,
  onSkip
}) => {
  const [selectedStyle, setSelectedStyle] = useState('standard');

  // 🎯 Les 4 styles de révision
  const revisionStyles = [
    {
      id: 'light',
      title: '📚 Révision Light',
      subtitle: 'Tous les 25 mots, 5 questions',
      description: 'Idéal pour maintenir sans effort',
      frequency: 25,
      questionsCount: 5,
      color: '#10B981',
      icon: '📚'
    },
    {
      id: 'standard',
      title: '⚡ Révision Standard', 
      subtitle: 'Tous les 35 mots, 8 questions',
      description: 'Équilibre parfait effort/résultats',
      frequency: 35,
      questionsCount: 8,
      color: '#3B82F6',
      icon: '⚡'
    },
    {
      id: 'intensive',
      title: '🔥 Révision Intensive',
      subtitle: 'Tous les 50 mots, 12 questions', 
      description: 'Maximum de rétention mémoire',
      frequency: 50,
      questionsCount: 12,
      color: '#EF4444',
      icon: '🔥'
    },
    {
      id: 'none',
      title: '❌ Pas de révision auto',
      subtitle: 'Révision manuelle uniquement',
      description: 'Vous gérez vos révisions',
      frequency: null,
      questionsCount: 0,
      color: '#6B7280',
      icon: '❌'
    }
  ];

  const handleConfirm = () => {
    const style = revisionStyles.find(s => s.id === selectedStyle);
    onChoice?.(style.frequency, style.questionsCount, selectedStyle);
  };

  const handleSkip = () => {
    const defaultStyle = revisionStyles.find(s => s.id === 'standard');
    onSkip?.(defaultStyle.frequency, defaultStyle.questionsCount, 'standard');
  };

  const handleStylePress = useCallback((id) => () => setSelectedStyle(id), []);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <LinearGradient
            colors={['#8B5CF6', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            {/* Bouton close */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onSkip}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.headerIcon}>🎉</Text>
            <Text style={styles.headerTitle}>Félicitations !</Text>
            <Text style={styles.headerSubtitle}>
              25 mots appris ! Choisissez votre style de révision :
            </Text>
          </LinearGradient>

          <View style={styles.content}>
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Styles */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎯 Choisissez votre style</Text>
                <Text style={styles.sectionDescription}>
                  Sélectionnez la fréquence qui vous convient le mieux
                </Text>

                <View style={styles.stylesContainer}>
                  {revisionStyles.map((style) => (
                    <TouchableOpacity
                      key={style.id}
                      style={[
                        styles.styleCard,
                        selectedStyle === style.id && {
                          borderColor: style.color,
                          backgroundColor: `${style.color}10`
                        }
                      ]}
                      onPress={handleStylePress(style.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.styleHeader}>
                        <Text style={styles.styleIcon}>{style.icon}</Text>
                        <View style={styles.styleInfo}>
                          <Text style={[
                            styles.styleTitle,
                            selectedStyle === style.id && { color: style.color }
                          ]}>
                            {style.title}
                          </Text>
                          <Text style={styles.styleSubtitle}>
                            {style.subtitle}
                          </Text>
                        </View>
                      </View>
                      
                      <Text style={styles.styleDescription}>
                        {style.description}
                      </Text>
                      
                      {selectedStyle === style.id && (
                        <View style={[styles.selectedBadge, { backgroundColor: style.color }]}>
                          <Text style={styles.selectedText}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Résumé du choix */}
              {selectedStyle !== 'none' && (
                <View style={styles.summary}>
                  <Text style={styles.summaryTitle}>📋 Votre configuration :</Text>
                  <Text style={styles.summaryText}>
                    • Style : <Text style={styles.summaryHighlight}>
                      {revisionStyles.find(s => s.id === selectedStyle)?.title}
                    </Text>
                  </Text>
                  <Text style={styles.summaryText}>
                    • Révision tous les <Text style={styles.summaryHighlight}>
                      {revisionStyles.find(s => s.id === selectedStyle)?.frequency} mots
                    </Text>
                  </Text>
                  <Text style={styles.summaryText}>
                    • <Text style={styles.summaryHighlight}>
                      {revisionStyles.find(s => s.id === selectedStyle)?.questionsCount} questions
                    </Text> par session
                  </Text>
                  <Text style={styles.summaryNote}>
                    💡 Vous pourrez modifier ces paramètres plus tard
                  </Text>
                </View>
              )}

              {selectedStyle === 'none' && (
                <View style={[styles.summary, styles.summaryWarning]}>
                  <Text style={[styles.summaryTitle, styles.summaryTitleWarning]}>
                    ⚠️ Révision désactivée
                  </Text>
                  <Text style={[styles.summaryText, styles.summaryTextWarning]}>
                    • Aucune révision automatique
                  </Text>
                  <Text style={[styles.summaryText, styles.summaryTextWarning]}>
                    • Bouton révision manuelle disponible
                  </Text>
                  <Text style={[styles.summaryNote, styles.summaryNoteWarning]}>
                    💡 Réactivable à tout moment
                  </Text>
                </View>
              )}

              {/* Boutons */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    { backgroundColor: revisionStyles.find(s => s.id === selectedStyle)?.color || '#8B5CF6' }
                  ]}
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmButtonText}>
                    ✅ Confirmer mon choix
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={handleSkip}
                  activeOpacity={0.7}
                >
                  <Text style={styles.skipButtonText}>
                    ⏭️ Utiliser Standard par défaut
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RevisionPreferencesModal;