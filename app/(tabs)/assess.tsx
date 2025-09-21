import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
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
  ClipboardCheck, 
  Award, 
  CheckCircle, 
  XCircle,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react-native';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssessmentResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
  certification?: string;
}

export default function AssessScreen() {
  const { ageGroup, language, updateAssessmentScore, earnCertification, progress } = useAppStore();
  const theme = AgeThemes[ageGroup];
  const t = useTranslation(language);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      question: 'What is the first step when you find an unresponsive person?',
      options: [
        'Start chest compressions immediately',
        'Check for responsiveness and call for help',
        'Check for a pulse',
        'Give rescue breaths'
      ],
      correctAnswer: 1,
      explanation: 'Always check for responsiveness first by tapping shoulders and shouting, then call for help immediately.'
    },
    {
      id: 'q2',
      question: 'What is the correct compression rate for CPR?',
      options: [
        '60-80 compressions per minute',
        '80-100 compressions per minute',
        '100-120 compressions per minute',
        '120-140 compressions per minute'
      ],
      correctAnswer: 2,
      explanation: 'The American Heart Association recommends 100-120 compressions per minute for effective CPR.'
    },
    {
      id: 'q3',
      question: 'How deep should chest compressions be for an adult?',
      options: [
        'At least 1 inch (2.5 cm)',
        'At least 1.5 inches (3.8 cm)',
        'At least 2 inches (5 cm)',
        'At least 3 inches (7.6 cm)'
      ],
      correctAnswer: 2,
      explanation: 'Compressions should be at least 2 inches (5 cm) deep but not more than 2.4 inches (6 cm).'
    },
    {
      id: 'q4',
      question: 'What is the correct ratio of compressions to breaths in CPR?',
      options: [
        '15:2',
        '30:2',
        '20:2',
        '25:2'
      ],
      correctAnswer: 1,
      explanation: 'The standard ratio is 30 chest compressions followed by 2 rescue breaths.'
    },
    {
      id: 'q5',
      question: 'Where should you place your hands for chest compressions?',
      options: [
        'On the upper chest near the collar bone',
        'On the lower half of the breastbone',
        'On the left side of the chest over the heart',
        'On the stomach just below the ribs'
      ],
      correctAnswer: 1,
      explanation: 'Place the heel of your hand on the lower half of the breastbone, between the nipples.'
    },
    {
      id: 'q6',
      question: 'When should you stop CPR?',
      options: [
        'After 5 minutes if no response',
        'When you get tired',
        'When emergency services arrive or the person starts breathing normally',
        'After 30 compressions'
      ],
      correctAnswer: 2,
      explanation: 'Continue CPR until emergency services take over, the person starts breathing normally, or you become too exhausted to continue.'
    },
    {
      id: 'q7',
      question: 'What should you do if you are not trained in rescue breathing?',
      options: [
        'Don\'t perform CPR at all',
        'Perform hands-only CPR (compressions only)',
        'Wait for someone trained to arrive',
        'Try rescue breathing anyway'
      ],
      correctAnswer: 1,
      explanation: 'Hands-only CPR (continuous chest compressions) is better than no CPR and can be life-saving.'
    },
    {
      id: 'q8',
      question: 'How often should you switch with another person during CPR?',
      options: [
        'Every 30 seconds',
        'Every 1 minute',
        'Every 2 minutes',
        'Every 5 minutes'
      ],
      correctAnswer: 2,
      explanation: 'Switch every 2 minutes to prevent fatigue and maintain effective compressions.'
    }
  ];

  const startAssessment = () => {
    setAssessmentStarted(true);
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setResult(null);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishAssessment();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishAssessment = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= 80;

    const assessmentResult: AssessmentResult = {
      score,
      totalQuestions: questions.length,
      timeSpent,
      passed,
      certification: passed ? 'CPR Basic Certification' : undefined,
    };

    setResult(assessmentResult);
    setShowResults(true);
    
    // Update store
    updateAssessmentScore('cpr-basic', score);
    if (passed) {
      earnCertification('cpr-basic');
    }
  };

  const retakeAssessment = () => {
    setAssessmentStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!assessmentStarted) {
    return (
      <MemphisBackground variant="primary">
        <SafeAreaView style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: MemphisColors.white }]}>
                CPR Assessment
              </Text>
              <Text style={[styles.headerSubtitle, { color: MemphisColors.white }]}>
                Test your knowledge and earn certification
              </Text>
            </View>

            {/* Assessment Info */}
            <MemphisCard style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <ClipboardCheck color={theme.primary} size={24} />
                <Text style={[styles.cardTitle, { color: theme.primary }]}>
                  Assessment Details
                </Text>
              </View>
              
              <View style={styles.infoList}>
                <Text style={styles.infoItem}>
                  📝 {questions.length} multiple choice questions
                </Text>
                <Text style={styles.infoItem}>
                  ⏱️ No time limit - take your time
                </Text>
                <Text style={styles.infoItem}>
                  🎯 80% score required to pass
                </Text>
                <Text style={styles.infoItem}>
                  🏆 Earn CPR Basic Certification
                </Text>
                <Text style={styles.infoItem}>
                  🔄 Retake as many times as needed
                </Text>
              </View>
            </MemphisCard>

            {/* Previous Scores */}
            {Object.keys(progress.assessmentScores).length > 0 && (
              <MemphisCard variant="secondary" gradient style={styles.scoresCard}>
                <View style={styles.cardHeader}>
                  <TrendingUp color={MemphisColors.white} size={24} />
                  <Text style={[styles.cardTitle, { color: MemphisColors.white }]}>
                    Previous Attempts
                  </Text>
                </View>
                
                {Object.entries(progress.assessmentScores).map(([assessmentId, score]) => (
                  <View key={assessmentId} style={styles.scoreItem}>
                    <Text style={[styles.scoreLabel, { color: MemphisColors.white }]}>
                      CPR Basic Assessment
                    </Text>
                    <Text style={[styles.scoreValue, { color: MemphisColors.white }]}>
                      {score}%
                    </Text>
                  </View>
                ))}
              </MemphisCard>
            )}

            {/* Certifications */}
            {progress.certificationsEarned.length > 0 && (
              <MemphisCard variant="accent" style={styles.certificationsCard}>
                <View style={styles.cardHeader}>
                  <Award color={MemphisColors.white} size={24} />
                  <Text style={[styles.cardTitle, { color: MemphisColors.white }]}>
                    Your Certifications
                  </Text>
                </View>
                
                {progress.certificationsEarned.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Award color={MemphisColors.white} size={20} />
                    <Text style={[styles.certificationText, { color: MemphisColors.white }]}>
                      CPR Basic Certification
                    </Text>
                  </View>
                ))}
              </MemphisCard>
            )}

            {/* Start Button */}
            <MemphisButton
              title="Start Assessment"
              onPress={startAssessment}
              size="large"
              style={styles.startButton}
            />

            {/* Disclaimer */}
            <MemphisCard style={styles.disclaimerCard}>
              <Text style={[styles.disclaimerTitle, { color: theme.primary }]}>
                📋 Assessment Guidelines
              </Text>
              <Text style={styles.disclaimerText}>
                This assessment tests your theoretical knowledge of CPR. While passing indicates good understanding, 
                hands-on practice with a certified instructor is essential for real-world application. 
                This certification is for educational purposes only.
              </Text>
            </MemphisCard>
          </ScrollView>
        </SafeAreaView>
      </MemphisBackground>
    );
  }

  if (showResults && result) {
    return (
      <MemphisBackground variant={result.passed ? 'accent' : 'primary'}>
        <SafeAreaView style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Results Header */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: MemphisColors.white }]}>
                Assessment Results
              </Text>
              <Text style={[styles.headerSubtitle, { color: MemphisColors.white }]}>
                {result.passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
              </Text>
            </View>

            {/* Score Card */}
            <MemphisCard style={styles.resultsCard}>
              <View style={styles.scoreDisplay}>
                {result.passed ? (
                  <CheckCircle color={MemphisColors.success} size={60} />
                ) : (
                  <XCircle color={MemphisColors.error} size={60} />
                )}
                
                <Text style={[styles.finalScore, { color: result.passed ? MemphisColors.success : MemphisColors.error }]}>
                  {result.score}%
                </Text>
                
                <Text style={[styles.scoreLabel, { color: theme.primary }]}>
                  {result.score >= 90 ? 'Excellent!' : result.score >= 80 ? 'Good Job!' : 'Keep Studying!'}
                </Text>
              </View>

              <ProgressBar
                progress={result.score}
                label="Your Score"
                showPercentage={false}
              />

              <View style={styles.resultStats}>
                <View style={styles.resultStat}>
                  <Text style={[styles.resultStatLabel, { color: theme.secondary }]}>
                    Correct Answers
                  </Text>
                  <Text style={[styles.resultStatValue, { color: theme.primary }]}>
                    {Math.round((result.score / 100) * result.totalQuestions)}/{result.totalQuestions}
                  </Text>
                </View>
                
                <View style={styles.resultStat}>
                  <Text style={[styles.resultStatLabel, { color: theme.secondary }]}>
                    Time Spent
                  </Text>
                  <Text style={[styles.resultStatValue, { color: theme.primary }]}>
                    {formatTime(result.timeSpent)}
                  </Text>
                </View>
              </View>
            </MemphisCard>

            {/* Certification */}
            {result.passed && result.certification && (
              <MemphisCard variant="accent" gradient style={styles.certificationCard}>
                <View style={styles.certificationHeader}>
                  <Award color={MemphisColors.white} size={32} />
                  <Text style={[styles.certificationTitle, { color: MemphisColors.white }]}>
                    Certification Earned!
                  </Text>
                </View>
                
                <Text style={[styles.certificationName, { color: MemphisColors.white }]}>
                  {result.certification}
                </Text>
                
                <Text style={[styles.certificationDate, { color: MemphisColors.white }]}>
                  Earned on {new Date().toLocaleDateString()}
                </Text>
              </MemphisCard>
            )}

            {/* Review Answers */}
            <MemphisCard style={styles.reviewCard}>
              <View style={styles.cardHeader}>
                <Target color={theme.primary} size={24} />
                <Text style={[styles.cardTitle, { color: theme.primary }]}>
                  Answer Review
                </Text>
              </View>
              
              {questions.map((question, index) => (
                <View key={question.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={[styles.reviewQuestionNumber, { color: theme.secondary }]}>
                      Q{index + 1}
                    </Text>
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle color={MemphisColors.success} size={20} />
                    ) : (
                      <XCircle color={MemphisColors.error} size={20} />
                    )}
                  </View>
                  
                  <Text style={styles.reviewQuestion}>
                    {question.question}
                  </Text>
                  
                  <Text style={[styles.reviewAnswer, { color: MemphisColors.success }]}>
                    ✓ Correct: {question.options[question.correctAnswer]}
                  </Text>
                  
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <Text style={[styles.reviewAnswer, { color: MemphisColors.error }]}>
                      ✗ Your answer: {question.options[selectedAnswers[index]]}
                    </Text>
                  )}
                  
                  <Text style={styles.reviewExplanation}>
                    {question.explanation}
                  </Text>
                </View>
              ))}
            </MemphisCard>

            {/* Action Buttons */}
            <View style={styles.resultActions}>
              <MemphisButton
                title="Retake Assessment"
                onPress={retakeAssessment}
                variant="outline"
                size="large"
                style={styles.actionButton}
              />
              
              <MemphisButton
                title="Continue Learning"
                onPress={() => router.push('/learn')}
                variant="primary"
                size="large"
                style={styles.actionButton}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </MemphisBackground>
    );
  }

  // Assessment in progress
  const currentQ = questions[currentQuestion];
  