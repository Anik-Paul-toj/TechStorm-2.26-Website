/**
 * App constants - URLs, branding, web view configuration
 */

const WEBSITE_BASE_URL = 'https://techstorm.bppimt.ac.in';

export const WEB_VIEW_URLS = {
  events: `${WEBSITE_BASE_URL}/events`,
  teams: `${WEBSITE_BASE_URL}/team`,
  schedule: `${WEBSITE_BASE_URL}/schedule`,
} as const;

export const CLOUDINARY_BASE = 'https://res.cloudinary.com/dyj3kxni2/image/upload';
export const IMAGE_URLS = {
  heroLogo: require('../../assets/hero-logo.png'),
  heroBgDesktop: `${CLOUDINARY_BASE}/w_1920,q_auto:good,f_auto/eoorox/root/herobg`,
  heroBgMobile: `${CLOUDINARY_BASE}/w_800,q_auto:good,f_auto/eoorox/root/heroph`,
  pcMain: `${CLOUDINARY_BASE}/w_800,q_auto:good,f_auto/eoorox/root/pcmain`,
} as const;

export const HERO_CONTENT = {
  titleTag: '#TECHSTORM 2026',
  title: 'Play the Past, Build the Future',
  subtitle: 'INSERT COIN to begin your journey at the ultimate technical fest experience. Where retro meets revolution.',
  ctaRegister: 'Register Now',
  ctaExplore: 'Explore Events',
} as const;

export const SPLASH_DURATION_MS = 2000;
