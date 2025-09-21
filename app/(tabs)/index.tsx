import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MemphisBackground } from '@/components/MemphisBackground';
import { MemphisButton } from '@/components/MemphisButton';
import { MemphisCard } from '@/components/MemphisCard';
import { ProgressBar } from '@/components/ProgressBar';
import { MemphisColors, AgeThemes } from '@/constants/Colors';
import { MemphisFonts } from '@/constants/Fonts';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/constants/Translations';
import { Heart, BookOpen, Play, Award, Clock, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { ageGroup, language, progress } = useAppStore();
  const theme = AgeThemes[ageGroup];
  const t = useTranslation(language);

  const completionRate = (progress.completedLessons.length / 6) * 100; // 6 total lessons
  const averageScore = Object.values(progress.assessmentScores).length > 0
    ? Object.values(progress.assessmentScores).reduce((a, b) => a + b, 0) / Object.values(progress.assessmentScores).length
    : 0;

  const getWelcomeMessage = () => {
    switch (ageGroup) {
      case 'children':
        return '🌟 ' + t('home.welcome') + ' 🌟';
      case 'teens':
        return '🚀 ' + t('home.welcome') + ' 🚀';
      case 'adults':
        return t('home.welcome');
      default:
        return t('home.welcome');
    }
  };

  return (
    <MemphisBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, { color: MemphisColors.white }]}>
              {getWelcomeMessage()}
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: MemphisColors.white }]}>
              {t('home.subtitle')}
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <MemphisButton
              title={t('home.startLearning')}
              onPress={() => router.push('/learn')}
              size="large"
              style={styles.actionButton}
            />
            
            <View style={styles.actionRow}>
              <MemphisButton
                title={t('home.continuePractice')}
                onPress={() => router.push('/practice')}
                variant="secondary"
                style={[styles.halfButton, { marginRight: 8 }]}
              />
              <MemphisButton
                title={t('home.takeAssessment')}
                onPress={() => router.push('/assess')}
                variant="accent"
                style={[styles.halfButton, { marginLeft: 8 }]}
              />
            </View>
          </View>

          {/* Progress Overview */}
          <MemphisCard style={styles.progressCard}>
            <View style={styles.cardHeader}>
              <Target color={theme.primary} size={24} />
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                {t('home.progress')}
              </Text>
            </View>
            
            <ProgressBar
              progress={completionRate}
              label={t('home.completedLessons')}
            />
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Clock color={theme.secondary} size={20} />
                <Text style={[styles.statLabel, { color: theme.secondary }]}>
                  {t('home.practiceTime')}
                </Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {progress.practiceTime}m
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Award color={theme.accent} size={20} />
                <Text style={[styles.statLabel, { color: theme.accent }]}>
                  {t('home.certifications')}
                </Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>
                  {progress.certificationsEarned.length}
                </Text>
              </View>
            </View>
          </MemphisCard>

          {/* Recent Activity */}
          <MemphisCard variant="secondary" gradient style={styles.activityCard}>
            <View style={styles.cardHeader}>
              <Heart color={MemphisColors.white} size={24} />
              <Text style={[styles.cardTitle, { color: MemphisColors.white }]}>
                Recent Activity
              </Text>
            </View>
            
            <View style={styles.activityList}>
              {progress.completedLessons.length > 0 ? (
                progress.completedLessons.slice(-3).map((lesson, index) => (
                  <View key={index} style={styles.activityItem}>
                    <BookOpen color={MemphisColors.white} size={16} />
                    <Text style={[styles.activityText, { color: MemphisColors.white }]}>
                      Completed: {lesson}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={[styles.activityText, { color: MemphisColors.white }]}>
                  Start your first lesson to see activity here!
                </Text>
              )}
            </View>
          </MemphisCard>

          {/* Emergency Disclaimer */}
          <MemphisCard variant="accent" style={styles.disclaimerCard}>
            <Text style={[styles.disclaimerTitle, { color: MemphisColors.white }]}>
              ⚠️ Important Notice
            </Text>
            <Text style={[styles.disclaimerText, { color: MemphisColors.white }]}>
              This app provides educational training only. In a real emergency, always call emergency services immediately. Professional CPR certification requires hands-on training with a certified instructor.
            </Text>
          </MemphisCard>
        </ScrollView>
      </SafeAreaView>
    </MemphisBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: MemphisFonts.sizes.xxxl,
    fontWeight: MemphisFonts.weights.extrabold,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: MemphisColors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.medium,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  actionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
  },
  halfButton: {
    flex: 1,
  },
  progressCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.medium,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
  },
  activityCard: {
    marginBottom: 20,
  },
  activityList: {
    marginTop: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityText: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.medium,
    marginLeft: 12,
  },
  disclaimerCard: {
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
    marginBottom: 12,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: MemphisFonts.sizes.sm,
    fontWeight: MemphisFonts.weights.medium,
    lineHeight: 20,
    textAlign: 'center',
  },
});
