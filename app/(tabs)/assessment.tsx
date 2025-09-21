import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MemphisBackground } from '@/components/MemphisBackground';
import { MemphisCard } from '@/components/MemphisCard';
import { MemphisColors } from '@/constants/Colors';
import { MemphisFonts } from '@/constants/Fonts';
import { ClipboardCheck } from 'lucide-react-native';

export default function AssessmentScreen() {
  return (
    <MemphisBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: MemphisColors.white }]}>
            Assessment
          </Text>
          
          <MemphisCard style={styles.card}>
            <View style={styles.cardHeader}>
              <ClipboardCheck color={MemphisColors.primary} size={32} />
              <Text style={[styles.cardTitle, { color: MemphisColors.primary }]}>
                Coming Soon
              </Text>
            </View>
            
            <Text style={styles.description}>
              The CPR assessment feature is currently under development. 
              This will include comprehensive testing of your CPR knowledge 
              with certification upon completion.
            </Text>
            
            <View style={styles.features}>
              <Text style={styles.feature}>📝 Interactive quiz questions</Text>
              <Text style={styles.feature}>🏆 Certification system</Text>
              <Text style={styles.feature}>📊 Progress tracking</Text>
              <Text style={styles.feature}>🔄 Retake functionality</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: MemphisFonts.bold,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: MemphisFonts.bold,
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: MemphisFonts.regular,
    color: MemphisColors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  features: {
    alignSelf: 'stretch',
  },
  feature: {
    fontSize: 16,
    fontFamily: MemphisFonts.regular,
    color: MemphisColors.text,
    marginBottom: 8,
  },
});
