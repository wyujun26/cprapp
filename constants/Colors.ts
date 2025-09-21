export const MemphisColors = {
  primary: '#FF6F61',      // Coral
  secondary: '#6B5B95',    // Purple
  accent: '#88B04B',       // Green
  pink: '#F7CAC9',         // Light Pink
  yellow: '#FFD700',       // Gold
  cyan: '#00CED1',         // Dark Turquoise
  orange: '#FF8C00',       // Dark Orange
  magenta: '#FF1493',      // Deep Pink
  lime: '#32CD32',         // Lime Green
  violet: '#9370DB',       // Medium Slate Blue
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  
  // Status colors
  success: '#88B04B',
  warning: '#FFD700',
  error: '#FF6F61',
  info: '#6B5B95',
};

export const AgeThemes = {
  children: {
    primary: MemphisColors.yellow,
    secondary: MemphisColors.pink,
    accent: MemphisColors.lime,
    background: MemphisColors.lightGray,
  },
  teens: {
    primary: MemphisColors.magenta,
    secondary: MemphisColors.cyan,
    accent: MemphisColors.violet,
    background: MemphisColors.white,
  },
  adults: {
    primary: MemphisColors.primary,
    secondary: MemphisColors.secondary,
    accent: MemphisColors.accent,
    background: MemphisColors.white,
  },
};
