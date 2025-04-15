import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Carte pour afficher une phrase
 * 
 * @param {Object} phrase - La phrase à afficher
 * @param {function} onDetailsPress - Fonction appelée quand on veut voir les détails
 * @param {string} levelColor - Couleur du niveau
 */
const PhrasePhraseCard = ({ 
  phrase, 
  onDetailsPress, 
  levelColor 
}) => {
  return (
    <View style={styles.phraseCard}>
      <Text style={styles.phraseEnglish}>{phrase.english}</Text>
      <Text style={styles.phraseTranslation}>{phrase.translation}</Text>

      <TouchableOpacity 
        style={[
          styles.detailsButton, 
          { backgroundColor: `${levelColor}10` }
        ]}
        onPress={() => onDetailsPress(phrase)}
      >
        <Text style={[styles.detailsButtonText, { color: levelColor }]}>
          Voir les détails
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhrasePhraseCard;