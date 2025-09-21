import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MemphisColors, AgeThemes } from '@/constants/Colors';
import { MemphisFonts } from '@/constants/Fonts';
import { useAppStore } from '@/store/useAppStore';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
}) => {
  const { ageGroup } = useAppStore();
  const theme = AgeThemes[ageGroup];

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.primary }]}>{label}</Text>
      )}
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressTrack, { borderColor: theme.primary }]}>
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={[styles.progressFill, { width: `${clampedProgress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
        
        {showPercentage && (
          <Text style={[styles.percentage, { color: theme.primary }]}>
            {Math.round(clampedProgress)}%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.semibold,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 12,
    backgroundColor: MemphisColors.lightGray,
    borderRadius: 6,
    borderWidth: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    marginLeft: 12,
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.bold,
    minWidth: 40,
    textAlign: 'right',
  },
});
