/**
 * TechStorm brand colors - extracted from website
 */

export const colors = {
  // Primary brand
  primary: '#FF6B00',
  primaryDark: '#cc5500',

  // Accent / gold (buttons, highlights)
  accent: '#ffc010',
  accentLight: '#ffd04d',
  accentDark: '#cc9900',

  // Background
  background: '#000000',
  surface: '#0a0a0a',

  // Text
  text: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.78)',
  textInverse: '#280F0E',

  // Button variants (8-bit retro style)
  buttonPrimaryBg: '#FFF4C7',
  buttonPrimaryShadow: '#e6d9a6',
  buttonPrimaryBorder: '#280F0E',
  buttonPrimaryHover: '#fffae6',

  buttonSecondaryBg: '#2d1b3d',
  buttonSecondaryText: '#ffc010',
  buttonSecondaryShadow: '#1a0e22',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.8)',

  // Tab bar
  tabBarBg: '#000000',
  tabBarActive: '#ffc010',
  tabBarInactive: 'rgba(255, 255, 255, 0.5)',
} as const;

export type Colors = typeof colors;
