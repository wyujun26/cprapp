import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
import { 
  Heart, 
  Phone, 
  Hand, 
  Activity, 
  Wind, 
  CheckCircle,
  PlayCircle,
  BookOpen,
  Users
} from 'lucide-react-native';

interface CPRStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  details: string[];
  tips: string[];
}

export default function LearnScreen() {
  const { ageGroup, language, progress, completeLesson } = useAppStore();
  const theme = AgeThemes[ageGroup];
  const t = useTranslation(language);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const cprSteps: CPRStep[] = [
    {
      id: 'step1',
      title: t('cpr.step1.title'),
      description: t('cpr.step1.description'),
      icon: <Users color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'Tap the person\'s shoulders firmly',
        'Shout "Are you okay?" loudly',
        'Look for any response or movement',
        'If no response, proceed to call for help'
      ],
      tips: [
        'Be loud and clear when checking responsiveness',
        'Don\'t be afraid to shake shoulders firmly',
        'Look for any signs of consciousness'
      ]
    },
    {
      id: 'step2',
      title: t('cpr.step2.title'),
      description: t('cpr.step2.description'),
      icon: <Phone color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975475/pexels-photo-6975475.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'Call 911 (or local emergency number) immediately',
        'Request an AED if available nearby',
        'Ask someone else to help if possible',
        'Stay on the line for instructions'
      ],
      tips: [
        'Don\'t delay calling for professional help',
        'Delegate tasks to bystanders if available',
        'AEDs can significantly improve survival rates'
      ]
    },
    {
      id: 'step3',
      title: t('cpr.step3.title'),
      description: t('cpr.step3.description'),
      icon: <Activity color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975476/pexels-photo-6975476.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'Place two fingers on the carotid artery',
        'Check for 5-10 seconds maximum',
        'Feel for a strong, regular pulse',
        'If no pulse or unsure, begin CPR'
      ],
      tips: [
        'Don\'t spend too long checking for pulse',
        'When in doubt, start CPR',
        'Carotid artery is on the side of the neck'
      ]
    },
    {
      id: 'step4',
      title: t('cpr.step4.title'),
      description: t('cpr.step4.description'),
      icon: <Hand color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975477/pexels-photo-6975477.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'Place heel of one hand on center of chest',
        'Place other hand on top, interlocking fingers',
        'Keep arms straight and shoulders over hands',
        'Position between the nipples on breastbone'
      ],
      tips: [
        'Hand placement is critical for effectiveness',
        'Keep your back straight to avoid injury',
        'Don\'t place hands on ribs or stomach'
      ]
    },
    {
      id: 'step5',
      title: t('cpr.step5.title'),
      description: t('cpr.step5.description'),
      icon: <Heart color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975478/pexels-photo-6975478.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'Push hard and fast at least 2 inches deep',
        'Compress at rate of 100-120 per minute',
        'Allow complete chest recoil between compressions',
        'Count out loud: "1 and 2 and 3..."'
      ],
      tips: [
        'Use your whole body weight, not just arms',
        'Think of the beat of "Stayin\' Alive"',
        'Don\'t be afraid to push hard - broken ribs heal'
      ]
    },
    {
      id: 'step6',
      title: t('cpr.step6.title'),
      description: t('cpr.step6.description'),
      icon: <Wind color={theme.primary} size={24} />,
      imageUrl: 'https://images.pexels.com/photos/6975479/pexels-photo-6975479.jpeg?auto=compress&cs=tinysrgb&w=400',
      details: [
        'After 30 compressions, tilt head back',
        'Lift chin to open airway',
        'Pinch nose closed and seal mouth',
        'Give 2 breaths, each lasting 1 second'
      ],
      tips: [
        'Watch for chest rise with each breath',
        'Don\'t over-ventilate',
        'Return to compressions immediately after breaths'
      ]
    }
  ];

  const completedSteps = progress.completedLessons.filter(lesson => 
    lesson.startsWith('step')
  ).length;

  const handleStepComplete = (stepId: string) => {
    completeLesson(stepId);
    setSelectedStep(null);
  };

  const handleStartPractice = () => {
    router.push('/practice');
  };

  return (
    <MemphisBackground variant="secondary">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: MemphisColors.white }]}>
              CPR Training Steps
            </Text>
            <Text style={[styles.headerSubtitle, { color: MemphisColors.white }]}>
              Learn the essential steps to save a life
            </Text>
            
            <ProgressBar
              progress={(completedSteps / cprSteps.length) * 100}
              label="Learning Progress"
              showPercentage={true}
            />
          </View>

          {/* CPR Steps */}
          <View style={styles.stepsContainer}>
            {cprSteps.map((step, index) => (
              <MemphisCard 
                key={step.id} 
                style={[
                  styles.stepCard,
                  progress.completedLessons.includes(step.id) && styles.completedCard
                ]}
              >
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={[styles.stepNumberText, { color: theme.primary }]}>
                      {index + 1}
                    </Text>
                  </View>
                  
                  <View style={styles.stepInfo}>
                    <Text style={[styles.stepTitle, { color: theme.primary }]}>
                      {step.title}
                    </Text>
                    <Text style={[styles.stepDescription, { color: MemphisColors.darkGray }]}>
                      {step.description}
                    </Text>
                  </View>
                  
                  <View style={styles.stepIcon}>
                    {progress.completedLessons.includes(step.id) ? (
                      <CheckCircle color={MemphisColors.success} size={24} />
                    ) : (
                      step.icon
                    )}
                  </View>
                </View>

                <Image 
                  source={{ uri: step.imageUrl }}
                  style={styles.stepImage}
                  resizeMode="cover"
                />

                {selectedStep === step.id && (
                  <View style={styles.stepDetails}>
                    <Text style={[styles.detailsTitle, { color: theme.primary }]}>
                      Detailed Instructions:
                    </Text>
                    {step.details.map((detail, idx) => (
                      <Text key={idx} style={styles.detailText}>
                        • {detail}
                      </Text>
                    ))}
                    
                    <Text style={[styles.tipsTitle, { color: theme.secondary }]}>
                      Pro Tips:
                    </Text>
                    {step.tips.map((tip, idx) => (
                      <Text key={idx} style={[styles.tipText, { color: theme.secondary }]}>
                        💡 {tip}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.stepActions}>
                  <MemphisButton
                    title={selectedStep === step.id ? "Hide Details" : "Learn More"}
                    onPress={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                    variant="outline"
                    size="small"
                    style={styles.learnButton}
                  />
                  
                  {!progress.completedLessons.includes(step.id) && (
                    <MemphisButton
                      title="Mark Complete"
                      onPress={() => handleStepComplete(step.id)}
                      variant="primary"
                      size="small"
                      style={styles.completeButton}
                    />
                  )}
                </View>
              </MemphisCard>
            ))}
          </View>

          {/* Practice Section */}
          <MemphisCard variant="accent" gradient style={styles.practiceCard}>
            <View style={styles.practiceHeader}>
              <PlayCircle color={MemphisColors.white} size={32} />
              <Text style={[styles.practiceTitle, { color: MemphisColors.white }]}>
                Ready to Practice?
              </Text>
            </View>
            
            <Text style={[styles.practiceDescription, { color: MemphisColors.white }]}>
              Now that you've learned the steps, practice with our interactive simulator to build muscle memory and confidence.
            </Text>
            
            <MemphisButton
              title="Start Practice Session"
              onPress={handleStartPractice}
              variant="outline"
              size="large"
              style={styles.practiceButton}
              textStyle={{ color: MemphisColors.white }}
            />
          </MemphisCard>

          {/* Age-Specific Guidelines */}
          <MemphisCard style={styles.guidelinesCard}>
            <View style={styles.cardHeader}>
              <BookOpen color={theme.primary} size={24} />
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                {ageGroup === 'children' ? 'For Kids' : ageGroup === 'teens' ? 'For Teens' : 'Adult Guidelines'}
              </Text>
            </View>
            
            <Text style={styles.guidelinesText}>
              {ageGroup === 'children' 
                ? "Remember: CPR on children and infants is different from adults. Always get help from grown-ups in real emergencies!"
                : ageGroup === 'teens'
                ? "You're learning important life-saving skills! Practice regularly and consider getting certified through your school or local Red Cross."
                : "These guidelines follow American Heart Association standards. Consider getting hands-on certification from a qualified instructor."
              }
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
  header: {
    marginBottom: 30,
    alignItems: 'center',
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
    marginBottom: 20,
    opacity: 0.9,
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepCard: {
    marginBottom: 20,
  },
  completedCard: {
    borderColor: MemphisColors.success,
    borderWidth: 3,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: MemphisColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.medium,
  },
  stepIcon: {
    marginLeft: 16,
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  stepDetails: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: MemphisColors.lightGray,
    borderRadius: 12,
  },
  detailsTitle: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.bold,
    marginBottom: 8,
  },
  detailText: {
    fontSize: MemphisFonts.sizes.sm,
    marginBottom: 4,
    color: MemphisColors.darkGray,
  },
  tipsTitle: {
    fontSize: MemphisFonts.sizes.md,
    fontWeight: MemphisFonts.weights.bold,
    marginTop: 12,
    marginBottom: 8,
  },
  tipText: {
    fontSize: MemphisFonts.sizes.sm,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  stepActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  learnButton: {
    flex: 1,
    marginRight: 8,
  },
  completeButton: {
    flex: 1,
    marginLeft: 8,
  },
  practiceCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  practiceTitle: {
    fontSize: MemphisFonts.sizes.xl,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  practiceDescription: {
    fontSize: MemphisFonts.sizes.md,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  practiceButton: {
    borderColor: MemphisColors.white,
  },
  guidelinesCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: MemphisFonts.sizes.lg,
    fontWeight: MemphisFonts.weights.bold,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  guidelinesText: {
    fontSize: MemphisFonts.sizes.md,
    lineHeight: 22,
    color: MemphisColors.darkGray,
  },
});
