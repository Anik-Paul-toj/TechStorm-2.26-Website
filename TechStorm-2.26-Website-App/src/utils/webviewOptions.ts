import { colors } from '../theme/colors';

/**
 * Common WebView configuration for Events, Teams, Schedule screens
 */
export const webviewOptions = {
  // Match app background
  containerStyle: { backgroundColor: colors.background },
  style: { backgroundColor: colors.background },
  // Performance - enable caching
  cacheEnabled: true,
} as const;
