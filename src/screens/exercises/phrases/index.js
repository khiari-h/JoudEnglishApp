import React, { useMemo } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Importation des composants spécifiques
import PhrasesHeader from './PhrasesHeader';
import PhrasesCategorySelector from './PhrasesCategorySelector';
import PhrasesProgressBar from './PhrasesProgressBar';
import PhrasePhraseCard from './PhrasePhraseCard';
import PhrasesDetailsModal from './PhrasesDetailsModal';
import PhrasesNavigation from './PhrasesNavigation';

// Hooks personnalisés
import usePhrasesExerciseState from './hooks/usePhrasesExerciseState';
import usePhrasesProgress from './hooks/usePhrasesProgress';

// Utilitaires
import { 
  getPhrasesData, 
  getLevelColor 
} from '../../../utils/phrases/phrasesDataHelper';

// Styles
import styles from './style';

/**
 * Composant principal pour l'exercice de Phrases & Expressions
 */
const PhrasesExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level = 'A1' } = route.params || {};

  // Récupérer les données et la couleur du niveau
  const levelColor = getLevelColor(level);
  const phrasesData = useMemo(() => getPhrasesData(level), [level]);

  // Utiliser les hooks personnalisés
  const {
    loaded,
    saveLastPosition,
  } = usePhrasesProgress(level);

  const {
    categoryIndex,
    phraseIndex,
    selectedPhrase,
    showDetails,
    completionProgress,
    changeCategory,
    goToNextPhrase,
    goToPreviousPhrase,
    openPhraseDetails,
    closePhraseDetails,
    currentCategory,
    currentPhrases,
  } = usePhrasesExerciseState(level, phrasesData);

  // Afficher un indicateur de chargement si les données ne sont pas encore prêtes
  if (!loaded || !phrasesData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <PhrasesHeader
        level={level}
        onBackPress={() => navigation.goBack()}
        levelColor={levelColor}
      />
      
      {/* Sélecteur de catégories */}
      <PhrasesCategorySelector
        categories={phrasesData.categories}
        selectedIndex={categoryIndex}
        onSelectCategory={changeCategory}
        levelColor={levelColor}
      />
      
      {/* Barre de progression */}
      <PhrasesProgressBar
        progress={completionProgress}
        currentPhrase={phraseIndex + 1}
        totalPhrases={currentPhrases.length}
        levelColor={levelColor}
      />
      
      {/* Contenu de la phrase */}
      <View style={styles.contentContainer}>
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>
            {currentCategory.name}
          </Text>
        </View>

        <PhrasePhraseCard
          phrase={currentPhrases[phraseIndex]}
          onDetailsPress={openPhraseDetails}
          levelColor={levelColor}
        />
      </View>
      
      {/* Navigation */}
      <PhrasesNavigation
        onPrevious={goToPreviousPhrase}
        onNext={goToNextPhrase}
        disablePrevious={phraseIndex === 0}
        disableNext={phraseIndex === currentPhrases.length - 1}
        levelColor={levelColor}
      />
      
      {/* Modal de détails */}
      <PhrasesDetailsModal
        phrase={selectedPhrase}
        isVisible={showDetails}
        onClose={closePhraseDetails}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default PhrasesExercise;