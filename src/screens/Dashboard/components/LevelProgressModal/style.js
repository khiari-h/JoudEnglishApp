import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  
  // Information sur le niveau actif
  activeInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  activeInfoText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 4,
  },
  activeInfoBold: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  activeInfoDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  
  // Liste des niveaux
  levelsScrollView: {
    paddingHorizontal: 16,
  },
  
  // Carte de niveau
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelCardContent: {
    flex: 1,
    marginRight: 12,
  },
  
  // En-tête de la carte avec indicateur d'actif
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activeIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Barre de progression
  levelProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  levelProgressText: {
    fontSize: 12,
    color: '#6B7280',
    width: 35,
  },
  
  // Badge de niveau
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  
  // Bouton de fermeture de la modal
  closeModalButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;