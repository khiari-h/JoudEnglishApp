import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

export default StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 40,
  },
  
  // Styles de l'en-tête avec dégradé
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 30 : STATUS_BAR_HEIGHT + 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#6366F1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  headerContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  
  // Styles pour l'illustration
  illustrationContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  illustrationPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  
  // Styles pour la section d'introduction
  introSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  
  // Styles pour la section des niveaux
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  levelsContainer: {
    paddingHorizontal: 24,
  },
  
  // Styles pour les cartes de niveau
  levelCard: {
    marginBottom: 20,
  },
  cardContent: {
    padding: 5,
  },
  levelDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  
  // Styles pour les statistiques
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    marginRight: 6,
  },
  statText: {
    fontSize: 13,
    color: '#4B5563',
  },
  
  // Styles pour la barre de progression
  progressWrapper: {
    marginBottom: 20,
  },
  progressBar: {
    marginTop: 0,
  },
  
  // Styles pour le bouton
  startButton: {
    marginTop: 5,
  },
});