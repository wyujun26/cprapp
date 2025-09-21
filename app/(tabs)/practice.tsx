import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { MemphisBackground } from '@/components/MemphisBackground';
import { MemphisButton } from '@/components/MemphisButton';
import { MemphisCard } from '@/components/MemphisCard';
import { ProgressBar } from '@/components/ProgressBar';
import { MemphisColors, AgeThemes } from '@/constants/Colors';
import { MemphisFonts } from '@/constants/Fonts';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/constants/Translations';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Timer,
  Target,
  TrendingUp
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface PracticeSession {
  compressions: number;
  correctRate: number;
  avgDepth: number;
  avgRate: number;
  duration: number;
}

export default function PracticeScreen() {
  const { ageGroup, language, hapticsEnabled, addPracticeTime } = useAppStore();
  const theme = AgeThemes[ageGroup];
  const t = useTranslation(language);

  const [isActive, setIsActive] = useState(false);
  const [compressions, setCompressions] = useState(0);
  const [timer, setTimer] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [session, setSession] = useState<PracticeSession>({
    compressions: 0,
    correctRate: 0,
    avgDepth: 85,
    avgRate: 0,
    duration: 0,
  });

  const [pulseAnimation] = useState(new Animated.Value(1));
  const [compressionAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      // Animate heart pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isActive]);

  const handleCompressionPress = () => {
    if (!isActive) return;

    setCompressions(prev => prev + 1);
    
    // Haptic feedback
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    // Compression animation
    Animated.sequence([
      Animated.timing(compressionAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(compressionAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Calculate rate (compressions per minute)
    const rate = timer > 0 ? Math.round((compressions + 1) / (timer / 60)) : 0;
    setCurrentRate(rate);

    // Provide feedback
    if (rate < 100) {
      setFeedback('Push faster! Aim for 100-120 per minute');
    } else if (rate > 120) {
      setFeedback('Slow down a bit. Keep it steady');
    } else {
      setFeedback('Perfect rate! Keep going');
    }
  };

  const startPractice = () => {
    setIsActive(true);
    setCompressions(0);
    setTimer(0);
    setCurrentRate(0);
    setFeedback('Start compressions! Push hard and fast');
  };

  const pausePractice = () => {
    setIsActive(false);
    setFeedback('Practice paused');
  };

  const resetPractice = () => {
    setIsActive(false);
    setCompressions(0);
    setTimer(0);
    setCurrentRate(0);
    setFeedback('');
    
    // Save session data
    if (timer > 0) {
      const sessionData: PracticeSession = {
        compressions,
        correctRate: currentRate >= 100 && currentRate <= 120 ? 85 : 60,
        avgDepth: 85,
        avgRate: currentRate,
        duration: timer,
      };
      setSession(sessionData);
      addPracticeTime(Math.round(timer / 60));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompressionDepthColor = () => {
    if (session.avgDepth >= 80) return MemphisColors.success;
    if (session.avgDepth >= 60) return MemphisColors.warning;
    return MemphisColors.error;
  };

  const getRateColor = () => {
    if (currentRate >= 100 && currentRate <= 120) return MemphisColors.success;
    if (currentRate >= 80 && currentRate <= 140) return MemphisColors.warning;
    return MemphisColors.error;
  };

  return (
    <MemphisBackground variant="accent">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: MemphisColors.white }]}>
              CPR Practice
            </Text>
            <Text style={[styles.headerSubtitle, { color: MemphisColors.white }]}>
              Build muscle memory with interactive training
            </Text>
          </View>

          {/* Main Practice Area */}
          <MemphisCard style={styles.practiceCard}>
            <View style={styles.practiceHeader}>
              <Timer color={theme.primary} size={24} />
              <Text style={[styles.practiceTitle, { color: theme.primary }]}>
                Practice Session
              </Text>
            </View>

            {/* Timer and Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statLabel, { color: theme.secondary }]}>Time</Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {formatTime(timer)}
                </Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={[styles.statLabel, { color: theme.secondary }]}>Compressions</Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {compressions}
                </Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={[styles.statLabel, { color: theme.secondary }]}>Rate/Min</Text>
                <Text style={[styles.statValue, { color: getRateColor() }]}>
                  {currentRate}
                </Text>
              </View>
            </View>

            {/* Compression Target */}
            <View style={styles.compressionArea}>
              <Animated.View 
                style={[
                  styles.compressionTarget,
                  {
                    transform: [
                      { scale: pulseAnimation },
                      { 
                        scaleY: compressionAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.8],
                        })
                      }
                    ],
                  }
                ]}
              >
                <MemphisButton
                  title=""
                  onPress={handleCompressionPress}
                  style={[styles.compressionButton, { backgroundColor: theme.primary }]}
                  disabled={!isActive}
                >
                  <Heart color={MemphisColors.white} size={60} />
                </MemphisButton>
              </Animated.View>
              
              <Text style={[styles.compressionInstruction, { color: theme.primary }]}>
                {isActive ? 'Press and release rapidly' : 'Start practice to begin'}
              </Text>
            </View>

            {/* Feedback */}
            {feedback && (
              <View style={styles.feedbackContainer}>
                <Text style={[styles.feedbackText, { color: theme.secondary }]}>
                  {feedback}
                </Text>
              </View>
            )}

            {/* Controls */}
            <View style={styles.controls}>
              {!isActive ? (
                <MemphisButton
                  title={t('action.start')}
                  onPress={startPractice}
                  variant="primary"
                  size="large"
                  style={styles.controlButton}
                />
              ) : (
                <MemphisButton
                  title={t('action.pause')}
                  onPress={pausePractice}
                  variant="secondary"
                  size="large"
                  style={styles.controlButton}
                />
              )}
              
              <MemphisButton
                title={t('action.retry')}
                onPress={resetPractice}
                variant="outline"
                size="large"
                style={styles.controlButton}
              />
            </View>
          </MemphisCard>

          {/* Performance Metrics */}
          {session.duration > 0 && (
            <MemphisCard variant="secondary" gradient style={styles.metricsCard}>
              <View style={styles.metricsHeader}>
                <TrendingUp color={MemphisColors.white} size={24} />
                <Text style={[styles.metricsTitle, { color: MemphisColors.white }]}>
                  Session Results
                </Text>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: MemphisColors.white }]}>
                    Total Compressions
                  </Text>
                  <Text style={[styles.metricValue, { color: MemphisColors.white }]}>
                    {session.compressions}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: MemphisColors.white }]}>
                    Average Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: MemphisColors.white }]}>
                    {session.avgRate}/min
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: MemphisColors.white }]}>
                    Session Time
                  </Text>
                  <Text style={[styles.metricValue, { color: MemphisColors.white }]}>
                    {formatTime(session.duration)}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: MemphisColors.white }]}>
                    Technique Score
                  </Text>
                  <Text style={[styles.metricValue, { color: MemphisColors.white }]}>
                    {session.correctRate}%
                  </Text>
                </View>
              </View>

              <ProgressBar
                progress={session.correctRate}
                label="Overall Performance"
                showPercentage={true}
              />
            </MemphisCard>
          )}

          {/* Tips Card */}
          <MemphisCard style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Target color={theme.primary} size={24} />
              <Text style={[styles.tipsTitle, { color: theme.primary }]}>
                Practice Tips
              </Text>
            </View>
            
            <View style={styles.tipsList}>
              <Text style={styles.tipText}>
                • Push hard and fast - at least 2 inches deep
              </Text>
              <Text style={styles.tipText}>
                • Keep your arms straight and shoulders over hands
              </Text>
              <Text style={styles.tipText}>
                • Allow complete chest recoil between compressions
              </Text>
              <Text style={styles.tipText}>
                • Aim for 100-120 compressions per minute
              </Text>
              <Text style={styles.tipText}>
                • Switch with another person every 2 minutes to avoid fatigue
              </Text>
            </View>
          </MemphisCard>
        </View>
      </SafeAreaView>
    </MemphisBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: MemphisFonts.sizes.xxxl,
    fontWeight: MemphisFonts.weights.extrabold,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: MemphisColors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.medium,
    textAlign: 'center',
    opacity: 0.9,
  },
  practiceCard: {
    marginBottom: 20,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  practiceTitle: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.medium,
    marginBottom: 4,
  },
  statValue: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
  },
  compressionArea: {
    alignItems: 'center',
    marginBottom: 30,
  },
  compressionTarget: {
    marginBottom: 20,
  },
  compressionButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compressionInstruction: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.semibold,
    textAlign: 'center',
  },
  feedbackContainer: {
    backgroundColor: MemphisColors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.semibold,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  metricsCard: {
    marginBottom: 20,
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricsTitle: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricLabel: {
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.medium,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
  },
  tipsCard: {
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  tipsList: {
    paddingLeft: 8,
  },
  tipText: {
    fontSize: MemphisFonts.sizes.md,
    marginBottom: 8,
    color: MemphisColors.darkGray,
    lineHeight: 20,
  },
});
