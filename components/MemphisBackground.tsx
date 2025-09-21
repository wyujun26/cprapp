import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MemphisColors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface MemphisBackgroundProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const MemphisBackground: React.FC<MemphisBackgroundProps> = ({ 
  children, 
  variant = 'primary' 
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return [MemphisColors.primary, MemphisColors.pink];
      case 'secondary':
        return [MemphisColors.secondary, MemphisColors.cyan];
      case 'accent':
        return [MemphisColors.accent, MemphisColors.yellow];
      default:
        return [MemphisColors.primary, MemphisColors.pink];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Memphis geometric shapes */}
      <View style={styles.shapesContainer}>
        <View style={[styles.triangle, styles.triangle1]} />
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.square, styles.square1]} />
        <View style={[styles.zigzag, styles.zigzag1]} />
        <View style={[styles.triangle, styles.triangle2]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.square, styles.square2]} />
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  shapesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  
  // Geometric shapes
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  triangle1: {
    top: height * 0.1,
    left: width * 0.8,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: MemphisColors.yellow,
    transform: [{ rotate: '15deg' }],
  },
  triangle2: {
    bottom: height * 0.2,
    left: width * 0.1,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: MemphisColors.magenta,
    transform: [{ rotate: '-25deg' }],
  },
  
  circle: {
    position: 'absolute',
    borderRadius: 50,
  },
  circle1: {
    top: height * 0.3,
    right: width * 0.1,
    width: 80,
    height: 80,
    backgroundColor: MemphisColors.cyan,
  },
  circle2: {
    bottom: height * 0.4,
    right: width * 0.2,
    width: 60,
    height: 60,
    backgroundColor: MemphisColors.lime,
  },
  
  square: {
    position: 'absolute',
  },
  square1: {
    top: height * 0.6,
    left: width * 0.05,
    width: 50,
    height: 50,
    backgroundColor: MemphisColors.orange,
    transform: [{ rotate: '45deg' }],
  },
  square2: {
    top: height * 0.15,
    left: width * 0.3,
    width: 35,
    height: 35,
    backgroundColor: MemphisColors.violet,
    transform: [{ rotate: '30deg' }],
  },
  
  zigzag: {
    position: 'absolute',
    width: 100,
    height: 20,
  },
  zigzag1: {
    top: height * 0.45,
    left: width * 0.6,
    backgroundColor: MemphisColors.primary,
    transform: [{ rotate: '20deg' }],
  },
});
