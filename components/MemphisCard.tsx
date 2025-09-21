import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MemphisColors, AgeThemes } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

interface MemphisCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'white';
  style?: ViewStyle;
  gradient?: boolean;
}

export const MemphisCard: React.FC<MemphisCardProps> = ({
  children,
  variant = 'white',
  style,
  gradient = false,
}) => {
  const { ageGroup } = useAppStore();
  const theme = AgeThemes[ageGroup];

  const getCardColors = () => {
    switch (variant) {
      case 'primary':
        return gradient ? [theme.primary, theme.secondary] : [theme.primary, theme.primary];
      case 'secondary':
        return gradient ? [theme.secondary, theme.accent] : [theme.secondary, theme.secondary];
      case 'accent':
        return gradient ? [theme.accent, theme.primary] : [theme.accent, theme.accent];
      case 'white':
        return [MemphisColors.white, MemphisColors.white];
      default:
        return [MemphisColors.white, MemphisColors.white];
    }
  };

  const cardStyle = [
    styles.card,
    style,
  ];

  if (gradient && variant !== 'white') {
    return (
      <View style={cardStyle}>
        <LinearGradient
          colors={getCardColors()}
          style={styles.gradientCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[cardStyle, { backgroundColor: getCardColors()[0] }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    elevation: 8,
    shadowColor: MemphisColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    transform: [{ rotate: '1deg' }],
    borderWidth: 3,
    borderColor: MemphisColors.black,
  },
  gradientCard: {
    flex: 1,
    borderRadius: 17,
    padding: 0,
  },
});
