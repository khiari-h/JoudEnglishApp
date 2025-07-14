import { View, Text } from 'react-native';
import Modal from '../../../../components/ui/Modal';
import styles from './style';

/**
 * Modal pour afficher les détails détaillés d'une phrase
 * Utilise le composant Modal personnalisé
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
  // Si pas de phrase, ne rien afficher
  if (!phrase) return null;

  // Contenu du modal
  const renderContent = () => (
    <View style={styles.modalInnerContent}>
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
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      title="Détails de la phrase"
      position="center"
      animationType="fade"
      scrollable
      closeOnBackdropPress
      showCloseButton
      width="90%"
      maxHeight="80%"
      contentContainerStyle={styles.modalCustomContainer}
      headerStyle={{ borderBottomColor: levelColor, borderBottomWidth: 2 }}
      bodyStyle={styles.modalCustomBody}
    >
      {renderContent()}
    </Modal>
  );
};

export default PhrasesDetailsModal;
