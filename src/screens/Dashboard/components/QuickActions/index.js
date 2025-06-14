// src/components/modals/RevisionPreferencesModal.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

/**
 * 🎯 Modal pour choisir le style de révision
 * S'affiche lors du premier déclenchement à 25 mots
 */
const RevisionPreferencesModal = ({
  visible = false,
  onChoice,
  onSkip
}) => {
  const [selectedStyle, setSelectedStyle] = useState('standard'); // Défaut Standard

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
    // Utiliser Standard par défaut
    const defaultStyle = revisionStyles.find(s => s.id === 'standard');
    onSkip?.(defaultStyle.frequency, defaultStyle.questionsCount, 'standard');
  };

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
          <LinearGradient
            colors={['#8B5CF6', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerIcon}>🎉</Text>
            <Text style={styles.headerTitle}>Félicitations !</Text>
            <Text style={styles.headerSubtitle}>
              25 mots appris ! Choisissez votre style de révision :
            </Text>
          </LinearGradient>

          <View style={styles.content}>
            {/* Section Styles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                🎯 Choisissez votre style
              </Text>
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
                    onPress={() => setSelectedStyle(style.id)}
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
              <View style={[styles.summary, { backgroundColor: '#FEF3C7', borderLeftColor: '#F59E0B' }]}>
                <Text style={[styles.summaryTitle, { color: '#92400E' }]}>
                  ⚠️ Révision désactivée
                </Text>
                <Text style={[styles.summaryText, { color: '#78350F' }]}>
                  • Aucune révision automatique
                </Text>
                <Text style={[styles.summaryText, { color: '#78350F' }]}>
                  • Bouton révision manuelle disponible
                </Text>
                <Text style={[styles.summaryNote, { color: '#92400E' }]}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    width: width * 0.9,
    maxWidth: 420,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },

  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },

  content: {
    padding: 20,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  stylesContainer: {
    gap: 12,
  },

  styleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    position: 'relative',
  },

  styleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  styleIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },

  styleInfo: {
    flex: 1,
  },

  styleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  styleSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  styleDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  summary: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },

  summaryHighlight: {
    fontWeight: '700',
    color: '#3B82F6',
  },

  summaryNote: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
  },

  buttons: {
    gap: 12,
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  skipButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  skipButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
};

export default RevisionPreferencesModal;