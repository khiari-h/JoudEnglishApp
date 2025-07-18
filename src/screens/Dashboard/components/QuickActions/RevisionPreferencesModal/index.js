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

  const handleConfirm = useCallback(() => {
    const style = revisionStyles.find(s => s.id === selectedStyle);
    onChoice?.(style.frequency, style.questionsCount, selectedStyle);
  }, [onChoice, revisionStyles, selectedStyle]);

  const handleSkip = useCallback(() => {
    const defaultStyle = revisionStyles.find(s => s.id === 'standard');
    onSkip?.(defaultStyle.frequency, defaultStyle.questionsCount, 'standard');
  }, [onSkip, revisionStyles]);

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
          <ModalHeader onSkip={onSkip} localStyles={styles} />
          <ModalContentSection
            localStyles={styles}
            revisionStyles={revisionStyles}
            selectedStyle={selectedStyle}
            handleStylePress={handleStylePress}
            handleConfirm={handleConfirm}
            handleSkip={handleSkip}
          />
        </View>
      </View>
    </Modal>
  );
};

// Sous-composant ModalHeader
const ModalHeader = ({ onSkip, localStyles }) => (
  <LinearGradient
    colors={['#8B5CF6', '#A855F7']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={localStyles.header}
  >
    <TouchableOpacity
      style={localStyles.closeButton}
      onPress={onSkip}
      activeOpacity={0.7}
    >
      <Text style={localStyles.closeButtonText}>×</Text>
    </TouchableOpacity>
    <Text style={localStyles.headerIcon}>🎉</Text>
    <Text style={localStyles.headerTitle}>Félicitations !</Text>
    <Text style={localStyles.headerSubtitle}>
      25 mots appris ! Choisissez votre style de révision :
    </Text>
  </LinearGradient>
);

// Sous-composant ModalButtons
const ModalButtons = ({ revisionStyles, selectedStyle, handleConfirm, handleSkip, localStyles }) => (
  <>
    <TouchableOpacity
      style={[
        localStyles.confirmButton,
        { backgroundColor: revisionStyles.find(s => s.id === selectedStyle)?.color || '#8B5CF6' }
      ]}
      onPress={handleConfirm}
      activeOpacity={0.8}
    >
      <Text style={localStyles.confirmButtonText}>
        ✅ Confirmer mon choix
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={localStyles.skipButton}
      onPress={handleSkip}
      activeOpacity={0.7}
    >
      <Text style={localStyles.skipButtonText}>
        ⏭️ Utiliser Standard par défaut
      </Text>
    </TouchableOpacity>
  </>
);

const RevisionStylesList = ({ revisionStyles, selectedStyle, handleStylePress, localStyles }) => (
  <View style={localStyles.stylesContainer}>
    {revisionStyles.map((style) => (
      <TouchableOpacity
        key={style.id}
        style={[
          localStyles.styleCard,
          selectedStyle === style.id && {
            borderColor: style.color,
            backgroundColor: `${style.color}10`
          }
        ]}
        onPress={handleStylePress(style.id)}
        activeOpacity={0.7}
      >
        <View style={localStyles.styleHeader}>
          <Text style={localStyles.styleIcon}>{style.icon}</Text>
          <View style={localStyles.styleInfo}>
            <Text style={[
              localStyles.styleTitle,
              selectedStyle === style.id && { color: style.color }
            ]}>
              {style.title}
            </Text>
            <Text style={localStyles.styleSubtitle}>{style.subtitle}</Text>
          </View>
        </View>
        <Text style={localStyles.styleDescription}>{style.description}</Text>
        {selectedStyle === style.id && (
          <View style={[localStyles.selectedBadge, { backgroundColor: style.color }]}>
            <Text style={localStyles.selectedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    ))}
  </View>
);

const SummarySection = ({ selectedStyle, revisionStyles, localStyles }) => (
  selectedStyle !== 'none' ? (
    <View style={localStyles.summary}>
      <Text style={localStyles.summaryTitle}>📋 Votre configuration :</Text>
      <Text style={localStyles.summaryText}>
        • Style : <Text style={localStyles.summaryHighlight}>
          {revisionStyles.find(s => s.id === selectedStyle)?.title}
        </Text>
      </Text>
      <Text style={localStyles.summaryText}>
        • Révision tous les <Text style={localStyles.summaryHighlight}>
          {revisionStyles.find(s => s.id === selectedStyle)?.frequency} mots
        </Text>
      </Text>
      <Text style={localStyles.summaryText}>
        • <Text style={localStyles.summaryHighlight}>
          {revisionStyles.find(s => s.id === selectedStyle)?.questionsCount} questions
        </Text> par session
      </Text>
      <Text style={localStyles.summaryNote}>
        💡 Vous pourrez modifier ces paramètres plus tard
      </Text>
    </View>
  ) : (
    <View style={[localStyles.summary, localStyles.summaryWarning]}>
      <Text style={[localStyles.summaryTitle, localStyles.summaryTitleWarning]}>
        ⚠️ Révision désactivée
      </Text>
      <Text style={[localStyles.summaryText, localStyles.summaryTextWarning]}>
        • Aucune révision automatique
      </Text>
      <Text style={[localStyles.summaryText, localStyles.summaryTextWarning]}>
        • Bouton révision manuelle disponible
      </Text>
      <Text style={[localStyles.summaryNote, localStyles.summaryNoteWarning]}>
        💡 Réactivable à tout moment
      </Text>
    </View>
  )
);

// Sous-composant pour le contenu du modal (ScrollView)
const ModalContentSection = ({ localStyles, revisionStyles, selectedStyle, handleStylePress, handleConfirm, handleSkip }) => (
  <ScrollView 
    style={localStyles.scrollContainer}
    contentContainerStyle={localStyles.scrollContent}
    showsVerticalScrollIndicator={false}
  >
    <View style={localStyles.section}>
      <Text style={localStyles.sectionTitle}>🏆 Choisissez votre style</Text>
      <Text style={localStyles.sectionDescription}>
        Sélectionnez la fréquence qui vous convient le mieux
      </Text>
      <RevisionStylesList 
        revisionStyles={revisionStyles} 
        selectedStyle={selectedStyle} 
        handleStylePress={handleStylePress} 
        localStyles={localStyles} 
      />
    </View>
    <SummarySection 
      selectedStyle={selectedStyle} 
      revisionStyles={revisionStyles} 
      localStyles={localStyles} 
    />
    <ModalButtons
      revisionStyles={revisionStyles}
      selectedStyle={selectedStyle}
      handleConfirm={handleConfirm}
      handleSkip={handleSkip}
      localStyles={localStyles}
    />
  </ScrollView>
);

export default RevisionPreferencesModal;