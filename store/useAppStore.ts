import { create } from 'zustand';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';
export type AgeGroup = 'children' | 'teens' | 'adults';
export type TrainingMode = 'tutorial' | 'practice' | 'assessment';

interface UserProgress {
  completedLessons: string[];
  assessmentScores: Record<string, number>;
  practiceTime: number;
  certificationsEarned: string[];
}

interface AppState {
  // User settings
  language: Language;
  ageGroup: AgeGroup;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  highContrastMode: boolean;
  
  // Training state
  currentMode: TrainingMode;
  currentLesson: string | null;
  progress: UserProgress;
  
  // Actions
  setLanguage: (language: Language) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setHighContrastMode: (enabled: boolean) => void;
  setCurrentMode: (mode: TrainingMode) => void;
  setCurrentLesson: (lesson: string | null) => void;
  completeLesson: (lessonId: string) => void;
  updateAssessmentScore: (assessmentId: string, score: number) => void;
  addPracticeTime: (minutes: number) => void;
  earnCertification: (certId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  language: 'en',
  ageGroup: 'adults',
  soundEnabled: true,
  hapticsEnabled: true,
  highContrastMode: false,
  currentMode: 'tutorial',
  currentLesson: null,
  progress: {
    completedLessons: [],
    assessmentScores: {},
    practiceTime: 0,
    certificationsEarned: [],
  },
  
  // Actions
  setLanguage: (language) => set({ language }),
  setAgeGroup: (ageGroup) => set({ ageGroup }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
  setHighContrastMode: (highContrastMode) => set({ highContrastMode }),
  setCurrentMode: (currentMode) => set({ currentMode }),
  setCurrentLesson: (currentLesson) => set({ currentLesson }),
  
  completeLesson: (lessonId) => set((state) => ({
    progress: {
      ...state.progress,
      completedLessons: [...state.progress.completedLessons, lessonId],
    },
  })),
  
  updateAssessmentScore: (assessmentId, score) => set((state) => ({
    progress: {
      ...state.progress,
      assessmentScores: {
        ...state.progress.assessmentScores,
        [assessmentId]: score,
      },
    },
  })),
  
  addPracticeTime: (minutes) => set((state) => ({
    progress: {
      ...state.progress,
      practiceTime: state.progress.practiceTime + minutes,
    },
  })),
  
  earnCertification: (certId) => set((state) => ({
    progress: {
      ...state.progress,
      certificationsEarned: [...state.progress.certificationsEarned, certId],
    },
  })),
}));
