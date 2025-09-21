import { Language } from '@/store/useAppStore';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.learn': 'Learn',
    'nav.practice': 'Practice',
    'nav.assess': 'Assess',
    'nav.profile': 'Profile',
    
    // Home screen
    'home.welcome': 'Welcome to CPR Training',
    'home.subtitle': 'Learn life-saving skills with interactive training',
    'home.startLearning': 'Start Learning',
    'home.continuePractice': 'Continue Practice',
    'home.takeAssessment': 'Take Assessment',
    'home.progress': 'Your Progress',
    'home.completedLessons': 'Completed Lessons',
    'home.practiceTime': 'Practice Time',
    'home.certifications': 'Certifications',
    
    // CPR Steps
    'cpr.step1.title': 'Check Responsiveness',
    'cpr.step1.description': 'Tap shoulders and shout "Are you okay?"',
    'cpr.step2.title': 'Call for Help',
    'cpr.step2.description': 'Call 911 and get an AED if available',
    'cpr.step3.title': 'Check Pulse',
    'cpr.step3.description': 'Check for pulse at the carotid artery',
    'cpr.step4.title': 'Position Hands',
    'cpr.step4.description': 'Place heel of hand on center of chest',
    'cpr.step5.title': 'Begin Compressions',
    'cpr.step5.description': 'Push hard and fast at least 2 inches deep',
    'cpr.step6.title': 'Give Rescue Breaths',
    'cpr.step6.description': 'Tilt head back, lift chin, give 2 breaths',
    
    // Common actions
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.start': 'Start',
    'action.pause': 'Pause',
    'action.resume': 'Resume',
    'action.complete': 'Complete',
    'action.retry': 'Retry',
    'action.settings': 'Settings',
    
    // Settings
    'settings.language': 'Language',
    'settings.ageGroup': 'Age Group',
    'settings.sound': 'Sound Effects',
    'settings.haptics': 'Haptic Feedback',
    'settings.highContrast': 'High Contrast Mode',
    'settings.children': 'Children (8-12)',
    'settings.teens': 'Teens (13-17)',
    'settings.adults': 'Adults (18+)',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.learn': 'Aprender',
    'nav.practice': 'Practicar',
    'nav.assess': 'Evaluar',
    'nav.profile': 'Perfil',
    
    // Home screen
    'home.welcome': 'Bienvenido al Entrenamiento de RCP',
    'home.subtitle': 'Aprende habilidades que salvan vidas con entrenamiento interactivo',
    'home.startLearning': 'Comenzar a Aprender',
    'home.continuePractice': 'Continuar Práctica',
    'home.takeAssessment': 'Tomar Evaluación',
    'home.progress': 'Tu Progreso',
    'home.completedLessons': 'Lecciones Completadas',
    'home.practiceTime': 'Tiempo de Práctica',
    'home.certifications': 'Certificaciones',
    
    // CPR Steps
    'cpr.step1.title': 'Verificar Respuesta',
    'cpr.step1.description': 'Toca los hombros y grita "¿Estás bien?"',
    'cpr.step2.title': 'Pedir Ayuda',
    'cpr.step2.description': 'Llama al 911 y consigue un DEA si está disponible',
    'cpr.step3.title': 'Verificar Pulso',
    'cpr.step3.description': 'Verifica el pulso en la arteria carótida',
    'cpr.step4.title': 'Posicionar Manos',
    'cpr.step4.description': 'Coloca el talón de la mano en el centro del pecho',
    'cpr.step5.title': 'Comenzar Compresiones',
    'cpr.step5.description': 'Presiona fuerte y rápido al menos 2 pulgadas de profundidad',
    'cpr.step6.title': 'Dar Respiraciones de Rescate',
    'cpr.step6.description': 'Inclina la cabeza hacia atrás, levanta el mentón, da 2 respiraciones',
    
    // Common actions
    'action.next': 'Siguiente',
    'action.previous': 'Anterior',
    'action.start': 'Comenzar',
    'action.pause': 'Pausar',
    'action.resume': 'Reanudar',
    'action.complete': 'Completar',
    'action.retry': 'Reintentar',
    'action.settings': 'Configuración',
    
    // Settings
    'settings.language': 'Idioma',
    'settings.ageGroup': 'Grupo de Edad',
    'settings.sound': 'Efectos de Sonido',
    'settings.haptics': 'Retroalimentación Háptica',
    'settings.highContrast': 'Modo de Alto Contraste',
    'settings.children': 'Niños (8-12)',
    'settings.teens': 'Adolescentes (13-17)',
    'settings.adults': 'Adultos (18+)',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.learn': 'Apprendre',
    'nav.practice': 'Pratiquer',
    'nav.assess': 'Évaluer',
    'nav.profile': 'Profil',
    
    // Home screen
    'home.welcome': 'Bienvenue à la Formation RCR',
    'home.subtitle': 'Apprenez des compétences vitales avec une formation interactive',
    'home.startLearning': 'Commencer à Apprendre',
    'home.continuePractice': 'Continuer la Pratique',
    'home.takeAssessment': 'Passer l\'Évaluation',
    'home.progress': 'Votre Progrès',
    'home.completedLessons': 'Leçons Terminées',
    'home.practiceTime': 'Temps de Pratique',
    'home.certifications': 'Certifications',
    
    // CPR Steps
    'cpr.step1.title': 'Vérifier la Réactivité',
    'cpr.step1.description': 'Tapez les épaules et criez "Ça va?"',
    'cpr.step2.title': 'Appeler à l\'Aide',
    'cpr.step2.description': 'Appelez le 911 et obtenez un DEA si disponible',
    'cpr.step3.title': 'Vérifier le Pouls',
    'cpr.step3.description': 'Vérifiez le pouls à l\'artère carotide',
    'cpr.step4.title': 'Positionner les Mains',
    'cpr.step4.description': 'Placez le talon de la main au centre de la poitrine',
    'cpr.step5.title': 'Commencer les Compressions',
    'cpr.step5.description': 'Poussez fort et vite d\'au moins 2 pouces de profondeur',
    'cpr.step6.title': 'Donner des Respirations de Secours',
    'cpr.step6.description': 'Inclinez la tête vers l\'arrière, soulevez le menton, donnez 2 respirations',
    
    // Common actions
    'action.next': 'Suivant',
    'action.previous': 'Précédent',
    'action.start': 'Commencer',
    'action.pause': 'Pause',
    'action.resume': 'Reprendre',
    'action.complete': 'Terminer',
    'action.retry': 'Réessayer',
    'action.settings': 'Paramètres',
    
    // Settings
    'settings.language': 'Langue',
    'settings.ageGroup': 'Groupe d\'Âge',
    'settings.sound': 'Effets Sonores',
    'settings.haptics': 'Retour Haptique',
    'settings.highContrast': 'Mode Contraste Élevé',
    'settings.children': 'Enfants (8-12)',
    'settings.teens': 'Adolescents (13-17)',
    'settings.adults': 'Adultes (18+)',
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.learn': 'Lernen',
    'nav.practice': 'Üben',
    'nav.assess': 'Bewerten',
    'nav.profile': 'Profil',
    
    // Home screen
    'home.welcome': 'Willkommen zur HLW-Schulung',
    'home.subtitle': 'Lernen Sie lebensrettende Fähigkeiten mit interaktivem Training',
    'home.startLearning': 'Mit dem Lernen beginnen',
    'home.continuePractice': 'Übung fortsetzen',
    'home.takeAssessment': 'Bewertung durchführen',
    'home.progress': 'Ihr Fortschritt',
    'home.completedLessons': 'Abgeschlossene Lektionen',
    'home.practiceTime': 'Übungszeit',
    'home.certifications': 'Zertifizierungen',
    
    // CPR Steps
    'cpr.step1.title': 'Reaktionsfähigkeit prüfen',
    'cpr.step1.description': 'Schultern antippen und rufen "Sind Sie okay?"',
    'cpr.step2.title': 'Hilfe rufen',
    'cpr.step2.description': 'Rufen Sie 112 an und holen Sie einen AED, falls verfügbar',
    'cpr.step3.title': 'Puls prüfen',
    'cpr.step3.description': 'Puls an der Halsschlagader prüfen',
    'cpr.step4.title': 'Hände positionieren',
    'cpr.step4.description': 'Handballen auf die Brustmitte legen',
    'cpr.step5.title': 'Kompressionen beginnen',
    'cpr.step5.description': 'Hart und schnell mindestens 5 cm tief drücken',
    'cpr.step6.title': 'Rettungsatemspenden geben',
    'cpr.step6.description': 'Kopf nach hinten neigen, Kinn anheben, 2 Atemspenden geben',
    
    // Common actions
    'action.next': 'Weiter',
    'action.previous': 'Zurück',
    'action.start': 'Starten',
    'action.pause': 'Pausieren',
    'action.resume': 'Fortsetzen',
    'action.complete': 'Abschließen',
    'action.retry': 'Wiederholen',
    'action.settings': 'Einstellungen',
    
    // Settings
    'settings.language': 'Sprache',
    'settings.ageGroup': 'Altersgruppe',
    'settings.sound': 'Soundeffekte',
    'settings.haptics': 'Haptisches Feedback',
    'settings.highContrast': 'Hoher Kontrast Modus',
    'settings.children': 'Kinder (8-12)',
    'settings.teens': 'Jugendliche (13-17)',
    'settings.adults': 'Erwachsene (18+)',
  },
  
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.learn': '学习',
    'nav.practice': '练习',
    'nav.assess': '评估',
    'nav.profile': '个人资料',
    
    // Home screen
    'home.welcome': '欢迎来到心肺复苏培训',
    'home.subtitle': '通过互动培训学习救生技能',
    'home.startLearning': '开始学习',
    'home.continuePractice': '继续练习',
    'home.takeAssessment': '进行评估',
    'home.progress': '您的进度',
    'home.completedLessons': '已完成课程',
    'home.practiceTime': '练习时间',
    'home.certifications': '认证',
    
    // CPR Steps
    'cpr.step1.title': '检查反应',
    'cpr.step1.description': '拍打肩膀并大声询问"你还好吗？"',
    'cpr.step2.title': '呼救',
    'cpr.step2.description': '拨打120并获取AED（如果可用）',
    'cpr.step3.title': '检查脉搏',
    'cpr.step3.description': '在颈动脉处检查脉搏',
    'cpr.step4.title': '手部定位',
    'cpr.step4.description': '将手掌根部放在胸部中央',
    'cpr.step5.title': '开始按压',
    'cpr.step5.description': '用力快速按压至少5厘米深',
    'cpr.step6.title': '进行人工呼吸',
    'cpr.step6.description': '头部后仰，抬起下巴，进行2次人工呼吸',
    
    // Common actions
    'action.next': '下一步',
    'action.previous': '上一步',
    'action.start': '开始',
    'action.pause': '暂停',
    'action.resume': '继续',
    'action.complete': '完成',
    'action.retry': '重试',
    'action.settings': '设置',
    
    // Settings
    'settings.language': '语言',
    'settings.ageGroup': '年龄组',
    'settings.sound': '音效',
    'settings.haptics': '触觉反馈',
    'settings.highContrast': '高对比度模式',
    'settings.children': '儿童 (8-12)',
    'settings.teens': '青少年 (13-17)',
    'settings.adults': '成人 (18+)',
  },
};

export const useTranslation = (language: Language) => {
  return (key: string): string => {
    return translations[language][key] || key;
  };
};
