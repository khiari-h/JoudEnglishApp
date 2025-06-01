import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Changement principal ici
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajout d'un fond semi-transparent
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    width: SCREEN_WIDTH, // Utilisation de la largeur totale de l'écran
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 }, // Ombre vers le haut
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 10, // Élévation plus prononcée
      },
    }),
  },
  centerPosition: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 24,
  },
  bottomPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH, // Largeur totale de l'écran
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Safe area pour iOS
  },
  topPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH, // Largeur totale de l'écran
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === 'ios' ? 44 : 16, // Safe area pour iOS
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
  scrollableBody: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  scrollableContent: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  keyboardAvoidingView: {
    width: '100%',
    justifyContent: 'flex-end', // Changement pour aligner en bas
    alignItems: 'center',
  },
});

export default styles;
