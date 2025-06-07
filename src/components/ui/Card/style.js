// src/components/ui/Card/style.js - Enhanced pour mobile
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // =================== CONTAINER DE BASE ===================
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'relative',
  },
  containerCompact: {
    borderRadius: 10, // Plus petit en mode compact
  },

  // =================== OMBRES APP NATIVE ===================
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, // Plus subtil pour app native
        shadowRadius: 8,
      },
      android: {
        // Géré par elevated
      },
    }),
  },
  elevated: {
    ...Platform.select({
      android: {
        elevation: 2, // Réduit pour app native
      },
    }),
  },

  // =================== BORDURES ===================
  bordered: {
    borderWidth: 0.5, // Plus fin
    borderColor: '#E5E7EB',
  },
  withSideBorder: {
    borderLeftWidth: 3, // Réduit pour mobile
    borderLeftColor: '#5E60CE',
  },

  // =================== MARGES ===================
  margin: {
    marginVertical: 6, // Réduit pour mobile
    marginHorizontal: 0,
  },

  // =================== HEADER AMÉLIORÉ ===================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12, // Réduit de 14
    paddingHorizontal: 16,
    borderBottomWidth: 0, // Supprimé pour app native
  },
  headerCompact: {
    paddingVertical: 8, // Encore plus compact
  },
  headerColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  // =================== HEADER LEFT ===================
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLeftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },

  // =================== ICÔNES HEADER ===================
  headerIconContainer: {
    width: 32, // Réduit de 36
    height: 32,
    borderRadius: 8, // Réduit de 10
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Réduit de 12
  },
  headerIconContainerCompact: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 8,
  },
  headerIcon: {
    marginRight: 10,
  },

  // =================== TEXTE HEADER ===================
  headerTextContainer: {
    flex: 1,
  },
  
  // =================== TITRE AVEC BADGE ===================
  titleWithBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 0.1,
    marginRight: 8, // Espace avant badge
  },
  titleCompact: {
    fontSize: 15,
  },
  
  // =================== BADGE DANS TITRE ===================
  titleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    // Ombre subtile pour le badge
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  titleBadgeCompact: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    minWidth: 20,
  },
  titleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  titleBadgeTextCompact: {
    fontSize: 11,
  },

  // =================== SOUS-TITRE ===================
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 1,
    lineHeight: 18,
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 16,
  },

  // =================== HEADER RIGHT ===================
  headerRight: {
    marginLeft: 12,
    alignItems: 'center',
  },
  rightIconText: {
    fontSize: 22,
  },
  rightIconTextCompact: {
    fontSize: 20,
  },

  // =================== CONTENU ===================
  content: {
    flexGrow: 1,
  },
  contentPadding: {
    padding: 16,
  },
  contentCompact: {
    padding: 12, // Réduit pour mode compact
  },

  // =================== FOOTER ===================
  footer: {
    paddingVertical: 10, // Réduit de 12
    paddingHorizontal: 16,
    borderTopWidth: 0.5, // Plus fin
    borderTopColor: '#F3F4F6',
  },

  // =================== ÉTATS ===================
  activeCard: {
    borderColor: '#5E60CE',
    borderWidth: 1,
  },

  // =================== BADGES CORNER ===================
  cardBadge: {
    position: 'absolute',
    top: 8, // Réduit de 10
    right: 8, // Réduit de 10
    paddingHorizontal: 6, // Réduit de 8
    paddingVertical: 2, // Réduit de 3
    borderRadius: 6, // Réduit de 8
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10, // Réduit de 11
    fontWeight: '600',
    color: '#5E60CE',
  },

  // =================== OVERLAY ===================
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});

export default styles;