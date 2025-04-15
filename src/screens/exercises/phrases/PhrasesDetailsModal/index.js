import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView 
} from 'react-native';
import styles from './style';

/**
 * Modal pour afficher les détails détaillés d'une phrase
 * 
 * @param {Object} phrase - La phrase à afficher en détail
 * @param {boolean} isVisible - Indique si le modal est visible
 * @param {function} onClose - Fonction appelée pour fermer le modal
 * @param {string} levelColor - Couleur du niveau
 */
const PhrasesDetailsModal = ({ 
  phrase, 
  isVisible, 
  onClose, 
  levelColor 
}) => {
  if (!phrase) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView 
          style={[
            styles.modalContent, 
            { borderTopColor: levelColor }
          ]}
        >
          <Text style={styles.modalTitle}>Détails de la Phrase</Text>

          {/* Phrase originale */}
          <View style={styles.detailSection}>
            <Text style={[styles.detailLabel, { color: levelColor }]}>
              Phrase originale :
            </Text>
            <Text style={styles.detailText}>{phrase.english}</Text>
          </View>

          {/* Traduction */}
          <View style={styles.detailSection}>
            <Text style={[styles.detailLabel, { color: levelColor }]}>
              Traduction :
            </Text>
            <Text style={styles.detailText}>{phrase.translation}</Text>
          </View>

          {/* Contexte */}
          {phrase.context && (
            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: levelColor }]}>
                Contexte :
              </Text>
              <Text style={styles.detailText}>{phrase.context}</Text>
            </View>
          )}

          {/* Exemples */}
          {phrase.examples && phrase.examples.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: levelColor }]}>
                Exemples :
              </Text>
              {phrase.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleText}>
                    {example.english}
                  </Text>
                  <Text style={styles.exampleTranslation}>
                    {example.translation}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Notes supplémentaires */}
          {phrase.notes && (
            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: levelColor }]}>
                Notes :
              </Text>
              <Text style={styles.detailText}>{phrase.notes}</Text>
            </View>
          )}

          {/* Bouton de fermeture */}
          <TouchableOpacity 
            style={[
              styles.closeButton, 
              { backgroundColor: `${levelColor}10` }
            ]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: levelColor }]}>
              Fermer
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PhrasesDetailsModal;