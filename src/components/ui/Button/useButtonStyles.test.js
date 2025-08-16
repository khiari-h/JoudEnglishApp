import { renderHook } from '@testing-library/react-hooks';
import useButtonStyles from '../../../src/components/ui/Button/useButtonStyles';
import styles from '../../../src/components/ui/Button/style';

// Mock du fichier de styles pour vérifier que les bons objets sont retournés
jest.mock('../../../src/components/ui/Button/style', () => ({
  // Styles de base
  button: {},
  contentContainer: {},
  // Styles de taille
  smallButton: { padding: 8 },
  mediumButton: { padding: 12 },
  largeButton: { padding: 16 },
  smallText: { fontSize: 14 },
  mediumText: { fontSize: 16 },
  largeText: { fontSize: 18 },
  // Styles de variant
  filled: {},
  outlined: { borderWidth: 1 },
  text: {},
  tonal: {},
  // Autres styles
  withElevation: { elevation: 2 },
  rounded: { borderRadius: 999 },
  fullWidth: { width: '100%' },
}));

// Constantes pour les couleurs
const PRIMARY_COLOR = '#5E60CE';
const DANGER_COLOR = '#EF4444';
const DISABLED_TEXT_COLOR = '#9CA3AF';
const DISABLED_BORDER_COLOR = '#D1D5DB';

describe('useButtonStyles', () => {

  // --- Tests de taille (size) ---
  it('devrait retourner les styles pour la taille "medium" par défaut', () => {
    const { result } = renderHook(() => useButtonStyles({}));
    expect(result.current.sizeStyles.button).toEqual(styles.mediumButton);
    expect(result.current.sizeStyles.text).toEqual(styles.mediumText);
    expect(result.current.sizeStyles.iconSize).toBe(20);
  });
  
  it('devrait retourner les styles pour la taille "large"', () => {
    const { result } = renderHook(() => useButtonStyles({ size: 'large' }));
    expect(result.current.sizeStyles.button).toEqual(styles.largeButton);
    expect(result.current.sizeStyles.iconSize).toBe(24);
  });

  // --- Tests de variante (variant) ---
  it('devrait retourner les styles pour la variante "outlined"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'outlined', color: 'primary' }));
    expect(result.current.variantStyles.button.borderColor).toBe(PRIMARY_COLOR);
    expect(result.current.variantStyles.text.color).toBe(PRIMARY_COLOR);
  });
  
  it('devrait retourner les styles pour la variante "text"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'text', color: 'danger' }));
    expect(result.current.variantStyles.button.backgroundColor).toBe('transparent');
    expect(result.current.variantStyles.text.color).toBe(DANGER_COLOR);
  });
  
  it('devrait retourner les styles pour la variante "tonal"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'tonal', color: 'secondary' }));
    expect(result.current.variantStyles.text.color).toBe('#6B7280');
  });

  it('devrait retourner les styles pour la variante "icon"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'icon', size: 'large', color: 'primary' }));
    expect(result.current.variantStyles.icon.color).toBe('primary'); // Notez que le mock de styles peut renvoyer 'primary' au lieu du code couleur
    expect(result.current.variantStyles.button.padding).toBe(0);
  });
  
  // --- Tests des états (disabled) ---
  it('devrait retourner les styles désactivés pour la variante "outlined"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'outlined', disabled: true }));
    expect(result.current.variantStyles.button.borderColor).toBe(DISABLED_BORDER_COLOR);
    expect(result.current.variantStyles.text.color).toBe(DISABLED_TEXT_COLOR);
  });
  
  it('devrait retourner les styles désactivés pour la variante "text"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'text', disabled: true }));
    expect(result.current.variantStyles.text.color).toBe(DISABLED_TEXT_COLOR);
  });
  
  it('devrait retourner les styles désactivés pour la variante "filled"', () => {
    const { result } = renderHook(() => useButtonStyles({ variant: 'filled', disabled: true }));
    expect(result.current.variantStyles.button.backgroundColor).toBe('#E5E7EB');
    expect(result.current.variantStyles.text.color).toBe('white');
  });

  // --- Tests des autres props ---
  it('devrait appliquer le style d’élévation si elevation est true et variant est "filled"', () => {
    const { result } = renderHook(() => useButtonStyles({ elevation: true, variant: 'filled' }));
    expect(result.current.elevationStyle).toEqual(styles.withElevation);
  });
  
  it('ne devrait pas appliquer le style d’élévation si elevation est false', () => {
    const { result } = renderHook(() => useButtonStyles({ elevation: false, variant: 'filled' }));
    expect(result.current.elevationStyle).toEqual({});
  });
  
  it('ne devrait pas appliquer le style d’élévation si le bouton est désactivé', () => {
    const { result } = renderHook(() => useButtonStyles({ disabled: true, variant: 'filled' }));
    expect(result.current.elevationStyle).toEqual({});
  });

  it('devrait appliquer le style arrondi si rounded est true', () => {
    const { result } = renderHook(() => useButtonStyles({ rounded: true }));
    expect(result.current.radiusStyle).toEqual(styles.rounded);
  });
  
  it('devrait appliquer le style fullWidth si fullWidth est true', () => {
    const { result } = renderHook(() => useButtonStyles({ fullWidth: true }));
    expect(result.current.fullWidthStyle).toEqual(styles.fullWidth);
  });
});