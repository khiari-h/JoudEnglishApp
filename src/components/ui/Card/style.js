// src/components/ui/Card/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 12, // Légèrement plus arrondi
    position: 'relative',
  },
  
  // Styles d'ombre améliorés
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        // L'élévation est gérée via elevated
      },
    }),
  },
  
  elevated: {
    ...Platform.select({
      android: {
        elevation: 4, // Augmenté légèrement pour plus de profondeur
      },
    }),
  },
  
  // Style de bordure amélioré
  bordered: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  // Style pour la bordure latérale
  withSideBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#5E60CE', // À remplacer par la couleur du thème
  },
  
  // Marge ajustée
  margin: {
    marginVertical: 10,
    marginHorizontal: 0,
  },
  
  // En-tête amélioré
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14, // Un peu plus d'espace
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  
  // Conteneur gauche
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  // Style pour l'icône dans un conteneur
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(94, 96, 206, 0.1)', // À remplacer par la couleur du thème
  },
  
  headerIcon: {
    // Style pour l'icône sans conteneur
    marginRight: 12,
  },
  
  // Conteneur de texte
  headerTextContainer: {
    flex: 1,
  },
  
  // Titre amélioré
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 0.2,
  },
  
  // Sous-titre amélioré
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  
  // Partie droite du header
  headerRight: {
    marginLeft: 12,
  },
  
  // Contenu
  content: {
    flexGrow: 1,
  },
  
  contentPadding: {
    padding: 16,
  },
  
  // Footer amélioré
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  
  // Style pour les cartes avec état "actif"
  activeCard: {
    borderColor: '#5E60CE', // À remplacer par la couleur du thème
    borderWidth: 1,
  },
  
  // Badge pour la carte (à positionner où nécessaire)
  cardBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(94, 96, 206, 0.1)', // À remplacer par la couleur du thème
  },
  
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5E60CE', // À remplacer par la couleur du thème
  },
});

export default styles;