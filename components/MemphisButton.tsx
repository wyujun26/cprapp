import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { MemphisColors, AgeThemes } from '@/constants/Colors';
import { MemphisFonts } from '@/constants/Fonts';
import { useAppStore } from '@/store/useAppStore';

interface MemphisButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const MemphisButton: React.FC<MemphisButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const { ageGroup, hapticsEnabled } = useAppStore();
  const theme = AgeThemes[ageGroup];

  const handlePress = () => {
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const getButtonColors = () => {
    if (disabled) return [MemphisColors.gray, MemphisColors.lightGray];
    
    switch (variant) {
      case 'primary':
        return [theme.primary, theme.secondary];
      case 'secondary':
        return [theme.secondary, theme.accent];
      case 'accent':
        return [theme.accent, theme.primary];
      case 'outline':
        return [MemphisColors.white, MemphisColors.white];
      default:
        return [theme.primary, theme.secondary];
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 16, paddingVertical: 8, minHeight: 36 };
      case 'medium':
        return { paddingHorizontal: 24, paddingVertical: 12, minHeight: 48 };
      case 'large':
        return { paddingHorizontal: 32, paddingVertical: 16, minHeight: 56 };
      default:
        return { paddingHorizontal: 24, paddingVertical: 12, minHeight: 48 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return MemphisFonts.sizes.sm;
      case 'medium':
        return MemphisFonts.sizes.md;
      case 'large':
        return MemphisFonts.sizes.lg;
      default:
        return MemphisFonts.sizes.md;
    }
  };

  const buttonStyle = [
    styles.button,
    getButtonSize(),
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textColor = variant === 'outline' ? theme.primary : MemphisColors.white;

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[buttonStyle, { borderColor: theme.primary }]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: textColor, fontSize: getTextSize() }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getButtonColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.buttonText, { color: textColor, fontSize: getTextSize() }, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: MemphisColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    transform: [{ rotate: '-2deg' }],
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    fontWeight: MemphisFonts.weights.bold,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  outlineButton: {
    backgroundColor: MemphisColors.white,
    borderWidth: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
