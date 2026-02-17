import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HERO_CONTENT, IMAGE_URLS } from '../../utils/constants';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import PrimaryButton from '../Shared/PrimaryButton';

const { width } = Dimensions.get('window');

// Website URLs for CTAs (web view tabs - Register goes to contact, Explore goes to events)
const WEBSITE_CONTACT = 'https://techstorm.bppimt.ac.in/contact';
const WEBSITE_EVENTS = 'https://techstorm.bppimt.ac.in/events';

export default function HeroSection() {
  const insets = useSafeAreaInsets();

  const handleRegister = () => Linking.openURL(WEBSITE_CONTACT);
  const handleExplore = () => Linking.openURL(WEBSITE_EVENTS);

  return (
    <View style={[styles.container, { minHeight: Dimensions.get('window').height - insets.top - 80 }]}>
      {/* Content column */}
      <View style={[styles.content, { paddingTop: spacing.xxl + insets.top }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={IMAGE_URLS.heroLogo}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="TechStorm 2026 Logo"
          />
        </View>

        {/* Title tag */}
        <Text style={styles.titleTag}>{HERO_CONTENT.titleTag}</Text>

        {/* Main title */}
        <Text style={styles.title}>{HERO_CONTENT.title}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{HERO_CONTENT.subtitle}</Text>

        {/* CTA Buttons */}
        <View style={styles.buttonGroup}>
          <PrimaryButton
            title={HERO_CONTENT.ctaRegister}
            onPress={handleRegister}
            size="large"
            accessibilityLabel="Register for TechStorm 2026"
          />
          <PrimaryButton
            title={HERO_CONTENT.ctaExplore}
            onPress={handleExplore}
            size="large"
            accessibilityLabel="Explore TechStorm events"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.9,
    maxWidth: 350,
    height: undefined,
    aspectRatio: 2.5,
  },
  titleTag: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: spacing.md,
    width: '100%',
    alignItems: 'center',
  },
});
