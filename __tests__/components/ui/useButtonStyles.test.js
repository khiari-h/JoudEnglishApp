import useButtonStyles from '../../../src/components/ui/Button/useButtonStyles';

describe('useButtonStyles', () => {
  describe('getSizeStyles', () => {
    it('should return small size styles', () => {
      const result = useButtonStyles({ size: 'small' });
      expect(result.sizeStyles).toEqual({
        button: expect.any(Object),
        text: expect.any(Object),
        iconSize: 16,
        loaderSize: 'small',
      });
    });

    it('should return medium size styles (default)', () => {
      const result = useButtonStyles({});
      expect(result.sizeStyles).toEqual({
        button: expect.any(Object),
        text: expect.any(Object),
        iconSize: 20,
        loaderSize: 'small',
      });
    });

    it('should return large size styles', () => {
      const result = useButtonStyles({ size: 'large' });
      expect(result.sizeStyles).toEqual({
        button: expect.any(Object),
        text: expect.any(Object),
        iconSize: 24,
        loaderSize: 'large',
      });
    });

    it('should fallback to medium for invalid size', () => {
      const result = useButtonStyles({ size: 'invalid' });
      expect(result.sizeStyles.iconSize).toBe(20);
    });
  });

  describe('getVariantStyles - filled (default)', () => {
    it('should return filled styles for enabled state', () => {
      const result = useButtonStyles({ variant: 'filled', color: 'primary' });
      expect(result.variantStyles.button.backgroundColor).toBe('#5E60CE');
      expect(result.variantStyles.text.color).toBe('white');
      expect(result.variantStyles.icon).toBe('white');
    });

    it('should return filled styles for disabled state', () => {
      const result = useButtonStyles({ variant: 'filled', color: 'primary', disabled: true });
      expect(result.variantStyles.button.backgroundColor).toBe('#E5E7EB');
      expect(result.variantStyles.pressed.backgroundColor).toBe('#E5E7EB');
    });
  });

  describe('getVariantStyles - outlined', () => {
    it('should return outlined styles for enabled state', () => {
      const result = useButtonStyles({ variant: 'outlined', color: 'primary' });
      expect(result.variantStyles.button.backgroundColor).toBe('transparent');
      expect(result.variantStyles.button.borderWidth).toBe(1);
      expect(result.variantStyles.button.borderColor).toBe('#5E60CE');
      expect(result.variantStyles.text.color).toBe('#5E60CE');
      expect(result.variantStyles.icon).toBe('#5E60CE');
    });

    it('should return outlined styles for disabled state', () => {
      const result = useButtonStyles({ variant: 'outlined', color: 'primary', disabled: true });
      expect(result.variantStyles.button.borderColor).toBe('#D1D5DB');
      expect(result.variantStyles.text.color).toBe('#9CA3AF');
      expect(result.variantStyles.icon).toBe('#9CA3AF');
    });
  });

  describe('getVariantStyles - text', () => {
    it('should return text styles for enabled state', () => {
      const result = useButtonStyles({ variant: 'text', color: 'primary' });
      expect(result.variantStyles.button.backgroundColor).toBe('transparent');
      expect(result.variantStyles.button.borderWidth).toBe(0);
      expect(result.variantStyles.button.paddingHorizontal).toBe(12);
      expect(result.variantStyles.text.color).toBe('#5E60CE');
      expect(result.variantStyles.icon).toBe('#5E60CE');
    });

    it('should return text styles for disabled state', () => {
      const result = useButtonStyles({ variant: 'text', color: 'primary', disabled: true });
      expect(result.variantStyles.text.color).toBe('#9CA3AF');
      expect(result.variantStyles.icon).toBe('#9CA3AF');
    });
  });

  describe('getVariantStyles - tonal', () => {
    it('should return tonal styles for enabled state', () => {
      const result = useButtonStyles({ variant: 'tonal', color: 'primary' });
      expect(result.variantStyles.button.backgroundColor).toBe('#5E60CE15');
      expect(result.variantStyles.button.borderWidth).toBe(0);
      expect(result.variantStyles.text.color).toBe('#5E60CE');
      expect(result.variantStyles.icon).toBe('#5E60CE');
    });

    it('should return tonal styles for disabled state', () => {
      const result = useButtonStyles({ variant: 'tonal', color: 'primary', disabled: true });
      expect(result.variantStyles.button.backgroundColor).toBe('#F3F4F6');
      expect(result.variantStyles.text.color).toBe('#9CA3AF');
      expect(result.variantStyles.icon).toBe('#9CA3AF');
    });
  });

  describe('getVariantStyles - icon', () => {
    it('should return icon styles for enabled state', () => {
      const result = useButtonStyles({ variant: 'icon', color: 'primary', size: 'large' });
      expect(result.variantStyles.button.backgroundColor).toBe('transparent');
      expect(result.variantStyles.button.borderWidth).toBe(0);
      expect(result.variantStyles.button.padding).toBe(0);
      expect(result.variantStyles.button.minWidth).toBe(0);
      expect(result.variantStyles.button.minHeight).toBe(0);
      expect(result.variantStyles.icon.fontSize).toBe(24);
      expect(result.variantStyles.icon.color).toBe('primary');
    });

    it('should return icon styles for disabled state', () => {
      const result = useButtonStyles({ variant: 'icon', color: 'primary', disabled: true });
      expect(result.variantStyles.button.backgroundColor).toBe('#F3F4F6');
      expect(result.variantStyles.icon.color).toBe('#A1A1AA');
    });

    it('should use correct icon size based on button size', () => {
      const smallResult = useButtonStyles({ variant: 'icon', size: 'small' });
      const mediumResult = useButtonStyles({ variant: 'icon', size: 'medium' });
      const largeResult = useButtonStyles({ variant: 'icon', size: 'large' });

      expect(smallResult.variantStyles.icon.fontSize).toBe(16);
      expect(mediumResult.variantStyles.icon.fontSize).toBe(20);
      expect(largeResult.variantStyles.icon.fontSize).toBe(24);
    });
  });

  describe('color handling', () => {
    it('should handle all color variants', () => {
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
      
      colors.forEach(color => {
        const result = useButtonStyles({ color, variant: 'filled' });
        expect(result.baseColor).toBeTruthy();
        expect(typeof result.baseColor).toBe('string');
      });
    });

    it('should fallback to primary for invalid color', () => {
      const result = useButtonStyles({ color: 'invalid', variant: 'filled' });
      expect(result.baseColor).toBe('#5E60CE'); // primary color
    });
  });

  describe('elevation and rounded', () => {
    it('should apply elevation only for filled variant when enabled', () => {
      const withElevation = useButtonStyles({ elevation: true, variant: 'filled' });
      const withoutElevation = useButtonStyles({ elevation: false, variant: 'filled' });
      const outlinedWithElevation = useButtonStyles({ elevation: true, variant: 'outlined' });
      const disabledWithElevation = useButtonStyles({ elevation: true, variant: 'filled', disabled: true });

      expect(withElevation.elevationStyle).toBeTruthy();
      expect(withoutElevation.elevationStyle).toEqual({});
      expect(outlinedWithElevation.elevationStyle).toEqual({});
      expect(disabledWithElevation.elevationStyle).toEqual({});
    });

    it('should apply rounded styles when requested', () => {
      const rounded = useButtonStyles({ rounded: true });
      const notRounded = useButtonStyles({ rounded: false });

      expect(rounded.radiusStyle).toBeTruthy();
      expect(notRounded.radiusStyle).toEqual({});
    });
  });

  describe('fullWidth', () => {
    it('should apply fullWidth styles when requested', () => {
      const fullWidth = useButtonStyles({ fullWidth: true });
      const notFullWidth = useButtonStyles({ fullWidth: false });

      expect(fullWidth.fullWidthStyle).toBeTruthy();
      expect(notFullWidth.fullWidthStyle).toBeNull();
    });
  });

  describe('integration - all props together', () => {
    it('should handle complex configuration correctly', () => {
      const result = useButtonStyles({
        variant: 'outlined',
        size: 'large',
        color: 'success',
        disabled: false,
        elevation: true,
        rounded: true,
        fullWidth: true,
      });

      expect(result.baseColor).toBe('#10B981'); // success color
      expect(result.sizeStyles.iconSize).toBe(24);
      expect(result.variantStyles.button.backgroundColor).toBe('transparent');
      expect(result.variantStyles.button.borderColor).toBe('#10B981');
      expect(result.elevationStyle).toEqual({}); // outlined variant
      expect(result.radiusStyle).toBeTruthy();
      expect(result.fullWidthStyle).toBeTruthy();
    });
  });
});
